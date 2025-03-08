
import React, { useState } from 'react';
import { Play, Heart, Clock, MoreHorizontal, Volume2 } from 'lucide-react';
import WaveAnimation from './WaveAnimation';
import { cn } from '@/lib/utils';

// Albums data with Rap artists
const albums = [
  {
    id: 1,
    title: "Music To Be Murdered By",
    artist: "Eminem",
    cover: "https://images.unsplash.com/photo-1516981442399-a91139e20ff8?q=80&w=500&auto=format&fit=crop",
    color: "#e63946"
  },
  {
    id: 2,
    title: "Ultra",
    artist: "Booba",
    cover: "https://images.unsplash.com/photo-1501608593477-a5315893535c?q=80&w=500&auto=format&fit=crop",
    color: "#457b9d"
  },
  {
    id: 3,
    title: "Civilisation",
    artist: "Orelsan",
    cover: "https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=500&auto=format&fit=crop",
    color: "#ffb703"
  },
  {
    id: 4,
    title: "Jefe",
    artist: "Jul",
    cover: "https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?q=80&w=500&auto=format&fit=crop",
    color: "#6d23b6"
  },
  {
    id: 5,
    title: "The Off-Season",
    artist: "J. Cole",
    cover: "https://images.unsplash.com/photo-1530176238587-b53132214c54?q=80&w=500&auto=format&fit=crop",
    color: "#2d6a4f"
  },
  {
    id: 6,
    title: "Vie d'artiste",
    artist: "Damso",
    cover: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=500&auto=format&fit=crop",
    color: "#0096c7"
  },
];

// Album detail data for modals
const albumDetails = {
  "Booba": {
    bio: "Figure emblématique du rap français, Booba a révolutionné le genre avec son style unique et ses productions avant-gardistes. Depuis ses débuts avec Lunatic jusqu'à sa carrière solo, il a marqué l'industrie musicale française.",
    tracks: [
      { title: "Ratpi World", duration: "3:24" },
      { title: "Mona Lisa", duration: "4:05" },
      { title: "DKR", duration: "2:58" },
      { title: "Tout Dosé", duration: "3:42" },
      { title: "92i Veyron", duration: "3:10" }
    ]
  },
  "Eminem": {
    bio: "Artiste multi-platine et l'un des rappeurs les plus influents de tous les temps, Eminem a marqué l'histoire du hip-hop avec son flow technique, ses paroles provocantes et son alter ego controversé, Slim Shady.",
    tracks: [
      { title: "Godzilla", duration: "3:31" },
      { title: "Darkness", duration: "5:37" },
      { title: "Those Kinda Nights", duration: "2:52" },
      { title: "Leaving Heaven", duration: "4:26" },
      { title: "No Regrets", duration: "3:20" }
    ]
  }
};

interface AlbumModalProps {
  album: typeof albums[0] | null;
  onClose: () => void;
}

const AlbumModal = ({ album, onClose }: AlbumModalProps) => {
  if (!album) return null;
  
  const details = albumDetails[album.artist as keyof typeof albumDetails] || {
    bio: "Artiste talentueux à la créativité sans limites, explorant de nouveaux horizons musicaux.",
    tracks: [
      { title: "Titre 1", duration: "3:24" },
      { title: "Titre 2", duration: "4:05" },
      { title: "Titre 3", duration: "2:58" },
    ]
  };

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
            style={{ background: `linear-gradient(to bottom, ${album.color}60, #0A0A0B)` }}
          ></div>
          <img 
            src={album.cover} 
            alt={album.title}
            className="w-full h-64 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-4xl font-bold mb-2">{album.title}</h2>
            <p className="text-xl text-white/80 mb-4">{album.artist}</p>
            <div className="flex gap-4 mb-4">
              <button className="px-6 py-2 bg-audio-accent hover:bg-audio-accent-light transition-colors rounded-full font-medium flex items-center gap-2 shadow-neon hover-scale">
                <Play size={18} fill="white" /> Écouter
              </button>
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
                <Heart size={18} />
              </button>
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">À propos de {album.artist}</h3>
            <p className="text-audio-light/80">{details.bio}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Titres populaires</h3>
            <div className="space-y-2">
              {details.tracks.map((track, index) => (
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
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart size={16} className="text-audio-light/60 hover:text-audio-light" />
                    </button>
                    <span className="text-audio-light/60 text-sm">{track.duration}</span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={16} className="text-audio-light/60 hover:text-audio-light" />
                    </button>
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

interface AlbumCardProps {
  album: typeof albums[0];
  index: number;
  activeIndex: number | null;
  onTogglePlay: (index: number) => void;
  onOpenModal: (album: typeof albums[0]) => void;
}

const AlbumCard = ({ album, index, activeIndex, onTogglePlay, onOpenModal }: AlbumCardProps) => {
  const isActive = index === activeIndex;
  
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300 ease-spring",
        "animate-fade-in",
        isActive ? "scale-[1.02] shadow-lg" : "hover-scale"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => onOpenModal(album)}
    >
      <div className="relative group aspect-square">
        <img 
          src={album.cover} 
          alt={album.title} 
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div 
          className={cn(
            "absolute inset-0 rounded-xl transition-opacity duration-300",
            "bg-gradient-to-t from-black/80 to-transparent",
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePlay(index);
          }}
          className="absolute right-3 bottom-3 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-spring shadow-neon hover:shadow-[0_0_25px_rgba(14,165,233,0.7)]"
          style={{ 
            backgroundColor: album.color,
            transform: isActive ? 'scale(1.1)' : 'scale(0.9)',
            opacity: isActive ? 1 : 0
          }}
          onMouseEnter={(e) => !isActive && (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => !isActive && (e.currentTarget.style.opacity = '0')}
        >
          {isActive ? (
            <WaveAnimation className="h-6 transform scale-75" />
          ) : (
            <Play size={20} fill="#fff" />
          )}
        </button>
        
        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-audio-accent/60"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animation: 'float 4s ease-in-out infinite'
              }}
            />
          ))}
        </div>
      </div>
      <div className="px-1 pt-4">
        <h3 className="font-semibold text-lg truncate">{album.title}</h3>
        <p className="text-audio-light/70 text-sm">{album.artist}</p>
      </div>
    </div>
  );
};

const AlbumGrid = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<typeof albums[0] | null>(null);
  
  const handleTogglePlay = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const handleOpenModal = (album: typeof albums[0]) => {
    setSelectedAlbum(album);
  };
  
  const handleCloseModal = () => {
    setSelectedAlbum(null);
  };
  
  return (
    <section id="trending" className="py-20 px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Tendances</h2>
          <a href="#" className="text-audio-accent hover:underline">Voir tout</a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {albums.map((album, index) => (
            <AlbumCard 
              key={album.id}
              album={album}
              index={index}
              activeIndex={activeIndex}
              onTogglePlay={handleTogglePlay}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-10">Playlists populaires</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.slice(0, 3).map((album, index) => (
              <div 
                key={`playlist-${album.id}`}
                className="glass rounded-xl p-4 hover-scale group cursor-pointer"
                onClick={() => handleOpenModal(album)}
              >
                <div className="flex gap-4">
                  <div className="relative">
                    <img 
                      src={album.cover} 
                      alt={album.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-opacity">
                      <Play size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{album.title}</h3>
                      <p className="text-audio-light/70 text-sm">{album.artist}</p>
                    </div>
                    <div className="flex gap-2 text-audio-light/50 text-sm">
                      <span className="flex items-center gap-1"><Clock size={14} /> 45min</span>
                      <span className="flex items-center gap-1"><Heart size={14} /> 2.4k</span>
                      <span className="flex items-center gap-1"><Volume2 size={14} /> 320k</span>
                    </div>
                  </div>
                </div>
                
                {/* Light effect on hover */}
                <div className="absolute -inset-1 bg-gradient-audio rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedAlbum && (
        <AlbumModal album={selectedAlbum} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default AlbumGrid;
