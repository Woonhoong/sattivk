'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

interface ScrollCopyProps {
  scrollProgress: MotionValue<number>;
}

const phases = [
  {
    // Hero: visible from very start
    start: 0, end: 0.16,
    fadeInStart: 0, fadeInEnd: 0.02,
    fadeOutStart: 0.10, fadeOutEnd: 0.16,
    label: 'KERALA · INDIA',
    headline: 'Purity,\nrevealed.',
    sub: 'From origin to perfection.',
    align: 'center' as const,
  },
  {
    start: 0.16, end: 0.36,
    fadeInStart: 0.17, fadeInEnd: 0.22,
    fadeOutStart: 0.30, fadeOutEnd: 0.36,
    label: 'SOURCED AT ORIGIN',
    headline: 'Directly from\nIndia\'s finest farms.',
    sub: 'Every spice, a living geography.',
    align: 'left' as const,
  },
  {
    start: 0.36, end: 0.62,
    fadeInStart: 0.38, fadeInEnd: 0.44,
    fadeOutStart: 0.56, fadeOutEnd: 0.62,
    label: 'COMPOSITIONAL ANALYSIS',
    headline: 'Nothing added.\nNothing hidden.',
    sub: 'Only pure, natural composition.',
    align: 'right' as const,
  },
  {
    start: 0.62, end: 0.82,
    fadeInStart: 0.64, fadeInEnd: 0.70,
    fadeOutStart: 0.76, fadeOutEnd: 0.82,
    label: 'PRECISION SUPPLY',
    headline: 'Refined for\nconsistency.',
    sub: 'Engineered for global supply chains.',
    align: 'left' as const,
  },
];

export default function ScrollCopy({ scrollProgress }: ScrollCopyProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {phases.map((phase) => (
        <PhaseText
          key={phase.label}
          phase={phase}
          scrollProgress={scrollProgress}
        />
      ))}
    </div>
  );
}

function PhaseText({
  phase,
  scrollProgress,
}: {
  phase: (typeof phases)[0];
  scrollProgress: MotionValue<number>;
}) {
  const { fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd, label, headline, sub, align } = phase as typeof phases[0] & {
    fadeInStart: number; fadeInEnd: number; fadeOutStart: number; fadeOutEnd: number;
  };

  const opacity = useTransform(
    scrollProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [30, 0, 0, -30]
  );

  const positionStyle: React.CSSProperties =
    align === 'center'
      ? {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          textAlign: 'center',
          width: '90%',
          maxWidth: 700,
        }
      : align === 'left'
      ? {
          position: 'absolute',
          left: '8%',
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'left',
          maxWidth: 500,
        }
      : {
          position: 'absolute',
          right: '8%',
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'right',
          maxWidth: 500,
        };

  return (
    <motion.div style={{ ...positionStyle, opacity, y }}>
      {/* Label */}
      <p
        style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C6A86B',
          marginBottom: '20px',
        }}
      >
        {label}
      </p>

      {/* Headline */}
      <h2
        style={{
          fontSize: 'clamp(36px, 6vw, 88px)',
          fontWeight: 300,
          lineHeight: 1.07,
          letterSpacing: '-0.025em',
          color: 'rgba(255,255,255,0.92)',
          marginBottom: '24px',
          whiteSpace: 'pre-line',
        }}
      >
        {headline}
      </h2>

      {/* Sub */}
      <p
        style={{
          fontSize: 'clamp(15px, 1.8vw, 20px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.01em',
          lineHeight: 1.5,
        }}
      >
        {sub}
      </p>
    </motion.div>
  );
}
