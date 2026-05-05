'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
}

interface EditorialProps {
  eyebrow: string;
  headline: string;
  body: string;
  stats?: Stat[];
  accentColor: string;
  accentColorRgb: string;
  layout?: 'left' | 'center';
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Editorial({
  eyebrow, headline, body, stats, accentColor, accentColorRgb, layout = 'center',
}: EditorialProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        padding: 'clamp(80px, 12vh, 140px) 6%',
        background: '#050505',
        overflow: 'hidden',
        zIndex: 5,
      }}
    >
      {/* Subtle accent glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: layout === 'left' ? '-10%' : '50%',
        transform: layout === 'center' ? 'translateX(-50%)' : 'none',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${accentColorRgb},0.06) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        textAlign: layout,
      }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: accentColor,
            marginBottom: '24px',
          }}
        >
          {eyebrow}
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: 'clamp(28px, 4.5vw, 56px)',
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.92)',
            marginBottom: '28px',
            maxWidth: layout === 'center' ? '18ch' : '16ch',
            marginLeft: layout === 'center' ? 'auto' : undefined,
            marginRight: layout === 'center' ? 'auto' : undefined,
          }}
          dangerouslySetInnerHTML={{ __html: headline }}
        />

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            maxWidth: '56ch',
            marginBottom: '56px',
            marginLeft: layout === 'center' ? 'auto' : undefined,
            marginRight: layout === 'center' ? 'auto' : undefined,
          }}
        >
          {body}
        </motion.p>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(24px, 4vw, 60px)',
          justifyContent: layout === 'center' ? 'center' : 'flex-start',
        }}>
          {stats?.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              style={{ textAlign: 'center', minWidth: '120px' }}
            >
              <p style={{
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 200,
                color: accentColor,
                lineHeight: 1.1,
                marginBottom: '8px',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {stat.value}
              </p>
              <p style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '6%',
          right: '6%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, rgba(${accentColorRgb},0.2), transparent)`,
          transformOrigin: 'left',
        }}
      />
    </section>
  );
}
