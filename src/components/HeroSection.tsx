
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Play, Headphones } from 'lucide-react';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Make canvas responsive
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    const particles: any[] = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    // Animation
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(14, 165, 233, 0.4)';
      
      particles.forEach(particle => {
        // Update
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundaries
        if (particle.x > canvas.width) particle.x = 0;
        else if (particle.x < 0) particle.x = canvas.width;
        
        if (particle.y > canvas.height) particle.y = 0;
        else if (particle.y < 0) particle.y = canvas.height;
        
        // Draw
        ctx.beginPath();
        ctx.globalAlpha = particle.opacity;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-audio-dark via-audio-dark to-black opacity-90 z-0"></div>
      
      {/* Particle background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10"
      />
      
      {/* Content */}
      <div className="container relative z-20 px-6 py-20 mt-16 md:mt-0">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-block mb-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full glass-accent text-audio-accent">
              Nouvelle expérience audio
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter animate-slide-down">
            <span className="block">Explorez</span>
            <span className="bg-clip-text text-transparent bg-gradient-audio">le monde sonore</span>
          </h1>
          
          <p className="text-lg md:text-xl text-audio-light/80 mb-10 animate-fade-in [animation-delay:300ms] text-balance">
            Découvrez une nouvelle façon d'écouter de la musique avec une expérience immersive et personnalisée qui vous transporte dans l'univers de vos artistes préférés.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in [animation-delay:600ms]">
            <button className="px-8 py-4 bg-gradient-audio rounded-full font-medium hover-scale text-white flex items-center justify-center gap-2 shadow-neon">
              <Play size={20} />
              Commencer
            </button>
            <button className="px-8 py-4 glass rounded-full font-medium hover-scale flex items-center justify-center gap-2">
              <Headphones size={20} />
              Explorer les tendances
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-audio-accent/20 rounded-full blur-3xl z-10 animate-pulse-soft"></div>
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-audio-accent/10 rounded-full blur-3xl z-10 animate-pulse-soft [animation-delay:1s]"></div>
    </section>
  );
};

export default HeroSection;
