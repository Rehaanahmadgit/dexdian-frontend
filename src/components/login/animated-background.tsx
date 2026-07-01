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

// ─── Constants ───────────────────────────────────────────

const ORB_COUNT = 5;
const COLORS = [
  'rgba(99, 102, 241, 0.25)',   // indigo
  'rgba(139, 92, 246, 0.20)',   // violet
  'rgba(59, 130, 246, 0.22)',   // blue
  'rgba(16, 185, 129, 0.18)',   // emerald
  'rgba(236, 72, 153, 0.15)',   // pink
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

    // --- Resize handler ---
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // --- Init orbs ---
    orbsRef.current = Array.from({ length: ORB_COUNT }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 120 + Math.random() * 200,
      color: COLORS[i % COLORS.length],
    }));

    // --- Animation loop ---
    let frame = 0;
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      for (const orb of orbsRef.current) {
        // Move
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges
        if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) orb.vx *= -1;
        if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) orb.vy *= -1;

        // Add slight organic wobble
        orb.x += Math.sin(frame * 0.01 + orb.radius) * 0.1;
        orb.y += Math.cos(frame * 0.012 + orb.radius) * 0.1;

        // Draw soft radial gradient orb
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius,
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
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
