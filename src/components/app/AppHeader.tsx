
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, User, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { playSoundEffect } from '@/utils/soundEffects';

interface AppHeaderProps {
  title?: string;
  isCreator?: boolean;
}

const AppHeader = ({ title = 'WeListen', isCreator = false }: AppHeaderProps) => {
  const navigate = useNavigate();
  const { setUserRole } = useApp();
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    playSoundEffect('pop');
    
    if (!showSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  };
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    playSoundEffect('pop');
  };
  
  // Handle clicks outside user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    playSoundEffect('click');
    setUserRole(null);
    navigate('/');
  };
  
  const switchRole = () => {
    playSoundEffect('click');
    setUserRole(isCreator ? 'consumer' : 'creator');
    navigate(isCreator ? '/app/consumer' : '/app/creator');
  };
  
  return (
    <header className="bg-black/10 backdrop-blur-lg border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-audio">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Animated Search */}
        <div className="relative">
          <button 
            onClick={toggleSearch}
            className={cn(
              "p-2 rounded-full transition-colors",
              showSearch ? "bg-audio-accent text-white" : "hover:bg-audio-surface/30 text-audio-light/80"
            )}
            aria-label="Search"
          >
            {showSearch ? <X size={20} /> : <Search size={20} />}
          </button>
          
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-0 right-12 overflow-hidden"
              >
                <div className="relative h-full">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Rechercher artistes, titres, albums..."
                    className="w-full h-full py-2 px-4 bg-audio-surface/50 backdrop-blur-lg border border-white/10 rounded-full outline-none focus:ring-2 focus:ring-audio-accent/50"
                  />
                  <Search size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-audio-light/60" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Notifications */}
        <button 
          className="p-2 rounded-full hover:bg-audio-surface/30 transition-colors text-audio-light/80"
          aria-label="Notifications"
          onClick={() => playSoundEffect('pop')}
        >
          <Bell size={20} />
        </button>
        
        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button 
            onClick={toggleUserMenu}
            className="flex items-center gap-2 rounded-full pl-2 pr-3 py-1.5 hover:bg-audio-surface/30 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-audio flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm font-medium">{isCreator ? 'Créateur' : 'Utilisateur'}</span>
            <ChevronDown size={14} className={cn(
              "transition-transform", 
              showUserMenu ? "rotate-180" : ""
            )} />
          </button>
          
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 rounded-lg bg-audio-surface/80 backdrop-blur-lg border border-white/10 shadow-xl overflow-hidden z-50"
              >
                <div className="py-1">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm hover:bg-audio-surface/50 transition-colors"
                    onClick={() => playSoundEffect('hover')}
                  >
                    Profil
                  </a>
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm hover:bg-audio-surface/50 transition-colors"
                    onClick={() => playSoundEffect('hover')}
                  >
                    Compte
                  </a>
                  <button 
                    onClick={switchRole}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-audio-surface/50 transition-colors"
                  >
                    Passer en mode {isCreator ? 'Auditeur' : 'Créateur'}
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-audio-surface/50 transition-colors"
                  >
                    Déconnexion
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
