
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Plus, Music2, Heart, ChevronRight, Play, Search, Disc } from 'lucide-react';
import { playClickSound, playHoverSound } from '@/utils/soundEffects';
import StarBackground from '@/components/StarBackground';

const ConsumerDashboard = () => {
  const { playlists, addPlaylist, likedSongs } = useApp();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  useEffect(() => {
    document.title = 'WeListen - Votre espace';
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
      songs: []
    },
    {
      id: '2',
      name: 'Rap FR',
      description: 'Le meilleur du rap français',
      cover: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=1972&auto=format&fit=crop',
      songs: []
    },
    {
      id: '3',
      name: 'Classics',
      description: 'Les titres qui ont marqué l\'histoire',
      cover: 'https://images.unsplash.com/photo-1461784180009-27c171c6aed7?q=80&w=2070&auto=format&fit=crop',
      songs: []
    },
    {
      id: '4',
      name: 'Chill',
      description: 'Pour se détendre',
      cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop',
      songs: []
    },
  ];

  // Animations variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-audio-dark overflow-x-hidden pb-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-audio-dark via-audio-dark/95 to-audio-dark z-0"></div>
        <StarBackground intensity={0.5} speed={0.3} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-audio-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="container max-w-7xl mx-auto px-6 relative z-10 pt-12">
        <div className="mb-10">
          <motion.h1
            className="text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-audio inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Votre espace musical
          </motion.h1>
          <motion.p 
            className="text-audio-light/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Explorez vos playlists, découvrez de nouveaux titres et gérez votre bibliothèque
          </motion.p>
        </div>
        
        {/* Search bar */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-audio-light/50" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher des titres, albums ou artistes..." 
              className="w-full py-3 pl-12 pr-4 bg-audio-surface/30 backdrop-blur-sm border border-white/5 rounded-full focus:outline-none focus:ring-2 focus:ring-audio-accent"
            />
          </div>
        </motion.div>

        {/* For You Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Pour vous</h2>
            <button 
              className="text-audio-accent hover:text-audio-accent-light transition-colors flex items-center gap-1"
              onMouseEnter={() => playHoverSound()}
              onClick={() => playClickSound()}
            >
              Voir tout <ChevronRight size={16} />
            </button>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {popularPlaylists.map((playlist) => (
              <motion.div
                key={playlist.id}
                variants={item}
                whileHover={{ y: -5 }}
                className="group relative rounded-xl overflow-hidden"
                onMouseEnter={() => playHoverSound()}
              >
                <div className="relative aspect-square">
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="w-14 h-14 rounded-full bg-audio-accent flex items-center justify-center hover:bg-audio-accent-light transition-colors"
                      onClick={() => playClickSound()}
                    >
                      <Play size={26} fill="white" className="text-white ml-1" />
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-white">{playlist.name}</h3>
                  <p className="text-audio-light/70 text-sm">{playlist.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Playlists Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Vos playlists</h2>
            <button
              className="text-audio-accent hover:text-audio-accent-light flex items-center gap-1 transition-colors"
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
              className="mb-6 p-6 rounded-xl bg-audio-surface/20 border border-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-medium mb-4">Nouvelle playlist</h3>
              <input
                type="text"
                placeholder="Nom de la playlist"
                className="bg-audio-surface/30 border border-white/10 text-white rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-audio-accent mb-4"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-audio-light/80 hover:text-white transition-colors"
                  onClick={() => setShowCreatePlaylist(false)}
                >
                  Annuler
                </button>
                <button
                  className="px-4 py-2 bg-audio-accent hover:bg-audio-accent-light text-white rounded-lg transition-colors"
                  onClick={handleCreatePlaylist}
                >
                  Créer
                </button>
              </div>
            </motion.div>
          )}

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {playlists.map((playlist) => (
              <motion.div
                key={playlist.id}
                variants={item}
                whileHover={{ y: -5 }}
                className="group relative rounded-xl overflow-hidden"
                onMouseEnter={() => playHoverSound()}
              >
                <div className="relative aspect-square">
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="w-14 h-14 rounded-full bg-audio-accent flex items-center justify-center hover:bg-audio-accent-light transition-colors"
                      onClick={() => playClickSound()}
                    >
                      <Play size={26} fill="white" className="text-white ml-1" />
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-white">{playlist.name}</h3>
                  <p className="text-audio-light/70 text-sm">{playlist.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Liked Songs Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Heart size={20} className="text-audio-accent" />
              Titres aimés
            </h2>
            <button className="text-audio-accent hover:text-audio-accent-light flex items-center gap-1 transition-colors">
              Voir tout <ChevronRight size={16} />
            </button>
          </div>

          {likedSongs.length === 0 ? (
            <div className="p-10 rounded-xl bg-audio-surface/20 border border-white/5 backdrop-blur-sm text-center">
              <Disc size={40} className="mx-auto mb-4 text-audio-light/30" />
              <p className="text-audio-light/70 mb-4">Vous n'avez pas encore de titres aimés.</p>
              <button 
                className="px-6 py-2 bg-audio-accent hover:bg-audio-accent-light text-white rounded-full transition-colors"
                onClick={() => playClickSound()}
              >
                Découvrir des titres
              </button>
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {likedSongs.map((song) => (
                <motion.div
                  key={song.id}
                  variants={item}
                  className="bg-audio-surface/20 border border-white/5 backdrop-blur-sm rounded-lg p-3 flex items-center gap-4 hover:bg-audio-surface/30 transition-colors"
                >
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-md">
                      <Play size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-white font-medium truncate">{song.title}</h3>
                    <p className="text-audio-light/70 text-sm truncate">{song.artist}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-3">
                    <span className="text-audio-light/50 text-xs">{song.duration}</span>
                    <Heart size={16} className="text-red-500 fill-red-500" />
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
