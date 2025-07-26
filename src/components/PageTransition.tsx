
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

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
    // Réduire le temps de chargement pour une expérience plus fluide
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Réinitialiser la position de défilement lors des changements de route
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Jouer un son lors du chargement de la page
  useEffect(() => {
    if (!showLoader) {
      try {
        const audio = new Audio('/sounds/swoosh.mp3');
        audio.volume = 0.2;
        audio.play();
      } catch (error) {
        console.error('Could not play sound:', error);
      }
    }
  }, [showLoader]);
  
  const pageVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Courbe d'accélération style Apple
        when: 'beforeChildren',
        staggerChildren: 0.12,
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        when: 'afterChildren',
        staggerChildren: 0.08,
        staggerDirection: -1,
      }
    }
  };
  
  const loaderVariants = {
    hidden: { scale: 1.05, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: { 
      scale: 0.95, 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };
  
  const progressVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: '100%',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };
  
  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader ? (
          <motion.div
            key="loader"
            className="fixed inset-0 flex flex-col items-center justify-center bg-audio-dark z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={loaderVariants}
          >
            <div className="relative w-12 h-12 mb-6">
              <div className="absolute inset-0 bg-gradient-audio rounded-full animate-pulse-soft"></div>
              <div className="absolute inset-2 bg-audio-dark rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-audio-light rounded-full"></div>
              </div>
            </div>
            <h2 className="text-xl font-medium mb-5">WeListen</h2>
            <div className="w-40 h-0.5 bg-audio-surface/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-audio rounded-full"
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
          50% { transform: translateY(-8px); }
        }
        
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        
        .glass {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </>
  );
};

export default PageTransition;
