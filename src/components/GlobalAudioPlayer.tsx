import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, X, Maximize2 } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { AudioVisualizer } from './AudioVisualizer';
import { Badge } from './ui/badge';

interface GlobalAudioPlayerProps {
  className?: string;
}

export const GlobalAudioPlayer: React.FC<GlobalAudioPlayerProps> = ({
  className = '',
}) => {
  const {
    currentTrack,
    state,
    togglePlayPause,
    playNext,
    playPrevious,
    seek,
    setVolume,
    formatTime,
    canPlayNext,
    canPlayPrevious,
    progress,
    isGlobalPlayerVisible,
    hideGlobalPlayer,
  } = useAudio();

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showVisualizer, setShowVisualizer] = React.useState(true);

  if (!isGlobalPlayerVisible || !currentTrack) {
    return null;
  }

  const handleProgressChange = (value: number[]) => {
    const newTime = (value[0] / 100) * state.duration;
    seek(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const toggleMute = () => {
    setVolume(state.volume > 0 ? 0 : 80);
  };

  return (
    <>
      {/* Overlay when expanded */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" onClick={() => setIsExpanded(false)} />
      )}

      {/* Global Player */}
      <div className={`
        fixed bottom-0 left-0 right-0 z-50 
        bg-gradient-to-r from-black/95 via-purple-900/20 to-black/95 
        backdrop-blur-xl border-t border-white/10 
        transition-all duration-300 ease-out
        ${isExpanded ? 'h-96' : 'h-24'}
        ${className}
      `}>
        
        {/* Visualizer (when expanded) */}
        {isExpanded && showVisualizer && (
          <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
            <AudioVisualizer
              audioUrl={currentTrack.audioUrl}
              isPlaying={state.isPlaying}
              currentTime={state.currentTime}
              height={128}
              barCount={80}
              color="#ec4899"
              className="w-full h-full opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
          </div>
        )}

        <div className="relative h-full flex flex-col">
          {/* Expanded Content */}
          {isExpanded && (
            <div className="flex-1 px-6 pt-20 pb-4">
              <div className="max-w-2xl mx-auto text-center">
                {/* Large Album Art */}
                <div className="w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl">
                  {currentTrack.coverUrl ? (
                    <img
                      src={currentTrack.coverUrl}
                      alt={currentTrack.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>

                {/* Track Info */}
                <h2 className="text-2xl font-bold text-white mb-2">
                  {currentTrack.title}
                </h2>
                <p className="text-lg text-white/70 mb-6">
                  {currentTrack.artist}
                </p>

                {/* Extended Progress */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm text-white/60 min-w-[40px]">
                    {formatTime(state.currentTime)}
                  </span>
                  
                  <div className="flex-1">
                    <Slider
                      value={[progress]}
                      onValueChange={handleProgressChange}
                      max={100}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  
                  <span className="text-sm text-white/60 min-w-[40px]">
                    {formatTime(state.duration)}
                  </span>
                </div>

                {/* Large Controls */}
                <div className="flex items-center justify-center gap-6">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={playPrevious}
                    disabled={!canPlayPrevious}
                    className="text-white/60 hover:text-white disabled:opacity-30 w-12 h-12"
                  >
                    <SkipBack className="w-6 h-6" />
                  </Button>

                  <Button
                    onClick={togglePlayPause}
                    disabled={state.isLoading || !state.isReady}
                    className="w-16 h-16 rounded-full bg-white hover:bg-white/90 text-black transition-all hover:scale-105"
                  >
                    {state.isLoading ? (
                      <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : state.isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-1" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={playNext}
                    disabled={!canPlayNext}
                    className="text-white/60 hover:text-white disabled:opacity-30 w-12 h-12"
                  >
                    <SkipForward className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Compact Player */}
          <div className={`${isExpanded ? 'border-t border-white/10' : ''}`}>
            <div className="px-4 py-3">
              <div className="flex items-center gap-4">
                {/* Track Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {currentTrack.coverUrl ? (
                      <img
                        src={currentTrack.coverUrl}
                        alt={currentTrack.title}
                        className="w-14 h-14 rounded-lg object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-medium truncate text-sm">
                      {currentTrack.title}
                    </h3>
                    <p className="text-white/60 text-xs truncate">
                      {currentTrack.artist}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-pink-400 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                {/* Compact Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={playPrevious}
                    disabled={!canPlayPrevious}
                    className="text-white/60 hover:text-white disabled:opacity-30"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>

                  <Button
                    onClick={togglePlayPause}
                    disabled={state.isLoading || !state.isReady}
                    className="w-10 h-10 rounded-full bg-white hover:bg-white/90 text-black transition-all hover:scale-105"
                  >
                    {state.isLoading ? (
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : state.isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={playNext}
                    disabled={!canPlayNext}
                    className="text-white/60 hover:text-white disabled:opacity-30"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white/60 hover:text-white"
                  >
                    {state.volume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </Button>
                  
                  <div className="w-20">
                    <Slider
                      value={[state.volume]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={hideGlobalPlayer}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Compact Progress Bar */}
              {!isExpanded && (
                <div className="mt-2">
                  <Slider
                    value={[progress]}
                    onValueChange={handleProgressChange}
                    max={100}
                    step={0.1}
                    className="w-full h-1"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status */}
        {state.error && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <Badge variant="destructive" className="text-xs">
              {state.error}
            </Badge>
          </div>
        )}
      </div>
    </>
  );
};
