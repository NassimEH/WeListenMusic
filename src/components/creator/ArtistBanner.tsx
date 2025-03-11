
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Music, Clock, PlayCircle, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArtistBannerProps {
  name: string;
  image: string;
  bio: string;
  stats: {
    followers: string;
    tracks: number;
    albums: number;
    monthlyListeners: string;
  };
}

const ArtistBanner: React.FC<ArtistBannerProps> = ({ name, image, bio, stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8 overflow-hidden rounded-xl"
    >
      {/* Background Image with Gradient Overlay */}
      <div className="relative h-64 md:h-80">
        <div className="absolute inset-0">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-audio-dark via-audio-dark/80 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            {/* Artist Image */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Artist Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-audio-light/60 mb-1">
                <span className="uppercase tracking-wider">Artiste vérifié</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-audio-light mb-2">{name}</h1>
              <div className="flex items-center gap-4 text-sm text-audio-light/60">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{stats.followers} abonnés</span>
                </div>
                <div className="flex items-center gap-1">
                  <Music size={14} />
                  <span>{stats.tracks} titres</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{stats.monthlyListeners} écoutes mensuelles</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm"
                className="border-audio-accent/30 text-audio-accent hover:bg-audio-accent/10 hover:text-audio-accent-light rounded-full"
              >
                <Share2 size={16} className="mr-1" />
                Partager
              </Button>
              <Button 
                size="sm"
                className="bg-transparent border border-white/10 hover:bg-white/10 text-white rounded-full"
              >
                <Heart size={16} className="mr-1" />
                Suivre
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Artist Bio */}
      <div className="p-6 bg-transparent backdrop-blur-sm rounded-b-xl border-t border-white/5">
        <div className="flex justify-between items-start">
          <div className="max-w-2xl">
            <h3 className="text-sm font-medium text-audio-light/80 mb-2">À propos</h3>
            <p className="text-sm text-audio-light/60">{bio}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="border-audio-accent/30 bg-transparent text-audio-accent hover:bg-audio-accent/10 hover:text-audio-accent-light rounded-full hidden md:flex"
          >
            <PlayCircle size={16} className="mr-1" />
            Lecture aléatoire
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistBanner;
