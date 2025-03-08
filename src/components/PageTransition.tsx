
import React, { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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
      <motion.div
        className="fixed inset-0 z-50 bg-audio-dark pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ 
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
        onAnimationComplete={() => {
          document.body.style.overflow = 'auto';
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ 
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-4xl font-bold flex items-center gap-2"
          >
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-audio rounded-full"></div>
              <div className="absolute inset-2 bg-audio-dark rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-audio-light rounded-full"></div>
              </div>
            </div>
            <span className="text-white">WeListen</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PageTransition;
