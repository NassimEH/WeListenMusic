
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause, SkipForward, SkipBack, Volume2, Repeat, Shuffle, Heart, Share2, Maximize2 } from 'lucide-react';
import { playSoundEffect } from '@/utils/soundEffects';
import { useApp } from '@/contexts/AppContext';

const AppPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const { toggleLikeSong, isSongLiked } = useApp();
  
  // Mock current song for UI purposes
  const currentSong = {
    id: 'song-1',
    title: 'Lose Yourself',
    artist: 'Eminem',
    album: 'The Eminem Show',
    cover: 'https://images.unsplash.com/photo-1621145017244-b5c8339e23dd?q=80&w=500&auto=format&fit=crop',
    duration: '4:32'
  };
  
  const togglePlayback = () => {
    playSoundEffect('click');
    setIsPlaying(!isPlaying);
  };
  
  const toggleSize = () => {
    playSoundEffect('pop');
    setIsMinimized(!isMinimized);
  };
  
  const handleLike = () => {
    playSoundEffect('pop');
    toggleLikeSong(currentSong);
  };
  
  const isLiked = isSongLiked(currentSong.id);
  
  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-spring",
        isMinimized 
          ? "h-16 md:h-20" 
          : "h-72 md:h-96"
      )}
    >
      {/* Background blur */}
      <div className="absolute inset-0 glass"></div>
      
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-audio-light/10">
        <div 
          className="h-full bg-audio-accent"
          style={{ width: '38%' }}
        />
      </div>
      
      <div className="container mx-auto h-full max-w-7xl px-4">
        {/* Compact player - always visible */}
        <div className="h-16 md:h-20 flex items-center justify-between">
          {/* Song info */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded overflow-hidden">
              <img 
                src={currentSong.cover} 
                alt="Cover art" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <h4 className="font-medium">{currentSong.title}</h4>
              <p className="text-sm text-audio-light/70">{currentSong.artist}</p>
            </div>
            <button 
              onClick={handleLike}
              className={cn(
                "p-1.5 rounded-full transition-colors ml-2",
                isLiked ? "text-audio-accent" : "text-audio-light/60 hover:text-audio-light"
              )}
            >
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2 md:gap-6">
            <button className="p-2 text-audio-light/80 hover:text-audio-light rounded-full transition-colors hidden md:block">
              <Shuffle size={18} />
            </button>
            <button 
              className="p-2 text-audio-light/80 hover:text-audio-light rounded-full transition-colors"
              onClick={() => playSoundEffect('click')}
            >
              <SkipBack size={20} />
            </button>
            <button 
              onClick={togglePlayback}
              className="w-10 h-10 rounded-full bg-audio-accent flex items-center justify-center hover:bg-audio-accent-light transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} fill="white" />}
            </button>
            <button 
              className="p-2 text-audio-light/80 hover:text-audio-light rounded-full transition-colors"
              onClick={() => playSoundEffect('click')}
            >
              <SkipForward size={20} />
            </button>
            <button className="p-2 text-audio-light/80 hover:text-audio-light rounded-full transition-colors hidden md:block">
              <Repeat size={18} />
            </button>
            
            {/* Progress text */}
            <div className="text-xs text-audio-light/70 hidden md:block">
              1:47 / {currentSong.duration}
            </div>
          </div>
          
          {/* Volume and expand */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Volume2 size={18} className="text-audio-light/70" />
              <div className="w-24 h-1 bg-audio-light/10 rounded-full">
                <div className="h-full w-3/4 bg-audio-light/50 rounded-full"></div>
              </div>
            </div>
            <button 
              onClick={toggleSize}
              className="p-2 text-audio-light/80 hover:text-audio-light rounded-full transition-colors"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
        
        {/* Expanded view */}
        <div 
          className={cn(
            "h-[calc(100%-5rem)] flex-col justify-between transition-opacity",
            isMinimized ? "hidden" : "flex"
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full py-4">
            {/* Cover art */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-xs aspect-square">
                <img 
                  src={currentSong.cover} 
                  alt="Album cover"
                  className="w-full h-full object-cover rounded-xl shadow-soft"
                />
                <div 
                  className="absolute -inset-4 rounded-full opacity-20 blur-3xl -z-10"
                  style={{ background: 'linear-gradient(45deg, #0EA5E9, #8B5CF6)' }}
                ></div>
              </div>
            </div>
            
            {/* Song details and lyrics */}
            <div className="col-span-2 flex flex-col justify-between overflow-hidden">
              <div>
                <h3 className="text-2xl font-bold mb-1">{currentSong.title}</h3>
                <p className="text-audio-light/70 mb-6">{currentSong.artist} - {currentSong.album}</p>
                
                <div className="max-h-40 overflow-y-auto text-audio-light/60 pr-4 leading-relaxed">
                  <p className="mb-2">Look, if you had one shot, or one opportunity</p>
                  <p className="mb-2">To seize everything you ever wanted, in one moment</p>
                  <p className="mb-2">Would you capture it, or just let it slip?</p>
                  <p className="mb-2 text-audio-light font-medium">His palms are sweaty, knees weak, arms are heavy</p>
                  <p className="mb-2 text-audio-light font-medium">There's vomit on his sweater already, mom's spaghetti</p>
                  <p className="mb-2">He's nervous, but on the surface he looks calm and ready</p>
                  <p className="mb-2">To drop bombs, but he keeps on forgetting</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <div className="flex justify-between text-xs text-audio-light/70">
                  <span>1:47</span>
                  <span>{currentSong.duration}</span>
                </div>
                <div className="h-1.5 bg-audio-light/10 rounded-full">
                  <div 
                    className="h-full bg-gradient-audio rounded-full"
                    style={{ width: '38%' }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handleLike}
                      className={cn(
                        "p-2 rounded-full transition-colors",
                        isLiked ? "text-audio-accent" : "text-audio-light/60 hover:text-audio-light"
                      )}
                      aria-label={isLiked ? "Unlike" : "Like"}
                    >
                      <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                    <button 
                      className="p-2 text-audio-light/60 hover:text-audio-light rounded-full transition-colors"
                      aria-label="Share"
                      onClick={() => playSoundEffect('pop')}
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      className="p-2 text-audio-light/60 hover:text-audio-light rounded-full transition-colors"
                      aria-label="Shuffle"
                      onClick={() => playSoundEffect('pop')}
                    >
                      <Shuffle size={20} />
                    </button>
                    <button 
                      className="p-2 text-audio-light/60 hover:text-audio-light rounded-full transition-colors"
                      aria-label="Repeat"
                      onClick={() => playSoundEffect('pop')}
                    >
                      <Repeat size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPlayer;
