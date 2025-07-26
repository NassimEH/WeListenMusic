import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SongUploadForm from '@/components/SongUploadForm';
import AuthDialog from '@/components/AuthDialog';
import { useQuery } from '@tanstack/react-query';
import { 
  Music, 
  Upload, 
  BarChart3, 
  Users, 
  Play, 
  Heart, 
  TrendingUp, 
  Album,
  Edit,
  Trash2
} from 'lucide-react';

interface Song {
  id: string;
  title: string;
  genre: string;
  playCount: number;
  likes: number;
  createdAt: string;
  isPublic: boolean;
  audioUrl: string;
  coverUrl?: string;
}

const ArtistDashboard = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('upload');

  // Récupérer les morceaux de l'artiste
  const { data: songs = [], isLoading } = useQuery({
    queryKey: ['artist-songs', session?.user?.id],
    queryFn: async () => {
      const response = await fetch('/api/artist/songs');
      if (!response.ok) throw new Error('Failed to fetch songs');
      return response.json();
    },
    enabled: !!session?.user,
  });

  // Statistiques de l'artiste
  const { data: stats } = useQuery({
    queryKey: ['artist-stats', session?.user?.id],
    queryFn: async () => {
      const response = await fetch('/api/artist/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
    enabled: !!session?.user,
  });

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-audio-dark text-audio-light">
        <div className="container max-w-4xl mx-auto px-6 py-20">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="py-12">
              <Music className="w-16 h-16 mx-auto mb-4 text-audio-muted" />
              <h2 className="text-2xl font-bold mb-4">Espace Artiste</h2>
              <p className="text-audio-muted mb-6">
                Connectez-vous pour accéder à votre espace artiste et publier vos morceaux.
              </p>
              <AuthDialog>
                <Button>Se connecter</Button>
              </AuthDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-audio-dark text-audio-light">
      <div className="container max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-audio rounded-full flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Espace Artiste</h1>
              <p className="text-audio-muted">
                Bienvenue, {session.user.name} 
                {session.user.isArtist && (
                  <Badge className="ml-2 bg-audio-accent">Artiste Vérifié</Badge>
                )}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-audio-accent/20 rounded-lg">
                      <Music className="w-5 h-5 text-audio-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalSongs}</p>
                      <p className="text-sm text-audio-muted">Morceaux</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Play className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalPlays}</p>
                      <p className="text-sm text-audio-muted">Écoutes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <Heart className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalLikes}</p>
                      <p className="text-sm text-audio-muted">Likes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.followers}</p>
                      <p className="text-sm text-audio-muted">Followers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="songs" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              Mes Morceaux
            </TabsTrigger>
            <TabsTrigger value="albums" className="flex items-center gap-2">
              <Album className="w-4 h-4" />
              Albums
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="mt-6">
            <SongUploadForm />
          </TabsContent>

          {/* Songs Tab */}
          <TabsContent value="songs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes Morceaux</CardTitle>
                <CardDescription>
                  Gérez vos morceaux publiés
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-2 border-audio-accent border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-audio-muted">Chargement...</p>
                  </div>
                ) : songs.length === 0 ? (
                  <div className="text-center py-12">
                    <Music className="w-16 h-16 mx-auto mb-4 text-audio-muted" />
                    <h3 className="text-xl font-semibold mb-2">Aucun morceau</h3>
                    <p className="text-audio-muted mb-4">
                      Vous n'avez pas encore publié de morceaux.
                    </p>
                    <Button onClick={() => setActiveTab('upload')}>
                      <Upload className="w-4 h-4 mr-2" />
                      Publier votre premier morceau
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {songs.map((song: Song) => (
                      <div
                        key={song.id}
                        className="flex items-center gap-4 p-4 bg-audio-surface rounded-lg hover:bg-audio-surface/80 transition-colors"
                      >
                        <div className="w-12 h-12 bg-audio-dark rounded overflow-hidden">
                          {song.coverUrl ? (
                            <img
                              src={song.coverUrl}
                              alt={song.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Music className="w-6 h-6 text-audio-muted" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold">{song.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-audio-muted">
                            <span>{song.genre}</span>
                            <span className="flex items-center gap-1">
                              <Play className="w-3 h-3" />
                              {song.playCount}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {song.likes}
                            </span>
                            <Badge variant={song.isPublic ? "default" : "secondary"}>
                              {song.isPublic ? "Public" : "Privé"}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Albums Tab */}
          <TabsContent value="albums" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Albums</CardTitle>
                <CardDescription>
                  Créez et gérez vos albums
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Album className="w-16 h-16 mx-auto mb-4 text-audio-muted" />
                  <h3 className="text-xl font-semibold mb-2">Création d'albums</h3>
                  <p className="text-audio-muted mb-4">
                    Fonctionnalité en cours de développement
                  </p>
                  <Button disabled>
                    Créer un album
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Suivez les performances de vos morceaux
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-audio-muted" />
                  <h3 className="text-xl font-semibold mb-2">Analytics détaillées</h3>
                  <p className="text-audio-muted mb-4">
                    Fonctionnalité en cours de développement
                  </p>
                  <Button disabled>
                    Voir les statistiques
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArtistDashboard;
