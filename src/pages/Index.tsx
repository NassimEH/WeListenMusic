
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AlbumGrid from '@/components/AlbumGrid';
import AudioPlayer from '@/components/AudioPlayer';
import PageTransition from '@/components/PageTransition';
import ArtistsSection from '@/components/ArtistsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

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
          <ArtistsSection />
          <AlbumGrid />
          
          {/* Featured Section */}
          <section className="relative py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-audio-dark via-audio-dark/95 to-audio-dark"
              ></div>
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1501608593477-a5315893535c?q=80&w=1080&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
            </div>
            
            <div className="container max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="md:w-1/2">
                  <span className="px-3 py-1 text-xs font-medium rounded-full glass-accent text-audio-accent inline-block mb-4">
                    Artiste du mois
                  </span>
                  <h2 className="text-4xl font-bold mb-6">Découvrez Booba</h2>
                  <p className="text-audio-light/80 mb-6 text-balance">
                    Figure emblématique du rap français, Booba a révolutionné le genre avec son style unique. Des sonorités futuristes aux lyrics incisifs, découvrez l'univers du Duc de Boulogne.
                  </p>
                  <button className="px-8 py-3 bg-gradient-audio rounded-full font-medium hover-scale shadow-neon">
                    Écouter maintenant
                  </button>
                </div>
                
                <div className="md:w-1/2 flex justify-end">
                  <div className="relative w-full max-w-md">
                    <img 
                      src="https://images.unsplash.com/photo-1501608593477-a5315893535c?q=80&w=500&auto=format&fit=crop" 
                      alt="Booba" 
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
                    
                    {/* Interactive light effects */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-[20%] left-[30%] w-20 h-20 rounded-full bg-audio-accent/20 blur-xl animate-pulse-soft"></div>
                      <div className="absolute bottom-[30%] right-[20%] w-16 h-16 rounded-full bg-purple-500/30 blur-xl animate-pulse-soft [animation-delay:1s]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Testimonials */}
          <TestimonialsSection />
          
          {/* Newsletter */}
          <section id="newsletter" className="py-20 px-6 glass border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-audio-accent/40"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animation: 'float 6s ease-in-out infinite'
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="container max-w-7xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Rejoignez notre communauté</h2>
              <p className="text-audio-light/70 mb-10 max-w-2xl mx-auto text-balance">
                Inscrivez-vous à notre newsletter pour recevoir les dernières actualités, les sorties d'albums exclusives et des playlists personnalisées.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="bg-audio-surface border border-white/10 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-audio-accent/50 flex-grow transform transition-transform focus:scale-[1.02]"
                />
                <button className="px-6 py-3 bg-audio-accent hover:bg-audio-accent-light transition-all rounded-full font-medium hover-scale shadow-neon">
                  S'inscrire
                </button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
        
        <AudioPlayer />
      </div>
    </PageTransition>
  );
};

export default Index;
