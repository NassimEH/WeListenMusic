import { useState, useRef, useEffect, useCallback } from 'react';

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl?: string;
  duration: number;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
}

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [queue, setQueue] = useState<AudioTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 80,
    isLoading: false,
    isReady: false,
    error: null,
  });

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    // Audio event listeners
    const updateTime = () => {
      setState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
      }));
    };

    const handleLoadStart = () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
    };

    const handleLoadedData = () => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isReady: true,
        duration: audio.duration || 0,
      }));
    };

    const handleError = () => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isReady: false,
        error: 'Erreur de chargement du fichier audio',
      }));
    };

    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
      // Auto-play next track
      playNext();
    };

    const handlePlay = () => {
      setState(prev => ({ ...prev, isPlaying: true }));
    };

    const handlePause = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
    };
  }, []);

  // Load track
  const loadTrack = useCallback((track: AudioTrack) => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTrack(track);
    audio.src = track.audioUrl;
    audio.volume = state.volume / 100;
    audio.load();
  }, [state.volume]);

  // Play/Pause
  const togglePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    try {
      if (state.isPlaying) {
        await audio.pause();
      } else {
        await audio.play();
      }
    } catch (error) {
      console.error('Playback error:', error);
      setState(prev => ({
        ...prev,
        error: 'Erreur de lecture audio',
      }));
    }
  }, [state.isPlaying, currentTrack]);

  // Seek
  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setState(prev => ({ ...prev, currentTime: time }));
  }, []);

  // Set volume
  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const clampedVolume = Math.max(0, Math.min(100, volume));
    audio.volume = clampedVolume / 100;
    setState(prev => ({ ...prev, volume: clampedVolume }));
  }, []);

  // Queue management
  const addToQueue = useCallback((tracks: AudioTrack[]) => {
    setQueue(prev => [...prev, ...tracks]);
  }, []);

  const playTrack = useCallback((track: AudioTrack, trackQueue?: AudioTrack[]) => {
    if (trackQueue) {
      setQueue(trackQueue);
      const index = trackQueue.findIndex(t => t.id === track.id);
      setCurrentIndex(index >= 0 ? index : 0);
    }
    loadTrack(track);
  }, [loadTrack]);

  const playNext = useCallback(() => {
    if (queue.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentIndex(nextIndex);
    loadTrack(queue[nextIndex]);
  }, [queue, currentIndex, loadTrack]);

  const playPrevious = useCallback(() => {
    if (queue.length === 0) return;
    
    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    loadTrack(queue[prevIndex]);
  }, [queue, currentIndex, loadTrack]);

  // Format time helper
  const formatTime = useCallback((seconds: number) => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    // State
    currentTrack,
    queue,
    state,
    
    // Actions
    playTrack,
    togglePlayPause,
    playNext,
    playPrevious,
    seek,
    setVolume,
    addToQueue,
    
    // Helpers
    formatTime,
    
    // Computed
    canPlayNext: queue.length > 0 && currentIndex < queue.length - 1,
    canPlayPrevious: queue.length > 0 && currentIndex > 0,
    progress: state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0,
  };
};
