'use client';

import { useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SpiceOrb {
  id: number;
  x: number; y: number; z: number;
  vx: number; vy: number;
  radius: number;
  color: string;
  glowColor: string;
  label: string;
  labelShort: string;
  phase: number; // for sinusoidal drift
  phaseSpeed: number;
  phaseOffset: number;
  opacity: number;
  targetX: number; targetY: number;
  exploded: boolean;
  explodeProgress: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  radius: number;
  color: string;
  orbId: number;
  angle: number;
  dist: number;
  phase: number; // explode phase 0=intact, 1=exploded
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SPICE_DATA = [
  { label: 'Black Pepper', labelShort: 'BP', color: '#1a1a1a', glowColor: '#4a4a4a', glow2: '#888' },
  { label: 'Turmeric', labelShort: 'TU', color: '#c68a00', glowColor: '#f5a623', glow2: '#ffd700' },
  { label: 'Cardamom', labelShort: 'CA', color: '#2d5a27', glowColor: '#4caf50', glow2: '#81c784' },
  { label: 'Red Chili', labelShort: 'RC', color: '#8b0000', glowColor: '#e53935', glow2: '#ff7043' },
  { label: 'Cloves', labelShort: 'CL', color: '#3e1f00', glowColor: '#795548', glow2: '#bcaaa4' },
  { label: 'Cumin', labelShort: 'CU', color: '#5d3a1a', glowColor: '#a0522d', glow2: '#deb887' },
  { label: 'Coriander', labelShort: 'CO', color: '#556b2f', glowColor: '#8bc34a', glow2: '#c5e1a5' },
  { label: 'Star Anise', labelShort: 'SA', color: '#1a0a00', glowColor: '#5d4037', glow2: '#a1887f' },
];

const PARTICLE_COUNT = 180;

// ─── Main Component ───────────────────────────────────────────────────────────

interface AntiGravityCanvasProps {
  scrollProgress: number; // 0–1 across the sticky section
}

export default function AntiGravityCanvas({ scrollProgress }: AntiGravityCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<SpiceOrb[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const prevProgressRef = useRef<number>(0);

  // ─── Init Orbs ─────────────────────────────────────────────────────────────

  const initOrbs = useCallback((W: number, H: number) => {
    const cx = W / 2, cy = H / 2;
    orbsRef.current = SPICE_DATA.map((s, i) => {
      const angle = (i / SPICE_DATA.length) * Math.PI * 2;
      const dist = Math.min(W, H) * 0.28;
      return {
        id: i,
        x: cx + Math.cos(angle) * dist * (0.6 + Math.random() * 0.4),
        y: cy + Math.sin(angle) * dist * (0.5 + Math.random() * 0.5),
        z: 0.7 + Math.random() * 0.3,
        vx: 0, vy: 0,
        radius: 18 + Math.random() * 14,
        color: s.color,
        glowColor: s.glowColor,
        label: s.label,
        labelShort: s.labelShort,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.003 + Math.random() * 0.004,
        phaseOffset: (i / SPICE_DATA.length) * Math.PI * 2,
        opacity: 0,
        targetX: cx + Math.cos(angle) * dist * (0.6 + Math.random() * 0.4),
        targetY: cy + Math.sin(angle) * dist * (0.5 + Math.random() * 0.5),
        exploded: false,
        explodeProgress: 0,
      };
    });
  }, []);

  // ─── Init Particles ────────────────────────────────────────────────────────

  const initParticles = useCallback((W: number, H: number) => {
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const orb = orbsRef.current[i % orbsRef.current.length];
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 120;
      return {
        x: orb.x + Math.cos(angle) * dist,
        y: orb.y + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        life: Math.random(),
        maxLife: 0.6 + Math.random() * 0.4,
        radius: 1 + Math.random() * 3,
        color: orb.glowColor,
        orbId: i % orbsRef.current.length,
        angle,
        dist,
        phase: 0,
      };
    });
    void W; void H;
  }, []);

  // ─── Draw Frame ───────────────────────────────────────────────────────────

  const draw = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
    const sp = prevProgressRef.current;

    // Background — deep void gradient
    const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.8);
    bgGrad.addColorStop(0, sp > 0.3 ? 'rgba(15,10,5,1)' : '#050505');
    bgGrad.addColorStop(1, '#050505');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Ambient ground plane glow
    if (sp > 0.05) {
      const groundGrad = ctx.createRadialGradient(W / 2, H * 0.7, 0, W / 2, H * 0.7, W * 0.5);
      groundGrad.addColorStop(0, `rgba(198,168,107,${sp * 0.04})`);
      groundGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, 0, W, H);
    }

    const orbs = orbsRef.current;
    const particles = particlesRef.current;
    const cx = W / 2, cy = H / 2;

    // ── Phase logic ──────────────────────────────────────────────────────────

    // Phase 0→0.15: hero — 2 spices appear
    // Phase 0.15→0.35: origin — all 8 float in
    // Phase 0.35→0.60: disassembly — particle explosion
    // Phase 0.60→0.80: reformation — orbs reassemble
    // Phase 0.80→0.90: category reveal (handled by React overlay)
    // Phase 0.90→1.00: CTA convergence

    const heroEnd = 0.15;
    const originEnd = 0.35;
    const disassemblyEnd = 0.60;
    const reformEnd = 0.80;
    const categoryEnd = 0.90;

    // ── Update orb states per scroll ────────────────────────────────────────

    orbs.forEach((orb, i) => {
      // Drift animation (anti-gravity float)
      const driftX = Math.sin(t * orb.phaseSpeed + orb.phaseOffset) * 18 * orb.z;
      const driftY = Math.cos(t * orb.phaseSpeed * 0.7 + orb.phaseOffset) * 12 * orb.z;

      // Hero phase: only orb 0 (pepper) & 1 (turmeric) visible
      if (sp < heroEnd) {
        const heroT = sp / heroEnd;
        if (i < 2) {
          // Start semi-visible immediately — no full fade-in from 0
          orb.opacity = 0.5 + heroT * (i === 0 ? 0.5 : 0.3);
          orb.x += (orb.targetX + driftX - orb.x) * 0.025;
          orb.y += (orb.targetY + driftY - orb.y) * 0.025;
        } else {
          orb.opacity = 0;
        }
        orb.exploded = false;
        orb.explodeProgress = 0;
      }
      // Origin phase: stagger all orbs in
      else if (sp < originEnd) {
        const t2 = (sp - heroEnd) / (originEnd - heroEnd);
        const stagger = i / orbs.length;
        orb.opacity = Math.min(1, Math.max(0, (t2 - stagger * 0.3) / 0.5));
        orb.x += (orb.targetX + driftX - orb.x) * 0.04;
        orb.y += (orb.targetY + driftY - orb.y) * 0.04;
        orb.exploded = false;
        orb.explodeProgress = 0;
      }
      // Disassembly phase
      else if (sp < disassemblyEnd) {
        const t3 = (sp - originEnd) / (disassemblyEnd - originEnd);
        orb.explodeProgress = t3;
        orb.opacity = 1 - t3 * 0.8;
        orb.exploded = true;

        // Orbs drift outward as they explode
        const angle = (i / orbs.length) * Math.PI * 2;
        const spread = t3 * 60;
        orb.x += (orb.targetX + Math.cos(angle) * spread + driftX - orb.x) * 0.04;
        orb.y += (orb.targetY + Math.sin(angle) * spread + driftY - orb.y) * 0.04;
      }
      // Reformation phase
      else if (sp < reformEnd) {
        const t4 = (sp - disassemblyEnd) / (reformEnd - disassemblyEnd);
        orb.explodeProgress = 1 - t4;
        orb.opacity = t4 * 0.9;
        orb.exploded = false;

        // Orbs converge into ordered row
        const rowSpacing = Math.min(W / (orbs.length + 1), 110);
        const rowStartX = cx - (orbs.length - 1) * rowSpacing / 2;
        const rowY = cy + Math.sin(t * 0.008 + orb.phaseOffset) * 10;
        orb.x += (rowStartX + i * rowSpacing - orb.x) * 0.04;
        orb.y += (rowY - orb.y) * 0.04;
      }
      // Category / CTA phase
      else if (sp < categoryEnd) {
        const t5 = (sp - reformEnd) / (categoryEnd - reformEnd);
        orb.opacity = 1 - t5 * 0.6;
        orb.x += (orb.targetX + driftX - orb.x) * 0.03;
        orb.y += (orb.targetY + driftY - orb.y) * 0.03;
        orb.exploded = false;
        orb.explodeProgress = 0;
      }
      // CTA convergence — single central spice
      else {
        const t6 = (sp - categoryEnd) / (1 - categoryEnd);
        if (i === 0) {
          orb.opacity = 0.9 + Math.sin(t * 0.01) * 0.1;
          orb.x += (cx + driftX * 0.3 - orb.x) * 0.04;
          orb.y += (cy * 0.75 + driftY * 0.3 - orb.y) * 0.04;
          orb.radius += (40 - orb.radius) * 0.05;
        } else {
          orb.opacity = Math.max(0, 1 - t6 * 3 - i * 0.15);
          orb.x += (orb.targetX + driftX - orb.x) * 0.04;
          orb.y += (orb.targetY + driftY - orb.y) * 0.04;
        }
      }
    });

    // ── Draw ambient light tendrils ──────────────────────────────────────────

    orbs.forEach((orb) => {
      if (orb.opacity < 0.05) return;
      // Outer diffuse glow
      const gr = ctx.createRadialGradient(orb.x, orb.y, orb.radius * 0.5, orb.x, orb.y, orb.radius * 4);
      gr.addColorStop(0, `${orb.glowColor}${Math.round(orb.opacity * 30).toString(16).padStart(2,'0')}`);
      gr.addColorStop(1, 'transparent');
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius * 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // ── Draw particles (explosion cloud) ────────────────────────────────────

    if (sp > 0.25 && sp < 0.85) {
      const intensity = sp < 0.5
        ? (sp - 0.25) / 0.25
        : sp < 0.75 ? 1 : (0.85 - sp) / 0.1;

      particles.forEach((p) => {
        const orb = orbs[p.orbId];
        if (!orb || orb.opacity < 0.05) return;

        // Animate particle orbit/explosion
        const explodeAmt = orb.explodeProgress;
        const orbitDist = p.dist * (1 + explodeAmt * 3);
        const orbitAngle = p.angle + t * 0.008 * (p.orbId % 2 === 0 ? 1 : -1);
        p.x = orb.x + Math.cos(orbitAngle) * orbitDist;
        p.y = orb.y + Math.sin(orbitAngle) * orbitDist;

        const alpha = intensity * orb.opacity * (0.3 + explodeAmt * 0.5);
        if (alpha < 0.02) return;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 + explodeAmt * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      });
    }

    // ── Draw Orbs ─────────────────────────────────────────────────────────────

    orbs.forEach((orb) => {
      if (orb.opacity < 0.02) return;

      ctx.save();
      ctx.globalAlpha = orb.opacity;

      // Orb body
      const bodyGrad = ctx.createRadialGradient(
        orb.x - orb.radius * 0.3, orb.y - orb.radius * 0.3, orb.radius * 0.05,
        orb.x, orb.y, orb.radius
      );
      bodyGrad.addColorStop(0, lighten(orb.color, 0.4));
      bodyGrad.addColorStop(0.6, orb.color);
      bodyGrad.addColorStop(1, darken(orb.color, 0.4));

      ctx.shadowColor = orb.glowColor;
      ctx.shadowBlur = 30 + orb.explodeProgress * 20;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Rim light (gold highlight)
      ctx.shadowBlur = 0;
      const rimGrad = ctx.createLinearGradient(
        orb.x - orb.radius, orb.y - orb.radius,
        orb.x + orb.radius, orb.y + orb.radius
      );
      rimGrad.addColorStop(0, 'rgba(198,168,107,0.4)');
      rimGrad.addColorStop(0.4, 'transparent');
      rimGrad.addColorStop(1, 'rgba(198,168,107,0.1)');
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label — show when not exploding
      if (orb.opacity > 0.4 && orb.explodeProgress < 0.4) {
        ctx.font = `300 ${Math.max(9, orb.radius * 0.55)}px Inter, sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 6;
        ctx.fillText(orb.labelShort, orb.x, orb.y);
      }

      ctx.restore();
    });

    // ── Powder cloud overlay (disassembly) ────────────────────────────────────

    if (sp > 0.35 && sp < 0.65) {
      const dustT = sp < 0.5
        ? (sp - 0.35) / 0.15
        : (0.65 - sp) / 0.15;

      // Turmeric dust (gold)
      const dustGrad1 = ctx.createRadialGradient(cx * 0.9, cy, 0, cx * 0.9, cy, W * 0.3);
      dustGrad1.addColorStop(0, `rgba(198,140,0,${dustT * 0.15})`);
      dustGrad1.addColorStop(1, 'transparent');
      ctx.fillStyle = dustGrad1;
      ctx.fillRect(0, 0, W, H);

      // Chili dust (red)
      const dustGrad2 = ctx.createRadialGradient(cx * 1.1, cy * 1.1, 0, cx * 1.1, cy * 1.1, W * 0.25);
      dustGrad2.addColorStop(0, `rgba(139,0,0,${dustT * 0.12})`);
      dustGrad2.addColorStop(1, 'transparent');
      ctx.fillStyle = dustGrad2;
      ctx.fillRect(0, 0, W, H);
    }

  }, []);

  // ─── Animation Loop ────────────────────────────────────────────────────────

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    timeRef.current += 1;
    draw(ctx, canvas.width, canvas.height, timeRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [draw]);

  // ─── Setup ────────────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initOrbs(canvas.width, canvas.height);
      initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, initOrbs, initParticles]);

  // ─── Sync scroll progress ─────────────────────────────────────────────────

  useEffect(() => {
    prevProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}

// ─── Color Helpers ────────────────────────────────────────────────────────────

function lighten(hex: string, amount: number): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + Math.round(255 * amount));
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + Math.round(255 * amount));
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + Math.round(255 * amount));
  return `rgb(${r},${g},${b})`;
}
function darken(hex: string, amount: number): string {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - Math.round(255 * amount));
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - Math.round(255 * amount));
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - Math.round(255 * amount));
  return `rgb(${r},${g},${b})`;
}
