import React, { useEffect, useRef } from 'react';

/**
 * Persistent Green Embers (Fagulhas LOUD)
 * High-performance 60fps canvas particles floating upward continuously,
 * with distribution biased towards the lateral edges to frame the content.
 */
export const PersistentEmbers = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle settings
    const PARTICLE_COUNT = 65;
    const particles = [];

    // Helper to spawn particle biased towards lateral sides
    const createParticle = (initialY = null) => {
      // Biased X distribution: 70% chance to spawn on lateral sides (left 25% or right 25%)
      let x;
      const isSide = Math.random() < 0.75;
      if (isSide) {
        if (Math.random() < 0.5) {
          x = Math.random() * (width * 0.28); // Left flank
        } else {
          x = width - Math.random() * (width * 0.28); // Right flank
        }
      } else {
        x = width * 0.28 + Math.random() * (width * 0.44); // Center column
      }

      return {
        x,
        y: initialY !== null ? initialY : height + Math.random() * 20,
        radius: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.8 + 0.35, // upward speed
        speedX: (Math.random() - 0.5) * 0.3, // slight drift
        alpha: Math.random() * 0.6 + 0.2, // opacity
        maxAlpha: Math.random() * 0.7 + 0.3,
        fadeSpeed: Math.random() * 0.005 + 0.002,
        isCenter: !isSide,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
      };
    };

    // Initialize particles throughout the screen
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(Math.random() * height));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        // Update position
        p.y -= p.speedY;
        p.swayPhase += p.swaySpeed;
        p.x += Math.sin(p.swayPhase) * 0.4 + p.speedX;

        // Reduce opacity in center column to prevent visual noise over text
        const currentAlpha = p.isCenter ? p.alpha * 0.4 : p.alpha;

        // Draw glowing neon green ember
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Core ember
        ctx.fillStyle = `rgba(0, 255, 17, ${currentAlpha})`;
        ctx.shadowColor = '#00FF11';
        ctx.shadowBlur = p.radius * 4;
        ctx.fill();
        ctx.restore();

        // Respawn when particle leaves top or fades
        if (p.y < -10) {
          particles[idx] = createParticle();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
