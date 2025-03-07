
import React, { useState } from 'react';
import { Play, Heart, Clock } from 'lucide-react';
import WaveAnimation from './WaveAnimation';
import { cn } from '@/lib/utils';

// Sample data for albums
const albums = [
  {
    id: 1,
    title: "Night Visions",
    artist: "Imagine Dragons",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop",
    color: "#e63946"
  },
  {
    id: 2,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    cover: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=500&auto=format&fit=crop",
    color: "#457b9d"
  },
  {
    id: 3,
    title: "Hyperspace",
    artist: "Beck",
    cover: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=500&auto=format&fit=crop",
    color: "#ffb703"
  },
  {
    id: 4,
    title: "Dawn FM",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop",
    color: "#6d23b6"
  },
  {
    id: 5,
    title: "Wasteland",
    artist: "Brent Faiyaz",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&auto=format&fit=crop",
    color: "#2d6a4f"
  },
  {
    id: 6,
    title: "Bright Echoes",
    artist: "Luna Ray",
    cover: "https://images.unsplash.com/photo-1598295893369-1918ffaf89a2?q=80&w=500&auto=format&fit=crop",
    color: "#0096c7"
  },
];

interface AlbumCardProps {
  album: typeof albums[0];
  index: number;
  activeIndex: number | null;
  onTogglePlay: (index: number) => void;
}

const AlbumCard = ({ album, index, activeIndex, onTogglePlay }: AlbumCardProps) => {
  const isActive = index === activeIndex;
  
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300 ease-spring",
        isActive ? "scale-[1.02] shadow-lg" : "hover-scale"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative group aspect-square">
        <img 
          src={album.cover} 
          alt={album.title} 
          className="w-full h-full object-cover rounded-xl"
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
          onClick={() => onTogglePlay(index)}
          className="absolute right-3 bottom-3 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 ease-spring"
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
  
  const handleTogglePlay = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
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
            />
          ))}
        </div>
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-10">Playlists populaires</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.slice(0, 3).map((album, index) => (
              <div 
                key={`playlist-${album.id}`}
                className="glass rounded-xl p-4 hover-scale"
              >
                <div className="flex gap-4">
                  <img 
                    src={album.cover} 
                    alt={album.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{album.title}</h3>
                      <p className="text-audio-light/70 text-sm">{album.artist}</p>
                    </div>
                    <div className="flex gap-2 text-audio-light/50 text-sm">
                      <span className="flex items-center gap-1"><Clock size={14} /> 45min</span>
                      <span className="flex items-center gap-1"><Heart size={14} /> 2.4k</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlbumGrid;
