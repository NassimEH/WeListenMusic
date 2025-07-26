import React from 'react';
import { Heart, ThumbsUp, ThumbsDown, Share2, Play, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useSocial } from '../contexts/SocialContext';
import { useAudio } from '../contexts/AudioContext';
import { AudioTrack } from '../hooks/useAudioPlayer';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { toast } from '../hooks/use-toast';

interface SocialActionsProps {
  songId: string;
  audioTrack?: AudioTrack;
  variant?: 'default' | 'compact' | 'extended';
  showStats?: boolean;
  className?: string;
}

export const SocialActions: React.FC<SocialActionsProps> = ({
  songId,
  audioTrack,
  variant = 'default',
  showStats = true,
  className = '',
}) => {
  const {
    userLikes,
    userDislikes,
    userFavorites,
    toggleLike,
    toggleDislike,
    toggleFavorite,
    getSongStats,
    recordPlay,
  } = useSocial();

  const { playTrack, currentTrack, state } = useAudio();

  const stats = getSongStats(songId);
  const isLiked = userLikes.has(songId);
  const isDisliked = userDislikes.has(songId);
  const isFavorited = userFavorites.has(songId);
  const isCurrentlyPlaying = currentTrack?.id === songId && state.isPlaying;

  const handlePlay = () => {
    if (audioTrack) {
      playTrack(audioTrack);
      recordPlay(songId);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share && audioTrack) {
        await navigator.share({
          title: audioTrack.title,
          text: `Écoute "${audioTrack.title}" par ${audioTrack.artist} sur WeListen`,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: 'Lien copié !',
          description: 'Le lien a été copié dans votre presse-papier',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de partager ce morceau',
        variant: 'destructive',
      });
    }
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {audioTrack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePlay}
            className="text-white/70 hover:text-white hover:bg-white/10 p-1 h-auto"
          >
            <Play className={`w-3 h-3 ${isCurrentlyPlaying ? 'text-pink-400' : ''}`} />
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleLike(songId)}
          className={`text-white/70 hover:text-pink-400 hover:bg-white/10 p-1 h-auto ${
            isLiked ? 'text-pink-400' : ''
          }`}
        >
          <ThumbsUp className="w-3 h-3" />
          {showStats && <span className="text-xs ml-1">{formatCount(stats.likes)}</span>}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleFavorite(songId)}
          className={`text-white/70 hover:text-red-400 hover:bg-white/10 p-1 h-auto ${
            isFavorited ? 'text-red-400' : ''
          }`}
        >
          <Heart className={`w-3 h-3 ${isFavorited ? 'fill-current' : ''}`} />
        </Button>
      </div>
    );
  }

  if (variant === 'extended') {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Main Actions */}
        <div className="flex items-center gap-4">
          {audioTrack && (
            <Button
              onClick={handlePlay}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition-all hover:scale-105"
            >
              <Play className={`w-4 h-4 mr-2 ${isCurrentlyPlaying ? 'hidden' : ''}`} />
              {isCurrentlyPlaying ? 'En cours...' : 'Écouter'}
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => toggleFavorite(songId)}
            className={`border-white/20 hover:bg-white/10 ${
              isFavorited ? 'bg-red-500/20 border-red-400 text-red-400' : 'text-white'
            }`}
          >
            <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
            {isFavorited ? 'Favoris' : 'Ajouter aux favoris'}
          </Button>

          <Button
            variant="outline"
            onClick={handleShare}
            className="border-white/20 hover:bg-white/10 text-white"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </Button>
        </div>

        {/* Stats */}
        {showStats && (
          <div className="flex items-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              <span>{formatCount(stats.plays)} écoutes</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>{formatCount(stats.likes)} j'aime</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>{formatCount(stats.favorites)} favoris</span>
            </div>
          </div>
        )}

        {/* Like/Dislike Bar */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleLike(songId)}
              className={`text-white/70 hover:text-green-400 ${
                isLiked ? 'text-green-400' : ''
              }`}
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              {formatCount(stats.likes)}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleDislike(songId)}
              className={`text-white/70 hover:text-red-400 ${
                isDisliked ? 'text-red-400' : ''
              }`}
            >
              <ThumbsDown className="w-4 h-4 mr-2" />
              {formatCount(stats.dislikes)}
            </Button>
          </div>

          {/* Rating Bar */}
          <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-pink-400 h-full transition-all duration-300"
              style={{ 
                width: `${(stats.likes / (stats.likes + stats.dislikes)) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {audioTrack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePlay}
          className={`text-white/70 hover:text-white hover:bg-white/10 ${
            isCurrentlyPlaying ? 'text-pink-400' : ''
          }`}
        >
          <Play className="w-4 h-4" />
        </Button>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleLike(songId)}
        className={`text-white/70 hover:text-green-400 hover:bg-white/10 ${
          isLiked ? 'text-green-400' : ''
        }`}
      >
        <ThumbsUp className="w-4 h-4" />
        {showStats && <span className="text-xs ml-1">{formatCount(stats.likes)}</span>}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleDislike(songId)}
        className={`text-white/70 hover:text-red-400 hover:bg-white/10 ${
          isDisliked ? 'text-red-400' : ''
        }`}
      >
        <ThumbsDown className="w-4 h-4" />
        {showStats && <span className="text-xs ml-1">{formatCount(stats.dislikes)}</span>}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleFavorite(songId)}
        className={`text-white/70 hover:text-red-400 hover:bg-white/10 ${
          isFavorited ? 'text-red-400' : ''
        }`}
      >
        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        {showStats && <span className="text-xs ml-1">{formatCount(stats.favorites)}</span>}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 border-gray-700">
          <DropdownMenuItem 
            onClick={handleShare}
            className="text-white hover:bg-gray-700"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:bg-gray-700">
            <span className="text-xs text-white/60">
              {formatCount(stats.plays)} écoutes
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
