
import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Menu, X, Home, Music, User, Heart, PlayCircle, Settings, LogOut } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { userRole, setUserRole } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const goBack = () => {
    navigate(-1);
  };
  
  const switchRole = () => {
    if (userRole === 'consumer') {
      setUserRole('creator');
      navigate('/app/creator');
    } else if (userRole === 'creator') {
      setUserRole('consumer');
      navigate('/app/consumer');
    } else {
      navigate('/app');
    }
  };

  const menuItems = userRole === 'creator' 
    ? [
        { icon: Home, label: 'Accueil', path: '/app/creator' },
        { icon: Music, label: 'Vos titres', path: '#' },
        { icon: User, label: 'Profil', path: '#' },
        { icon: Settings, label: 'Paramètres', path: '#' }
      ]
    : [
        { icon: Home, label: 'Accueil', path: '/app/consumer' },
        { icon: Heart, label: 'Favoris', path: '#' },
        { icon: PlayCircle, label: 'Playlists', path: '#' },
        { icon: User, label: 'Profil', path: '#' },
        { icon: Settings, label: 'Paramètres', path: '#' }
      ];
  
  return (
    <div className="min-h-screen flex flex-col bg-audio-dark">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-6 relative">
          {/* NAVIGATION: Barre de navigation supérieure */}
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center py-4 mb-4"
          >
            <div className="flex items-center gap-3">
              <button 
                onClick={goBack}
                className="flex items-center gap-2 text-audio-light/70 hover:text-audio-light transition-colors group backdrop-blur-sm bg-transparent hover:bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="text-xs font-medium">Retour</span>
              </button>
              
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 text-audio-light/70 hover:text-audio-light transition-colors backdrop-blur-sm bg-transparent hover:bg-white/5 border border-white/10 rounded-full w-8 h-8 justify-center"
              >
                <Menu size={14} />
              </button>
            </div>
            
            <button 
              onClick={switchRole}
              className="text-xs border border-audio-accent/30 text-audio-accent hover:text-audio-accent-light transition-colors rounded-full px-3 py-1.5 backdrop-blur-sm bg-transparent hover:bg-audio-accent/10"
            >
              {userRole === 'creator' ? 'Passer en mode Auditeur' : 'Passer en mode Créateur'}
            </button>
          </motion.div>
          
          {children}
        </div>
      </main>
      
      {/* EFFET: Effet lumineux synthétique */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-[-10%] right-[-10%] h-[500px] bg-gradient-to-t from-purple-500/10 via-audio-accent/5 to-transparent rounded-[100%_100%_0_0] animate-pulse-soft"></div>
        <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-audio-accent/50 to-transparent animate-pulse-soft"></div>
        <div className="absolute bottom-3 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-pulse-soft"></div>
        <div className="absolute bottom-6 w-full h-[1px] bg-gradient-to-r from-transparent via-audio-accent/20 to-transparent animate-pulse-soft"></div>
      </div>
      
      {/* SIDEBAR: Barre latérale inspirée d'Apple */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setSidebarOpen(false)}
            />
            
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 h-full w-64 bg-transparent backdrop-blur-xl border-r border-white/10 z-50 p-5"
            >
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="text-audio-light font-semibold text-lg">audio.io</Link>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="text-audio-light/60 hover:text-audio-light w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <nav className="space-y-1">
                {menuItems.map((item, index) => (
                  <Link 
                    key={index}
                    to={item.path}
                    className="flex items-center gap-3 text-audio-light/70 hover:text-audio-light py-2 px-3 rounded-lg hover:bg-white/5 transition-colors text-sm"
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
              
              <div className="absolute bottom-5 left-0 right-0 px-5">
                <div className="pt-5 border-t border-white/10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-sm"
                    onClick={() => navigate('/')}
                  >
                    <LogOut size={14} className="mr-2" />
                    Déconnexion
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* EFFET: Effet lumineux synthwave amélioré */}
      <div className="fixed bottom-0 left-0 right-0 h-[70px] pointer-events-none overflow-hidden opacity-40">
        <div className="absolute bottom-0 left-[-10%] right-[-10%] h-[300px] bg-gradient-to-t from-purple-500/10 via-audio-accent/5 to-transparent rounded-[100%_100%_0_0] animate-pulse-soft"></div>
        <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-audio-accent/50 to-transparent animate-pulse-soft"></div>
        <div className="absolute bottom-3 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-pulse-soft"></div>
        <div className="absolute bottom-6 w-full h-[1px] bg-gradient-to-r from-transparent via-audio-accent/20 to-transparent animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AppLayout;
