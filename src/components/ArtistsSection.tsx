
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Play, X, Heart, Share2, Clock, Music2, ChevronLeft, ChevronRight } from 'lucide-react';
import WaveAnimation from './WaveAnimation';

interface ArtistData {
  id: number;
  name: string;
  description: string;
  image: string;
  topTracks: { title: string; duration: string }[];
  backgroundColor: string;
}

const artists: ArtistData[] = [
  {
    id: 1,
    name: "Mme Melis",
    description: "Artiste novatrice aux sonorités électroniques uniques, Mme Melis repousse les frontières de la musique expérimentale avec son approche minimaliste et ses mélodies captivantes.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhMWFRUWFRcYFxcYFxcXGBUaFxgYGBYYFxodHSggHRomHRUXITEhJSkrLi4wGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYBBwj/xABGEAABAwIEAwQGBgcHAwUAAAABAAIDBBEFEiExQVFhBhMicQcyYoGRoRQjQlKx0TNTYnKCksEkQ0SDsfH/xAAbAQEAAgMBAQAAAAAAAAAAAAAAAQIDBAUGB//EADQRAAICAQMCBAQFBAIDAQAAAAABAgMRBCExBRITQVFhIjJxoQaBkbHRFELB4SPwFVJyNP/aAAwDAQACEQMRAD8A9xQAgBACAEAIAQAgBACAEAIAQAgBACAEAIAQAgBACAEAIAQAgBACAEAIAQAgBACAEAIBLngbmyEESbEowNDmPIK8a5MrKxIYpMVzOs7KBwN1eVWFlFI25e5IfiMY2N+gH5qirkyzsihMeJMIJ2t81LqkmFamslfPjL9MtuqyxoXmYXcyyw6uEo2sRuFhsg4MzVzUkTFQyHHOA3QA1wO2qDJ1ACAEAIAQAgBACAEAIAQAgBACAEAIAQHLoCmrMYIdZlrDjz/2WxCjKyzDK3D2K6esLtXEn8FnjWlwYpSbIr5yrqJjbG3O5KSrHYGyHUNcfIEqrcV5lkpPhAaeUbsd/CfyRTh6lXGfoDnHS/w2RY8iX7lhQ17Y2u2DtLX+awzrcmjJCxRTEDFXg3zH43U+CiPGkNGuv6xJPX5K3h44K+I3yS8MrHX0BLeIGvmRyWO2Cx7l6pvO3B1+Nuz3FsvL+qKhY3J/qHnYksxix8Y0O1h/uqOnPBdX+pPhq2ubmvbn081icGngyqaayArY7A5hqnYx3ocfM0EAnU7BQk2WyhxQSCAEAIAQAgBACAEAIAQEarqSzS17hXjHuIbwU1XizzdosOo36rYjSluYZTZVl62MGEbBUlRjGK6no4xNWzCFh9Vu8sn7DBrx32HHRYJ3pbIyxpb5M07thXT/ANxo2UsfCaq8crhzbGNGn4g80hp77t3sjXu1+m0+2cv2GJKbEJf0+K1RP+SW04/kC2o9MWPikc2zrss/BD9WcZhVQ3VmJ4jcfeqi4e9pbY+9TLpkfKRSPXbc7xX3HqXtBikRIzxYi1t7wysbBUgf5b2+Fx438R6LUs0ltW6OjV1SmzHiLHvyv18jQ4Ji9PXRukpS4OjNpoJBaWE8bji24OvTncCK7svEjasp27o8EwFbBrggJFNUZNW6O1VJQ7uS0ZdvAyx3NWwUXuOd5rdRgtkdinvuqOJaMifQU+c3OjRub28lislhGauGXljEkwzXzX10N99dCrKO3BRyw+TQUMpcwE7/AJGy1ZLDNyDyskhVLAgBACAEAIAQAgBACAEAIAQAgBACAEAIAQAgBACAEAIAQAgBACAEAIAQAgBACA//9k=",
    backgroundColor: "#9d4edd",
    topTracks: [
      { title: "Je vais me moucher", duration: "3:24" },
      { title: "J'apprends à conduire !", duration: "4:05" },
      { title: "Hey", duration: "2:58" },
      { title: "Tête d'oeuf", duration: "2:58" },
      { title: "Nassim trop beau", duration: "2:58" },
      { title: "Ouais renoi là", duration: "2:58" }
    ]
  },
  {
    id: 2,
    name: "JustADog",
    description: "Véritable phénomène de la scène rap underground, JustADog se démarque par ses paroles incisives et ses productions avant-gardistes qui mêlent trap et sons organiques.",
    image: "https://play-lh.googleusercontent.com/E6gJ8wL50PJUz3ZBZexhzRzmOeyKKisW5gwDzYqNmaMzc8_0EQdIhf0bBX5wJJlDMa8",
    backgroundColor: "#4361ee",
    topTracks: [
      { title: "Woof Woof", duration: "2:47" },
      { title: "Canine Flow", duration: "3:32" },
      { title: "Unleashed", duration: "3:18" }
    ]
  },
  {
    id: 3,
    name: "Manglon",
    description: "Explorateur sonore aux influences multiples, Manglon fusionne habilement les genres dans ses compositions hypnotiques et envoûtantes, créant un univers musical unique et immersif.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=500&auto=format&fit=crop",
    backgroundColor: "#f77f00",
    topTracks: [
      { title: "Sweet Taste", duration: "3:51" },
      { title: "Honey Loops", duration: "4:22" },
      { title: "Pasta Dream", duration: "3:07" }
    ]
  },
  {
    id: 4,
    name: "Gaëtan",
    description: "Virtuose du piano et producteur visionnaire, Gaëtan mêle sonorités classiques et électroniques pour créer une expérience musicale émouvante et intemporelle.",
    image: "https://images.unsplash.com/photo-1549213783-8284d0336c4f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    backgroundColor: "#2a9d8f",
    topTracks: [
      { title: "Nocturne Électronique", duration: "4:17" },
      { title: "Évasion Mélodique", duration: "3:46" },
      { title: "Rêverie Urbaine", duration: "5:02" }
    ]
  },
  {
    id: 5,
    name: "Chaipa",
    description: "Figure montante du rap français, Chaipa captive par son flow incisif et ses textes authentiques qui dépeignent avec justesse les réalités urbaines contemporaines.",
    image: "https://images.unsplash.com/photo-1526218626217-dc65a29bb444?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
    backgroundColor: "#e63946",
    topTracks: [
      { title: "Réalité Crue", duration: "3:22" },
      { title: "Rues Silencieuses", duration: "2:56" },
      { title: "Horizon Lointain", duration: "4:11" }
    ]
  },
  {
    id: 6,
    name: "O2",
    description: "Duo électro-pop innovant, O2 crée des atmosphères sonores enveloppantes où voix éthérées et productions minimalistes se rencontrent dans un équilibre parfait.",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3",
    backgroundColor: "#457b9d",
    topTracks: [
      { title: "Respiration", duration: "3:44" },
      { title: "Altitude", duration: "4:02" },
      { title: "Profondeur", duration: "3:37" }
    ]
  }
];

interface ArtistModalProps {
  artist: ArtistData | null;
  onClose: () => void;
}

const ArtistModal = ({ artist, onClose }: ArtistModalProps) => {
  if (!artist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      ></div>
      
      <div 
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden glass border border-white/10 animate-scale-in"
        style={{ maxHeight: '90vh' }}
      >
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-70"
            style={{ background: `linear-gradient(to bottom, ${artist.backgroundColor}60, #0A0A0B)` }}
          ></div>
          <img 
            src={artist.image} 
            alt={artist.name}
            className="w-full h-64 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-4xl font-bold mb-2">{artist.name}</h2>
            <div className="flex gap-4 mb-4">
              <button className="px-6 py-2 bg-audio-accent hover:bg-audio-accent-light transition-colors rounded-full font-medium flex items-center gap-2 shadow-neon hover-scale">
                <Play size={18} fill="white" /> Écouter
              </button>
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
                <Heart size={18} />
              </button>
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">À propos</h3>
            <p className="text-audio-light/80">{artist.description}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Titres populaires</h3>
            <div className="space-y-2">
              {artist.topTracks.map((track, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-white/5 transition-colors rounded-lg group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center text-audio-light/60 group-hover:opacity-0 group-hover:hidden">
                      {index + 1}
                    </div>
                    <button className="w-8 h-8 rounded-full bg-audio-accent opacity-0 hidden group-hover:flex group-hover:opacity-100 items-center justify-center transition-all duration-300">
                      <Play size={16} fill="white" />
                    </button>
                    <div>
                      <p className="font-medium">{track.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-audio-light/60 text-sm">{track.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArtistCard = ({ artist }: { artist: ArtistData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <div 
        className="rounded-xl overflow-hidden group transition-all duration-500 hover-scale"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPlaying(false);
        }}
        onClick={() => setShowModal(true)}
      >
        <div className="relative aspect-[4/5]">
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
          />
          
          <div 
            className={cn(
              "absolute inset-0 transition-opacity duration-300 rounded-xl",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            style={{ background: `linear-gradient(to top, ${artist.backgroundColor}E6, transparent)` }}
          ></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className={cn(
              "text-2xl font-bold mb-2 transition-transform duration-500",
              isHovered ? "translate-y-0" : "translate-y-8 opacity-0"
            )}>
              {artist.name}
            </h3>
            
            <div className={cn(
              "flex gap-4 transition-all duration-500",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <button 
                className="w-12 h-12 rounded-full flex items-center justify-center glass border border-white/20 shadow-lg hover:bg-audio-accent transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
              >
                {isPlaying ? (
                  <WaveAnimation className="h-6" />
                ) : (
                  <Play size={24} fill="white" className="ml-1" />
                )}
              </button>
              
              <button 
                className="w-10 h-10 rounded-full flex items-center justify-center glass border border-white/20 hover:bg-white/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Music2 size={18} />
              </button>
            </div>
          </div>
          
          {/* Animated particles effect */}
          <div className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animation: 'float 3s ease-in-out infinite'
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {showModal && (
        <ArtistModal artist={artist} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

const ArtistsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(artists.length / itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  const currentArtists = artists.slice(
    currentIndex * itemsPerPage, 
    (currentIndex + 1) * itemsPerPage
  );
  
  return (
    <section id="discover" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-audio-dark/90 via-audio-dark to-audio-dark/95"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-xs font-medium rounded-full glass-accent text-audio-accent inline-block mb-4">
            Artistes exclusifs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">Découvrez les artistes WeListen</h2>
          <p className="text-audio-light/70 max-w-2xl mx-auto text-balance">
            Explorez notre catalogue d'artistes exclusifs et plongez dans leurs univers sonores uniques.
          </p>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
          
          {/* Carousel Navigation */}
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={goToPrevious}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-audio-accent/20 transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-audio-accent w-6' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={goToNext}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-audio-accent/20 transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;
