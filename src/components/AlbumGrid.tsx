import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Heart, Music, Clock } from 'lucide-react';
import { useApp, Song } from '@/contexts/AppContext';
import { useAudio } from '@/contexts/AudioContext';
import { SocialActions } from './SocialActions';
import { AudioTrack } from '@/hooks/useAudioPlayer';

interface AlbumGridProps {
  onSongSelect?: (song: Song) => void;
}

const formatDuration = (duration: string | number): string => {
  if (typeof duration === 'string') {
    return duration; // Already formatted like "3:15"
  }
  const minutes = Math.floor(duration / 60);
  const remainingSeconds = duration % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const AlbumGrid: React.FC<AlbumGridProps> = ({ onSongSelect }) => {
  const [loading, setLoading] = useState(true);
  const { songs } = useApp();
  const { playTrack, currentTrack, addToQueue } = useAudio();

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handlePlaySong = (song: Song) => {
    const audioTrack: AudioTrack = {
      id: song.id,
      title: song.title,
      artist: song.artist,
      audioUrl: song.audioUrl || '/sounds/pop.mp3',
      duration: parseInt(song.duration.replace(':', '')) || 180, // Convert "3:15" to seconds approximation
      coverUrl: song.cover || '/placeholder.svg'
    };
    
    const audioTracks = songs.map(s => ({
      id: s.id,
      title: s.title,
      artist: s.artist,
      audioUrl: s.audioUrl || '/sounds/pop.mp3',
      duration: parseInt(s.duration.replace(':', '')) || 180,
      coverUrl: s.cover || '/placeholder.svg'
    }));
    
    // Add all songs to queue and play selected song
    addToQueue(audioTracks);
    playTrack(audioTrack);
    
    if (onSongSelect) {
      onSongSelect(song);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {songs.map((song) => {
        const isCurrentlyPlaying = currentTrack?.id === song.id;

        return (
          <Card 
            key={song.id} 
            className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={song.cover || '/placeholder.svg'}
                  alt={`${song.title} cover`}
                  className="w-full aspect-square object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                  <button
                    onClick={() => handlePlaySong(song)}
                    className="bg-white/90 hover:bg-white rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300"
                    aria-label={`Play ${song.title} by ${song.artist}`}
                  >
                    <Play className={`w-6 h-6 text-black ${isCurrentlyPlaying ? 'fill-current' : ''}`} />
                  </button>
                </div>
                {song.genre && (
                  <Badge className="absolute top-2 left-2 bg-black/70 text-white border-none">
                    {song.genre}
                  </Badge>
                )}
                {song.allowRemixes && (
                  <Badge className="absolute top-2 right-2 bg-purple-500/80 text-white border-none text-xs">
                    Remixable
                  </Badge>
                )}
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <Link 
                    to={`/song/${song.id}`}
                    className="block hover:text-primary transition-colors"
                  >
                    <h3 className="font-semibold text-lg leading-tight line-clamp-1">
                      {song.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm line-clamp-1">
                    by {song.artist}
                  </p>
                  {song.album && (
                    <p className="text-muted-foreground text-xs line-clamp-1">
                      from {song.album}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(song.duration)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Music className="w-3 h-3" />
                      <span>{song.playCount?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{song.likes?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                </div>

                <SocialActions 
                  songId={song.id}
                  variant="compact"
                  className="pt-2 border-t"
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AlbumGrid;
