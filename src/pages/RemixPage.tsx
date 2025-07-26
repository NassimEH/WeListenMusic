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
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-audio-accent/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
        <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-white/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="relative group/image">
                <img 
                  src={originalSong?.cover || '/placeholder.svg'} 
                  alt={remix.title}
                  className="w-16 h-16 rounded-xl object-cover ring-1 ring-white/10 transition-all duration-300 group-hover/image:ring-audio-accent/50"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute inset-0 w-full h-full bg-black/60 opacity-0 group-hover/image:opacity-100 transition-all duration-300 rounded-xl text-white hover:text-white hover:bg-black/70 backdrop-blur-sm"
                  onClick={() => handlePlayRemix(remix)}
                >
                  <Play className={`w-4 h-4 ${isPlaying ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-lg line-clamp-1 text-audio-light mb-1">{remix.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-5 h-5 ring-1 ring-white/10">
                        <AvatarFallback className="text-xs bg-gradient-to-r from-audio-accent/20 to-purple-500/20 text-audio-light border border-white/10">
                          {remix.remixerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-audio-light/70 font-medium">
                        by {remix.remixerName}
                      </span>
                    </div>
                    <p className="text-xs text-audio-light/50 mb-3">
                      Remix of "{originalSong?.title}" by {originalSong?.artist}
                    </p>
                  </div>
                  
                  <Badge 
                    variant={
                      remix.status === 'approved' ? 'default' : 
                      remix.status === 'pending' ? 'secondary' : 
                      'destructive'
                    }
                    className={`ml-2 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      remix.status === 'approved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      remix.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {remix.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-audio-light/50">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(remix.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{remix.votes}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {showActions && remix.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1.5 px-3 bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50 rounded-lg backdrop-blur-sm transition-all duration-300"
                          onClick={() => approveRemix(remix.id)}
                        >
                          <CheckCircle className="w-3 h-3" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1.5 px-3 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 rounded-lg backdrop-blur-sm transition-all duration-300"
                          onClick={() => rejectRemix(remix.id)}
                        >
                          <XCircle className="w-3 h-3" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-audio-light/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300">
                      <Heart className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-audio-light/60 hover:text-audio-accent hover:bg-audio-accent/10 rounded-lg transition-all duration-300">
                      <Share2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    );
  };

  const SongCard: React.FC<{ song: Song }> = ({ song }) => {
    const isPlaying = currentTrack?.id === song.id;
    const songRemixes = getSongRemixes(song.id);
    
    return (
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-audio-accent/10 via-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
        <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-white/5">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={song.cover || '/placeholder.svg'}
                alt={song.title}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                <Button
                  onClick={() => handlePlaySong(song)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-full p-4 border border-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Play className={`w-6 h-6 text-white ${isPlaying ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  onClick={() => openRemixStudio(song)}
                  className="bg-audio-accent/20 hover:bg-audio-accent/30 backdrop-blur-xl rounded-full p-4 border border-audio-accent/30 text-white transition-all duration-300 hover:scale-110"
                >
                  <Zap className="w-6 h-6" />
                </Button>
              </div>
              
              {/* Top badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {song.genre && (
                  <Badge className="bg-black/60 backdrop-blur-xl text-white border border-white/20 text-xs px-2 py-1 rounded-lg">
                    {song.genre}
                  </Badge>
                )}
                <Badge className="bg-audio-accent/60 backdrop-blur-xl text-white border border-audio-accent/30 text-xs px-2 py-1 rounded-lg">
                  ✨ Remixable
                </Badge>
              </div>
              
              {songRemixes.length > 0 && (
                <Badge className="absolute top-3 right-3 bg-green-500/60 backdrop-blur-xl text-white border border-green-500/30 text-xs px-2 py-1 rounded-lg">
                  {songRemixes.length} remixes
                </Badge>
              )}
            </div>
            
            <div className="p-5">
              <h3 className="font-semibold text-lg leading-tight line-clamp-1 mb-2 text-audio-light">
                {song.title}
              </h3>
              <p className="text-audio-light/70 text-sm line-clamp-1 mb-4">
                by {song.artist}
              </p>
              
              <div className="flex items-center justify-between text-xs text-audio-light/50 mb-4">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{song.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{song.likes?.toLocaleString() || '0'}</span>
                </div>
              </div>
              
              <Button 
                onClick={() => openRemixStudio(song)}
                className="w-full bg-gradient-to-r from-audio-accent/80 to-blue-500/80 hover:from-audio-accent hover:to-blue-500 text-white border border-white/10 backdrop-blur-sm rounded-xl py-3 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-audio-accent/20"
              >
                <Music2 className="w-4 h-4 mr-2" />
                Start Remixing
              </Button>
            </div>
          </CardContent>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-audio-accent/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
            <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:border-audio-accent/30 hover:shadow-lg hover:shadow-audio-accent/5">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-audio-accent/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Music2 className="w-8 h-8 text-audio-accent" />
              </div>
              <div className="text-3xl font-bold text-audio-light mb-1">{remixableSongs.length}</div>
              <div className="text-sm text-audio-light/60 font-medium">Morceaux Remixables</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
            <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-400/5">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <GitBranch className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-audio-light mb-1">{allRemixes.filter(r => r.status === 'approved').length}</div>
              <div className="text-sm text-audio-light/60 font-medium">Remixes Publiés</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
            <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:border-green-400/30 hover:shadow-lg hover:shadow-green-400/5">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-audio-light mb-1">{allRemixes.reduce((sum, r) => sum + r.votes, 0)}</div>
              <div className="text-sm text-audio-light/60 font-medium">Votes Totaux</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
            <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:border-orange-400/30 hover:shadow-lg hover:shadow-orange-400/5">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Flame className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-3xl font-bold text-audio-light mb-1">{pendingRemixes.length}</div>
              <div className="text-sm text-audio-light/60 font-medium">En Attente</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-black/30 backdrop-blur-xl border border-white/5 rounded-2xl p-1.5 shadow-2xl">
            <TabsTrigger 
              value="discover" 
              className="gap-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-audio-accent/90 data-[state=active]:to-blue-500/90 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-audio-light/70 data-[state=inactive]:hover:text-audio-light data-[state=inactive]:hover:bg-white/5"
            >
              <Search className="w-4 h-4" />
              Découvrir
            </TabsTrigger>
            <TabsTrigger 
              value="trending" 
              className="gap-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/90 data-[state=active]:to-red-500/90 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-audio-light/70 data-[state=inactive]:hover:text-audio-light data-[state=inactive]:hover:bg-white/5"
            >
              <TrendingUp className="w-4 h-4" />
              Tendances
            </TabsTrigger>
            <TabsTrigger 
              value="my-remixes" 
              className="gap-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/90 data-[state=active]:to-pink-500/90 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-audio-light/70 data-[state=inactive]:hover:text-audio-light data-[state=inactive]:hover:bg-white/5"
            >
              <User className="w-4 h-4" />
              Mes Remixes
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className="gap-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/90 data-[state=active]:to-emerald-500/90 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-audio-light/70 data-[state=inactive]:hover:text-audio-light data-[state=inactive]:hover:bg-white/5"
            >
              <Clock className="w-4 h-4" />
              En Attente ({pendingRemixes.length})
            </TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-8">
            {/* Search and Filters */}
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-audio-accent/20 via-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 focus-within:border-audio-accent/50 focus-within:shadow-lg focus-within:shadow-audio-accent/10">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-audio-light/50 transition-colors duration-300 group-focus-within:text-audio-accent" />
                  <Input
                    placeholder="Rechercher des morceaux à remixer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 bg-transparent border-none text-audio-light placeholder:text-audio-light/50 focus:outline-none focus:ring-0 text-lg"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <kbd className="px-2 py-1 text-xs text-audio-light/40 bg-white/5 rounded-md border border-white/10">
                      ⌘K
                    </kbd>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>
                <select
                  title="Filtrer par genre"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="relative px-6 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-audio-light text-sm font-medium appearance-none cursor-pointer transition-all duration-300 hover:border-white/20 focus:border-audio-accent/50 focus:outline-none focus:ring-0 min-w-[180px] bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%23ffffff60%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em]"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre} className="bg-audio-dark text-audio-light py-2">
                      {genre === 'all' ? '🎵 Tous les genres' : `🎼 ${genre}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Featured Songs */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold flex items-center gap-3 text-audio-light">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl backdrop-blur-sm border border-yellow-500/30 flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  Morceaux Populaires à Remixer
                </h2>
                <div className="text-sm text-audio-light/50 bg-black/20 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
                  {featuredSongs.length} morceaux
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredSongs.map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>

            {/* All Remixable Songs */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-audio-light">Tous les Morceaux Remixables</h2>
                <div className="text-sm text-audio-light/50 bg-black/20 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
                  {filteredSongs.length} résultats
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredSongs.map((song) => (
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
