
import React from 'react';
import { cn } from '@/lib/utils';
import { Facebook, Twitter, Instagram, Youtube, Headphones, Mail, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-audio-dark to-audio-dark/95"></div>
      </div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-audio-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-4">
            <div className="text-audio-light font-medium text-lg flex items-center gap-2 mb-4">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 bg-gradient-audio rounded-full animate-pulse-soft"></div>
                <div className="absolute inset-1 bg-audio-dark rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-audio-light rounded-full"></div>
                </div>
              </div>
              <span>WeListen</span>
            </div>
            
            <p className="text-audio-light/60 mb-6 max-w-md text-sm">
              Une plateforme de streaming audio révolutionnaire offrant une expérience d'écoute immersive et personnalisée.
            </p>
            
            <div className="flex gap-3">
              <a 
                href="#"
                className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-audio-accent/20 transition-colors hover-scale"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a 
                href="#"
                className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-audio-accent/20 transition-colors hover-scale"
                aria-label="Twitter"
              >
                <Twitter size={14} />
              </a>
              <a 
                href="#"
                className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-audio-accent/20 transition-colors hover-scale"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a 
                href="#"
                className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-audio-accent/20 transition-colors hover-scale"
                aria-label="Youtube"
              >
                <Youtube size={14} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-audio-light/70">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-audio-light/70 hover:text-audio-light transition-colors inline-flex items-center gap-1 group">
                  <span>Accueil</span>
                  <div className="w-0 h-px bg-audio-accent group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
              <li>
                <a href="#discover" className="text-audio-light/70 hover:text-audio-light transition-colors inline-flex items-center gap-1 group">
                  <span>Découvrir</span>
                  <div className="w-0 h-px bg-audio-accent group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
              <li>
                <a href="#trending" className="text-audio-light/70 hover:text-audio-light transition-colors inline-flex items-center gap-1 group">
                  <span>Tendances</span>
                  <div className="w-0 h-px bg-audio-accent group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-audio-light/70 hover:text-audio-light transition-colors inline-flex items-center gap-1 group">
                  <span>Témoignages</span>
                  <div className="w-0 h-px bg-audio-accent group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-audio-light/70">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-audio-light/70 hover:text-audio-light transition-colors inline-flex items-center gap-1 group">
                  <span>Conditions d'utilisation</span>
                  <div className="w-0 h-px bg-audio-accent group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
              <li>
                <a href="#" className="text-audio-light/70 hover:text-audio-light transition-colors inline-flex items-center gap-1 group">
                  <span>Politique de confidentialité</span>
                  <div className="w-0 h-px bg-audio-accent group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
              <li>
                <a href="#" className="text-audio-light/70 hover:text-audio-light transition-colors inline-flex items-center gap-1 group">
                  <span>Cookies</span>
                  <div className="w-0 h-px bg-audio-accent group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
              <li>
                <a href="#" className="text-audio-light/70 hover:text-audio-light transition-colors inline-flex items-center gap-1 group">
                  <span>RGPD</span>
                  <div className="w-0 h-px bg-audio-accent group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-audio-light/70">Newsletter</h3>
            <p className="text-audio-light/70 mb-4 text-sm">
              Recevez nos actualités et offres spéciales directement dans votre boîte mail.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-audio-surface/30 border border-white/10 px-3 py-2 rounded-l-full focus:outline-none focus:ring-1 focus:ring-audio-accent/50 flex-grow text-sm"
              />
              <button className="px-4 py-2 bg-audio-accent hover:bg-audio-accent-light transition-colors rounded-r-full font-medium text-sm">
                S'inscrire
              </button>
            </div>
            
            <div className="flex items-center gap-2 mt-5">
              <div className="w-8 h-8 rounded-full glass flex items-center justify-center bg-audio-accent/10">
                <Headphones size={14} className="text-audio-accent" />
              </div>
              <div>
                <p className="text-xs text-audio-light/60">Support client</p>
                <p className="font-medium text-sm">support@welisten.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-audio-light/50 text-xs">
            © 2025 WeListen. Tous droits réservés.
            Étudiants de Télécom SudParis, promotion LIMA 2024/2025
          </p>
          
          <div className="flex gap-5 text-audio-light/70 text-xs">
            <a href="#" className="hover:text-audio-light transition-colors">FAQ</a>
            <a href="#" className="hover:text-audio-light transition-colors">Contact</a>
            <a href="#" className="hover:text-audio-light transition-colors">Carrières</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
