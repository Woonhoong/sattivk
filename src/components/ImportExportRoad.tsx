'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const WAYPOINTS = [
  {
    side: 'import',
    tag: 'Sourcing Excellence',
    title: 'Direct Farm<br/>Procurement',
    desc: 'Direct partnerships with farmers in Kerala, Idukki, and Guntur ensure we source only the highest grade harvests.',
    stat: '100%',
    statLabel: 'Directly Sourced',
    color: '#C6A86B', // Gold
  },
  {
    side: 'export',
    tag: 'Global Reach',
    title: 'Seamless Global<br/>Distribution',
    desc: 'Connecting Indian heritage to 80+ countries with optimized logistics and temperature-controlled shipping.',
    stat: '80+',
    statLabel: 'Countries Served',
    color: '#C6A86B',
  },
  {
    side: 'import',
    tag: 'Quality Control',
    title: 'Triple-Tier<br/>Inspection',
    desc: 'Rigorous testing for pesticide residue and purity at the source, ensuring every batch exceeds international standards.',
    stat: '99.9%',
    statLabel: 'Purity Rate',
    color: '#C6A86B',
  },
  {
    side: 'export',
    tag: 'Trade Compliance',
    title: 'Zero-Friction<br/>Customs',
    desc: 'End-to-end documentation handling — from FSSAI and APEDA to FDA and EU compliance certificates.',
    stat: '100%',
    statLabel: 'Compliance Clear',
    color: '#C6A86B',
  },
];

const STATS = [
  { value: '15K+', label: 'Metric Tons Annually' },
  { value: '40+', label: 'Years of Heritage' },
  { value: '500+', label: 'Partner Farms' },
  { value: '99%', label: 'On-Time Export' },
];

export default function ImportExportRoad() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section 
      ref={containerRef}
      id="trade-journey"
      style={{
        position: 'relative',
        background: '#050505',
        color: '#fff',
        minHeight: '400vh', // Long scroll for the road
      }}
    >
      {/* Hero Intro for the Road Section */}
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Final HD Gold Logo (Synced to Background) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            marginBottom: '32px',
          }}
        >
          <img 
            src="/logo-final.png" 
            alt="Sattvik Spices Logo" 
            style={{ 
              width: '380px', 
              height: 'auto',
              mixBlendMode: 'screen', // Removes the black background perfectly
              filter: 'drop-shadow(0 0 30px rgba(198,168,107,0.4))',
            }} 
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#C6A86B',
            marginBottom: '24px',
          }}
        >
          Authenticity · Heritage · Purity
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontSize: 'clamp(40px, 8vw, 100px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            marginBottom: '32px',
          }}
        >
          SOURCE <span style={{ color: '#C6A86B' }}>TO</span><br />SHIPMENT
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Scroll to explore</span>
          <div style={{
            width: '1px',
            height: '60px',
            background: 'linear-gradient(180deg, #C6A86B, transparent)',
          }} />
        </motion.div>
      </div>

      {/* Sticky Road Visual ... */}

      {/* Sticky Road Visual */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 1,
      }}>
        {/* The Road */}
        <div style={{
          position: 'relative',
          width: '80px',
          height: '100%',
          background: '#0A0A0C',
          borderLeft: '1px solid rgba(198,168,107,0.15)',
          borderRight: '1px solid rgba(198,168,107,0.15)',
        }}>
          {/* Animated Center Line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            transform: 'translateX(-50%)',
            background: 'repeating-linear-gradient(to bottom, #C6A86B 0%, #C6A86B 30px, transparent 30px, transparent 60px)',
            backgroundSize: '2px 60px',
            animation: 'roadMove 0.8s linear infinite',
          }} />
          
          {/* Vehicles / Logistics Icons */}
          <LogisticsVehicles />
        </div>

        {/* Side Labels */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '40px',
          transform: 'translateY(-50%) rotate(-90deg)',
          fontSize: '11px',
          letterSpacing: '0.5em',
          color: 'rgba(255,255,255,0.05)',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>PROCUREMENT</div>
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '40px',
          transform: 'translateY(-50%) rotate(90deg)',
          fontSize: '11px',
          letterSpacing: '0.5em',
          color: 'rgba(255,255,255,0.05)',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>GLOBAL EXPORT</div>
      </div>

      {/* Content Waypoints */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 20px',
      }}>
        {WAYPOINTS.map((wp, i) => (
          <WaypointCard key={i} wp={wp} index={i} />
        ))}

        {/* Final Stats and CTA */}
        <div style={{ padding: '20vh 0 10vh' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1px',
            background: 'rgba(198,168,107,0.1)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(198,168,107,0.1)',
            marginBottom: '80px',
          }}>
            {STATS.map((stat, i) => (
              <div key={i} style={{ background: '#0A0A0C', padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', fontWeight: 200, color: '#C6A86B', marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 300, marginBottom: '40px', color: '#fff' }}>
              READY TO SCALE <span style={{ color: '#C6A86B' }}>YOUR SUPPLY.</span>
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: '#C6A86B',
                color: '#050505',
                padding: '16px 48px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Start Your Export Journey
            </motion.button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes roadMove {
          from { background-position: 0 0; }
          to { background-position: 0 60px; }
        }
      `}</style>
    </section>
  );
}

function WaypointCard({ wp, index }: { wp: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

  const isLeft = wp.side === 'import';

  return (
    <div 
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 80px 1fr',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
      }}
    >
      {/* LEFT SIDE CARD */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '15px' }}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%',
              maxWidth: '380px',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '24px',
              padding: '40px',
              textAlign: 'right',
              position: 'relative',
            }}
          >
            <CardContent wp={wp} isLeft={isLeft} />
          </motion.div>
        )}
      </div>

      {/* CENTER NODE */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: isInView ? '#C6A86B' : 'rgba(255,255,255,0.2)',
          border: '2px solid #050505',
          boxShadow: isInView ? '0 0 20px #C6A86B' : 'none',
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: 5,
        }} />
      </div>

      {/* RIGHT SIDE CARD */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '15px' }}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%',
              maxWidth: '380px',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '24px',
              padding: '40px',
              textAlign: 'left',
              position: 'relative',
            }}
          >
            <CardContent wp={wp} isLeft={isLeft} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function CardContent({ wp, isLeft }: any) {
  return (
    <>
      <div style={{
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.2em',
        color: '#C6A86B',
        textTransform: 'uppercase',
        marginBottom: '16px',
      }}>
        {wp.tag}
      </div>
      <h3 style={{
        fontSize: '28px',
        fontWeight: 300,
        lineHeight: 1.1,
        color: '#fff',
        marginBottom: '16px',
      }} dangerouslySetInnerHTML={{ __html: wp.title }} />
      <p style={{
        fontSize: '14px',
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.6,
        marginBottom: '24px',
        fontWeight: 300,
      }}>
        {wp.desc}
      </p>
      <div>
        <div style={{ fontSize: '40px', fontWeight: 200, color: '#fff', lineHeight: 1 }}>{wp.stat}</div>
        <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{wp.statLabel}</div>
      </div>
      {/* Decorative corner accent */}
      <div style={{
        position: 'absolute',
        [isLeft ? 'top' : 'bottom']: '15px',
        [isLeft ? 'left' : 'right']: '15px',
        width: '30px',
        height: '30px',
        borderTop: isLeft ? '1px solid rgba(198,168,107,0.3)' : 'none',
        borderLeft: isLeft ? '1px solid rgba(198,168,107,0.3)' : 'none',
        borderBottom: !isLeft ? '1px solid rgba(198,168,107,0.3)' : 'none',
        borderRight: !isLeft ? '1px solid rgba(198,168,107,0.3)' : 'none',
      }} />
    </>
  );
}

function LogisticsVehicles() {
  return (
    <>
      <Vehicle icon="🚛" delay={0} duration={4} side="left" />
      <Vehicle icon="📦" delay={2} duration={5} side="right" reverse />
      <Vehicle icon="🚚" delay={1.5} duration={6} side="left" />
      <Vehicle icon="✈️" delay={3.5} duration={7} side="right" reverse />
    </>
  );
}

function Vehicle({ icon, delay, duration, side, reverse = false }: any) {
  return (
    <motion.div
      initial={{ top: reverse ? '110%' : '-10%' }}
      animate={{ top: reverse ? '-10%' : '110%' }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        position: 'absolute',
        [side]: side === 'left' ? '-45px' : '-45px',
        left: side === 'left' ? 'auto' : 'auto',
        right: side === 'right' ? '12px' : 'auto',
        marginLeft: side === 'left' ? '12px' : '0',
        fontSize: '20px',
        filter: 'grayscale(1) brightness(0.8)',
        opacity: 0.6,
      }}
    >
      {icon}
    </motion.div>
  );
}
