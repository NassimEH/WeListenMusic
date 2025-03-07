
import React, { useRef, useEffect } from 'react';

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7; // 70% of the viewport height
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star properties
    const stars: {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: number;
      alpha: number;
      rotation: number;
    }[] = [];

    // Create stars
    const createStars = () => {
      const starCount = Math.floor(window.innerWidth / 8); // Responsive star count
      
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const colors = ['#ffffff', '#f1f1f1', '#e1e1ff', '#d4f1f9', '#e1f6ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const velocity = Math.random() * 0.05;
        const alpha = Math.random() * 0.8 + 0.2;
        const rotation = Math.random() * Math.PI * 2;

        stars.push({ x, y, radius, color, velocity, alpha, rotation });
      }
    };

    createStars();

    // Animation
    let lastTime = 0;
    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach(star => {
        // Update star position
        star.y += star.velocity * deltaTime;
        star.rotation += 0.001 * deltaTime;
        star.alpha = 0.2 + (Math.sin(timestamp * 0.001 + star.x) + 1) * 0.4;

        // Reset star if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Draw star
        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(star.rotation);
        ctx.globalAlpha = star.alpha;
        
        // Draw a star shape
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const outerRadius = star.radius * 2;
          const innerRadius = star.radius;
          const outerX = Math.cos(((i * 2 * Math.PI) / 5) - Math.PI / 2) * outerRadius;
          const outerY = Math.sin(((i * 2 * Math.PI) / 5) - Math.PI / 2) * outerRadius;
          const innerX = Math.cos((((i * 2) + 1) * Math.PI / 5) - Math.PI / 2) * innerRadius;
          const innerY = Math.sin((((i * 2) + 1) * Math.PI / 5) - Math.PI / 2) * innerRadius;
          
          if (i === 0) {
            ctx.moveTo(outerX, outerY);
          } else {
            ctx.lineTo(outerX, outerY);
          }
          
          ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        
        // Fill with gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, star.radius * 2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-[70vh] -z-10 opacity-60"
    />
  );
};

export default StarBackground;
