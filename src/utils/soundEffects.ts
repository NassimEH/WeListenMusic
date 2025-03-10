
// Sound effect utility for playing audio effects throughout the app

/**
 * Play a sound effect from the public sounds directory
 * @param sound The name of the sound file without extension
 * @param volume Volume level between 0 and 1
 */
export const playSoundEffect = (sound: 'click' | 'hover' | 'pop' | 'swoosh' | 'blip', volume: number = 0.3) => {
  try {
    const audio = new Audio(`/sounds/${sound}.mp3`);
    audio.volume = volume;
    audio.play().catch(e => {
      console.log('Error playing sound:', e);
    });
  } catch (error) {
    console.log('Error with sound effect:', error);
  }
};

// Named convenience functions
export const playClickSound = () => playSoundEffect('click');
export const playHoverSound = () => playSoundEffect('hover');
export const playPopSound = () => playSoundEffect('pop');
export const playSwooshSound = () => playSoundEffect('swoosh');
export const playBlipSound = () => playSoundEffect('blip', 0.2);

// Create a synthetic sound effect for synth blips (fallback if audio file not available)
export const playSynthBlip = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.log('Error with synthetic sound:', error);
  }
};
