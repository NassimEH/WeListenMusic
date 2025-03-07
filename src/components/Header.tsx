
import React, { useState, useEffect } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-spring',
        isScrolled ? 'glass' : 'bg-transparent'
      )}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-audio-light font-bold text-xl flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-audio rounded-full animate-pulse-soft"></div>
                <div className="absolute inset-1 bg-audio-dark rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-audio-light rounded-full"></div>
                </div>
              </div>
              <span className="animate-fade-in">AudioSphere</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#discover" 
              className="text-audio-light/80 hover:text-audio-light transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-audio-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              Discover
            </a>
            <a 
              href="#trending" 
              className="text-audio-light/80 hover:text-audio-light transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-audio-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              Trending
            </a>
            <a 
              href="#playlists" 
              className="text-audio-light/80 hover:text-audio-light transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-audio-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              Playlists
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-audio-light/80 hover:text-audio-light rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 text-audio-light/80 hover:text-audio-light rounded-full transition-colors">
              <User size={20} />
            </button>
            <button 
              className="md:hidden p-2 text-audio-light/80 hover:text-audio-light rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "absolute top-full left-0 right-0 glass md:hidden overflow-hidden transition-all duration-300 ease-spring",
          isMenuOpen ? "max-h-[300px] py-4" : "max-h-0 py-0"
        )}
      >
        <nav className="flex flex-col space-y-4 px-6">
          <a 
            href="#discover" 
            className="text-audio-light/80 hover:text-audio-light py-2 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Discover
          </a>
          <a 
            href="#trending" 
            className="text-audio-light/80 hover:text-audio-light py-2 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Trending
          </a>
          <a 
            href="#playlists" 
            className="text-audio-light/80 hover:text-audio-light py-2 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Playlists
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
