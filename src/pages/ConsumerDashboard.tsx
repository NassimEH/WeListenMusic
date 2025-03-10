
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Plus, Music2, Heart, ChevronRight, Zap, Sparkles, Headphones, Play, Clock, Search } from 'lucide-react';
import { playClickSound, playHoverSound, playSynthBlip } from '@/utils/soundEffects';
import SynthwaveBackground from '@/components/SynthwaveBackground';
import { cn } from '@/lib/utils';

const ConsumerDashboard = () => {
  const { playlists, addPlaylist, likedSongs } = useApp();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'WeListen - Votre espace';
    playSynthBlip();
  }, []);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() !== '') {
      const newPlaylist = {
        id: Date.now().toString(),
        name: newPlaylistName,
        description: 'Nouvelle playlist',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1740&auto=format&fit=crop',
        songs: []
      };
      addPlaylist(newPlaylist);
      setNewPlaylistName('');
      setShowCreatePlaylist(false);
      playClickSound();
    }
  };

  const popularPlaylists = [
    {
      id: '1',
      name: 'Hits du moment',
      description: 'Les titres les plus populaires actuellement',
      cover: 'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1974&auto=format&fit=crop',
      songs: [] // Add empty songs array to match Playlist type
    },
    {
      id: '2',
      name: 'Rap FR',
      description: 'Le meilleur du rap français',
      cover: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=1972&auto=format&fit=crop',
      songs: [] // Add empty songs array to match Playlist type
    },
    {
      id: '3',
      name: 'Classics',
      description: 'Les titres qui ont marqué l\'histoire',
      cover: 'https://images.unsplash.com/photo-1461784180009-27c171c6aed7?q=80&w=2070&auto=format&fit=crop',
      songs: [] // Add empty songs array to match Playlist type
    },
    {
      id: '4',
      name: 'Chill',
      description: 'Pour se détendre',
      cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop',
      songs: [] // Add empty songs array to match Playlist type
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const handleHover = (id: string | null) => {
    if (id !== hoveredItem) {
      playHoverSound();
    }
    setHoveredItem(id);
  };

  return (
    <div className="min-h-screen bg-audio-dark py-12 relative">
      <SynthwaveBackground variant="grid" />
      
      <div className="container max-w-7xl mx-auto px-6">
        <motion.h1
          className="text-3xl font-bold text-transparent bg-gradient-synthwave bg-clip-text mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Votre espace
        </motion.h1>

        {/* Featured Section */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative h-64 rounded-xl overflow-hidden mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" 
              alt="Weekly recommendations" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center p-8">
              <h2 className="text-3xl font-bold mb-2 text-white">Découvertes de la semaine</h2>
              <p className="text-audio-light/80 mb-4 max-w-md">Nous avons sélectionné de nouveaux titres basés sur vos goûts musicaux</p>
              <motion.button 
                className="flex items-center gap-2 bg-gradient-synthwave text-white rounded-full py-2 px-6 w-fit shadow-neon-pink hover:shadow-neon-purple transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => playClickSound()}
              >
                <Play size={16} />
                Écouter maintenant
              </motion.button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-0"></div>
          </div>
        </motion.section>

        {/* Playlists Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-transparent bg-gradient-synthwave bg-clip-text">Playlists</h2>
            <button
              className="text-audio-synthwave-pink hover:text-audio-synthwave-purple flex items-center gap-1 transition-colors"
              onClick={() => {
                setShowCreatePlaylist(true);
                playClickSound();
              }}
              onMouseEnter={() => playHoverSound()}
            >
              <Plus size={16} />
              Créer
            </button>
          </div>

          {showCreatePlaylist && (
            <motion.div 
              className="mb-4 bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-audio-synthwave-purple/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <input
                type="text"
                placeholder="Nom de la playlist"
                className="bg-audio-surface text-white rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-audio-synthwave-pink border border-white/10"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <button
                  className="bg-gradient-synthwave hover:shadow-neon-pink text-white rounded-lg py-2 px-4 transition-all duration-300"
                  onClick={handleCreatePlaylist}
                >
                  Valider
                </button>
              </div>
            </motion.div>
          )}

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {playlists.map((playlist) => (
              <motion.div
                key={playlist.id}
                className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/5 overflow-hidden group relative"
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 0 15px rgba(249, 115, 22, 0.2), 0 0 30px rgba(249, 115, 22, 0.1)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                onMouseEnter={() => handleHover(playlist.id)}
                onMouseLeave={() => handleHover(null)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-audio-synthwave-pink/10 via-transparent to-transparent transition-opacity duration-300"></div>
                <div className="relative mb-2 overflow-hidden rounded-lg aspect-square">
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      className="w-10 h-10 rounded-full bg-audio-synthwave-pink/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-4 group-hover:translate-y-0 transform"
                      onClick={() => playClickSound()}
                    >
                      <Play size={18} fill="white" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-audio-synthwave-pink transition-colors">{playlist.name}</h3>
                <p className="text-audio-light/70 text-sm">{playlist.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Suggested Playlists */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-transparent bg-gradient-synthwave bg-clip-text flex items-center">
              <Sparkles size={20} className="mr-2 text-audio-synthwave-pink" />
              Suggestions pour vous
            </h2>
            <button className="text-audio-synthwave-pink hover:text-audio-synthwave-purple flex items-center gap-1 transition-colors">
              Explorer <ChevronRight size={16} />
            </button>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {popularPlaylists.map((playlist) => (
              <motion.div
                key={playlist.id}
                className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/5 overflow-hidden group relative"
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 0 15px rgba(155, 135, 245, 0.2), 0 0 30px rgba(155, 135, 245, 0.1)'
                }}
                onMouseEnter={() => handleHover(playlist.id)}
                onMouseLeave={() => handleHover(null)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-audio-synthwave-purple/10 via-transparent to-transparent transition-opacity duration-300"></div>
                <div className="relative mb-2 overflow-hidden rounded-lg aspect-square">
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      className="w-10 h-10 rounded-full bg-audio-synthwave-purple/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-4 group-hover:translate-y-0 transform"
                      onClick={() => playClickSound()}
                    >
                      <Play size={18} fill="white" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-audio-synthwave-purple transition-colors">{playlist.name}</h3>
                <p className="text-audio-light/70 text-sm">{playlist.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Liked Songs Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-transparent bg-gradient-synthwave bg-clip-text flex items-center">
              <Heart size={20} className="mr-2 text-audio-synthwave-pink" />
              Titres aimés
            </h2>
            <button className="text-audio-synthwave-pink hover:text-audio-synthwave-purple flex items-center gap-1 transition-colors">
              Voir tout <ChevronRight size={16} />
            </button>
          </div>

          {likedSongs.length === 0 ? (
            <motion.div 
              className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/5 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Heart size={48} className="mx-auto mb-4 text-audio-light/30" />
              <p className="text-audio-light/70 mb-4">Aucun titre aimé pour le moment.</p>
              <button 
                className="bg-gradient-synthwave hover:shadow-neon-pink text-white rounded-full py-2 px-6 transition-all duration-300 flex items-center gap-2 mx-auto"
                onClick={() => playClickSound()}
              >
                <Search size={16} />
                Découvrir de nouveaux titres
              </button>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {likedSongs.map((song) => (
                <motion.div
                  key={song.id}
                  className="bg-black/40 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 border border-white/5 group"
                  variants={itemVariants}
                  whileHover={{ 
                    x: 5,
                    boxShadow: '0 0 15px rgba(249, 115, 22, 0.2), 0 0 30px rgba(249, 115, 22, 0.1)'
                  }}
                  onMouseEnter={() => handleHover(song.id)}
                  onMouseLeave={() => handleHover(null)}
                >
                  <div className="relative">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-16 h-16 object-cover rounded-lg group-hover:shadow-neon-pink transition-all duration-300"
                    />
                    <button 
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() => playClickSound()}
                    >
                      <Play size={24} className="text-audio-synthwave-pink" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-audio-synthwave-pink transition-colors">{song.title}</h3>
                    <p className="text-audio-light/70 text-sm">{song.artist}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-audio-light/50">
                    <Clock size={14} />
                    <span className="text-xs">3:45</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
