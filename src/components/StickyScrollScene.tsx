'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import dynamic from 'next/dynamic';
import ScrollCopy from './ScrollCopy';

// Canvas is client-only (no SSR) — avoid hydration mismatch
const AntiGravityCanvas = dynamic(() => import('./AntiGravityCanvas'), {
  ssr: false,
  loading: () => null,
});

// ─── Scroll nudge ─────────────────────────────────────────────────────────────

function ScrollNudge({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.08], [1, 0]);
  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        x: '-50%',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity,
        pointerEvents: 'none',
      }}
    >
      <span style={{
        fontSize: '10px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
      }}>Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path d="M8 4v16M2 14l6 6 6-6" stroke="rgba(198,168,107,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useSpring(progress, { stiffness: 80, damping: 20 });
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'rgba(255,255,255,0.06)',
      zIndex: 20,
    }}>
      <motion.div
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, transparent, #C6A86B 50%, transparent)',
          scaleX,
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}

// ─── Canvas adapter (converts MotionValue → number) ──────────────────────────

function CanvasAdapter({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    return scrollProgress.on('change', (v) => setProgress(v));
  }, [scrollProgress]);
  return <AntiGravityCanvas scrollProgress={progress} />;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function StickyScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.0001,
  });

  return (
    <div
      id="hero"
      ref={containerRef}
      style={{ height: '400vh', position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Canvas */}
        <CanvasAdapter scrollProgress={scrollYProgress} />

        {/* Copy overlay */}
        <ScrollCopy scrollProgress={smoothProgress} />

        {/* Progress bar */}
        <ProgressBar progress={smoothProgress} />

        {/* Scroll nudge */}
        <ScrollNudge progress={smoothProgress} />
      </div>
    </div>
  );
}
