'use client';

import { motion } from 'framer-motion';

const SPICES = [
  'Black Pepper (Kerala)',
  'Cardamom (Idukki)',
  'Cloves',
  'Turmeric (Erode)',
  'Red Chili (Guntur / Byadgi)',
  'Cumin Seeds',
  'Coriander Seeds',
  'Fennel Seeds',
  'Mustard Seeds',
  'Fenugreek',
  'Cinnamon',
  'Star Anise',
  'Nutmeg & Mace',
];

const FRUITS = [
  'Mango (Alphonso, Kesar)',
  'Banana',
  'Pomegranate',
  'Grapes',
  'Papaya',
  'Guava',
];

const VEGETABLES = [
  'Onion',
  'Potato',
  'Tomato',
  'Ginger',
  'Garlic',
  'Okra',
  'Eggplant',
];

interface CategoryData {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  accent: string;
  glowColor: string;
  items: string[];
}

const CATEGORIES: CategoryData[] = [
  {
    id: 'spices',
    emoji: '🌶️',
    title: 'Spices',
    subtitle: 'The soul of Indian cuisine',
    accent: '#C6A86B',
    glowColor: 'rgba(198,168,107,0.15)',
    items: SPICES,
  },
  {
    id: 'fruits',
    emoji: '🍎',
    title: 'Fruits',
    subtitle: 'Sun-ripened perfection',
    accent: '#E87D4D',
    glowColor: 'rgba(232,125,77,0.15)',
    items: FRUITS,
  },
  {
    id: 'vegetables',
    emoji: '🥕',
    title: 'Vegetables',
    subtitle: 'Farm to export, fresh',
    accent: '#6BAF6B',
    glowColor: 'rgba(107,175,107,0.15)',
    items: VEGETABLES,
  },
];

export default function CategorySection() {
  return (
    <section
      id="spices"
      style={{
        minHeight: '100vh',
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px',
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: '80px' }}
      >
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C6A86B',
          marginBottom: '20px',
        }}>
          Complete Catalog
        </p>
        <h2 style={{
          fontSize: 'clamp(36px, 5vw, 72px)',
          fontWeight: 300,
          letterSpacing: '-0.025em',
          color: 'rgba(255,255,255,0.92)',
          lineHeight: 1.1,
        }}>
          Every ingredient,<br />at global scale.
        </h2>
      </motion.div>

      {/* Category cards */}
      <div
        id="fruits"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          width: '100%',
          maxWidth: 1200,
        }}
      >
        {CATEGORIES.map((cat, catIdx) => (
          <motion.div
            key={cat.id}
            id={cat.id === 'vegetables' ? 'vegetables' : undefined}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              delay: catIdx * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -8,
              boxShadow: `0 32px 80px ${cat.glowColor}`,
            }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              padding: '40px 36px',
              backdropFilter: 'blur(10px)',
              cursor: 'default',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {/* Card header */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{cat.emoji}</div>
              <h3 style={{
                fontSize: '28px',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: 'rgba(255,255,255,0.92)',
                marginBottom: '8px',
              }}>
                {cat.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: cat.accent,
                fontWeight: 400,
                letterSpacing: '0.05em',
              }}>
                {cat.subtitle}
              </p>
            </div>

            {/* Item list */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cat.items.map((item, itemIdx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.1 + itemIdx * 0.04 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.65)',
                    fontWeight: 300,
                  }}
                >
                  <span style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: cat.accent,
                    flexShrink: 0,
                    opacity: 0.7,
                  }} />
                  {item}
                </motion.li>
              ))}
            </ul>

            {/* Bottom accent line */}
            <div style={{
              height: '1px',
              background: `linear-gradient(90deg, ${cat.accent}40, transparent)`,
              marginTop: '32px',
            }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
