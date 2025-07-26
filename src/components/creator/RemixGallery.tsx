import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Heart, 
  Share2, 
  ThumbsUp, 
  ThumbsDown,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Music2,
  Headphones
} from 'lucide-react';
import { useApp, Song, RemixSubmission } from '@/contexts/AppContext';
import { useAudio } from '@/contexts/AudioContext';
import { AudioTrack } from '@/hooks/useAudioPlayer';

interface RemixGalleryProps {
  song: Song;
  onRemixStudio?: () => void;
}

const RemixGallery: React.FC<RemixGalleryProps> = ({ song, onRemixStudio }) => {
  const { getSongRemixes, approveRemix, rejectRemix } = useApp();
  const { playTrack, currentTrack } = useAudio();
  
  const [remixes, setRemixes] = useState<RemixSubmission[]>([]);
  const [activeTab, setActiveTab] = useState('approved');

  useEffect(() => {
    const songRemixes = getSongRemixes(song.id);
    setRemixes(songRemixes);
  }, [song.id, getSongRemixes]);

  const handlePlayRemix = (remix: RemixSubmission) => {
    const audioTrack: AudioTrack = {
      id: remix.id,
      title: remix.title,
      artist: remix.remixerName,
      audioUrl: remix.audioUrl,
      duration: 180, // Placeholder duration
      coverUrl: song.cover
    };
    
    playTrack(audioTrack);
  };

  const handleApproveRemix = (remixId: string) => {
    approveRemix(remixId);
    setRemixes(prev => prev.map(remix => 
      remix.id === remixId ? { ...remix, status: 'approved' as const } : remix
    ));
  };

  const handleRejectRemix = (remixId: string) => {
    rejectRemix(remixId);
    setRemixes(prev => prev.map(remix => 
      remix.id === remixId ? { ...remix, status: 'rejected' as const } : remix
    ));
  };

  const approvedRemixes = remixes.filter(r => r.status === 'approved');
  const pendingRemixes = remixes.filter(r => r.status === 'pending');
  const rejectedRemixes = remixes.filter(r => r.status === 'rejected');

  const RemixCard: React.FC<{ remix: RemixSubmission; showActions?: boolean }> = ({ 
    remix, 
    showActions = false 
  }) => {
    const isPlaying = currentTrack?.id === remix.id;
    
    return (
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img 
                src={song.cover} 
                alt={remix.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <Button
                size="sm"
                className="absolute inset-0 w-full h-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                onClick={() => handlePlayRemix(remix)}
              >
                <Play className={`w-4 h-4 text-white ${isPlaying ? 'fill-current' : ''}`} />
              </Button>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-lg line-clamp-1">{remix.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-xs">
                        {remix.remixerName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      by {remix.remixerName}
                    </span>
                  </div>
                  {remix.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {remix.description}
                    </p>
                  )}
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
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(remix.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{remix.votes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Headphones className="w-3 h-3" />
                    <span>{remix.stemTrackIds.length} stems</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {showActions && remix.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1"
                        onClick={() => handleApproveRemix(remix.id)}
                      >
                        <CheckCircle className="w-3 h-3" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1 text-destructive hover:text-destructive"
                        onClick={() => handleRejectRemix(remix.id)}
                      >
                        <XCircle className="w-3 h-3" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="ghost" className="h-8 gap-1">
                    <Heart className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 gap-1">
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Remixes & Collaborations</h2>
          <p className="text-muted-foreground">
            Community remixes of "{song.title}" by {song.artist}
          </p>
        </div>
        {onRemixStudio && (
          <Button onClick={onRemixStudio} className="gap-2">
            <Music2 className="w-4 h-4" />
            Create Remix
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{approvedRemixes.length}</div>
            <div className="text-sm text-muted-foreground">Approved Remixes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{pendingRemixes.length}</div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {remixes.reduce((sum, r) => sum + r.votes, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Votes</div>
          </CardContent>
        </Card>
      </div>

      {/* Remix Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approved" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Approved ({approvedRemixes.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Pending ({pendingRemixes.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2">
            <XCircle className="w-4 h-4" />
            Rejected ({rejectedRemixes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="approved" className="space-y-4">
          {approvedRemixes.length > 0 ? (
            approvedRemixes.map(remix => (
              <RemixCard key={remix.id} remix={remix} />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Music2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No approved remixes yet</h3>
                <p className="text-muted-foreground">
                  Be the first to create and submit a remix of this track!
                </p>
                {onRemixStudio && (
                  <Button onClick={onRemixStudio} className="mt-4 gap-2">
                    <Music2 className="w-4 h-4" />
                    Start Remixing
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingRemixes.length > 0 ? (
            pendingRemixes.map(remix => (
              <RemixCard key={remix.id} remix={remix} showActions={true} />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No pending remixes</h3>
                <p className="text-muted-foreground">
                  All remix submissions have been reviewed.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedRemixes.length > 0 ? (
            rejectedRemixes.map(remix => (
              <RemixCard key={remix.id} remix={remix} />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <XCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No rejected remixes</h3>
                <p className="text-muted-foreground">
                  Great! All submissions have been approved.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RemixGallery;
