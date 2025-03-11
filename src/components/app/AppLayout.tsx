
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { userRole } = useApp();
  
  const goBack = () => {
    navigate(-1);
  };
  
  const switchRole = () => {
    if (userRole === 'consumer') {
      navigate('/app/creator');
    } else if (userRole === 'creator') {
      navigate('/app/consumer');
    } else {
      navigate('/app');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-audio-dark">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-6 relative">
          {/* Navigation minimaliste */}
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center py-4 mb-4"
          >
            <button 
              onClick={goBack}
              className="flex items-center gap-2 text-audio-light/70 hover:text-audio-light transition-colors group backdrop-blur-sm bg-transparent hover:bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-xs font-medium">Retour</span>
            </button>
            
            <button 
              onClick={switchRole}
              className="text-xs border border-audio-accent/30 text-audio-accent hover:text-audio-accent-light transition-colors rounded-full px-3 py-1.5 backdrop-blur-sm bg-transparent hover:bg-audio-accent/5"
            >
              {userRole === 'consumer' ? 'Passer en mode Créateur' : 'Passer en mode Auditeur'}
            </button>
          </motion.div>
          
          {children}
        </div>
      </main>
      
      {/* Synthwave neon light effect */}
      <div className="fixed bottom-0 left-0 right-0 h-[70px] pointer-events-none overflow-hidden opacity-40">
        <div className="absolute bottom-0 left-[-10%] right-[-10%] h-[300px] bg-gradient-to-t from-purple-500/10 via-audio-accent/5 to-transparent rounded-[100%_100%_0_0]"></div>
        <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-audio-accent/30 to-transparent"></div>
        <div className="absolute bottom-3 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AppLayout;
