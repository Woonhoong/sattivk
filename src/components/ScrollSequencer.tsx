'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SequencerConfig {
  id: string;
  folder: string;
  totalFrames: number;
  label: string;
  headline: string;
  subtext: string;
  tags: string[];
  accentColor: string;        // e.g. '#E87D4D'
  accentColorRgb: string;     // e.g. '232,125,77'
  scrimDirection: 'left' | 'right'; // where text sits
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const padded = (n: number) => String(n).padStart(3, '0');

// ─── Component ────────────────────────────────────────────────────────────────

export default function ScrollSequencer({ config }: { config: SequencerConfig }) {
  const {
    id, folder, totalFrames, label, headline, subtext,
    tags, accentColor, accentColorRgb, scrimDirection,
  } = config;

  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.0005,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, totalFrames - 1]);

  // ─── Preload ────────────────────────────────────────────────────────────────

  useEffect(() => {
    let count = 0;
    const images: HTMLImageElement[] = new Array(totalFrames);

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/${folder}/ezgif-frame-${padded(i + 1)}.jpg`;
      img.onload = () => {
        count++;
        setLoadProgress(Math.round((count / totalFrames) * 100));
        if (count === totalFrames) {
          imagesRef.current = images;
          setLoaded(true);
          drawFrame(0, images);
        }
      };
      img.onerror = () => {
        count++;
        if (count === totalFrames) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images[i] = img;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Draw ───────────────────────────────────────────────────────────────────

  const drawFrame = useCallback((index: number, images?: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    const imgs = images ?? imagesRef.current;
    if (!canvas || !imgs.length) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imgs[Math.round(index)];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih) * 1.02;
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);

    // Erase watermark (bottom-right)
    const wmW = cw * 0.15;
    const wmH = ch * 0.12;
    const wmX = cw - wmW;
    const wmY = ch - wmH;
    const wmGrad = ctx.createRadialGradient(
      wmX + wmW * 0.5, wmY + wmH * 0.5, 0,
      wmX + wmW * 0.5, wmY + wmH * 0.5, Math.max(wmW, wmH) * 0.8
    );
    wmGrad.addColorStop(0, 'rgba(5,5,5,0.95)');
    wmGrad.addColorStop(0.6, 'rgba(5,5,5,0.8)');
    wmGrad.addColorStop(1, 'rgba(5,5,5,0)');
    ctx.fillStyle = wmGrad;
    ctx.fillRect(wmX - wmW * 0.3, wmY - wmH * 0.3, wmW * 1.6, wmH * 1.6);
  }, []);

  // ─── Frame subscriber ───────────────────────────────────────────────────────

  useEffect(() => {
    return frameIndex.on('change', (v) => {
      const idx = Math.min(totalFrames - 1, Math.max(0, Math.round(v)));
      if (idx !== currentFrameRef.current) {
        currentFrameRef.current = idx;
        drawFrame(idx);
      }
    });
  }, [frameIndex, drawFrame, totalFrames]);

  // ─── Resize ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      if (loaded) drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loaded, drawFrame]);

  // ─── Copy motion values ─────────────────────────────────────────────────────

  const labelOpacity = useTransform(smoothProgress, [0, 0.08, 0.85, 0.95], [0, 1, 1, 0]);
  const labelY = useTransform(smoothProgress, [0, 0.08], [20, 0]);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.1, 0.75, 0.9], [0, 1, 1, 0]);
  const headlineY = useTransform(smoothProgress, [0, 0.1], [30, 0]);
  const ctaOpacity = useTransform(smoothProgress, [0.15, 0.3, 0.8, 0.92], [0, 1, 1, 0]);

  // Scrim gradient direction
  const scrimGradient = scrimDirection === 'left'
    ? `linear-gradient(90deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.65) 28%, rgba(5,5,5,0.15) 50%, transparent 65%)`
    : `linear-gradient(270deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.65) 28%, rgba(5,5,5,0.15) 50%, transparent 65%)`;

  const textAlign = scrimDirection === 'left' ? 'flex-start' : 'flex-end';

  return (
    <div
      id={id}
      ref={sectionRef}
      style={{ height: '130vh', position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#050505',
        }}
      >
        {/* Loading */}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '20px', zIndex: 20, background: '#050505',
          }}>
            <p style={{
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: accentColor,
            }}>
              Loading · {loadProgress}%
            </p>
            <div style={{
              width: '200px', height: '1px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '1px', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: `${loadProgress}%`,
                background: `linear-gradient(90deg, ${accentColor}, rgba(${accentColorRgb},0.5))`,
                transition: 'width 0.1s linear',
              }} />
            </div>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
          aria-label={`${id} animation`}
        />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(5,5,5,0.45) 100%)',
          pointerEvents: 'none', zIndex: 2,
        }} />

        {/* Text scrim */}
        <div style={{
          position: 'absolute', inset: 0,
          background: scrimGradient,
          pointerEvents: 'none', zIndex: 3,
        }} />

        {/* Top/bottom fades */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '120px',
          background: 'linear-gradient(180deg, #050505 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 4,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
          background: 'linear-gradient(0deg, #050505 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 4,
        }} />

        {/* Copy overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          pointerEvents: 'none',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          alignItems: textAlign,
          padding: '0 6%',
          textAlign: scrimDirection === 'right' ? 'right' : 'left',
        }}>
          <motion.p
            style={{
              opacity: labelOpacity, y: labelY,
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: accentColor, marginBottom: '18px',
              textShadow: '0 1px 12px rgba(0,0,0,0.9)',
            }}
          >
            {label}
          </motion.p>

          <motion.h2
            style={{
              opacity: headlineOpacity, y: headlineY,
              fontSize: 'clamp(40px, 6.5vw, 92px)',
              fontWeight: 300, lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'rgba(255,255,255,0.97)',
              marginBottom: '28px', maxWidth: '12ch',
              textShadow: '0 2px 30px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.6)',
            }}
            dangerouslySetInnerHTML={{ __html: headline }}
          />

          <motion.p
            style={{
              opacity: ctaOpacity,
              fontSize: 'clamp(14px, 1.6vw, 18px)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.65, maxWidth: '36ch',
              marginBottom: '36px',
              textShadow: '0 1px 16px rgba(0,0,0,0.9)',
            }}
          >
            {subtext}
          </motion.p>

          <motion.div
            style={{
              opacity: ctaOpacity,
              display: 'flex', flexWrap: 'wrap', gap: '10px',
              justifyContent: scrimDirection === 'right' ? 'flex-end' : 'flex-start',
            }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: `rgba(${accentColorRgb},0.9)`,
                  padding: '6px 14px',
                  border: `1px solid rgba(${accentColorRgb},0.35)`,
                  borderRadius: '100px',
                  background: 'rgba(5,5,5,0.5)',
                  backdropFilter: 'blur(4px)',
                  textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '2px', background: 'rgba(255,255,255,0.06)', zIndex: 10,
        }}>
          <motion.div style={{
            height: '100%',
            background: `linear-gradient(90deg, ${accentColor}, rgba(${accentColorRgb},0.5))`,
            scaleX: smoothProgress,
            transformOrigin: 'left',
          }} />
        </div>
      </div>
    </div>
  );
}
