import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, MoreHorizontal } from 'lucide-react';
import { useAudioPlayer, AudioTrack } from '../hooks/useAudioPlayer';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

interface FunctionalAudioPlayerProps {
  currentTrack?: AudioTrack;
  playlist?: AudioTrack[];
  className?: string;
}

export const FunctionalAudioPlayer: React.FC<FunctionalAudioPlayerProps> = ({
  currentTrack: initialTrack,
  playlist = [],
  className = '',
}) => {
  const {
    currentTrack,
    state,
    playTrack,
    togglePlayPause,
    playNext,
    playPrevious,
    seek,
    setVolume,
    formatTime,
    canPlayNext,
    canPlayPrevious,
    progress,
  } = useAudioPlayer();

  // Auto-load initial track
  React.useEffect(() => {
    if (initialTrack && playlist.length > 0) {
      playTrack(initialTrack, playlist);
    }
  }, [initialTrack, playlist, playTrack]);

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

  if (!currentTrack) {
    return (
      <div className={`bg-black/90 backdrop-blur-lg border-t border-white/10 p-4 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center text-white/60">
            <p>Aucun morceau sélectionné</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-black/90 backdrop-blur-lg border-t border-white/10 p-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {currentTrack.coverUrl ? (
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
            )}
            
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-medium truncate">
                {currentTrack.title}
              </h3>
              <p className="text-white/60 text-sm truncate">
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

          {/* Controls */}
          <div className="flex flex-col items-center gap-2">
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

            {/* Progress Bar */}
            <div className="flex items-center gap-2 w-96">
              <span className="text-xs text-white/60 w-10 text-right">
                {formatTime(state.currentTime)}
              </span>
              
              <div className="flex-1">
                {state.isReady ? (
                  <Slider
                    value={[progress]}
                    onValueChange={handleProgressChange}
                    max={100}
                    step={0.1}
                    className="w-full"
                  />
                ) : (
                  <Skeleton className="w-full h-2 bg-white/10" />
                )}
              </div>
              
              <span className="text-xs text-white/60 w-10">
                {formatTime(state.duration)}
              </span>
            </div>
          </div>

          {/* Volume & Extra */}
          <div className="flex items-center gap-3">
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

            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Status indicators */}
        {state.error && (
          <div className="mt-2 text-center">
            <Badge variant="destructive" className="text-xs">
              {state.error}
            </Badge>
          </div>
        )}

        {state.isLoading && (
          <div className="mt-2 text-center">
            <Badge variant="secondary" className="text-xs">
              Chargement...
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};
