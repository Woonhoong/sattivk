'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Sourcing and Selection',
    description: 'We partner directly with trusted farms to procure high-quality agricultural products, ensuring consistency and purity from the start.',
    icon: '🌱',
  },
  {
    number: '02',
    title: 'Quality Inspection',
    description: 'Every batch undergoes rigorous quality control and strict inspections to meet the standards expected by modern wholesale businesses.',
    icon: '🔬',
  },
  {
    number: '03',
    title: 'Packaging and Handling',
    description: 'Optimal conditions are maintained during handling and transportation to preserve natural taste, freshness, and maximum shelf life.',
    icon: '📦',
  },
  {
    number: '04',
    title: 'Logistics and Delivery',
    description: 'Streamlined sourcing and distribution system ensures reliable, timely delivery of bulk requirements across the UAE.',
    icon: '🚚',
  },
];

export default function SupplySection() {
  return (
    <section
      id="supply"
      style={{
        minHeight: '100vh',
        background: '#050505',
        padding: '140px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Vertical gradient line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '20%',
          bottom: '20%',
          width: '1px',
          background: 'linear-gradient(180deg, transparent, rgba(198,168,107,0.2), transparent)',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: '96px', position: 'relative', zIndex: 1, maxWidth: '800px' }}
      >
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C6A86B',
          marginBottom: '20px',
        }}>
          Import & Supply Chain
        </p>
        <h2 style={{
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 300,
          letterSpacing: '-0.025em',
          color: 'rgba(255,255,255,0.92)',
          lineHeight: 1.1,
          marginBottom: '24px',
        }}>
          Streamlined distribution,<br />built for reliability.
        </h2>
        <p style={{
          fontSize: '16px',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.7,
          maxWidth: 600,
          margin: '0 auto',
        }}>
          Our operations are built around a streamlined sourcing and distribution system. From farm-level procurement to final delivery, we ensure every stage meets strict quality and efficiency standards.
        </p>
      </motion.div>

      {/* Steps */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        width: '100%',
        maxWidth: 900,
        position: 'relative',
        zIndex: 1,
      }}>
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '32px',
              padding: '36px 40px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.02)',
              transition: 'background 0.3s ease',
            }}
          >
            {/* Step number */}
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'rgba(198,168,107,0.5)',
              minWidth: '32px',
              paddingTop: '4px',
            }}>
              {step.number}
            </div>

            {/* Icon */}
            <div style={{ fontSize: '28px', minWidth: '36px', paddingTop: '2px' }}>
              {step.icon}
            </div>

            {/* Content */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.88)',
                marginBottom: '10px',
                letterSpacing: '-0.01em',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: '14px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.7,
                maxWidth: 520,
              }}>
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certification strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          marginTop: '80px',
          padding: '24px 40px',
          border: '1px solid rgba(198,168,107,0.15)',
          borderRadius: '12px',
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {['FSSAI Certified', 'ISO 22000', 'APEDA Registered', 'Organic Certified', 'HACCP Compliant'].map((cert) => (
          <span key={cert} style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(198,168,107,0.65)',
          }}>
            {cert}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
