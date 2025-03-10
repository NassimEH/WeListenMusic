
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'consumer' | 'creator' | null;

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  playlists: Playlist[];
  addPlaylist: (playlist: Playlist) => void;
  likedSongs: Song[];
  toggleLikeSong: (song: Song) => void;
  isSongLiked: (id: string) => boolean;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
  audioUrl?: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  songs: Song[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('userRole');
    return saved ? (saved as UserRole) : null;
  });
  
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem('playlists');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        name: 'Favoris',
        description: 'Mes morceaux préférés',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1740&auto=format&fit=crop',
        songs: []
      }
    ];
  });
  
  const [likedSongs, setLikedSongs] = useState<Song[]>(() => {
    const saved = localStorage.getItem('likedSongs');
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem('userRole', userRole || '');
  }, [userRole]);
  
  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);
  
  useEffect(() => {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
  }, [likedSongs]);
  
  const addPlaylist = (playlist: Playlist) => {
    setPlaylists([...playlists, playlist]);
  };
  
  const toggleLikeSong = (song: Song) => {
    if (likedSongs.some(s => s.id === song.id)) {
      setLikedSongs(likedSongs.filter(s => s.id !== song.id));
    } else {
      setLikedSongs([...likedSongs, song]);
    }
  };
  
  const isSongLiked = (id: string) => {
    return likedSongs.some(song => song.id === id);
  };
  
  return (
    <AppContext.Provider value={{ 
      userRole, 
      setUserRole, 
      playlists, 
      addPlaylist, 
      likedSongs, 
      toggleLikeSong,
      isSongLiked
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
