'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ─── Config ───────────────────────────────────────────────────────────────────

const TOTAL_FRAMES = 240;
const padded = (n: number) => String(n).padStart(3, '0');
function frameSrc(n: number) {
  return `/fruits/ezgif-frame-${padded(n)}.jpg`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FruitsSequencer() {
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

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // ─── Preload all frames ─────────────────────────────────────────────────────

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i + 1);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
          drawFrame(0, images);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images[i] = img;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Draw a frame to canvas ─────────────────────────────────────────────────

  const drawFrame = useCallback((index: number, images?: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    const imgs = images ?? imagesRef.current;
    if (!canvas || !imgs.length) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imgs[Math.round(index)];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Use CSS pixel dimensions (the canvas buffer is already scaled by DPR)
    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Width-priority fill: scale so image width >= canvas width
    // Then vertically center (crop top/bottom if needed)
    const scale = Math.max(cw / iw, ch / ih) * 1.02; // 2% overscale for full bleed
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);

    // ── Paint over "Veo" watermark (bottom-right corner) ──────────────────
    // The watermark sits roughly in the last 12% width × 10% height
    const wmW = cw * 0.15;
    const wmH = ch * 0.12;
    const wmX = cw - wmW;
    const wmY = ch - wmH;

    // Soft gradient fade that blends with the dark frame background
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

  // ─── Subscribe to frame changes ─────────────────────────────────────────────

  useEffect(() => {
    return frameIndex.on('change', (v) => {
      const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(v)));
      if (idx !== currentFrameRef.current) {
        currentFrameRef.current = idx;
        drawFrame(idx);
      }
    });
  }, [frameIndex, drawFrame]);

  // ─── Canvas resize ──────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      if (loaded) drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loaded, drawFrame]);

  // ─── Scroll-driven copy opacity ─────────────────────────────────────────────

  const labelOpacity = useTransform(smoothProgress, [0, 0.08, 0.85, 0.95], [0, 1, 1, 0]);
  const labelY = useTransform(smoothProgress, [0, 0.08], [20, 0]);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.1, 0.75, 0.9], [0, 1, 1, 0]);
  const headlineY = useTransform(smoothProgress, [0, 0.1], [30, 0]);
  const ctaOpacity = useTransform(smoothProgress, [0.15, 0.3, 0.8, 0.92], [0, 1, 1, 0]);

  return (
    <div
      id="fruits"
      ref={sectionRef}
      style={{ height: '300vh', position: 'relative' }}
    >
      {/* ── Sticky viewport ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#050505',
        }}
      >
        {/* Loading overlay */}
        {!loaded && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            zIndex: 20,
            background: '#050505',
          }}>
            <p style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C6A86B',
            }}>
              Loading Fruits · {loadProgress}%
            </p>
            <div style={{
              width: '200px',
              height: '1px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '1px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${loadProgress}%`,
                background: 'linear-gradient(90deg, #C6A86B, #E8CC8A)',
                transition: 'width 0.1s linear',
              }} />
            </div>
          </div>
        )}

        {/* Canvas — frame sequencer */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
          aria-label="Fruits animation"
        />

        {/* Cinematic vignette overlay (lighter so fruits read well) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(5,5,5,0.45) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        {/* LEFT-SIDE TEXT SCRIM — strong dark gradient so text is always readable */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.65) 28%, rgba(5,5,5,0.15) 50%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 3,
        }} />

        {/* Top fade */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '120px',
          background: 'linear-gradient(180deg, #050505 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 4,
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '120px',
          background: 'linear-gradient(0deg, #050505 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 4,
        }} />

        {/* ── Copy overlay ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 6%',
        }}>
          {/* Label */}
          <motion.p
            style={{
              opacity: labelOpacity,
              y: labelY,
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#E87D4D',
              marginBottom: '18px',
              textShadow: '0 1px 12px rgba(0,0,0,0.9)',
            }}
          >
            Sun-Ripened · India
          </motion.p>

          {/* Headline */}
          <motion.h2
            style={{
              opacity: headlineOpacity,
              y: headlineY,
              fontSize: 'clamp(40px, 6.5vw, 92px)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'rgba(255,255,255,0.97)',
              marginBottom: '28px',
              maxWidth: '10ch',
              textShadow: '0 2px 30px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.6)',
            }}
          >
            Nature&apos;s finest,<br />in full flight.
          </motion.h2>

          {/* Sub */}
          <motion.p
            style={{
              opacity: ctaOpacity,
              fontSize: 'clamp(14px, 1.6vw, 18px)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.65,
              maxWidth: '36ch',
              marginBottom: '36px',
              textShadow: '0 1px 16px rgba(0,0,0,0.9)',
            }}
          >
            Alphonso mango, Kesar, pomegranate,
            papaya, grapes, banana, guava —
            sourced at peak ripeness, shipped worldwide.
          </motion.p>

          {/* Fruit tags */}
          <motion.div
            style={{
              opacity: ctaOpacity,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {['Mango', 'Banana', 'Pomegranate', 'Grapes', 'Papaya', 'Guava'].map((fruit) => (
              <span
                key={fruit}
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(232,125,77,0.9)',
                  padding: '6px 14px',
                  border: '1px solid rgba(232,125,77,0.35)',
                  borderRadius: '100px',
                  background: 'rgba(5,5,5,0.5)',
                  backdropFilter: 'blur(4px)',
                  textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                }}
              >
                {fruit}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '2px',
          background: 'rgba(255,255,255,0.06)',
          zIndex: 10,
        }}>
          <motion.div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #E87D4D, #F5A87A)',
            scaleX: smoothProgress,
            transformOrigin: 'left',
          }} />
        </div>
      </div>
    </div>
  );
}
