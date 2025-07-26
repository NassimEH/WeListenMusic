import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Heart, Music } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useAudio } from '@/contexts/AudioContext';
import { AudioTrack } from '@/hooks/useAudioPlayer';

interface Song {
  id: string;
  title: string;
  duration: number;
  audioUrl: string;
  coverUrl?: string;
  genre: string;
  lyrics?: string;
  artist: {
    id: string;
    stageName: string;
    verified: boolean;
  };
}

interface AlbumGridProps {
  onSongSelect?: (song: Song) => void;
}

const AlbumGrid: React.FC<AlbumGridProps> = ({ onSongSelect }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const { userRole } = useApp();
  const { playTrack } = useAudio();

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch('/api/songs');
      if (response.ok) {
        const data = await response.json();
        setSongs(data);
      } else {
        console.error('Erreur lors du chargement des morceaux');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaySong = (song: Song) => {
    // Convert to AudioTrack format
    const audioTrack: AudioTrack = {
      id: song.id,
      title: song.title,
      artist: song.artist.stageName,
      audioUrl: song.audioUrl,
      coverUrl: song.coverUrl,
      duration: song.duration,
    };

    // Convert all songs to playlist
    const playlist: AudioTrack[] = songs.map(s => ({
      id: s.id,
      title: s.title,
      artist: s.artist.stageName,
      audioUrl: s.audioUrl,
      coverUrl: s.coverUrl,
      duration: s.duration,
    }));

    // Play track with playlist
    playTrack(audioTrack, playlist);

    // Keep existing callback for compatibility
    if (onSongSelect) {
      onSongSelect(song);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="bg-gray-800/50 border-gray-700 animate-pulse">
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="text-center py-12">
        <Music className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-300 mb-2">Aucun morceau disponible</h3>
        <p className="text-gray-500">Les morceaux apparaîtront ici une fois ajoutés par les artistes.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {songs.map((song) => (
        <Card
          key={song.id}
          className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group cursor-pointer"
          onClick={() => handlePlaySong(song)}
        >
          <CardContent className="p-4">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src={song.coverUrl || '/placeholder.svg'}
                alt={song.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Play className="h-6 w-6 text-white" fill="white" />
                </div>
              </div>
              <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                {song.genre}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                {song.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span className="truncate flex-1 mr-2">
                  {song.artist.stageName}
                  {song.artist.verified && (
                    <span className="ml-1 text-blue-400">✓</span>
                  )}
                </span>
                <span className="flex-shrink-0">
                  {formatDuration(song.duration)}
                </span>
              </div>
              
              {userRole && (
                <div className="flex items-center justify-between pt-2">
                  <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">Aimer</span>
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AlbumGrid;
