import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Send, MessageCircle, Heart, Reply, Flag, Trash2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from '../hooks/use-toast';

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  timestamp: Date;
  likes: number;
  replies: Comment[];
  isLiked?: boolean;
  canDelete?: boolean;
}

interface CommentsSystemProps {
  songId: string;
  className?: string;
}

export const CommentsSystem: React.FC<CommentsSystemProps> = ({
  songId,
  className = '',
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { userRole, userProfile } = useApp();
  
  // Create a user object compatible with the comment system
  const user = userProfile ? {
    id: 'demo-user',
    name: userProfile.name,
    avatar: undefined, // Will use fallback
    role: userRole,
  } : null;

  // Load comments
  useEffect(() => {
    loadComments();
  }, [songId]);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      
      // Demo comments for now
      const demoComments: Comment[] = [
        {
          id: '1',
          content: 'Incroyable ! Ce morceau me donne des frissons à chaque écoute 🔥',
          author: {
            id: 'user1',
            name: 'Sophie M.',
            avatar: '/placeholder.svg',
            verified: true,
          },
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
          likes: 12,
          replies: [
            {
              id: '1-1',
              content: 'Complètement d\'accord ! Le drop est juste parfait 👌',
              author: {
                id: 'user2',
                name: 'Alex K.',
                avatar: '/placeholder.svg',
              },
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1h ago
              likes: 3,
              replies: [],
            }
          ],
          isLiked: false,
        },
        {
          id: '2',
          content: 'La production est exceptionnelle, on sent vraiment l\'évolution de l\'artiste 🎵',
          author: {
            id: 'user3',
            name: 'Marie L.',
            avatar: '/placeholder.svg',
          },
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4h ago
          likes: 8,
          replies: [],
          isLiked: true,
        },
        {
          id: '3',
          content: 'Quelqu\'un sait si l\'artiste va sortir un album complet bientôt ? 🤔',
          author: {
            id: 'user4',
            name: 'Thomas R.',
            avatar: '/placeholder.svg',
          },
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6h ago
          likes: 2,
          replies: [],
        },
      ];
      
      setComments(demoComments);
    } catch (error) {
      console.error('Error loading comments:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les commentaires',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) return;

    try {
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        author: {
          id: user.id,
          name: user.name || 'Utilisateur',
          avatar: user.avatar,
          verified: user.role === 'creator',
        },
        timestamp: new Date(),
        likes: 0,
        replies: [],
        canDelete: true,
      };

      setComments(prev => [comment, ...prev]);
      setNewComment('');

      toast({
        title: 'Commentaire ajouté !',
        description: 'Votre commentaire a été publié avec succès',
      });

      // API call would go here
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de publier le commentaire',
        variant: 'destructive',
      });
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim() || !user) return;

    try {
      const reply: Comment = {
        id: `${parentId}-${Date.now()}`,
        content: replyContent,
        author: {
          id: user.id,
          name: user.name || 'Utilisateur',
          avatar: user.avatar,
          verified: user.role === 'creator',
        },
        timestamp: new Date(),
        likes: 0,
        replies: [],
        canDelete: true,
      };

      setComments(prev => prev.map(comment => 
        comment.id === parentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      ));

      setReplyingTo(null);
      setReplyContent('');

      toast({
        title: 'Réponse ajoutée !',
        description: 'Votre réponse a été publiée avec succès',
      });
    } catch (error) {
      console.error('Error posting reply:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de publier la réponse',
        variant: 'destructive',
      });
    }
  };

  const handleLikeComment = async (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked,
        };
      }
      return {
        ...comment,
        replies: comment.replies.map(reply => 
          reply.id === commentId
            ? {
                ...reply,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                isLiked: !reply.isLiked,
              }
            : reply
        ),
      };
    }));
  };

  const handleDeleteComment = async (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    toast({
      title: 'Commentaire supprimé',
      description: 'Le commentaire a été supprimé avec succès',
    });
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-12 mt-3' : 'mb-6'}`}>
      <div className="flex gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
            {comment.author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-white text-sm">
              {comment.author.name}
            </span>
            {comment.author.verified && (
              <Badge variant="secondary" className="px-1.5 py-0.5 text-xs">
                ✓
              </Badge>
            )}
            <span className="text-xs text-white/50">
              {formatDistanceToNow(comment.timestamp, { 
                addSuffix: true, 
                locale: fr 
              })}
            </span>
          </div>

          <p className="text-white/90 text-sm mb-2 leading-relaxed">
            {comment.content}
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLikeComment(comment.id)}
              className={`text-white/60 hover:text-pink-400 p-1 h-auto ${
                comment.isLiked ? 'text-pink-400' : ''
              }`}
            >
              <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{comment.likes}</span>
            </Button>

            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(comment.id)}
                className="text-white/60 hover:text-white p-1 h-auto text-xs"
              >
                <Reply className="w-3 h-3 mr-1" />
                Répondre
              </Button>
            )}

            {comment.canDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteComment(comment.id)}
                className="text-white/60 hover:text-red-400 p-1 h-auto"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white p-1 h-auto"
            >
              <Flag className="w-3 h-3" />
            </Button>
          </div>

          {/* Reply form */}
          {replyingTo === comment.id && (
            <div className="mt-3 space-y-2">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Écrivez votre réponse..."
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 text-sm min-h-[60px]"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleSubmitReply(comment.id)}
                  disabled={!replyContent.trim()}
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <Send className="w-3 h-3 mr-1" />
                  Répondre
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent('');
                  }}
                  className="text-white/60 hover:text-white"
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}

          {/* Replies */}
          {comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map(reply => renderComment(reply, true))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-white" />
        <h3 className="text-lg font-semibold text-white">
          Commentaires ({comments.length})
        </h3>
      </div>

      {/* New comment form */}
      {user ? (
        <div className="space-y-3">
          <div className="flex gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                {user.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Partagez vos impressions sur ce morceau..."
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-[80px]"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isLoading}
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Publier
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
          <p className="text-white/60 mb-2">
            Connectez-vous pour participer à la discussion
          </p>
          <Button variant="outline" className="border-white/20 text-white">
            Se connecter
          </Button>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-6 h-6 border-2 border-pink-400 border-t-transparent rounded-full mx-auto mb-2" />
            <p className="text-white/60">Chargement des commentaires...</p>
          </div>
        ) : comments.length > 0 ? (
          comments.map(comment => renderComment(comment))
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/60 mb-2">Aucun commentaire pour l'instant</p>
            <p className="text-white/40 text-sm">
              Soyez le premier à partager vos impressions !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
