'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer style={{
      background: '#050505',
      padding: '100px 40px 60px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      color: 'rgba(255,255,255,0.6)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '60px',
      }}>
        {/* Brand & SEO */}
        <div>
          <h3 style={{ 
            color: '#C6A86B', 
            fontSize: '18px', 
            fontWeight: 600, 
            letterSpacing: '0.1em',
            marginBottom: '24px',
            textTransform: 'uppercase'
          }}>
            Sattvik Spices
          </h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
            We are a UAE-based importer and wholesale supplier of spices, fruits, and vegetables, serving restaurants, retailers, and distributors with consistent quality and reliable delivery.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {/* Social Links */}
            {[
              { name: 'FB', url: 'https://www.facebook.com/people/Sattvik-Spices/61572628861924/#' },
              { name: 'IG', url: 'https://www.instagram.com/sattvikspicesuae/' },
              { name: 'X', url: 'https://x.com/Sattvikspices' },
              { name: 'LI', url: 'https://www.linkedin.com/company/sattvik-spices-uae' }
            ].map(social => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ color: '#C6A86B', scale: 1.1 }}
                style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>
            Contact Us
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
            <li style={{ marginBottom: '12px' }}>
              <span style={{ color: '#C6A86B' }}>T:</span> 04 343 5640
            </li>
            <li style={{ marginBottom: '12px' }}>
              <span style={{ color: '#C6A86B' }}>M:</span> 00 971 56 958 8186
            </li>
            <li style={{ marginBottom: '12px' }}>
              <span style={{ color: '#C6A86B' }}>E:</span> info@sattvik.ae
            </li>
          </ul>
        </div>

        {/* Visit Us */}
        <div>
          <h4 style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>
            Visit Us
          </h4>
          <p style={{ fontSize: '14px', lineHeight: 1.6 }}>
            Off# M-17 Al Ghurg Building<br />
            Street 15 B<br />
            Al Karama Dubai<br />
            UAE
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '80px auto 0',
        paddingTop: '40px',
        borderTop: '1px solid rgba(255,255,255,0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
        <p>© {new Date().getFullYear()} Sattvik Spices Wholesale. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '32px' }}>
          <span>Pure Ingredients</span>
          <span>Global Standards</span>
        </div>
      </div>
    </footer>
  );
}
