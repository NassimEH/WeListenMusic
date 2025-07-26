import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Header from '@/components/Header';
import { 
  Search, 
  Play, 
  Heart, 
  Share2, 
  Music2, 
  GitBranch, 
  TrendingUp,
  Clock,
  User,
  CheckCircle,
  XCircle,
  ThumbsUp,
  Star,
  Flame,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { useApp, Song, RemixSubmission } from '@/contexts/AppContext';
import { useAudio } from '@/contexts/AudioContext';
import { AudioTrack } from '@/hooks/useAudioPlayer';
import RemixStudio from '@/components/creator/RemixStudio';

const RemixPage: React.FC = () => {
  const navigate = useNavigate();
  const { songs, remixSubmissions, getSongRemixes, approveRemix, rejectRemix } = useApp();
  const { playTrack, currentTrack } = useAudio();
  
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [showRemixStudio, setShowRemixStudio] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  // Add dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);
  
  // Filter songs that allow remixes
  const remixableSongs = songs.filter(song => song.allowRemixes);
  const allRemixes = remixSubmissions;
  const myRemixes = remixSubmissions.filter(remix => remix.remixerId === 'current-user');
  const pendingRemixes = remixSubmissions.filter(remix => remix.status === 'pending');
  
  // Get trending remixes (sorted by votes)
  const trendingRemixes = [...allRemixes]
    .filter(remix => remix.status === 'approved')
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 6);
  
  // Get featured remixable songs
  const featuredSongs = remixableSongs
    .sort((a, b) => (b.remixCount || 0) - (a.remixCount || 0))
    .slice(0, 8);
  
  // Get recent remixes
  const recentRemixes = [...allRemixes]
    .filter(remix => remix.status === 'approved')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const genres = ['all', ...Array.from(new Set(songs.map(s => s.genre).filter(Boolean)))];

  const filteredSongs = remixableSongs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handlePlayRemix = (remix: RemixSubmission) => {
    const originalSong = songs.find(s => s.id === remix.originalSongId);
    const audioTrack: AudioTrack = {
      id: remix.id,
      title: remix.title,
      artist: remix.remixerName,
      audioUrl: remix.audioUrl,
      duration: 180,
      coverUrl: originalSong?.cover || '/placeholder.svg'
    };
    playTrack(audioTrack);
  };

  const handlePlaySong = (song: Song) => {
    const audioTrack: AudioTrack = {
      id: song.id,
      title: song.title,
      artist: song.artist,
      audioUrl: song.audioUrl || '/sounds/pop.mp3',
      duration: parseInt(song.duration.replace(':', '')) || 180,
      coverUrl: song.cover || '/placeholder.svg'
    };
    playTrack(audioTrack);
  };

  const openRemixStudio = (song: Song) => {
    setSelectedSong(song);
    setShowRemixStudio(true);
  };

  const RemixCard: React.FC<{ remix: RemixSubmission; showActions?: boolean }> = ({ 
    remix, 
    showActions = false 
  }) => {
    const originalSong = songs.find(s => s.id === remix.originalSongId);
    const isPlaying = currentTrack?.id === remix.id;
    
    return (
      <div className="card-apple group hover:border-audio-accent/20 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img 
                src={originalSong?.cover || '/placeholder.svg'} 
                alt={remix.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute inset-0 w-full h-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg text-white hover:text-white hover:bg-black/70"
                onClick={() => handlePlayRemix(remix)}
              >
                <Play className={`w-4 h-4 ${isPlaying ? 'fill-current' : ''}`} />
              </Button>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-lg line-clamp-1 text-audio-light">{remix.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-xs bg-audio-surface text-audio-light">
                        {remix.remixerName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-audio-light/70">
                      by {remix.remixerName}
                    </span>
                  </div>
                  <p className="text-xs text-audio-light/50 mt-1">
                    Remix of "{originalSong?.title}" by {originalSong?.artist}
                  </p>
                </div>
                
                <Badge 
                  variant={
                    remix.status === 'approved' ? 'default' : 
                    remix.status === 'pending' ? 'secondary' : 
                    'destructive'
                  }
                  className="ml-2"
                >
                  {remix.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3 text-xs text-audio-light/50">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(remix.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{remix.votes}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {showActions && remix.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1 border-green-500/20 text-green-400 hover:bg-green-500/10"
                        onClick={() => approveRemix(remix.id)}
                      >
                        <CheckCircle className="w-3 h-3" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1 border-red-500/20 text-red-400 hover:bg-red-500/10"
                        onClick={() => rejectRemix(remix.id)}
                      >
                        <XCircle className="w-3 h-3" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="ghost" className="h-8 gap-1 text-audio-light/70 hover:text-audio-accent">
                    <Heart className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 gap-1 text-audio-light/70 hover:text-audio-accent">
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    );
  };

  const SongCard: React.FC<{ song: Song }> = ({ song }) => {
    const isPlaying = currentTrack?.id === song.id;
    const songRemixes = getSongRemixes(song.id);
    
    return (
      <div className="card-apple group hover:border-audio-accent/20 transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={song.cover || '/placeholder.svg'}
              alt={song.title}
              className="w-full aspect-square object-cover rounded-t-xl"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl flex items-center justify-center gap-2">
              <Button
                onClick={() => handlePlaySong(song)}
                className="bg-white/90 hover:bg-white rounded-full p-3"
              >
                <Play className={`w-5 h-5 text-black ${isPlaying ? 'fill-current' : ''}`} />
              </Button>
              <Button
                onClick={() => openRemixStudio(song)}
                className="bg-audio-accent/90 hover:bg-audio-accent rounded-full p-3 text-white"
              >
                <Zap className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute top-2 left-2 flex gap-2">
              {song.genre && (
                <Badge className="bg-black/70 text-white border-none text-xs">
                  {song.genre}
                </Badge>
              )}
              <Badge className="bg-audio-accent/80 text-white border-none text-xs">
                Remixable
              </Badge>
            </div>
            {songRemixes.length > 0 && (
              <Badge className="absolute top-2 right-2 bg-green-500/80 text-white border-none text-xs">
                {songRemixes.length} remixes
              </Badge>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-lg leading-tight line-clamp-1 mb-1 text-audio-light">
              {song.title}
            </h3>
            <p className="text-audio-light/70 text-sm line-clamp-1 mb-2">
              by {song.artist}
            </p>
            
            <div className="flex items-center justify-between text-xs text-audio-light/50">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{song.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>{song.likes?.toLocaleString() || '0'}</span>
              </div>
            </div>
            
            <Button 
              onClick={() => openRemixStudio(song)}
              className="w-full mt-3 bg-gradient-to-r from-audio-accent to-blue-500 hover:from-audio-accent-light hover:to-blue-400 text-white"
            >
              <Music2 className="w-4 h-4 mr-2" />
              Start Remixing
            </Button>
          </div>
        </CardContent>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-audio-dark text-audio-light">
      <Header />
      
      {/* Back Button */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-audio-light/70 hover:text-audio-light mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-audio-accent to-blue-500 rounded-2xl">
              <GitBranch className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-audio-accent to-blue-400 bg-clip-text text-transparent">
              Remix Studio
            </h1>
          </div>
          <p className="text-lg text-audio-light/70 max-w-2xl mx-auto">
            Découvrez, créez et partagez des remixes incroyables. 
            Transformez vos morceaux préférés avec nos outils professionnels.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-apple">
            <CardContent className="p-6 text-center">
              <Music2 className="w-8 h-8 mx-auto mb-2 text-audio-accent" />
              <div className="text-2xl font-bold text-audio-light">{remixableSongs.length}</div>
              <div className="text-sm text-audio-light/70">Morceaux Remixables</div>
            </CardContent>
          </div>
          <div className="card-apple">
            <CardContent className="p-6 text-center">
              <GitBranch className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-audio-light">{allRemixes.filter(r => r.status === 'approved').length}</div>
              <div className="text-sm text-audio-light/70">Remixes Publiés</div>
            </CardContent>
          </div>
          <div className="card-apple">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-audio-light">{allRemixes.reduce((sum, r) => sum + r.votes, 0)}</div>
              <div className="text-sm text-audio-light/70">Votes Totaux</div>
            </CardContent>
          </div>
          <div className="card-apple">
            <CardContent className="p-6 text-center">
              <Flame className="w-8 h-8 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-audio-light">{pendingRemixes.length}</div>
              <div className="text-sm text-audio-light/70">En Attente</div>
            </CardContent>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-audio-surface/20 border border-white/10">
            <TabsTrigger value="discover" className="gap-2 data-[state=active]:bg-audio-accent data-[state=active]:text-white">
              <Search className="w-4 h-4" />
              Découvrir
            </TabsTrigger>
            <TabsTrigger value="trending" className="gap-2 data-[state=active]:bg-audio-accent data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4" />
              Tendances
            </TabsTrigger>
            <TabsTrigger value="my-remixes" className="gap-2 data-[state=active]:bg-audio-accent data-[state=active]:text-white">
              <User className="w-4 h-4" />
              Mes Remixes
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2 data-[state=active]:bg-audio-accent data-[state=active]:text-white">
              <Clock className="w-4 h-4" />
              En Attente ({pendingRemixes.length})
            </TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-audio-light/50" />
                <Input
                  placeholder="Rechercher des morceaux à remixer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-audio-surface/20 border-white/10 text-audio-light placeholder:text-audio-light/50 focus:border-audio-accent/50"
                />
              </div>
              <select
                title="Filtrer par genre"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="form-select-apple text-audio-light"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'Tous les genres' : genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Songs */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-audio-light">
                <Star className="w-6 h-6 text-yellow-500" />
                Morceaux Populaires à Remixer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredSongs.map(song => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>

            {/* All Remixable Songs */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-audio-light">Tous les Morceaux Remixables</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredSongs.map(song => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Trending Tab */}
          <TabsContent value="trending" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-audio-light">
                <Flame className="w-6 h-6 text-orange-500" />
                Remixes Tendances
              </h2>
              <div className="grid gap-4">
                {trendingRemixes.map(remix => (
                  <RemixCard key={remix.id} remix={remix} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-audio-light">
                <Clock className="w-6 h-6 text-blue-500" />
                Remixes Récents
              </h2>
              <div className="grid gap-4">
                {recentRemixes.map(remix => (
                  <RemixCard key={remix.id} remix={remix} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* My Remixes Tab */}
          <TabsContent value="my-remixes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-audio-light">Mes Remixes</h2>
              <Button className="gap-2 bg-audio-accent hover:bg-audio-accent-light">
                <Music2 className="w-4 h-4" />
                Nouveau Remix
              </Button>
            </div>
            
            {myRemixes.length > 0 ? (
              <div className="grid gap-4">
                {myRemixes.map(remix => (
                  <RemixCard key={remix.id} remix={remix} />
                ))}
              </div>
            ) : (
              <div className="card-apple">
                <CardContent className="p-12 text-center">
                  <Music2 className="w-16 h-16 mx-auto mb-4 text-audio-light/50" />
                  <h3 className="text-xl font-semibold mb-2 text-audio-light">Aucun remix encore</h3>
                  <p className="text-audio-light/70 mb-6">
                    Commencez à créer vos premiers remixes avec nos outils professionnels.
                  </p>
                  <Button onClick={() => setActiveTab('discover')} className="gap-2 bg-audio-accent hover:bg-audio-accent-light">
                    <Search className="w-4 h-4" />
                    Découvrir des Morceaux
                  </Button>
                </CardContent>
              </div>
            )}
          </TabsContent>

          {/* Pending Tab */}
          <TabsContent value="pending" className="space-y-6">
            <h2 className="text-2xl font-bold text-audio-light">Remixes en Attente d'Approbation</h2>
            
            {pendingRemixes.length > 0 ? (
              <div className="grid gap-4">
                {pendingRemixes.map(remix => (
                  <RemixCard key={remix.id} remix={remix} showActions={true} />
                ))}
              </div>
            ) : (
              <div className="card-apple">
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-semibold mb-2 text-audio-light">Tout est à jour !</h3>
                  <p className="text-audio-light/70">
                    Aucun remix en attente d'approbation.
                  </p>
                </CardContent>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Remix Studio Dialog */}
        <Dialog open={showRemixStudio} onOpenChange={setShowRemixStudio}>
          <DialogContent className="max-w-7xl h-[90vh] p-0 bg-audio-dark border-white/10">
            {selectedSong && (
              <RemixStudio 
                song={selectedSong} 
                onClose={() => setShowRemixStudio(false)} 
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RemixPage;
