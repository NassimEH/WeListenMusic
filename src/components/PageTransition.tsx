
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

// Nous devons simuler framer-motion car nous ne pouvons pas l'installer
// En production réelle, vous devriez installer framer-motion
const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
};

export default PageTransition;
