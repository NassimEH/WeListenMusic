import React, { createContext, useContext, useEffect } from 'react';
import { useAudioPlayer, AudioTrack } from '../hooks/useAudioPlayer';

interface AudioContextType extends ReturnType<typeof useAudioPlayer> {
  // Additional global audio features
  isGlobalPlayerVisible: boolean;
  showGlobalPlayer: () => void;
  hideGlobalPlayer: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audioPlayer = useAudioPlayer();
  const [isGlobalPlayerVisible, setIsGlobalPlayerVisible] = React.useState(false);

  // Show global player when a track is loaded
  useEffect(() => {
    if (audioPlayer.currentTrack) {
      setIsGlobalPlayerVisible(true);
    }
  }, [audioPlayer.currentTrack]);

  const showGlobalPlayer = () => setIsGlobalPlayerVisible(true);
  const hideGlobalPlayer = () => setIsGlobalPlayerVisible(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Space bar for play/pause (when not in input)
      if (event.code === 'Space' && 
          !(event.target as HTMLElement)?.matches('input, textarea, [contenteditable]')) {
        event.preventDefault();
        audioPlayer.togglePlayPause();
      }
      
      // Arrow keys for seeking (when not in input)
      if (event.code === 'ArrowLeft' && 
          !(event.target as HTMLElement)?.matches('input, textarea, [contenteditable]')) {
        event.preventDefault();
        const newTime = Math.max(0, audioPlayer.state.currentTime - 10);
        audioPlayer.seek(newTime);
      }
      
      if (event.code === 'ArrowRight' && 
          !(event.target as HTMLElement)?.matches('input, textarea, [contenteditable]')) {
        event.preventDefault();
        const newTime = Math.min(audioPlayer.state.duration, audioPlayer.state.currentTime + 10);
        audioPlayer.seek(newTime);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [audioPlayer]);

  const contextValue: AudioContextType = {
    ...audioPlayer,
    isGlobalPlayerVisible,
    showGlobalPlayer,
    hideGlobalPlayer,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
