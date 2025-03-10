
import React, { useEffect } from 'react';
import AppLayout from '@/components/app/AppLayout';
import { cn } from '@/lib/utils';
import { Play, Clock, BarChart2, Heart } from 'lucide-react';
import { playSoundEffect } from '@/utils/soundEffects';
import { motion } from 'framer-motion';

// Mock data for UI
const recentlyPlayed = [
  { id: '1', title: 'Not Afraid', artist: 'Eminem', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop' },
  { id: '2', title: 'SICKO MODE', artist: 'Travis Scott', cover: 'https://images.unsplash.com/photo-1516900448138-898720b936c7?q=80&w=300&auto=format&fit=crop' },
  { id: '3', title: 'HUMBLE.', artist: 'Kendrick Lamar', cover: 'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=300&auto=format&fit=crop' },
  { id: '4', title: 'Lunatic', artist: 'Booba', cover: 'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?q=80&w=300&auto=format&fit=crop' },
  { id: '5', title: 'Without Me', artist: 'Eminem', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop' },
  { id: '6', title: 'DKR', artist: 'Booba', cover: 'https://images.unsplash.com/photo-1501839214096-ffbcca84dfba?q=80&w=300&auto=format&fit=crop' },
];

const recommendedPlaylists = [
  { id: '1', name: 'Rap Français', description: 'Les nouveautés du rap game français', cover: 'https://images.unsplash.com/photo-1621145017244-b5c8339e23dd?q=80&w=300&auto=format&fit=crop' },
  { id: '2', name: 'Hip Hop USA', description: 'Le meilleur du rap américain', cover: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=300&auto=format&fit=crop' },
  { id: '3', name: 'Workout Mix', description: 'Pour booster vos sessions', cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=300&auto=format&fit=crop' },
  { id: '4', name: 'Ambiance Soirée', description: 'Playlist parfaite pour vos fêtes', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop' },
];

const popularArtists = [
  { id: '1', name: 'Eminem', image: 'https://images.unsplash.com/photo-1535931737580-a99567967ddc?q=80&w=300&auto=format&fit=crop' },
  { id: '2', name: 'Booba', image: 'https://images.unsplash.com/photo-1584048333538-90f8670661ab?q=80&w=300&auto=format&fit=crop' },
  { id: '3', name: 'Kendrick Lamar', image: 'https://images.unsplash.com/photo-1621789098261-6d49f1439d35?q=80&w=300&auto=format&fit=crop' },
  { id: '4', name: 'Drake', image: 'https://images.unsplash.com/photo-1545128485-c400ce7b6892?q=80&w=300&auto=format&fit=crop' },
  { id: '5', name: 'Orelsan', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop' },
  { id: '6', name: 'Mme Melis', image: 'https://images.unsplash.com/photo-1658215910511-c231545c5666?q=80&w=300&auto=format&fit=crop' },
];

const ConsumerDashboard = () => {
  // Animation variants for staggered animations
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
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <AppLayout headerTitle="Accueil">
      <div className="pb-24">
        {/* Greeting */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-6 pb-8"
        >
          <h1 className="text-3xl font-bold">Bonjour</h1>
          <p className="text-audio-light/70 mt-1">Voici vos recommandations pour aujourd'hui</p>
        </motion.div>
        
        {/* Recently played */}
        <motion.section 
          initial="hidden"
          animate="show"
          variants={container}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Écoutés récemment</h2>
            <a 
              href="#" 
              className="text-audio-light/60 hover:text-audio-light text-sm transition-colors"
              onClick={() => playSoundEffect('hover')}
            >
              Voir tout
            </a>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentlyPlayed.map((track) => (
              <motion.div
                key={track.id}
                variants={item}
                className="bg-audio-surface/20 backdrop-blur-sm rounded-lg p-4 transition-all hover:bg-audio-surface/40 hover-scale"
                onClick={() => playSoundEffect('click')}
              >
                <div className="relative group mb-3 aspect-square rounded-md overflow-hidden">
                  <img 
                    src={track.cover} 
                    alt={track.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <button className="absolute right-2 bottom-2 w-10 h-10 bg-audio-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <Play size={20} fill="white" />
                  </button>
                </div>
                <h3 className="font-medium truncate">{track.title}</h3>
                <p className="text-sm text-audio-light/70 truncate">{track.artist}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Recommended playlists */}
        <motion.section 
          initial="hidden"
          animate="show"
          variants={container}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Playlists recommandées</h2>
            <a 
              href="#" 
              className="text-audio-light/60 hover:text-audio-light text-sm transition-colors"
              onClick={() => playSoundEffect('hover')}
            >
              Voir tout
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedPlaylists.map((playlist) => (
              <motion.div
                key={playlist.id}
                variants={item}
                className="bg-audio-surface/20 backdrop-blur-sm rounded-lg overflow-hidden transition-all hover:bg-audio-surface/40 hover-scale"
                onClick={() => playSoundEffect('click')}
              >
                <div className="relative group aspect-video">
                  <img 
                    src={playlist.cover} 
                    alt={playlist.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-lg mb-1">{playlist.name}</h3>
                      <p className="text-sm text-audio-light/70 line-clamp-2">{playlist.description}</p>
                    </div>
                  </div>
                  <button className="absolute right-4 top-4 w-12 h-12 bg-audio-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <Play size={24} fill="white" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Popular artists */}
        <motion.section 
          initial="hidden"
          animate="show"
          variants={container}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Artistes populaires</h2>
            <a 
              href="#" 
              className="text-audio-light/60 hover:text-audio-light text-sm transition-colors"
              onClick={() => playSoundEffect('hover')}
            >
              Voir tout
            </a>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularArtists.map((artist) => (
              <motion.div
                key={artist.id}
                variants={item}
                className="flex flex-col items-center text-center hover-scale"
                onClick={() => playSoundEffect('click')}
              >
                <div className="relative group mb-3 w-full aspect-square">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="font-medium">{artist.name}</h3>
                <p className="text-xs text-audio-light/70">Artiste</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </AppLayout>
  );
};

export default ConsumerDashboard;
