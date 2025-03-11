
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Music, Mic2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import StarBackground from '@/components/StarBackground';
import { playSoundEffect } from '@/utils/soundEffects';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { setUserRole, userRole } = useApp();

  useEffect(() => {
    // Redirect if user already has a role
    if (userRole === 'consumer') {
      navigate('/app/consumer');
    } else if (userRole === 'creator') {
      navigate('/app/creator');
    }
  }, [userRole, navigate]);

  const handleRoleSelect = (role: 'consumer' | 'creator') => {
    playSoundEffect('click');
    setUserRole(role);
    navigate(`/app/${role}`);
  };

  const handleBack = () => {
    playSoundEffect('click');
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-audio-dark flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-audio-dark via-audio-dark to-black opacity-90 z-0"></div>
      
      <StarBackground intensity={3} speed={0.8} />
      
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-audio-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute top-6 left-6 text-audio-light/70 hover:text-white flex items-center gap-2 z-50"
        onClick={handleBack}
        onMouseEnter={() => playSoundEffect('hover')}
      >
        <ArrowLeft size={20} />
        <span>Retour</span>
      </motion.button>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 container px-6"
      >
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-audio"
          >
            Bienvenue sur WeListen
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-audio-light/80 max-w-2xl mx-auto"
          >
            Choisissez votre expérience pour profiter pleinement de la plateforme
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            className="bg-audio-surface/20 backdrop-blur-sm border border-white/5 rounded-xl p-8 text-center cursor-pointer hover:bg-audio-surface/30 transition-all"
            onClick={() => handleRoleSelect('consumer')}
          >
            <div className="w-20 h-20 mx-auto bg-gradient-audio rounded-full flex items-center justify-center mb-6 shadow-neon">
              <Music size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Auditeur</h3>
            <p className="text-audio-light/70 mb-6">
              Découvrez de nouvelles musiques, créez des playlists et profitez d'une expérience d'écoute personnalisée.
            </p>
            <div className="py-2 px-4 rounded-full bg-audio-accent inline-block font-medium text-white">
              Commencer
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            className="bg-audio-surface/20 backdrop-blur-sm border border-white/5 rounded-xl p-8 text-center cursor-pointer hover:bg-audio-surface/30 transition-all"
            onClick={() => handleRoleSelect('creator')}
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-neon">
              <Mic2 size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Créateur</h3>
            <p className="text-audio-light/70 mb-6">
              Partagez votre musique avec le monde, suivez vos statistiques et connectez-vous avec vos fans.
            </p>
            <div className="py-2 px-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 inline-block font-medium text-white">
              Commencer
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelection;
