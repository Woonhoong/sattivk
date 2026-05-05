import Navbar from '@/components/Navbar';
import ScrollSequencer from '@/components/ScrollSequencer';
import Editorial from '@/components/Editorial';
import CategorySection from '@/components/CategorySection';
import SupplySection from '@/components/SupplySection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

// ─── Sequencer configs ────────────────────────────────────────────────────────

const spicesConfig = {
  id: 'spices-hero',
  folder: 'spices',
  totalFrames: 151,
  label: 'Pure Ingredients · Global Standards',
  headline: 'Authentic flavors,<br/>perfectly sourced.',
  subtext:
    'Premium spices sourced from trusted farms and delivered across the UAE for wholesale buyers.',
  tags: ['Black Pepper', 'Turmeric', 'Cardamom', 'Cinnamon', 'Red Chili', 'Cumin', 'Cloves'],
  accentColor: '#C6A86B',
  accentColorRgb: '198,168,107',
  scrimDirection: 'left' as const,
};

const fruitsConfig = {
  id: 'fruits-hero',
  folder: 'fruits',
  totalFrames: 240,
  label: 'Freshness · Quality · Presentation',
  headline: 'Nature\'s finest,<br/>in full flight.',
  subtext:
    'Our fruit selection is chosen for freshness, quality, and visual appeal, preserved for maximum shelf life.',
  tags: ['Mango', 'Banana', 'Pomegranate', 'Grapes', 'Papaya', 'Guava'],
  accentColor: '#E87D4D',
  accentColorRgb: '232,125,77',
  scrimDirection: 'right' as const,
};

const vegsConfig = {
  id: 'vegs-hero',
  folder: 'vegs',
  totalFrames: 240,
  label: 'Reliable Supply · Farm Fresh',
  headline: 'Rooted in<br/>the earth.',
  subtext:
    'High-quality vegetables carefully sourced and delivered with attention to freshness and durability.',
  tags: ['Onion', 'Tomato', 'Ginger', 'Garlic', 'Okra', 'Eggplant', 'Cauliflower'],
  accentColor: '#6BBF59',
  accentColorRgb: '107,191,89',
  scrimDirection: 'left' as const,
};

// ─── Editorial content between sections ───────────────────────────────────────

const spicesEditorial = {
  eyebrow: 'Spices Section',
  headline: 'Pure Ingredients.<br/>Global Standards.',
  body: 'We supply premium-grade spices that retain their natural aroma, color, and flavor. Each batch is carefully selected and handled to maintain purity and consistency. Our spices are processed with minimal intervention, ensuring they remain free from additives while delivering the rich, authentic taste required for professional kitchens and large-scale use.',
  stats: [
    { value: '50+', label: 'Spice Varieties' },
    { value: '100%', label: 'Purity Focus' },
    { value: 'UAE', label: 'Wholesale Reach' },
    { value: 'Direct', label: 'Farm Sourcing' },
  ],
  accentColor: '#C6A86B',
  accentColorRgb: '198,168,107',
  layout: 'center' as const,
};

const fruitsEditorial = {
  eyebrow: 'Fruits Section',
  headline: 'Harvested at peak,<br/>delivered fresh.',
  body: 'Our fruit selection is chosen for freshness, quality, and visual appeal. We focus on maintaining optimal conditions during handling and transportation to preserve natural taste and shelf life. Designed for wholesale supply, our fruits meet the expectations of businesses that prioritize consistency and presentation.',
  stats: [
    { value: '24', label: 'Fruit Varieties' },
    { value: 'Cold', label: 'Chain Storage' },
    { value: '100%', label: 'Quality Control' },
    { value: 'UAE', label: 'Delivery' },
  ],
  accentColor: '#E87D4D',
  accentColorRgb: '232,125,77',
  layout: 'center' as const,
};

const vegsEditorial = {
  eyebrow: 'Vegetables Section',
  headline: 'Commercial-grade,<br/>farm-to-table.',
  body: 'We provide high-quality vegetables that are carefully sourced and delivered with attention to freshness and durability. Each shipment is managed to ensure reliable supply for daily business operations. Our focus is on delivering products that perform well in both storage and usage, supporting the needs of commercial kitchens and retailers.',
  stats: [
    { value: '35+', label: 'Vegetable Types' },
    { value: 'Daily', label: 'Fresh Supply' },
    { value: 'Pure', label: 'Consistency' },
    { value: 'Bulk', label: 'Scalability' },
  ],
  accentColor: '#6BBF59',
  accentColorRgb: '107,191,89',
  layout: 'center' as const,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <Navbar />

      <section style={{ background: '#050505', paddingTop: '160px' }}>
        <Editorial 
          eyebrow="About Sattvik"
          headline="Trusted Importer.<br/>Wholesale Excellence."
          body="We are a trusted importer and wholesale supplier of high-quality agricultural products, focused on delivering consistency, purity, and reliability. From sourcing to final delivery, every step is carefully managed to ensure our products meet the standards expected by modern businesses. Our approach combines direct sourcing, strict quality control, and efficient logistics—making us a dependable partner for restaurants, retailers, and distributors across the UAE."
          stats={[
            { value: 'UAE', label: 'Wholesale Hub' },
            { value: 'Direct', label: 'Farm Network' },
            { value: 'Bulk', label: 'Supply Chain' },
            { value: 'Elite', label: 'Quality' },
          ]}
          accentColor="#C6A86B"
          accentColorRgb="198,168,107"
          layout="center"
        />
      </section>

      {/* ── SPICES: Cinematic explosion sequencer ──────────────────────── */}
      <ScrollSequencer config={spicesConfig} />
      <Editorial {...spicesEditorial} />

      {/* ── FRUITS: Anti-gravity floating sequencer ────────────────────── */}
      <ScrollSequencer config={fruitsConfig} />
      <Editorial {...fruitsEditorial} />

      {/* ── VEGETABLES: Farm-fresh sequencer ───────────────────────────── */}
      <ScrollSequencer config={vegsConfig} />
      <Editorial {...vegsEditorial} />

      {/* ── Category product grid ──────────────────────────────────────── */}
      <CategorySection />

      {/* ── Supply chain story ─────────────────────────────────────────── */}
      <SupplySection />

      {/* ── Final CTA ──────────────────────────────────────────────────── */}
      <CTASection />

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
