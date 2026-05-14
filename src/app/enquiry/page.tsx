'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function EnquiryPage() {
  return (
    <main style={{ background: '#050505', minHeight: '100vh' }}>
      <Navbar />
      
      <section style={{ 
        padding: '160px 40px 100px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '800px' }}
        >
          <p style={{ 
            color: '#C6A86B', 
            fontSize: '12px', 
            fontWeight: 600, 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            Wholesale Inquiry
          </p>
          <h1 style={{ 
            fontSize: 'clamp(32px, 5vw, 64px)', 
            fontWeight: 300, 
            color: 'white', 
            letterSpacing: '-0.02em',
            marginBottom: '24px'
          }}>
            Partner with Sattvik
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', lineHeight: 1.6 }}>
            Tell us about your bulk requirements. Our procurement experts will get back to you within 24 hours with a customized quote.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            width: '100%',
            maxWidth: '700px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '24px',
            padding: '48px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            backdropFilter: 'blur(20px)',
          }}
          action="https://api.web3forms.com/submit"
          method="POST"
        >
          <input type="hidden" name="access_key" value="23d1b125-1d53-4e9a-91e2-cd1c448cf4ac" />
          {/* Name */}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" name="name" placeholder="John Doe" required style={inputStyle} />
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Business Email</label>
            <input type="email" name="email" placeholder="john@company.com" required style={inputStyle} />
          </div>

          {/* Phone */}
          <div>
            <label style={labelStyle}>Phone Number</label>
            <input type="tel" name="phone" placeholder="+971 -- --- ----" required style={inputStyle} />
          </div>

          {/* Company */}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Company Name</label>
            <input type="text" name="company" placeholder="Global Traders Ltd" required style={inputStyle} />
          </div>

          {/* Interest */}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Primary Interest</label>
            <select name="interest" required style={inputStyle}>
              <option value="spices">Premium Spices</option>
              <option value="fruits">Fresh Fruits</option>
              <option value="vegs">Fresh Vegetables</option>
              <option value="all">Multiple Categories</option>
            </select>
          </div>

          {/* Message */}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Requirement Details</label>
            <textarea name="message" placeholder="Tell us about quantities, shipping destination, etc." required style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }} />
          </div>

          {/* Submit */}
          <div style={{ gridColumn: 'span 2', marginTop: '12px' }}>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#d4b77b' }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '12px',
                background: '#C6A86B',
                color: '#050505',
                fontSize: '16px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
            >
              <button type="submit" style={{ all: 'unset', width: '100%', height: '100%', textAlign: 'center' }}>Submit Inquiry</button>
            </motion.button>
          </div>
        </motion.form>
      </section>

      <Footer />
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: '10px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 18px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  color: 'white',
  fontSize: '15px',
  outline: 'none',
  transition: 'border 0.3s ease, background 0.3s ease',
};
