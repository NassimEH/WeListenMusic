import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Plus, Music2, Heart, ChevronRight } from 'lucide-react';
import { playClickSound, playHoverSound } from '@/utils/soundEffects';

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

  return (
    <div className="min-h-screen bg-audio-dark py-12">
      <div className="container max-w-7xl mx-auto px-6">
        <motion.h1
          className="text-3xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Votre espace
        </motion.h1>

        {/* Playlists Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">Playlists</h2>
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
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nom de la playlist"
                className="bg-audio-surface text-white rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-audio-accent"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <button
                  className="bg-audio-accent hover:bg-audio-accent-light text-white rounded-lg py-2 px-4 transition-colors"
                  onClick={handleCreatePlaylist}
                >
                  Valider
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {playlists.map((playlist) => (
              <motion.div
                key={playlist.id}
                className="bg-audio-surface rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="text-lg font-semibold text-white">{playlist.name}</h3>
                <p className="text-audio-light/70 text-sm">{playlist.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Liked Songs Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">
              <Music2 size={24} className="inline-block mr-2 align-middle" />
              Titres aimés
            </h2>
            <button className="text-audio-accent hover:text-audio-accent-light flex items-center gap-1 transition-colors">
              Voir tout <ChevronRight size={16} />
            </button>
          </div>

          {likedSongs.length === 0 ? (
            <p className="text-audio-light/70">Aucun titre aimé pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {likedSongs.map((song) => (
                <motion.div
                  key={song.id}
                  className="bg-audio-surface rounded-lg p-4 flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{song.title}</h3>
                    <p className="text-audio-light/70 text-sm">{song.artist}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
