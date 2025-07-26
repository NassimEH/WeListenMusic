
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Disc, Play, Clock, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { playClickSound, playHoverSound } from '@/utils/soundEffects';

// Données des albums enrichies avec une catégorie
const albums = [
  // Rap FR
  {
    id: 1,
    title: "Ultra",
    artist: "Booba",
    cover: "https://images.genius.com/c6d6274ae176b61f9f40db899ff0a515.1000x1000x1.png",
    year: 2021,
    songs: 15,
    duration: "53 min",
    category: "Rap FR"
  },
  {
    id: 2,
    title: "Nevermind",
    artist: "Nekfeu",
    cover: "https://intrld.com/wp-content/uploads/2019/06/Neufeu-les-etoiles-vagabondes.jpg",
    year: 2019,
    songs: 18,
    duration: "62 min",
    category: "Rap FR"
  },
  {
    id: 3,
    title: "Trône",
    artist: "Booba",
    cover: "https://m.media-amazon.com/images/I/71kh0cLcc3L._UF1000,1000_QL80_.jpg",
    year: 2017,
    songs: 14,
    duration: "49 min",
    category: "Rap FR"
  },
  {
    id: 5,
    title: "Nero Nemesis",
    artist: "Booba",
    cover: "https://m.media-amazon.com/images/I/814wfNaENVL._UF1000,1000_QL80_.jpg",
    year: 2015,
    songs: 14,
    duration: "58 min",
    category: "Rap FR"
  },
  {
    id: 7,
    title: "La Fête est Finie",
    artist: "Orelsan",
    cover: "https://upload.wikimedia.org/wikipedia/en/1/1f/La_f%C3%AAte_est_finie.jpg",
    year: 2017,
    songs: 14,
    duration: "50 min",
    category: "Rap FR"
  },
  {
    id: 8,
    title: "JVLIVS II",
    artist: "SCH",
    cover: "https://images.genius.com/ca01bc96fdf2d1b26e7a0ed20e3c34cb.1000x1000x1.png",
    year: 2021,
    songs: 19,
    duration: "65 min",
    category: "Rap FR"
  },
  
  // Rap US
  {
    id: 4,
    title: "Music To Be Murdered By",
    artist: "Eminem",
    cover: "https://upload.wikimedia.org/wikipedia/en/8/80/Eminem_-_Music_to_Be_Murdered_By.png",
    year: 2020,
    songs: 20,
    duration: "64 min",
    category: "Rap US"
  },
  {
    id: 6,
    title: "Recovery",
    artist: "Eminem",
    cover: "https://m.media-amazon.com/images/I/61fXEwg-lAL._UF1000,1000_QL80_.jpg",
    year: 2010,
    songs: 17,
    duration: "62 min",
    category: "Rap US"
  },
  {
    id: 9,
    title: "Astroworld",
    artist: "Travis Scott",
    cover: "https://m.media-amazon.com/images/I/81zLgm0ZeJL._UF1000,1000_QL80_.jpg",
    year: 2018,
    songs: 17,
    duration: "58 min",
    category: "Rap US"
  },
  {
    id: 10,
    title: "DAMN.",
    artist: "Kendrick Lamar",
    cover: "https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png",
    year: 2017,
    songs: 14,
    duration: "55 min",
    category: "Rap US"
  },
  {
    id: 11,
    title: "The Off-Season",
    artist: "J. Cole",
    cover: "https://upload.wikimedia.org/wikipedia/en/7/7d/The_Off-Season.jpeg",
    year: 2021,
    songs: 12,
    duration: "39 min",
    category: "Rap US"
  },
  {
    id: 12,
    title: "Certified Lover Boy",
    artist: "Drake",
    cover: "https://media.pitchfork.com/photos/6131ba85362896ded3744de7/master/pass/Drake-Certified-Lover-Boy.jpg",
    year: 2021,
    songs: 21,
    duration: "86 min",
    category: "Rap US"
  }
];

interface AlbumProps {
  id: number;
  title: string;
  artist: string;
  cover: string;
  year: number;
  songs: number;
  duration: string;
  category: string;
}

const Album = ({ id, title, artist, cover, year, songs, duration, category }: AlbumProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    console.log(`Playing ${title} by ${artist}`);
  };
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setIsLiked(!isLiked);
  };
  
  return (
    <motion.div 
      className="group relative rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => {
        setIsHovered(true);
        playHoverSound();
      }}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <div className="aspect-square relative overflow-hidden rounded-xl">
        <motion.img 
          src={cover} 
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover object-center"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="w-14 h-14 rounded-full bg-audio-accent flex items-center justify-center hover:bg-audio-accent-light transition-colors relative z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlay}
          >
            <Play size={26} fill="white" className="text-white ml-1" />
          </motion.button>
        </motion.div>
        
        <motion.div
          className="absolute top-3 right-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-audio-surface-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
          >
            <Heart size={18} className={isLiked ? "text-red-500 fill-red-500" : "text-white"} />
          </motion.button>
        </motion.div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-audio-light/70">{artist}</p>
        
        <div className="mt-2 flex items-center text-xs text-audio-light/50 gap-3">
          <span className="flex items-center gap-1">
            <Disc size={12} />
            {songs} titres
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {duration}
          </span>
          <span>{year}</span>
        </div>
      </div>
    </motion.div>
  );
};

const AlbumGrid = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const filteredAlbums = filter 
    ? albums.filter(album => album.category === filter) 
    : albums;
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredAlbums.length / itemsPerPage);
  const displayedAlbums = filteredAlbums.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );
  
  const handleNext = () => {
    playClickSound();
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    playClickSound();
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const handleFilter = (category: string | null) => {
    playClickSound();
    setFilter(category);
    setCurrentPage(0); // Reset to first page when changing filters
  };
  
  return (
    <section id="discover" className="py-20 px-6 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-audio-dark via-audio-dark/90 to-audio-dark"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="px-3 py-1 text-xs font-medium rounded-full glass-accent text-audio-accent inline-block mb-4">
            Découvrir
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <h2 className="text-4xl font-bold">Albums Populaires</h2>
            <div className="flex gap-2">
              <button 
                className={`px-4 py-2 rounded-lg transition-all ${filter === 'Rap FR' ? 'bg-audio-accent text-white' : 'glass hover:bg-audio-surface-accent'}`}
                onClick={() => handleFilter('Rap FR')}
              >
                Rap FR
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition-all ${filter === 'Rap US' ? 'bg-audio-accent text-white' : 'glass hover:bg-audio-surface-accent'}`}
                onClick={() => handleFilter('Rap US')}
              >
                Rap US
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition-all ${filter === null ? 'bg-audio-accent text-white' : 'glass hover:bg-audio-surface-accent'}`}
                onClick={() => handleFilter(null)}
              >
                Tout voir
              </button>
            </div>
          </div>
          <p className="text-audio-light/70 max-w-2xl">
            Explorez les albums les plus écoutés sur notre plateforme, avec une sélection de titres incontournables.
          </p>
        </div>
        
        <div className="relative">
          {totalPages > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-audio-surface/50 backdrop-blur-sm ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-audio-surface-accent'}`}
                disabled={currentPage === 0}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-audio-surface/50 backdrop-blur-sm ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-audio-surface-accent'}`}
                disabled={currentPage === totalPages - 1}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          
          <div 
            ref={carouselRef} 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
          >
            {displayedAlbums.map(album => (
              <Album key={album.id} {...album} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(index);
                    playClickSound();
                  }}
                  className={`w-2.5 h-2.5 mx-1 rounded-full ${currentPage === index ? 'bg-audio-accent' : 'bg-audio-surface hover:bg-audio-accent/50'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AlbumGrid;
