
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { playSoundEffect } from '@/utils/soundEffects';
import { useApp } from '@/contexts/AppContext';

const AppPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const { isSongLiked, toggleLikeSong } = useApp();
  
  // Mock current song
  const currentSong = {
    id: 'song1',
    title: 'Ultra',
    artist: 'Booba',
    album: 'Ultra',
    cover: 'https://img.lemde.fr/2021/03/05/1541/0/3648/1820/1440/720/60/0/99c9700_792435352-ultra-selection-raw17.jpg',
    duration: '3:45'
  };
  
  const totalSeconds = 225; // 3:45 in seconds
  const progress = (currentTime / totalSeconds) * 100;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handlePlayPause = () => {
    playSoundEffect('click');
    setIsPlaying(!isPlaying);
  };
  
  const handleLike = () => {
    playSoundEffect('pop');
    toggleLikeSong(currentSong);
  };
  
  return (
    <div className="h-20 bg-black/40 backdrop-blur-lg border-t border-white/5 px-4 flex items-center">
      {/* Currently Playing */}
      <div className="flex items-center gap-4 w-1/4">
        <img 
          src={currentSong.cover} 
          alt={currentSong.title} 
          className="h-12 w-12 rounded object-cover"
        />
        <div>
          <p className="font-medium text-sm">{currentSong.title}</p>
          <p className="text-xs text-audio-light/70">{currentSong.artist}</p>
        </div>
        <button 
          onClick={handleLike}
          className={cn(
            "p-1.5 rounded-full transition-colors",
            isSongLiked(currentSong.id) ? "text-pink-500" : "text-audio-light/60 hover:text-audio-light"
          )}
        >
          <Heart size={16} fill={isSongLiked(currentSong.id) ? "currentColor" : "none"} />
        </button>
      </div>
      
      {/* Controls */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center gap-6">
          <button 
            className="text-audio-light/70 hover:text-audio-light transition-colors"
            onClick={() => playSoundEffect('click')}
          >
            <SkipBack size={20} />
          </button>
          <button 
            className="w-8 h-8 rounded-full bg-audio-light flex items-center justify-center text-audio-dark"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
          <button 
            className="text-audio-light/70 hover:text-audio-light transition-colors"
            onClick={() => playSoundEffect('click')}
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="w-full max-w-md flex items-center gap-2 mt-2">
          <span className="text-xs text-audio-light/70">{formatTime(currentTime)}</span>
          <div className="flex-1">
            <Slider 
              value={[progress]} 
              max={100} 
              step={1}
              className="cursor-pointer"
              onValueChange={(value) => {
                const newTime = (value[0] / 100) * totalSeconds;
                setCurrentTime(newTime);
              }}
            />
          </div>
          <span className="text-xs text-audio-light/70">{currentSong.duration}</span>
        </div>
      </div>
      
      {/* Volume */}
      <div className="w-1/4 flex justify-end items-center gap-2">
        <Volume2 size={18} className="text-audio-light/70" />
        <Slider 
          value={[volume]} 
          max={100} 
          step={1}
          className="w-24 cursor-pointer"
          onValueChange={(value) => setVolume(value[0])}
        />
      </div>
    </div>
  );
};

export default AppPlayer;
