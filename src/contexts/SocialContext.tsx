import React, { createContext, useContext, useState, useCallback } from 'react';

interface SocialAction {
  songId: string;
  userId: string;
  type: 'like' | 'dislike' | 'favorite';
  timestamp: number;
}

interface SocialStats {
  likes: number;
  dislikes: number;
  favorites: number;
  plays: number;
  shares: number;
}

interface SocialContextType {
  // User actions
  userLikes: Set<string>;
  userDislikes: Set<string>;
  userFavorites: Set<string>;
  
  // Stats cache
  songStats: Map<string, SocialStats>;
  
  // Actions
  toggleLike: (songId: string) => Promise<void>;
  toggleDislike: (songId: string) => Promise<void>;
  toggleFavorite: (songId: string) => Promise<void>;
  getSongStats: (songId: string) => SocialStats;
  recordPlay: (songId: string) => Promise<void>;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

const SocialContext = createContext<SocialContextType | null>(null);

interface SocialProviderProps {
  children: React.ReactNode;
  userId?: string;
}

export const SocialProvider: React.FC<SocialProviderProps> = ({ 
  children, 
  userId = 'demo-user' 
}) => {
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());
  const [userDislikes, setUserDislikes] = useState<Set<string>>(new Set());
  const [userFavorites, setUserFavorites] = useState<Set<string>>(new Set());
  const [songStats, setSongStats] = useState<Map<string, SocialStats>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize default stats for a song
  const getDefaultStats = (): SocialStats => ({
    likes: 0,
    dislikes: 0,
    favorites: 0,
    plays: 0,
    shares: 0,
  });

  // Get song stats (with caching)
  const getSongStats = useCallback((songId: string): SocialStats => {
    if (songStats.has(songId)) {
      return songStats.get(songId)!;
    }
    
    // Generate some demo stats for now
    const demoStats: SocialStats = {
      likes: Math.floor(Math.random() * 1000) + 50,
      dislikes: Math.floor(Math.random() * 50) + 5,
      favorites: Math.floor(Math.random() * 200) + 20,
      plays: Math.floor(Math.random() * 5000) + 100,
      shares: Math.floor(Math.random() * 100) + 10,
    };
    
    setSongStats(prev => new Map(prev).set(songId, demoStats));
    return demoStats;
  }, [songStats]);

  // API call wrapper
  const apiCall = async (endpoint: string, data: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, userId }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.error(`Error calling ${endpoint}:`, err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle like
  const toggleLike = useCallback(async (songId: string) => {
    const wasLiked = userLikes.has(songId);
    const wasDisliked = userDislikes.has(songId);
    
    // Optimistic update
    setUserLikes(prev => {
      const newSet = new Set(prev);
      if (wasLiked) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
    
    // Remove dislike if it exists
    if (wasDisliked) {
      setUserDislikes(prev => {
        const newSet = new Set(prev);
        newSet.delete(songId);
        return newSet;
      });
    }
    
    // Update stats
    setSongStats(prev => {
      const newMap = new Map(prev);
      const currentStats = newMap.get(songId) || getDefaultStats();
      const newStats = {
        ...currentStats,
        likes: wasLiked ? currentStats.likes - 1 : currentStats.likes + 1,
        dislikes: wasDisliked ? currentStats.dislikes - 1 : currentStats.dislikes,
      };
      newMap.set(songId, newStats);
      return newMap;
    });

    // API call (in background)
    await apiCall('songs/like', { songId, action: wasLiked ? 'unlike' : 'like' });
  }, [userLikes, userDislikes, userId]);

  // Toggle dislike
  const toggleDislike = useCallback(async (songId: string) => {
    const wasDisliked = userDislikes.has(songId);
    const wasLiked = userLikes.has(songId);
    
    // Optimistic update
    setUserDislikes(prev => {
      const newSet = new Set(prev);
      if (wasDisliked) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
    
    // Remove like if it exists
    if (wasLiked) {
      setUserLikes(prev => {
        const newSet = new Set(prev);
        newSet.delete(songId);
        return newSet;
      });
    }
    
    // Update stats
    setSongStats(prev => {
      const newMap = new Map(prev);
      const currentStats = newMap.get(songId) || getDefaultStats();
      const newStats = {
        ...currentStats,
        dislikes: wasDisliked ? currentStats.dislikes - 1 : currentStats.dislikes + 1,
        likes: wasLiked ? currentStats.likes - 1 : currentStats.likes,
      };
      newMap.set(songId, newStats);
      return newMap;
    });

    // API call (in background)
    await apiCall('songs/dislike', { songId, action: wasDisliked ? 'undislike' : 'dislike' });
  }, [userDislikes, userLikes, userId]);

  // Toggle favorite
  const toggleFavorite = useCallback(async (songId: string) => {
    const wasFavorited = userFavorites.has(songId);
    
    // Optimistic update
    setUserFavorites(prev => {
      const newSet = new Set(prev);
      if (wasFavorited) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
    
    // Update stats
    setSongStats(prev => {
      const newMap = new Map(prev);
      const currentStats = newMap.get(songId) || getDefaultStats();
      const newStats = {
        ...currentStats,
        favorites: wasFavorited ? currentStats.favorites - 1 : currentStats.favorites + 1,
      };
      newMap.set(songId, newStats);
      return newMap;
    });

    // API call (in background)
    await apiCall('songs/favorite', { songId, action: wasFavorited ? 'unfavorite' : 'favorite' });
  }, [userFavorites, userId]);

  // Record play
  const recordPlay = useCallback(async (songId: string) => {
    // Update stats
    setSongStats(prev => {
      const newMap = new Map(prev);
      const currentStats = newMap.get(songId) || getDefaultStats();
      const newStats = {
        ...currentStats,
        plays: currentStats.plays + 1,
      };
      newMap.set(songId, newStats);
      return newMap;
    });

    // API call (in background, no need to wait)
    apiCall('songs/play', { songId });
  }, [userId]);

  const contextValue: SocialContextType = {
    userLikes,
    userDislikes,
    userFavorites,
    songStats,
    toggleLike,
    toggleDislike,
    toggleFavorite,
    getSongStats,
    recordPlay,
    isLoading,
    error,
  };

  return (
    <SocialContext.Provider value={contextValue}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};
