'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const PRODUCTS = [
  { id: 1, name: 'Alphonso Mango', category: 'Fruits', image: '/products/alphonso_mango.png', description: 'Premium grade, hand-picked Alphonso mangoes.' },
  { id: 2, name: 'Premium Banana', category: 'Fruits', image: '/products/banana.png', description: 'Fresh, sweet, and perfectly ripened bananas.' },
  { id: 3, name: 'Fresh Grapes', category: 'Fruits', image: '/products/grapes.png', description: 'Export quality, juicy and crisp grapes.' },
  { id: 4, name: 'Fresh Guava', category: 'Fruits', image: '/products/guava.png', description: 'Farm-fresh guavas with a vibrant flavor.' },
  { id: 5, name: 'Kesar Mango', category: 'Fruits', image: '/products/kesar_mango.png', description: 'Sweet and aromatic Kesar mangoes.' },
  { id: 6, name: 'Fresh Papaya', category: 'Fruits', image: '/products/papaya.png', description: 'Nutrient-rich, perfectly ripe papayas.' },
  { id: 7, name: 'Fresh Pomegranate', category: 'Fruits', image: '/products/pomegranate.png', description: 'Ruby red pomegranates bursting with sweet juice.' },
  { id: 8, name: 'Black Pepper', category: 'Spices', image: '/products/black_pepper.png', description: 'Tellicherry grade black pepper for maximum aroma.' },
  { id: 9, name: 'Cardamom', category: 'Spices', image: '/products/cardamom.png', description: 'Fresh green cardamom pods with floral notes.' },
  { id: 10, name: 'Cinnamon', category: 'Spices', image: '/products/cinnamon.png', description: 'Authentic cinnamon with a warm flavor profile.' },
  { id: 11, name: 'Cloves', category: 'Spices', image: '/products/cloves.png', description: 'High-quality whole cloves with a pungent aroma.' },
  { id: 12, name: 'Coriander Seeds', category: 'Spices', image: '/products/coriander_seeds.png', description: 'Whole coriander seeds with a bright, citrusy flavor.' },
  { id: 13, name: 'Cumin Seeds', category: 'Spices', image: '/products/cumin_seeds.png', description: 'Earthy and aromatic premium cumin seeds.' },
  { id: 14, name: 'Fennel Seeds', category: 'Spices', image: '/products/fennel_seeds.png', description: 'Sweet and fragrant fennel seeds.' },
  { id: 15, name: 'Fenugreek', category: 'Spices', image: '/products/fenugreek.png', description: 'High-quality fenugreek seeds for culinary and medicinal use.' },
  { id: 16, name: 'Mustard Seeds', category: 'Spices', image: '/products/mustard_seeds.png', description: 'Pungent and flavorful premium mustard seeds.' },
  { id: 17, name: 'Nutmeg & Mace', category: 'Spices', image: '/products/nutmeg_mace.png', description: 'Fresh nutmeg and mace for rich, warm flavor.' },
  { id: 18, name: 'Red Chili', category: 'Spices', image: '/products/red_chili.png', description: 'Vibrant and fiery dry red chilies.' },
  { id: 19, name: 'Star Anise', category: 'Spices', image: '/products/star_anise.png', description: 'Aromatic star anise for exotic culinary creations.' },
  { id: 20, name: 'Turmeric', category: 'Spices', image: '/products/turmeric.png', description: 'High curcumin content, pure turmeric roots.' },
  { id: 21, name: 'Fresh Eggplant', category: 'Vegetables', image: '/products/eggplant.png', description: 'Glossy, tender, and farm-fresh eggplants.' },
  { id: 22, name: 'Fresh Garlic', category: 'Vegetables', image: '/products/garlic.png', description: 'Firm garlic bulbs with strong pungency.' },
  { id: 23, name: 'Fresh Ginger', category: 'Vegetables', image: '/products/ginger.png', description: 'Aromatic and spicy fresh ginger roots.' },
  { id: 24, name: 'Fresh Okra', category: 'Vegetables', image: '/products/okra.png', description: 'Tender and crisp freshly harvested okra.' },
  { id: 25, name: 'Fresh Onion', category: 'Vegetables', image: '/products/onion.png', description: 'Crisp and flavorful fresh onions.' },
  { id: 26, name: 'Fresh Potato', category: 'Vegetables', image: '/products/potato.png', description: 'Premium quality, versatile fresh potatoes.' },
  { id: 27, name: 'Fresh Tomato', category: 'Vegetables', image: '/products/tomato.png', description: 'Vine-ripened, juicy fresh tomatoes.' }
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
