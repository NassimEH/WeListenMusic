
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AlbumGrid from '@/components/AlbumGrid';
import AudioPlayer from '@/components/AudioPlayer';
import PageTransition from '@/components/PageTransition';
import AuthorSection from '@/components/AuthorSection';

const Index = () => {
  // Un effet pour ajouter une classe dark au body
  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-audio-dark text-audio-light">
        <Header />
        <main>
          <HeroSection />
          <AlbumGrid />
          
          {/* Featured Section */}
          <section className="relative py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-audio-dark via-audio-dark/95 to-audio-dark"
              ></div>
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1080&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
            </div>
            
            <div className="container max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="md:w-1/2">
                  <span className="px-3 py-1 text-xs font-medium rounded-full glass-accent text-audio-accent inline-block mb-4">
                    Artiste du mois
                  </span>
                  <h2 className="text-4xl font-bold mb-6">Découvrez Brent Faiyaz</h2>
                  <p className="text-audio-light/80 mb-6 text-balance">
                    Avec sa voix unique et son style distinctif, Brent Faiyaz repousse les limites du R&B moderne. Son dernier album "Wasteland" a déjà conquis des millions d'auditeurs à travers le monde.
                  </p>
                  <button className="px-8 py-3 bg-gradient-audio rounded-full font-medium hover-scale shadow-neon">
                    Écouter maintenant
                  </button>
                </div>
                
                <div className="md:w-1/2 flex justify-end">
                  <div className="relative w-full max-w-md">
                    <img 
                      src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&auto=format&fit=crop" 
                      alt="Brent Faiyaz" 
                      className="rounded-lg shadow-lg w-full object-cover aspect-square md:aspect-[3/4]"
                    />
                    <div className="absolute -bottom-4 -right-4 glass rounded-xl p-4 shadow-lg animate-float">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-bold text-audio-accent">#1</span>
                        <div>
                          <p className="text-sm text-audio-light/70">Top Charts</p>
                          <p className="font-medium">Cette semaine</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Authors Section */}
          <AuthorSection />
          
          {/* Newsletter */}
          <section className="py-20 px-6 glass border-t border-white/5">
            <div className="container max-w-7xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Rejoignez notre communauté</h2>
              <p className="text-audio-light/70 mb-10 max-w-2xl mx-auto text-balance">
                Inscrivez-vous à notre newsletter pour recevoir les dernières actualités, les sorties d'albums exclusives et des playlists personnalisées.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="bg-audio-surface border border-white/10 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-audio-accent/50 flex-grow"
                />
                <button className="px-6 py-3 bg-audio-accent hover:bg-audio-accent-light transition-colors rounded-full font-medium">
                  S'inscrire
                </button>
              </div>
            </div>
          </section>
        </main>
        
        <footer className="py-10 px-6">
          <div className="container max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-audio-light font-bold text-xl flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-gradient-audio rounded-full"></div>
                  <div className="absolute inset-1 bg-audio-dark rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-audio-light rounded-full"></div>
                  </div>
                </div>
                <span>WeListen</span>
              </div>
              
              <div className="flex gap-6 text-audio-light/70">
                <a href="#" className="hover:text-audio-light transition-colors">À propos</a>
                <a href="#" className="hover:text-audio-light transition-colors">Mentions légales</a>
                <a href="#" className="hover:text-audio-light transition-colors">Contact</a>
              </div>
              
              <p className="text-audio-light/50 text-sm">
                © 2023 WeListen. Tous droits réservés.
              </p>
            </div>
          </div>
        </footer>
        
        <AudioPlayer />
      </div>
    </PageTransition>
  );
};

export default Index;
