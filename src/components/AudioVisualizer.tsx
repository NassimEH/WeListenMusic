import React, { useRef, useEffect, useState } from 'react';

interface AudioVisualizerProps {
  audioUrl?: string;
  isPlaying?: boolean;
  currentTime?: number;
  className?: string;
  height?: number;
  barCount?: number;
  color?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  audioUrl,
  isPlaying = false,
  currentTime = 0,
  className = '',
  height = 60,
  barCount = 50,
  color = '#ec4899',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number>();
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(barCount));

  // Initialize Web Audio API
  useEffect(() => {
    if (!audioUrl) return;

    const initializeAudio = async () => {
      try {
        // Create audio context
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Create analyser
        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = barCount * 4; // More detailed frequency data
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;

        // Connect to audio element (will be connected when audio starts playing)
        setAudioData(new Uint8Array(analyser.frequencyBinCount));
      } catch (error) {
        console.error('Error initializing Web Audio API:', error);
      }
    };

    initializeAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioUrl, barCount]);

  // Connect audio source when playing starts
  useEffect(() => {
    if (!isPlaying || !audioContextRef.current || !analyserRef.current) return;

    const connectAudioSource = () => {
      try {
        const audioElements = document.querySelectorAll('audio');
        const activeAudio = Array.from(audioElements).find(audio => !audio.paused);
        
        if (activeAudio && !sourceRef.current) {
          sourceRef.current = audioContextRef.current!.createMediaElementSource(activeAudio);
          sourceRef.current.connect(analyserRef.current!);
          analyserRef.current!.connect(audioContextRef.current!.destination);
        }
      } catch (error) {
        console.error('Error connecting audio source:', error);
      }
    };

    // Small delay to ensure audio element is ready
    const timeout = setTimeout(connectAudioSource, 100);
    return () => clearTimeout(timeout);
  }, [isPlaying]);

  // Animation loop
  const updateVisualization = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bars
    const barWidth = canvas.width / barCount;
    const maxBarHeight = canvas.height;

    for (let i = 0; i < barCount; i++) {
      const dataIndex = Math.floor((i / barCount) * bufferLength);
      const barHeight = (dataArray[dataIndex] / 255) * maxBarHeight;
      
      const x = i * barWidth;
      const y = canvas.height - barHeight;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, color + '40'); // 25% opacity at bottom
      gradient.addColorStop(0.5, color + '80'); // 50% opacity at middle
      gradient.addColorStop(1, color); // Full opacity at top

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    }

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateVisualization);
    }
  };

  // Start/stop animation based on playing state
  useEffect(() => {
    if (isPlaying) {
      updateVisualization();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  // Static waveform when not playing
  const drawStaticWaveform = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / barCount;
    const maxBarHeight = canvas.height;

    for (let i = 0; i < barCount; i++) {
      // Create pseudo-random waveform based on position
      const normalizedPosition = i / barCount;
      const wave1 = Math.sin(normalizedPosition * Math.PI * 4) * 0.3;
      const wave2 = Math.sin(normalizedPosition * Math.PI * 8) * 0.2;
      const wave3 = Math.sin(normalizedPosition * Math.PI * 16) * 0.1;
      const barHeight = ((wave1 + wave2 + wave3 + 0.6) / 1.6) * maxBarHeight * 0.4;
      
      const x = i * barWidth;
      const y = canvas.height - barHeight;

      ctx.fillStyle = color + '30'; // 20% opacity for static waveform
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    }
  };

  // Draw static waveform when component mounts or audio changes
  useEffect(() => {
    if (!isPlaying) {
      drawStaticWaveform();
    }
  }, [audioUrl, barCount, color]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={800}
        height={height}
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {!audioUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/40 text-sm">Aucun audio chargé</p>
        </div>
      )}
    </div>
  );
};
