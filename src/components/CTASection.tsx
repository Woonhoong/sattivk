'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '13+', label: 'Spice Varieties' },
  { value: '6', label: 'Exotic Fruits' },
  { value: '7', label: 'Fresh Vegetables' },
  { value: '40+', label: 'Countries Served' },
];

export default function CTASection() {
  return (
    <section
      id="cta"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #050505 0%, #08060A 60%, #050505 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orb */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198,168,107,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex',
          gap: 'clamp(32px, 6vw, 80px)',
          marginBottom: '100px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 300,
              color: '#C6A86B',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: '8px',
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main CTA block */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', maxWidth: 800 }}
      >
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C6A86B',
          marginBottom: '24px',
        }}>
          Built for Business
        </p>

        <h2 style={{
          fontSize: 'clamp(44px, 7vw, 80px)',
          fontWeight: 300,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: 'rgba(255,255,255,0.93)',
          marginBottom: '28px',
        }}>
          Delivered with<br />Consistency.
        </h2>

        <p style={{
          fontSize: 'clamp(15px, 1.8vw, 19px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.65,
          marginBottom: '56px',
          maxWidth: 540,
          margin: '0 auto 56px',
        }}>
          Partner with a supplier that understands quality, reliability, and scale. Sourced from trusted farms and delivered across the UAE.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.a
            href="/enquiry"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 36px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, #C6A86B 0%, #E8CC8A 50%, #C6A86B 100%)',
              backgroundSize: '200% 200%',
              color: '#050505',
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 40px rgba(198,168,107,0.4)',
              backgroundPosition: '100% 100%',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            Request Bulk Quote
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>

          <motion.a
            href="/collections"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 36px',
              borderRadius: '100px',
              background: 'transparent',
              border: '1px solid rgba(198,168,107,0.35)',
              color: 'rgba(255,255,255,0.75)',
              fontSize: '15px',
              fontWeight: 400,
              letterSpacing: '0.04em',
            }}
            whileHover={{
              borderColor: 'rgba(198,168,107,0.7)',
              color: 'rgba(255,255,255,1)',
              scale: 1.02,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            View Collections
          </motion.a>
        </div>
      </motion.div>

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.2)',
        }}
      >
        Sattvik · Premium Wholesale · Est. India
      </motion.div>
    </section>
  );
}
