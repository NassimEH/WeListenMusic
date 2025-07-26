import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Heart, Music, User } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  genre: string;
  audioUrl: string;
  coverUrl?: string;
  duration: number;
  artist: {
    stageName: string;
    user: {
      name: string;
    };
  };
  _count: {
    likes: number;
    plays: number;
  };
}

const SongsList = () => {
  const { data: songs = [], isLoading, error } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      const response = await fetch('/api/songs');
      if (!response.ok) throw new Error('Failed to fetch songs');
      return response.json();
    },
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <Music className="w-16 h-16 mx-auto mb-4 text-audio-muted" />
        <h3 className="text-xl font-semibold mb-2">Erreur de chargement</h3>
        <p className="text-audio-muted">
          Impossible de charger les morceaux. Assurez-vous que l'API est démarrée.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="aspect-square bg-audio-surface rounded-lg mb-4"></div>
              <div className="h-4 bg-audio-surface rounded mb-2"></div>
              <div className="h-3 bg-audio-surface rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="text-center py-12">
        <Music className="w-16 h-16 mx-auto mb-4 text-audio-muted" />
        <h3 className="text-xl font-semibold mb-2">Aucun morceau disponible</h3>
        <p className="text-audio-muted">
          Soyez le premier à publier un morceau sur WeListen !
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {songs.map((song: Song) => (
        <Card key={song.id} className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-0">
            {/* Cover Image */}
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              {song.coverUrl ? (
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-audio flex items-center justify-center">
                  <Music className="w-16 h-16 text-white/80" />
                </div>
              )}
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
                >
                  <Play className="w-8 h-8 text-white fill-white" />
                </Button>
              </div>
            </div>

            {/* Song Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{song.title}</h3>
                  <div className="flex items-center gap-1 text-audio-muted text-sm">
                    <User className="w-3 h-3" />
                    <span className="truncate">
                      {song.artist.stageName || song.artist.user.name}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-audio-muted ml-2">
                  {formatDuration(song.duration)}
                </div>
              </div>

              {/* Genre */}
              {song.genre && (
                <div className="inline-block px-2 py-1 bg-audio-surface rounded-full text-xs text-audio-muted mb-3">
                  {song.genre}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-audio-muted">
                  <div className="flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    <span>{song._count.plays}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    <span>{song._count.likes}</span>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SongsList;
