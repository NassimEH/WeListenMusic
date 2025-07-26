
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
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  songs: Song[];
  addSong: (song: Song) => void;
  removeSong: (id: string) => void;
  albums: Album[];
  addAlbum: (album: Album) => void;
  removeAlbum: (id: string) => void;
  // Phase 3: Remix & Collaboration
  stemTracks: StemTrack[];
  remixSubmissions: RemixSubmission[];
  addStemTrack: (stemTrack: StemTrack) => void;
  removeStemTrack: (id: string) => void;
  submitRemix: (remix: RemixSubmission) => void;
  approveRemix: (id: string) => void;
  rejectRemix: (id: string) => void;
  getSongRemixes: (songId: string) => RemixSubmission[];
  getSongStems: (songId: string) => StemTrack[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
  audioUrl?: string;
  // Extended properties for Phase 2 & 3
  genre?: string;
  releaseDate?: string;
  playCount?: number;
  likes?: number;
  description?: string;
  // Phase 3: Remix & Collaboration
  originalSongId?: string; // If this is a remix
  remixCount?: number;
  collaborators?: string[];
  stemTracks?: StemTrack[];
  allowRemixes?: boolean;
  license?: 'creative-commons' | 'exclusive' | 'commercial';
}

export interface StemTrack {
  id: string;
  songId: string;
  name: string; // "vocals", "drums", "bass", "melody", etc.
  audioUrl: string;
  volume: number; // 0-100
  solo: boolean;
  muted: boolean;
}

export interface RemixSubmission {
  id: string;
  originalSongId: string;
  remixerId: string;
  remixerName: string;
  title: string;
  description: string;
  audioUrl: string;
  stemTrackIds: string[];
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  votes: number;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  songs: Song[];
}

export interface Album {
  id: string;
  title: string;
  cover: string;
  songs: Song[];
}

interface UserProfile {
  name: string;
  bio: string;
  profileImage: string;
  coverImage: string;
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
  
  const [songs, setSongs] = useState<Song[]>(() => {
    const saved = localStorage.getItem('creatorSongs');
    return saved ? JSON.parse(saved) : [
      { 
        id: '1', 
        title: 'DKR', 
        artist: 'Your Artist Name', 
        album: 'Singles', 
        cover: 'https://i1.sndcdn.com/artworks-000224127351-494034-t500x500.jpg', 
        duration: '3:15',
        audioUrl: '/sounds/pop.mp3',
        genre: 'Hip-Hop',
        releaseDate: '2024',
        playCount: 12500,
        likes: 892,
        description: 'Un morceau puissant avec des influences hip-hop modernes',
        allowRemixes: true,
        license: 'creative-commons' as const,
        remixCount: 2
      },
      { 
        id: '2', 
        title: 'GIMS', 
        artist: 'Your Artist Name', 
        album: 'Singles', 
        cover: 'https://i1.sndcdn.com/artworks-sLK6Oe4dvKWLvVLB-U8S6mg-t500x500.jpg', 
        duration: '4:05',
        audioUrl: '/sounds/swoosh.mp3',
        genre: 'Pop',
        releaseDate: '2024',
        playCount: 8900,
        likes: 645,
        description: 'Une mélodie accrocheuse avec des éléments pop contemporains',
        allowRemixes: true,
        license: 'creative-commons' as const,
        remixCount: 0
      },
      { 
        id: '3', 
        title: 'Longueur d\'avance', 
        artist: 'Your Artist Name', 
        album: 'Singles', 
        cover: 'https://cdn.alza.cz/Foto/ImgGalery/Image/booba-ultra-cover.jpg', 
        duration: '2:55',
        audioUrl: '/sounds/click.mp3',
        genre: 'Rap',
        releaseDate: '2024',
        playCount: 15600,
        likes: 1200,
        description: 'Un flow unique sur une production moderne',
        allowRemixes: false,
        license: 'exclusive' as const,
        remixCount: 0
      },
      { 
        id: '4', 
        title: 'Pitbull', 
        artist: 'Your Artist Name', 
        album: 'Singles', 
        cover: 'https://pbs.twimg.com/media/D9XTKcYWwAEAA0W.jpg', 
        duration: '3:45',
        audioUrl: '/sounds/hover.mp3',
        genre: 'Reggaeton',
        releaseDate: '2024',
        playCount: 9800,
        likes: 756,
        description: 'Rythmes reggaeton avec une énergie explosive',
        allowRemixes: true,
        license: 'commercial' as const,
        remixCount: 0
      },
    ];
  });
  
  const [albums, setAlbums] = useState<Album[]>(() => {
    const saved = localStorage.getItem('creatorAlbums');
    return saved ? JSON.parse(saved) : [];
  });

  // Phase 3: Remix & Collaboration states
  const [stemTracks, setStemTracks] = useState<StemTrack[]>(() => {
    const saved = localStorage.getItem('stemTracks');
    return saved ? JSON.parse(saved) : [];
  });

  const [remixSubmissions, setRemixSubmissions] = useState<RemixSubmission[]>(() => {
    const saved = localStorage.getItem('remixSubmissions');
    return saved ? JSON.parse(saved) : [
      // Example remix submissions
      {
        id: 'remix-1',
        originalSongId: '1',
        remixerId: 'producer-mike',
        remixerName: 'Producer Mike',
        title: 'DKR (Electronic Remix)',
        description: 'A futuristic electronic take on the original track with heavy synths and electronic drums.',
        audioUrl: '/sounds/hover.mp3',
        stemTrackIds: ['1-vocals', '1-drums', '1-bass'],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        status: 'approved',
        votes: 47
      },
      {
        id: 'remix-2',
        originalSongId: '1',
        remixerId: 'dj-sarah',
        remixerName: 'DJ Sarah',
        title: 'DKR (Acoustic Version)',
        description: 'Stripped down acoustic version with guitar and minimal production.',
        audioUrl: '/sounds/click.mp3',
        stemTrackIds: ['1-vocals', '1-melody'],
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        status: 'pending',
        votes: 23
      }
    ];
  });
  
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      name: "User Name",
      bio: "Partagez votre expérience musicale et décrivez votre profil d'auditeur.",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2064&auto=format&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
    };
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
  
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);
  
  useEffect(() => {
    localStorage.setItem('creatorSongs', JSON.stringify(songs));
  }, [songs]);
  
  useEffect(() => {
    localStorage.setItem('creatorAlbums', JSON.stringify(albums));
  }, [albums]);

  useEffect(() => {
    localStorage.setItem('stemTracks', JSON.stringify(stemTracks));
  }, [stemTracks]);

  useEffect(() => {
    localStorage.setItem('remixSubmissions', JSON.stringify(remixSubmissions));
  }, [remixSubmissions]);
  
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
  
  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };
  
  const addSong = (song: Song) => {
    setSongs([...songs, song]);
  };
  
  const removeSong = (id: string) => {
    setSongs(songs.filter(song => song.id !== id));
  };
  
  const addAlbum = (album: Album) => {
    setAlbums([...albums, album]);
  };
  
  const removeAlbum = (id: string) => {
    setAlbums(albums.filter(album => album.id !== id));
  };

  // Phase 3: Remix & Collaboration functions
  const addStemTrack = (stemTrack: StemTrack) => {
    setStemTracks([...stemTracks, stemTrack]);
  };

  const removeStemTrack = (id: string) => {
    setStemTracks(stemTracks.filter(stem => stem.id !== id));
  };

  const submitRemix = (remix: RemixSubmission) => {
    setRemixSubmissions([...remixSubmissions, remix]);
  };

  const approveRemix = (id: string) => {
    setRemixSubmissions(remixSubmissions.map(remix => 
      remix.id === id ? { ...remix, status: 'approved' as const } : remix
    ));
  };

  const rejectRemix = (id: string) => {
    setRemixSubmissions(remixSubmissions.map(remix => 
      remix.id === id ? { ...remix, status: 'rejected' as const } : remix
    ));
  };

  const getSongRemixes = (songId: string) => {
    return remixSubmissions.filter(remix => remix.originalSongId === songId);
  };

  const getSongStems = (songId: string) => {
    return stemTracks.filter(stem => stem.songId === songId);
  };
  
  return (
    <AppContext.Provider value={{ 
      userRole, 
      setUserRole, 
      playlists, 
      addPlaylist, 
      likedSongs, 
      toggleLikeSong,
      isSongLiked,
      userProfile,
      updateUserProfile,
      songs,
      addSong,
      removeSong,
      albums,
      addAlbum,
      removeAlbum,
      // Phase 3: Remix & Collaboration
      stemTracks,
      remixSubmissions,
      addStemTrack,
      removeStemTrack,
      submitRemix,
      approveRemix,
      rejectRemix,
      getSongRemixes,
      getSongStems
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
