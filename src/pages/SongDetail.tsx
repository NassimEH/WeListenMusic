import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Share2, Download, MoreHorizontal, Music2, Users, GitBranch } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { AudioVisualizer } from '../components/AudioVisualizer';
import { SocialActions } from '../components/SocialActions';
import { CommentsSystem } from '../components/CommentsSystem';
import RemixStudio from '../components/creator/RemixStudio';
import RemixGallery from '../components/creator/RemixGallery';
import CollaborationStudio from '../components/creator/CollaborationStudio';
import { useAudio } from '../contexts/AudioContext';
import { useSocial } from '../contexts/SocialContext';
import { useApp, Song } from '../contexts/AppContext';
import { AudioTrack } from '../hooks/useAudioPlayer';
import { toast } from '../hooks/use-toast';

interface SongDetails {
  id: string;
  title: string;
  artist: {
    id: string;
    stageName: string;
    verified: boolean;
    avatar?: string;
    followers: number;
  };
  album?: {
    id: string;
    title: string;
    coverUrl: string;
  };
  genre: string;
  duration: number;
  audioUrl: string;
  coverUrl?: string;
  lyrics?: string;
  releaseDate: string;
  tags: string[];
  description?: string;
}

export const SongDetail: React.FC = () => {
  const { songId } = useParams<{ songId: string }>();
  const navigate = useNavigate();
  const [song, setSong] = useState<SongDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Phase 3: Remix & Collaboration states
  const [showRemixStudio, setShowRemixStudio] = useState(false);
  const [showCollabStudio, setShowCollabStudio] = useState(false);
  
  const { currentTrack, state, playTrack } = useAudio();
  const { getSongStats, recordPlay } = useSocial();
  const { songs, getSongRemixes } = useApp();

  const isCurrentSong = currentTrack?.id === songId;
  const isPlaying = isCurrentSong && state.isPlaying;

  useEffect(() => {
    if (songId) {
      loadSongDetails(songId);
    }
  }, [songId]);

  const loadSongDetails = async (id: string) => {
    try {
      setIsLoading(true);
      
      // Demo song data
      const demoSong: SongDetails = {
        id,
        title: 'Midnight Dreams',
        artist: {
          id: 'artist-1',
          stageName: 'Luna Eclipse',
          verified: true,
          avatar: '/placeholder.svg',
          followers: 125000,
        },
        album: {
          id: 'album-1',
          title: 'Neon Nights',
          coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1740&auto=format&fit=crop',
        },
        genre: 'Electronic Pop',
        duration: 245, // 4:05
        audioUrl: '/demo-audio.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1740&auto=format&fit=crop',
        releaseDate: '2024-01-15',
        tags: ['electronic', 'pop', 'synthwave', 'ambient'],
        description: 'Un voyage sonore à travers les lumières de la ville nocturne, mêlant synthétiseurs vintage et mélodies modernes pour créer une atmosphère unique et envoûtante.',
        lyrics: `[Verse 1]
City lights are calling me tonight
Through the neon haze I see your face
Dancing shadows on the wall
In this midnight dream we fall

[Chorus]
Take me to the place where stars collide
In the midnight dreams we come alive
Electric feelings running through my veins
In this cosmic dance we break the chains

[Verse 2]
Synthesizers paint the sky
With colors that will never die
Your voice echoes in the night
Like a beacon shining bright

[Chorus]
Take me to the place where stars collide
In the midnight dreams we come alive
Electric feelings running through my veins
In this cosmic dance we break the chains

[Bridge]
When the morning comes too soon
We'll remember this silver moon
And the way we felt so free
In our midnight symphony

[Outro]
City lights are fading now
But the dream lives on somehow
In the silence of the dawn
Our midnight dreams carry on`,
      };
      
      setSong(demoSong);
    } catch (error) {
      console.error('Error loading song:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les détails du morceau',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (!song) return;

    const audioTrack: AudioTrack = {
      id: song.id,
      title: song.title,
      artist: song.artist.stageName,
      audioUrl: song.audioUrl,
      coverUrl: song.coverUrl,
      duration: song.duration,
    };

    if (isCurrentSong) {
      // If it's the current song, just toggle play/pause
      // This would be handled by the global player
    } else {
      // Play new song
      playTrack(audioTrack);
      recordPlay(song.id);
    }
  };

  const handleShare = async () => {
    if (!song) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: song.title,
          text: `Écoute "${song.title}" par ${song.artist.stageName} sur WeListen`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: 'Lien copié !',
          description: 'Le lien a été copié dans votre presse-papier',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = () => {
    toast({
      title: 'Téléchargement',
      description: 'Cette fonctionnalité sera bientôt disponible',
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-pink-400 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-white/60">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Morceau introuvable</h2>
          <p className="text-white/60 mb-4">Ce morceau n'existe pas ou a été supprimé</p>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>
    );
  }

  const stats = getSongStats(song.id);
  const audioTrack: AudioTrack = {
    id: song.id,
    title: song.title,
    artist: song.artist.stageName,
    audioUrl: song.audioUrl,
    coverUrl: song.coverUrl,
    duration: song.duration,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white/70 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Album Art & Visualizer */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl group">
              {song.coverUrl ? (
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
                  <Play className="w-24 h-24 text-white" />
                </div>
              )}
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  onClick={handlePlayPause}
                  className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-black hover:scale-110 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </Button>
              </div>
            </div>

            {/* Audio Visualizer */}
            <div className="bg-black/30 rounded-lg p-4">
              <AudioVisualizer
                audioUrl={song.audioUrl}
                isPlaying={isPlaying}
                currentTime={isCurrentSong ? state.currentTime : 0}
                height={120}
                barCount={60}
                color="#ec4899"
              />
            </div>
          </div>

          {/* Song Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                  {song.genre}
                </Badge>
                {song.artist.verified && (
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                    ✓ Vérifié
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {song.title}
              </h1>
              
              <p className="text-xl text-white/70 mb-4">
                par <span className="text-white font-medium">{song.artist.stageName}</span>
              </p>

              {song.album && (
                <p className="text-white/60">
                  Album: <span className="text-white/80">{song.album.title}</span>
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{stats.plays.toLocaleString()}</div>
                <div className="text-white/60 text-sm">Écoutes</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{stats.likes.toLocaleString()}</div>
                <div className="text-white/60 text-sm">J'aime</div>
              </div>
            </div>

            {/* Social Actions */}
            <SocialActions
              songId={song.id}
              audioTrack={audioTrack}
              variant="extended"
              showStats={true}
            />

            {/* Additional Actions */}
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="outline"
                onClick={handleShare}
                className="border-white/20 hover:bg-white/10 text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
              <Button
                variant="outline"
                onClick={handleDownload}
                className="border-white/20 hover:bg-white/10 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
              
              {/* Phase 3: Remix & Collaboration Actions */}
              <Button
                variant="outline"
                onClick={() => setShowRemixStudio(true)}
                className="border-purple-400/40 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200"
              >
                <Music2 className="w-4 h-4 mr-2" />
                Remix
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCollabStudio(true)}
                className="border-blue-400/40 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200"
              >
                <Users className="w-4 h-4 mr-2" />
                Collaborer
              </Button>
              
              <Button
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-white"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Meta Info */}
            <div className="space-y-2 text-sm text-white/60">
              <div>Durée: {formatDuration(song.duration)}</div>
              <div>Publié le: {formatDate(song.releaseDate)}</div>
              <div className="flex flex-wrap gap-1">
                {song.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/5 border-white/10">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-pink-500">
              Aperçu
            </TabsTrigger>
            <TabsTrigger value="lyrics" className="text-white data-[state=active]:bg-pink-500">
              Paroles
            </TabsTrigger>
            <TabsTrigger value="comments" className="text-white data-[state=active]:bg-pink-500">
              Commentaires ({stats.likes + stats.dislikes})
            </TabsTrigger>
            {/* Phase 3: New Tabs */}
            <TabsTrigger value="remixes" className="text-white data-[state=active]:bg-purple-500 gap-2">
              <GitBranch className="w-4 h-4" />
              Remixes ({getSongRemixes(song.id).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {song.description && (
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">À propos</h3>
                <p className="text-white/80 leading-relaxed">{song.description}</p>
              </div>
            )}

            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Artiste</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  {song.artist.avatar ? (
                    <img
                      src={song.artist.avatar}
                      alt={song.artist.stageName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-xl">
                      {song.artist.stageName.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">
                    {song.artist.stageName}
                    {song.artist.verified && (
                      <Badge variant="secondary" className="ml-2 bg-blue-500/20 text-blue-300 text-xs">
                        ✓
                      </Badge>
                    )}
                  </h4>
                  <p className="text-white/60">
                    {song.artist.followers.toLocaleString()} abonnés
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lyrics">
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Paroles</h3>
              {song.lyrics ? (
                <div className="text-white/80 whitespace-pre-line leading-relaxed font-mono text-sm">
                  {song.lyrics}
                </div>
              ) : (
                <p className="text-white/60 italic">
                  Les paroles ne sont pas disponibles pour ce morceau.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="comments">
            <CommentsSystem songId={song.id} />
          </TabsContent>

          {/* Phase 3: Remix Tab Content */}
          <TabsContent value="remixes">
            <RemixGallery 
              song={songs.find(s => s.id === songId) || songs[0]} 
              onRemixStudio={() => setShowRemixStudio(true)} 
            />
          </TabsContent>
        </Tabs>

        {/* Phase 3: Dialog Modals */}
        <Dialog open={showRemixStudio} onOpenChange={setShowRemixStudio}>
          <DialogContent className="max-w-7xl h-[90vh] p-0">
            <RemixStudio 
              song={songs.find(s => s.id === songId) || songs[0]} 
              onClose={() => setShowRemixStudio(false)} 
            />
          </DialogContent>
        </Dialog>

        <Dialog open={showCollabStudio} onOpenChange={setShowCollabStudio}>
          <DialogContent className="max-w-7xl h-[90vh] p-0">
            <CollaborationStudio 
              song={songs.find(s => s.id === songId) || songs[0]} 
              onClose={() => setShowCollabStudio(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
