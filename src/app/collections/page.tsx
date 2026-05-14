'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const PRODUCTS = [
  {
    id: 1,
    name: 'Premium Turmeric',
    category: 'Spices',
    image: '/products/turmeric.png',
    description: 'A-grade turmeric with high curcumin content, sourced from the finest farms.',
  },
  {
    id: 2,
    name: 'Black Peppercorns',
    category: 'Spices',
    image: '/products/peppercorns.png',
    description: 'Tellicherry grade black pepper, hand-harvested and sun-dried for maximum aroma.',
  },
  {
    id: 3,
    name: 'Dry Red Chillies',
    category: 'Spices',
    image: '/products/chillies.png',
    description: 'Stemless Guntur red chillies, known for their vibrant color and balanced heat.',
  },
  {
    id: 4,
    name: 'Natural Aromatics',
    category: 'Spices',
    image: '/products/aromatics.png',
    description: 'A curated blend of premium whole spices including cardamom, cloves, and cinnamon.',
  },
  {
    id: 5,
    name: 'Exotic Fruit Collection',
    category: 'Fruits',
    image: '/products/fruits-main.png',
    description: 'Export-quality seasonal fruits, handled with precision for maximum freshness.',
  },
  {
    id: 6,
    name: 'Fresh Garlic Bulbs',
    category: 'Vegetables',
    image: '/products/garlic.png',
    description: 'Large, firm garlic bulbs with strong pungency and excellent shelf life.',
  },
  {
    id: 7,
    name: 'Vine-Ripened Tomatoes',
    category: 'Vegetables',
    image: '/products/tomatoes.png',
    description: 'Selected for uniform size, color, and firm texture, ideal for commercial use.',
  },
  {
    id: 8,
    name: 'Premium Artichokes',
    category: 'Vegetables',
    image: '/products/artichokes.png',
    description: 'Freshly harvested artichokes, graded for size and quality.',
  },
  {
    id: 9,
    name: 'Premium Cloves',
    category: 'Spices',
    image: '/products/item1.png',
    description: 'High-quality whole cloves with a strong, pungent aroma.',
  },
  {
    id: 10,
    name: 'Green Cardamom',
    category: 'Spices',
    image: '/products/item2.jpg',
    description: 'Fresh green cardamom pods, bursting with sweet and floral notes.',
  },
  {
    id: 11,
    name: 'Cinnamon Sticks',
    category: 'Spices',
    image: '/products/item3.jpg',
    description: 'Authentic cinnamon sticks with a warm, sweet flavor profile.',
  },
  {
    id: 12,
    name: 'Coriander Seeds',
    category: 'Spices',
    image: '/products/item4.jpg',
    description: 'Whole coriander seeds with a bright, citrusy flavor.',
  },
  {
    id: 13,
    name: 'Whole Black Peppercorns',
    category: 'Spices',
    image: '/products/item5.jpg',
    description: 'Premium whole black peppercorns, perfect for fresh grinding.',
  },
];

export default function CollectionsPage() {
  return (
    <main style={{ background: '#050505', minHeight: '100vh' }}>
      <Navbar />
      
      <section style={{ padding: '160px 40px 100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '80px', textAlign: 'center' }}
          >
            <p style={{ color: '#C6A86B', fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Wholesale Catalog
            </p>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 300, color: 'white', marginBottom: '24px' }}>
              Our Collections
            </h1>
            <div style={{ width: '60px', height: '2px', background: '#C6A86B', margin: '0 auto' }} />
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '40px',
          }}>
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <div style={{ position: 'relative', height: '280px', width: '100%' }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    padding: '6px 12px',
                    background: 'rgba(5,5,5,0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '100px',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#C6A86B',
                    border: '1px solid rgba(198,168,107,0.3)',
                  }}>
                    {product.category}
                  </div>
                </div>

                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 400, color: 'white', marginBottom: '12px' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {product.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, color: '#C6A86B' }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      padding: 0,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onClick={() => window.location.href = '/enquiry'}
                  >
                    Request Quote
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
