import React, { useEffect, useRef } from 'react';

export const SteamParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const width = (canvas.width = 120);
    const height = (canvas.height = 100);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
      decay: number;
      skew: number;
    }

    const particles: Particle[] = [];

    const spawnParticle = () => {
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 16,
        y: height - 5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.4 - Math.random() * 0.5,
        alpha: 0.12 + Math.random() * 0.18,
        size: 8 + Math.random() * 8,
        decay: 0.002 + Math.random() * 0.003,
        skew: (Math.random() - 0.5) * 0.03,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(p.y * 0.04) * p.skew;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        // Subtle warm gold/cream tint for the steam to blend with luxury atmosphere
        grad.addColorStop(0, `rgba(255, 248, 231, ${p.alpha})`);
        grad.addColorStop(1, 'rgba(255, 248, 231, 0)');
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (Math.random() < 0.08 && particles.length < 15) {
        spawnParticle();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-1/2 left-1/2 -translate-x-1/2 pointer-events-none mix-blend-screen z-10"
      style={{ width: '120px', height: '100px' }}
    />
  );
};

export default SteamParticles;
