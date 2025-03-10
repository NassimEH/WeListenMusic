
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { playSoundEffect, playSynthBlip } from '@/utils/soundEffects';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className 
}) => {
  const location = useLocation();
  const [isExiting, setIsExiting] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Reset scroll position when route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Play sound on page load
  useEffect(() => {
    if (!showLoader) {
      playSoundEffect('swoosh');
      
      // Play sequential blips for synthwave effect
      const blipSequence = [100, 300, 600];
      blipSequence.forEach((delay) => {
        setTimeout(() => {
          playSynthBlip();
        }, delay);
      });
    }
  }, [showLoader]);
  
  const pageVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Spring-like easing
        when: 'beforeChildren',
        staggerChildren: 0.15,
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "hue-rotate(90deg)",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        when: 'afterChildren',
        staggerChildren: 0.1,
        staggerDirection: -1,
      }
    }
  };
  
  const loaderVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      filter: "hue-rotate(90deg)",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };
  
  const progressVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: '100%',
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };
  
  // Synthwave grid animation for loader
  const gridVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 0.3, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 1.2,
      transition: { duration: 0.5, ease: "easeIn" }
    }
  };
  
  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader ? (
          <motion.div
            key="loader"
            className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={loaderVariants}
          >
            {/* Animated grid background */}
            <motion.div 
              className="absolute inset-0 bg-[size:50px_50px] bg-synthwave-grid opacity-30"
              variants={gridVariants}
              style={{
                backgroundSize: "40px 40px",
                backgroundPosition: "center",
              }}
            />
            
            {/* Synthwave sun */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-72 h-72 rounded-full bg-gradient-radial from-audio-synthwave-pink via-audio-synthwave-purple to-transparent opacity-50"></div>
            </motion.div>
            
            <div className="relative w-16 h-16 mb-8">
              <div className="absolute inset-0 bg-gradient-synthwave rounded-full animate-pulse-soft shadow-neon-pink"></div>
              <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-audio-light rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-synthwave bg-clip-text animate-hue-rotate">WeListen</h2>
            <div className="w-48 h-1 bg-audio-surface/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-synthwave rounded-full"
                variants={progressVariants}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={location.pathname}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className={cn("min-h-screen", className)}
            onAnimationStart={() => setIsExiting(true)}
            onAnimationComplete={() => setIsExiting(false)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes hue-rotate {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};

export default PageTransition;
