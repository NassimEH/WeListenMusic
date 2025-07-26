import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  Download, 
  Upload,
  Layers,
  Share2,
  Save
} from 'lucide-react';
import { useApp, Song, StemTrack, RemixSubmission } from '@/contexts/AppContext';
import { useAudio } from '@/contexts/AudioContext';

interface RemixStudioProps {
  song: Song;
  onClose?: () => void;
}

interface StemPlayerState {
  [stemId: string]: {
    volume: number;
    solo: boolean;
    muted: boolean;
    audioElement?: HTMLAudioElement;
  };
}

const RemixStudio: React.FC<RemixStudioProps> = ({ song, onClose }) => {
  const { getSongStems, addStemTrack, submitRemix } = useApp();
  const { playTrack } = useAudio();
  
  const [stems, setStems] = useState<StemTrack[]>([]);
  const [stemStates, setStemStates] = useState<StemPlayerState>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [masterVolume, setMasterVolume] = useState(80);
  
  // Remix submission form
  const [remixTitle, setRemixTitle] = useState(`${song.title} (Remix)`);
  const [remixDescription, setRemixDescription] = useState('');
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  
  const masterAudioRef = useRef<HTMLAudioElement>(null);
  const timeUpdateIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Load stems for this song
    const songStems = getSongStems(song.id);
    if (songStems.length === 0) {
      // Create default stems if none exist
      const defaultStems: StemTrack[] = [
        {
          id: `${song.id}-vocals`,
          songId: song.id,
          name: 'Vocals',
          audioUrl: song.audioUrl || '/sounds/pop.mp3',
          volume: 80,
          solo: false,
          muted: false
        },
        {
          id: `${song.id}-drums`,
          songId: song.id,
          name: 'Drums',
          audioUrl: '/sounds/click.mp3',
          volume: 75,
          solo: false,
          muted: false
        },
        {
          id: `${song.id}-bass`,
          songId: song.id,
          name: 'Bass',
          audioUrl: '/sounds/swoosh.mp3',
          volume: 70,
          solo: false,
          muted: false
        },
        {
          id: `${song.id}-melody`,
          songId: song.id,
          name: 'Melody',
          audioUrl: '/sounds/hover.mp3',
          volume: 65,
          solo: false,
          muted: false
        }
      ];
      
      defaultStems.forEach(stem => addStemTrack(stem));
      setStems(defaultStems);
    } else {
      setStems(songStems);
    }
  }, [song.id, getSongStems, addStemTrack]);

  useEffect(() => {
    // Initialize stem audio elements and states
    const newStemStates: StemPlayerState = {};
    
    stems.forEach(stem => {
      const audio = new Audio(stem.audioUrl);
      audio.volume = stem.volume / 100;
      audio.loop = true;
      
      newStemStates[stem.id] = {
        volume: stem.volume,
        solo: stem.solo,
        muted: stem.muted,
        audioElement: audio
      };
    });
    
    setStemStates(newStemStates);
    
    return () => {
      // Cleanup audio elements
      Object.values(newStemStates).forEach(state => {
        if (state.audioElement) {
          state.audioElement.pause();
          state.audioElement.src = '';
        }
      });
    };
  }, [stems]);

  const togglePlayback = () => {
    if (isPlaying) {
      // Pause all stems
      Object.values(stemStates).forEach(state => {
        if (state.audioElement) {
          state.audioElement.pause();
        }
      });
      setIsPlaying(false);
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
    } else {
      // Play all non-muted stems
      const hasSolo = Object.values(stemStates).some(state => state.solo);
      
      Object.values(stemStates).forEach(state => {
        if (state.audioElement) {
          const shouldPlay = hasSolo ? state.solo : !state.muted;
          if (shouldPlay) {
            state.audioElement.currentTime = currentTime;
            state.audioElement.play();
          }
        }
      });
      
      setIsPlaying(true);
      
      // Update time
      timeUpdateIntervalRef.current = setInterval(() => {
        const firstAudio = Object.values(stemStates)[0]?.audioElement;
        if (firstAudio) {
          setCurrentTime(firstAudio.currentTime);
          setDuration(firstAudio.duration || 0);
        }
      }, 100);
    }
  };

  const updateStemVolume = (stemId: string, volume: number) => {
    setStemStates(prev => {
      const newState = {
        ...prev,
        [stemId]: { ...prev[stemId], volume }
      };
      
      if (newState[stemId].audioElement) {
        newState[stemId].audioElement!.volume = (volume / 100) * (masterVolume / 100);
      }
      
      return newState;
    });
  };

  const toggleStemMute = (stemId: string) => {
    setStemStates(prev => {
      const newState = {
        ...prev,
        [stemId]: { ...prev[stemId], muted: !prev[stemId].muted }
      };
      
      if (newState[stemId].audioElement) {
        if (newState[stemId].muted) {
          newState[stemId].audioElement!.pause();
        } else if (isPlaying) {
          const hasSolo = Object.values(newState).some(state => state.solo);
          if (!hasSolo || newState[stemId].solo) {
            newState[stemId].audioElement!.play();
          }
        }
      }
      
      return newState;
    });
  };

  const toggleStemSolo = (stemId: string) => {
    setStemStates(prev => {
      const newState = { ...prev };
      const wasSolo = newState[stemId].solo;
      
      // If this was the only solo, turn off solo mode
      // If this wasn't solo, turn on solo mode for this track
      Object.keys(newState).forEach(id => {
        newState[id] = { ...newState[id], solo: id === stemId && !wasSolo };
      });
      
      // Update audio playback
      if (isPlaying) {
        const hasSolo = Object.values(newState).some(state => state.solo);
        Object.entries(newState).forEach(([id, state]) => {
          if (state.audioElement) {
            const shouldPlay = hasSolo ? state.solo : !state.muted;
            if (shouldPlay && state.audioElement.paused) {
              state.audioElement.play();
            } else if (!shouldPlay && !state.audioElement.paused) {
              state.audioElement.pause();
            }
          }
        });
      }
      
      return newState;
    });
  };

  const updateMasterVolume = (volume: number) => {
    setMasterVolume(volume);
    Object.values(stemStates).forEach(state => {
      if (state.audioElement) {
        state.audioElement.volume = (state.volume / 100) * (volume / 100);
      }
    });
  };

  const handleRemixSubmit = () => {
    const remixSubmission: RemixSubmission = {
      id: `remix-${Date.now()}`,
      originalSongId: song.id,
      remixerId: 'current-user', // Should come from auth
      remixerName: 'Current User',
      title: remixTitle,
      description: remixDescription,
      audioUrl: '/sounds/pop.mp3', // Would be generated remix
      stemTrackIds: stems.map(s => s.id),
      createdAt: new Date().toISOString(),
      status: 'pending',
      votes: 0
    };
    
    submitRemix(remixSubmission);
    setShowSubmitDialog(false);
    
    if (onClose) {
      onClose();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <img 
            src={song.cover} 
            alt={song.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-xl font-bold">{song.title} - Remix Studio</h1>
            <p className="text-muted-foreground">by {song.artist}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
            <DialogTrigger asChild>
              <Button variant="default" className="gap-2">
                <Share2 className="w-4 h-4" />
                Submit Remix
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Your Remix</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Remix Title</label>
                  <Input 
                    value={remixTitle}
                    onChange={(e) => setRemixTitle(e.target.value)}
                    placeholder="Enter remix title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    value={remixDescription}
                    onChange={(e) => setRemixDescription(e.target.value)}
                    placeholder="Describe your remix..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleRemixSubmit} className="w-full">
                  Submit Remix
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      {/* Master Controls */}
      <div className="p-6 bg-white/30 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={togglePlayback}
              size="lg"
              className="rounded-full w-12 h-12"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <div className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Volume2 className="w-4 h-4" />
            <div className="w-32">
              <Slider
                value={[masterVolume]}
                onValueChange={(value) => updateMasterVolume(value[0])}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <span className="text-sm w-8">{masterVolume}</span>
          </div>
        </div>
      </div>

      {/* Stem Tracks */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid gap-4">
          {stems.map((stem) => {
            const state = stemStates[stem.id];
            if (!state) return null;

            return (
              <Card key={stem.id} className="bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1">
                        <Button
                          variant={state.solo ? "default" : "outline"}
                          size="sm"
                          className="w-12 h-8 text-xs"
                          onClick={() => toggleStemSolo(stem.id)}
                        >
                          SOLO
                        </Button>
                        <Button
                          variant={state.muted ? "destructive" : "outline"}
                          size="sm"
                          className="w-12 h-8 text-xs"
                          onClick={() => toggleStemMute(stem.id)}
                        >
                          {state.muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Layers className="w-5 h-5 text-purple-600" />
                        <div>
                          <h3 className="font-medium">{stem.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {stem.name.toLowerCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <div className="w-32">
                        <Slider
                          value={[state.volume]}
                          onValueChange={(value) => updateStemVolume(stem.id, value[0])}
                          max={100}
                          step={1}
                          className="w-full"
                          disabled={state.muted}
                        />
                      </div>
                      <span className="text-sm w-8 text-muted-foreground">{state.volume}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RemixStudio;
