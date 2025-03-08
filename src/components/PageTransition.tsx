
import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playPopSound, playSwooshSound } from '@/utils/soundEffects';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // Play sound when animation starts
    playSwooshSound();
    
    // Small delay to ensure smooth animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Hide logo after animation
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(logoTimer);
    };
  }, []);

  // Handle interaction with the logo
  const handleLogoClick = () => {
    playPopSound();
    // Add a visual effect when clicking on the logo
    const logoElement = document.querySelector('.logo-element');
    if (logoElement) {
      logoElement.classList.add('pulse-effect');
      setTimeout(() => {
        logoElement.classList.remove('pulse-effect');
      }, 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 15 
      }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          delay: 0.3, 
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
      
      {/* Initial page load animation overlay */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            className="fixed inset-0 z-50 bg-audio-dark pointer-events-none flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            onAnimationComplete={() => {
              document.body.style.overflow = 'auto';
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ 
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-4xl font-bold flex items-center gap-3 pointer-events-auto cursor-pointer logo-element"
              onClick={handleLogoClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-14 h-14">
                <motion.div 
                  className="absolute inset-0 bg-gradient-audio rounded-full"
                  animate={{ 
                    rotate: 360,
                    boxShadow: [
                      "0 0 15px rgba(14, 165, 233, 0.5)",
                      "0 0 30px rgba(14, 165, 233, 0.7)",
                      "0 0 15px rgba(14, 165, 233, 0.5)"
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-2 bg-audio-dark rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div 
                    className="w-2.5 h-2.5 bg-audio-light rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              </div>
              <motion.span 
                className="text-white tracking-tight"
                animate={{ y: [0, -3, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  ease: "easeInOut" 
                }}
              >
                WeListen
              </motion.span>
            </motion.div>
            
            {/* Animated particles around the logo */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute w-1 h-1 bg-audio-accent rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                    x: [0, (Math.random() - 0.5) * 100],
                    y: [0, (Math.random() - 0.5) * 100]
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add a global styles for the pulse effect */}
      <style jsx global>{`
        .pulse-effect {
          animation: pulse-animation 0.5s cubic-bezier(0.4, 0, 0.6, 1);
        }
        
        @keyframes pulse-animation {
          0% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.2);
            filter: brightness(1.3);
          }
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default PageTransition;
