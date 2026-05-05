'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections' },
  { label: 'Supply Chain', href: '/#supply' },
  { label: 'Contact', href: '/enquiry' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const id = href.substring(1);
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.location.href = href;
  };

  return (
    <>
      <motion.header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '14px 40px' : '24px 40px',
          background: scrolled
            ? 'rgba(5,5,5,0.82)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(198,168,107,0.12)'
            : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <motion.a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '18px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: '#C6A86B',
            textTransform: 'uppercase',
          }}
          whileHover={{ opacity: 0.75 }}
          transition={{ duration: 0.2 }}
        >
          <div style={{ width: '48px', height: 'auto' }}>
            <img
              src="/logo-final.png"
              alt="Sattvik Spices"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                mixBlendMode: 'screen',
              }}
            />
          </div>
          Sattvik
        </motion.a>

        {/* Center nav — desktop */}
        <nav style={{ display: 'flex', gap: '36px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              style={{
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.04em',
                color: 'rgba(255,255,255,0.7)',
                position: 'relative',
              }}
              whileHover={{ color: 'rgba(255,255,255,1)' }}
              transition={{ duration: 0.2 }}
            >
              {link.label}
              <motion.span
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: '#C6A86B',
                  scaleX: 0,
                  transformOrigin: 'left',
                }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <motion.a
            href="/enquiry"
            style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: '#050505',
              background: 'linear-gradient(135deg, #C6A86B 0%, #E8CC8A 50%, #C6A86B 100%)',
              backgroundSize: '200% 200%',
              padding: '9px 22px',
              borderRadius: '100px',
              display: 'inline-block',
            }}
            whileHover={{
              backgroundPosition: '100% 100%',
              scale: 1.04,
              boxShadow: '0 0 24px rgba(198,168,107,0.35)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            Enquire
          </motion.a>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: 'white', display: 'none' }}
            className="hamburger-btn"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <motion.line
                x1="3" y1={mobileOpen ? "11" : "6"} x2="19" y2={mobileOpen ? "11" : "6"}
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                style={{ rotate: mobileOpen ? 45 : 0, transformOrigin: 'center' }}
              />
              <motion.line
                x1="3" y1="11" x2="19" y2="11"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                style={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <motion.line
                x1="3" y1={mobileOpen ? "11" : "16"} x2="19" y2={mobileOpen ? "11" : "16"}
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                style={{ rotate: mobileOpen ? -45 : 0, transformOrigin: 'center' }}
              />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(5,5,5,0.97)',
              backdropFilter: 'blur(20px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  fontSize: '28px',
                  fontWeight: 300,
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
