
import React, { useState } from 'react';
import AppLayout from '@/components/app/AppLayout';
import { motion } from 'framer-motion';
import { Play, Plus, Clock, Heart, Disc, PlayCircle, MusicIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import { playSoundEffect } from '@/utils/soundEffects';

// Mock data for featured artists
const featuredArtists = [
  { id: '1', name: 'Booba', image: 'https://img.lemde.fr/2021/03/05/1541/0/3648/1820/1440/720/60/0/99c9700_792435352-ultra-selection-raw17.jpg' },
  { id: '2', name: 'Jul', image: 'https://images.ladepeche.fr/api/v1/images/view/60ad09448fe56f23a26b75b0/large/image.jpg?v=1' },
  { id: '3', name: 'Damso', image: 'https://www.booska-p.com/wp-content/uploads/2023/09/damso-1-1000x600.jpg' },
  { id: '4', name: 'PNL', image: 'https://images.bfmtv.com/cC9BtgR9GHKxHBKFwZLsQO-nXPA=/0x0:1024x576/1024x0/images/PNL-1278553.jpg' },
  { id: '5', name: 'Ninho', image: 'https://images.universal-music.de/img/06_artist/ninho/2023/ninho-2023-1.jpg' },
];

// Mock data for new releases
const newReleases = [
  { id: '1', title: 'QALF', artist: 'Damso', cover: 'https://www.booska-p.com/wp-content/uploads/2020/09/damso-devoile-la-cover-et-la-tracklist-de-qalf-649.jpg' },
  { id: '2', title: 'Ultra', artist: 'Booba', cover: 'https://img.lemde.fr/2021/03/05/1541/0/3648/1820/1440/720/60/0/99c9700_792435352-ultra-selection-raw17.jpg' },
  { id: '3', title: 'Civilisation', artist: 'Orelsan', cover: 'https://images.universal-music.de/img/04_artists/orelsan/2021/191402191402orelsan-civilisation-cover.jpg' },
  { id: '4', title: 'Jefe', artist: 'Ninho', cover: 'https://images.genius.com/bdb908d68bfdac7b22d8f3c76211b3e7.1000x1000x1.jpg' },
  { id: '5', title: 'La Vie de Rêve', artist: 'PNL', cover: 'https://m.media-amazon.com/images/I/61ZJT9tKKBL._UF1000,1000_QL80_.jpg' },
  { id: '6', title: 'BLO', artist: 'Alpha Wann', cover: 'https://images.genius.com/83800f6b8e11fe2bbc80e8535e2e5a29.1000x1000x1.jpg' },
];

// Mock data for your playlists
const popularPlaylists = [
  { id: '1', name: 'Hits Français', description: 'Les tubes du rap français', cover: 'https://i.scdn.co/image/ab67706f00000003fc8e155556b225e73582af6e' },
  { id: '2', name: 'Chill Hip-Hop', description: 'Parfait pour se détendre', cover: 'https://i.scdn.co/image/ab67706f00000003ba5db46f4b838ef6027db656' },
  { id: '3', name: 'Workout Mix', description: 'Boostez votre entraînement', cover: 'https://i.scdn.co/image/ab67706f000000034d26e829e0fe71546772aa74' },
  { id: '4', name: 'Party', description: 'Pour faire la fête', cover: 'https://i.scdn.co/image/ab67706f00000003771dc6594904204f04fefdf6' },
];

const ConsumerDashboard = () => {
  const { playlists } = useApp();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const handleItemHover = (id: string | null) => {
    if (id !== hoveredItem) {
      playSoundEffect('hover', 0.1);
    }
    setHoveredItem(id);
  };
  
  const handlePlayClick = () => {
    playSoundEffect('click');
  };
  
  return (
    <AppLayout headerTitle="Accueil">
      {/* Welcome section */}
      <section className="mb-8 pt-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-1"
        >
          Bonjour
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          className="text-audio-light/70"
        >
          Découvrez des nouveautés adaptées à vos goûts
        </motion.p>
      </section>
      
      {/* Recently played section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Écoutés récemment</h2>
          <a 
            href="#" 
            className="text-sm text-audio-light/70 hover:text-audio-light"
            onClick={() => playSoundEffect('hover')}
          >
            Voir tout
          </a>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
        >
          {playlists.concat(popularPlaylists).slice(0, 6).map((playlist) => (
            <motion.div 
              key={playlist.id}
              variants={item}
              className="glass rounded-lg p-4 hover:bg-audio-surface/30 transition-all cursor-pointer group"
              onMouseEnter={() => handleItemHover(playlist.id)}
              onMouseLeave={() => handleItemHover(null)}
            >
              <div className="relative mb-4">
                <img 
                  src={playlist.cover} 
                  alt={playlist.name} 
                  className="w-full aspect-square object-cover rounded-md shadow-md" 
                />
                <div className={cn(
                  "absolute right-2 bottom-2 transform translate-y-4 opacity-0 transition-all duration-300",
                  hoveredItem === playlist.id && "translate-y-0 opacity-100"
                )}>
                  <button 
                    className="bg-audio-accent rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                    onClick={handlePlayClick}
                  >
                    <Play size={20} className="text-white ml-1" />
                  </button>
                </div>
              </div>
              <h3 className="font-medium text-sm truncate">{playlist.name}</h3>
              <p className="text-xs text-audio-light/70 truncate">{playlist.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* New releases */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Sorties récentes</h2>
          <a 
            href="#" 
            className="text-sm text-audio-light/70 hover:text-audio-light"
            onClick={() => playSoundEffect('hover')}
          >
            Voir tout
          </a>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
        >
          {newReleases.map((album) => (
            <motion.div 
              key={album.id}
              variants={item}
              className="glass rounded-lg p-4 hover:bg-audio-surface/30 transition-all cursor-pointer group"
              onMouseEnter={() => handleItemHover(album.id)}
              onMouseLeave={() => handleItemHover(null)}
            >
              <div className="relative mb-4">
                <img 
                  src={album.cover} 
                  alt={album.title} 
                  className="w-full aspect-square object-cover rounded-md shadow-md" 
                />
                <div className={cn(
                  "absolute right-2 bottom-2 transform translate-y-4 opacity-0 transition-all duration-300",
                  hoveredItem === album.id && "translate-y-0 opacity-100"
                )}>
                  <button 
                    className="bg-audio-accent rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                    onClick={handlePlayClick}
                  >
                    <Play size={20} className="text-white ml-1" />
                  </button>
                </div>
              </div>
              <h3 className="font-medium text-sm truncate">{album.title}</h3>
              <p className="text-xs text-audio-light/70 truncate">Album • {album.artist}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Featured artists */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Artistes populaires</h2>
          <a 
            href="#" 
            className="text-sm text-audio-light/70 hover:text-audio-light"
            onClick={() => playSoundEffect('hover')}
          >
            Voir tout
          </a>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-6"
        >
          {featuredArtists.map((artist) => (
            <motion.div 
              key={artist.id}
              variants={item}
              className="text-center cursor-pointer group"
              onMouseEnter={() => handleItemHover(`artist-${artist.id}`)}
              onMouseLeave={() => handleItemHover(null)}
            >
              <div className="relative mb-3">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img 
                    src={artist.image} 
                    alt={artist.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className={cn(
                  "absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 transition-opacity",
                  hoveredItem === `artist-${artist.id}` && "opacity-100"
                )}>
                  <button 
                    className="bg-audio-accent rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                    onClick={handlePlayClick}
                  >
                    <Play size={20} className="text-white ml-1" />
                  </button>
                </div>
              </div>
              <h3 className="font-medium text-sm">{artist.name}</h3>
              <p className="text-xs text-audio-light/70">Artiste</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Quick links */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Raccourcis</h2>
        <div className="flex flex-wrap gap-3">
          <button 
            className="px-4 py-2 glass rounded-full text-sm flex items-center gap-2 hover:bg-audio-surface/30 transition-colors"
            onClick={() => playSoundEffect('click')}
          >
            <Heart size={16} />
            <span>Titres likés</span>
          </button>
          <button 
            className="px-4 py-2 glass rounded-full text-sm flex items-center gap-2 hover:bg-audio-surface/30 transition-colors"
            onClick={() => playSoundEffect('click')}
          >
            <Clock size={16} />
            <span>Récemment écoutés</span>
          </button>
          <button 
            className="px-4 py-2 glass rounded-full text-sm flex items-center gap-2 hover:bg-audio-surface/30 transition-colors"
            onClick={() => playSoundEffect('click')}
          >
            <Plus size={16} />
            <span>Créer une playlist</span>
          </button>
          <button 
            className="px-4 py-2 glass rounded-full text-sm flex items-center gap-2 hover:bg-audio-surface/30 transition-colors"
            onClick={() => playSoundEffect('click')}
          >
            <Disc size={16} />
            <span>Albums</span>
          </button>
          <button 
            className="px-4 py-2 glass rounded-full text-sm flex items-center gap-2 hover:bg-audio-surface/30 transition-colors"
            onClick={() => playSoundEffect('click')}
          >
            <MusicIcon size={16} />
            <span>Podcasts</span>
          </button>
        </div>
      </section>
    </AppLayout>
  );
};

export default ConsumerDashboard;
