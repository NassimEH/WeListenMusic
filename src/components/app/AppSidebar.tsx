
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, PlusCircle, Heart, Clock, Mic2, BarChart2, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import { playSoundEffect } from '@/utils/soundEffects';

interface AppSidebarProps {
  isCreator?: boolean;
}

const AppSidebar = ({ isCreator = false }: AppSidebarProps) => {
  const location = useLocation();
  const { playlists } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    playSoundEffect('pop');
    setCollapsed(!collapsed);
  };
  
  const menuItems = isCreator 
    ? [
        { icon: Home, label: 'Accueil', path: '/app/creator' },
        { icon: Mic2, label: 'Mes Uploads', path: '/app/creator/uploads' },
        { icon: BarChart2, label: 'Statistiques', path: '/app/creator/stats' },
        { icon: Users, label: 'Communauté', path: '/app/creator/community' },
      ]
    : [
        { icon: Home, label: 'Accueil', path: '/app/consumer' },
        { icon: Search, label: 'Recherche', path: '/app/consumer/search' },
        { icon: Library, label: 'Bibliothèque', path: '/app/consumer/library' },
        { icon: Heart, label: 'Titres likés', path: '/app/consumer/liked' },
      ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className={cn(
      "bg-black/40 backdrop-blur-lg border-r border-white/5 flex flex-col transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="text-audio-light font-bold flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-audio rounded-full animate-pulse-soft"></div>
              <div className="absolute inset-1 bg-audio-dark rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-audio-light rounded-full"></div>
              </div>
            </div>
            <span>WeListen</span>
          </div>
        )}
        
        <button 
          onClick={toggleCollapse} 
          className="ml-auto p-2 rounded-full hover:bg-audio-surface/30 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className="mt-4 flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-audio-surface/30",
                  isActive(item.path) ? "bg-audio-surface/40 text-audio-accent" : "text-audio-light/80",
                )}
                onClick={() => playSoundEffect('hover')}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
        
        {!isCreator && !collapsed && (
          <div className="mt-8 px-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-audio-light/60">Playlists</h3>
              <button 
                className="p-1.5 rounded-full hover:bg-audio-surface/30 transition-colors text-audio-light/60 hover:text-audio-light"
                aria-label="Create playlist"
                onClick={() => playSoundEffect('click')}
              >
                <PlusCircle size={16} />
              </button>
            </div>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {playlists.map((playlist) => (
                <li key={playlist.id}>
                  <a 
                    href="#" 
                    className="block py-2 px-2 rounded-lg text-audio-light/70 hover:text-audio-light hover:bg-audio-surface/20 transition-colors text-sm truncate"
                    onClick={() => playSoundEffect('hover')}
                  >
                    {playlist.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      
      <div className="mt-auto border-t border-white/5 p-4">
        <Link
          to="/app/settings"
          className="flex items-center gap-3 text-audio-light/70 hover:text-audio-light transition-colors"
          onClick={() => playSoundEffect('hover')}
        >
          <Settings size={20} />
          {!collapsed && <span>Paramètres</span>}
        </Link>
      </div>
    </div>
  );
};

export default AppSidebar;
