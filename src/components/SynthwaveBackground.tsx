
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SynthwaveBackgroundProps {
  variant?: 'grid' | 'sun' | 'mountains';
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

const SynthwaveBackground: React.FC<SynthwaveBackgroundProps> = ({ 
  variant = 'grid',
  intensity = 'medium',
  animated = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Canvas animation for grid variant
  useEffect(() => {
    if (variant !== 'grid' || !animated || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Grid settings
    const GRID_SIZE = intensity === 'low' ? 80 : intensity === 'medium' ? 60 : 40;
    const PERSPECTIVE = intensity === 'low' ? 0.5 : intensity === 'medium' ? 0.8 : 1.2;
    const GRID_COLOR = '#9b87f5';
    
    // Animation
    let offset = 0;
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Move grid
      offset += 0.5;
      if (offset > GRID_SIZE) offset = 0;
      
      // Horizon position (middle of the canvas)
      const horizon = canvas.height * 0.5;
      
      // Draw perspective grid
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 1;
      
      // Horizontal lines
      for (let y = horizon; y < horizon + 500; y += GRID_SIZE) {
        const perspectiveScale = (y - horizon) * 0.01 * PERSPECTIVE;
        const lineWidth = Math.min(3, 0.5 + perspectiveScale);
        
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, horizon - (y - horizon));
        ctx.lineTo(canvas.width, horizon - (y - horizon));
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < canvas.width + GRID_SIZE; x += GRID_SIZE) {
        const adjustedX = x - offset;
        
        // Draw line from horizon to bottom
        ctx.beginPath();
        ctx.moveTo(adjustedX, horizon);
        ctx.lineTo(canvas.width/2, canvas.height);
        ctx.stroke();
        
        // Draw line from horizon to top
        ctx.beginPath();
        ctx.moveTo(adjustedX, horizon);
        ctx.lineTo(canvas.width/2, 0);
        ctx.stroke();
      }
      
      // Draw sun
      const sunGradient = ctx.createRadialGradient(
        canvas.width/2, horizon, 0,
        canvas.width/2, horizon, canvas.width * 0.3
      );
      
      sunGradient.addColorStop(0, 'rgba(249, 115, 22, 0.8)');
      sunGradient.addColorStop(0.2, 'rgba(155, 135, 245, 0.5)');
      sunGradient.addColorStop(0.4, 'rgba(51, 195, 240, 0.2)');
      sunGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(canvas.width/2, horizon, canvas.width * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [variant, intensity, animated]);
  
  // Render different background based on variant
  if (variant === 'grid') {
    return (
      <>
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 z-[-1] bg-black opacity-70"
        />
        <div className="fixed inset-0 z-[-2] bg-gradient-to-b from-black via-black to-audio-synthwave-purple/30"></div>
      </>
    );
  }
  
  if (variant === 'sun') {
    return (
      <div className="fixed inset-0 z-[-1] bg-black">
        <div className="absolute inset-0 bg-synthwave-sun opacity-70"></div>
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-audio-synthwave-purple to-transparent"
          initial={{ y: 48 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div 
          className="absolute inset-x-0 h-[1px] bottom-56 bg-audio-synthwave-pink opacity-70 shadow-neon-pink"
        />
      </div>
    );
  }
  
  if (variant === 'mountains') {
    return (
      <div className="fixed inset-0 z-[-1] bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-audio-synthwave-blue/10 to-audio-synthwave-purple/30"></div>
        
        {/* Sun */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-radial from-audio-synthwave-pink via-audio-synthwave-purple to-transparent opacity-70 animate-pulse-soft"></div>
        
        {/* Mountains */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="#9b87f5" 
            fillOpacity="0.3"
            d="M0,320L48,288C96,256,192,192,288,186.7C384,181,480,235,576,250.7C672,267,768,245,864,224C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path 
            fill="#0FA0CE" 
            fillOpacity="0.2"
            d="M0,320L48,277.3C96,235,192,149,288,117.3C384,85,480,107,576,133.3C672,160,768,192,864,181.3C960,171,1056,117,1152,106.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path 
            fill="#F97316" 
            fillOpacity="0.1"
            d="M0,320L48,298.7C96,277,192,235,288,224C384,213,480,235,576,245.3C672,256,768,256,864,261.3C960,267,1056,277,1152,266.7C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[size:50px_50px] bg-synthwave-grid opacity-20"></div>
      </div>
    );
  }
  
  return null;
};

export default SynthwaveBackground;
