'use client';

import { useEffect, useRef } from 'react';

// ─── Types ───────────────────────────────────────────────

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

// ─── Constants (Fluent Theme blues) ──────────────────────

const ORB_COUNT = 4;
const COLORS = [
  'rgba(15, 108, 189, 0.14)', // Fluent themePrimary
  'rgba(17, 94, 163, 0.12)', // Fluent themeDark
  'rgba(12, 59, 94, 0.10)', // Fluent themeDarker
  'rgba(40, 153, 245, 0.08)', // Fluent themeLight
];

// ─── Component ───────────────────────────────────────────

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    orbsRef.current = Array.from({ length: ORB_COUNT }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      radius: 160 + Math.random() * 220,
      color: COLORS[i % COLORS.length],
    }));

    let frame = 0;
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      for (const orb of orbsRef.current) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) orb.vx *= -1;
        if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) orb.vy *= -1;

        orb.x += Math.sin(frame * 0.008 + orb.radius) * 0.08;
        orb.y += Math.cos(frame * 0.01 + orb.radius) * 0.08;

        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius,
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none opacity-80"
    />
  );
}
