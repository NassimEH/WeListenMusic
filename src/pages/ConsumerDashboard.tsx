
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Plus, Music2, Heart, ChevronRight, Play, Search, Disc, Clock, Calendar, HeadphonesIcon } from 'lucide-react';
import { playSoundEffect } from '@/utils/soundEffects';
import StarBackground from '@/components/StarBackground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ConsumerDashboard = () => {
  const { playlists, addPlaylist, likedSongs } = useApp();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [activeTab, setActiveTab] = useState("discover");

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
      playSoundEffect('click');
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
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen overflow-x-hidden pb-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-audio-dark via-audio-dark/95 to-audio-dark"></div>
        <StarBackground intensity={0.4} speed={0.25} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-audio-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 relative pt-6">
        <div className="mb-8">
          <motion.h1
            className="text-3xl font-medium text-white mb-2 bg-clip-text text-transparent bg-gradient-audio inline-block"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Votre espace musical
          </motion.h1>
          <motion.p 
            className="text-audio-light/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Explorez vos playlists, découvrez de nouveaux titres et gérez votre bibliothèque
          </motion.p>
        </div>
        
        {/* Search bar */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-audio-light/40" size={16} />
            <input 
              type="text" 
              placeholder="Rechercher des titres, albums ou artistes..." 
              className="w-full py-2.5 pl-10 pr-4 bg-audio-surface/20 backdrop-blur-sm border border-white/5 rounded-full focus:outline-none focus:ring-1 focus:ring-audio-accent/50 text-sm"
            />
          </div>
        </motion.div>

        {/* Tabs navigation */}
        <Tabs defaultValue="discover" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-audio-surface/20 border border-white/5 backdrop-blur-sm p-1">
            <TabsTrigger value="discover" className="data-[state=active]:bg-audio-accent/20 data-[state=active]:text-audio-accent">
              Découvrir
            </TabsTrigger>
            <TabsTrigger value="playlists" className="data-[state=active]:bg-audio-accent/20 data-[state=active]:text-audio-accent">
              Vos playlists
            </TabsTrigger>
            <TabsTrigger value="liked" className="data-[state=active]:bg-audio-accent/20 data-[state=active]:text-audio-accent">
              Titres aimés
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-audio-accent/20 data-[state=active]:text-audio-accent">
              Historique
            </TabsTrigger>
          </TabsList>

          {/* Tab Content: Discover */}
          <TabsContent value="discover" className="mt-6">
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-medium text-white">Pour vous</h2>
                <button 
                  className="text-audio-accent hover:text-audio-accent-light transition-colors flex items-center gap-1 text-sm"
                  onMouseEnter={() => playSoundEffect('hover')}
                  onClick={() => playSoundEffect('click')}
                >
                  Voir tout <ChevronRight size={14} />
                </button>
              </div>
              
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {popularPlaylists.map((playlist) => (
                  <motion.div
                    key={playlist.id}
                    variants={item}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group relative rounded-lg overflow-hidden"
                    onMouseEnter={() => playSoundEffect('hover')}
                  >
                    <div className="relative aspect-square">
                      <img
                        src={playlist.cover}
                        alt={playlist.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          className="w-12 h-12 rounded-full bg-audio-accent/90 flex items-center justify-center hover:bg-audio-accent transition-colors"
                          onClick={() => playSoundEffect('click')}
                        >
                          <Play size={22} fill="white" className="text-white ml-1" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2.5">
                      <h3 className="text-base font-medium text-white">{playlist.name}</h3>
                      <p className="text-audio-light/60 text-xs">{playlist.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </TabsContent>

          {/* Tab Content: Playlists */}
          <TabsContent value="playlists" className="mt-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-medium text-white">Vos playlists</h2>
              <button
                className="text-audio-accent hover:text-audio-accent-light flex items-center gap-1 transition-colors text-sm"
                onClick={() => {
                  setShowCreatePlaylist(true);
                  playSoundEffect('click');
                }}
                onMouseEnter={() => playSoundEffect('hover')}
              >
                <Plus size={14} />
                Créer
              </button>
            </div>

            {showCreatePlaylist && (
              <motion.div 
                className="mb-6 p-5 rounded-lg bg-audio-surface/20 border border-white/5 backdrop-blur-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-base font-medium mb-3">Nouvelle playlist</h3>
                <input
                  type="text"
                  placeholder="Nom de la playlist"
                  className="bg-audio-surface/30 border border-white/10 text-white rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-audio-accent/50 mb-4 text-sm"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <div className="flex justify-end gap-3">
                  <button
                    className="px-3 py-1.5 rounded-lg text-audio-light/80 hover:text-white transition-colors text-sm"
                    onClick={() => setShowCreatePlaylist(false)}
                  >
                    Annuler
                  </button>
                  <button
                    className="px-3 py-1.5 bg-audio-accent hover:bg-audio-accent-light text-white rounded-lg transition-colors text-sm"
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
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {playlists.map((playlist) => (
                <motion.div
                  key={playlist.id}
                  variants={item}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative rounded-lg overflow-hidden"
                  onMouseEnter={() => playSoundEffect('hover')}
                >
                  <div className="relative aspect-square">
                    <img
                      src={playlist.cover}
                      alt={playlist.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        className="w-12 h-12 rounded-full bg-audio-accent/90 flex items-center justify-center hover:bg-audio-accent transition-colors"
                        onClick={() => playSoundEffect('click')}
                      >
                        <Play size={22} fill="white" className="text-white ml-1" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2.5">
                    <h3 className="text-base font-medium text-white">{playlist.name}</h3>
                    <p className="text-audio-light/60 text-xs">{playlist.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Tab Content: Liked Songs */}
          <TabsContent value="liked" className="mt-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-medium text-white flex items-center gap-2">
                <Heart size={18} className="text-audio-accent" />
                Titres aimés
              </h2>
            </div>

            {likedSongs.length === 0 ? (
              <div className="p-8 rounded-lg bg-audio-surface/20 border border-white/5 backdrop-blur-sm text-center">
                <Disc size={32} className="mx-auto mb-3 text-audio-light/30" />
                <p className="text-audio-light/70 mb-4 text-sm">Vous n'avez pas encore de titres aimés.</p>
                <button 
                  className="px-5 py-2 bg-audio-accent hover:bg-audio-accent-light text-white rounded-full transition-colors text-sm"
                  onClick={() => playSoundEffect('click')}
                >
                  Découvrir des titres
                </button>
              </div>
            ) : (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-2"
              >
                {likedSongs.map((song) => (
                  <motion.div
                    key={song.id}
                    variants={item}
                    className="bg-audio-surface/20 border border-white/5 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 hover:bg-audio-surface/30 transition-colors group"
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  >
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                        <Play size={16} className="text-white" />
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="text-white text-sm font-medium truncate">{song.title}</h3>
                      <p className="text-audio-light/60 text-xs truncate">{song.artist}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                      <span className="text-audio-light/50 text-xs">{song.duration}</span>
                      <Heart size={14} className="text-red-500 fill-red-500" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>

          {/* Tab Content: History */}
          <TabsContent value="history" className="mt-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-medium text-white flex items-center gap-2">
                <Clock size={18} className="text-audio-light/70" />
                Historique d'écoute
              </h2>
            </div>
            
            <div className="p-8 rounded-lg bg-audio-surface/20 border border-white/5 backdrop-blur-sm text-center">
              <HeadphonesIcon size={32} className="mx-auto mb-3 text-audio-light/30" />
              <p className="text-audio-light/70 mb-4 text-sm">Votre historique d'écoute apparaîtra ici.</p>
              <button 
                className="px-5 py-2 bg-audio-accent hover:bg-audio-accent-light text-white rounded-full transition-colors text-sm"
                onClick={() => playSoundEffect('click')}
              >
                Commencer à écouter
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
