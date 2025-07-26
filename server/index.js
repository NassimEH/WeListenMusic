import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082'],
  credentials: true,
}));
app.use(express.json());

// Route de test pour l'auth (temporaire)
app.post('/api/auth/sign-in/email', (req, res) => {
  res.json({ 
    message: 'Auth temporairement désactivée',
    user: {
      id: 'demo-user',
      email: req.body.email,
      name: 'Demo User'
    }
  });
});

// Routes pour les morceaux
app.get('/api/songs', async (req, res) => {
  try {
    const songs = await prisma.song.findMany({
      where: { isPublic: true },
      include: {
        artist: {
          include: {
            user: {
              select: { name: true }
            }
          }
        },
        _count: {
          select: { likes: true, plays: true }
        }
      },
      take: 20,
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(songs);
  } catch (error) {
    console.error('Erreur récupération morceaux:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/songs', async (req, res) => {
  try {
    const { title, genre, lyrics, audioUrl, coverUrl, duration } = req.body;
    // TODO: Récupérer l'utilisateur depuis la session
    const userId = 'temp-user-id'; // Pour le test
    
    // Vérifier ou créer un profil artiste
    let artist = await prisma.artist.findUnique({
      where: { userId }
    });
    
    if (!artist) {
      artist = await prisma.artist.create({
        data: {
          userId,
          stageName: 'Nouvel Artiste',
        }
      });
    }
    
    const song = await prisma.song.create({
      data: {
        title,
        genre: genre || 'Non spécifié',
        lyrics,
        audioUrl,
        coverUrl,
        duration,
        artistId: artist.id,
      }
    });
    
    res.json(song);
  } catch (error) {
    console.error('Erreur création morceau:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/artist/songs', async (req, res) => {
  try {
    // TODO: Récupérer l'ID artiste depuis la session
    const artistId = 'temp-artist-id';
    
    const songs = await prisma.song.findMany({
      where: { artistId },
      include: {
        _count: {
          select: { likes: true, plays: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(songs);
  } catch (error) {
    console.error('Erreur récupération morceaux artiste:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/artist/stats', async (req, res) => {
  try {
    // TODO: Récupérer l'ID artiste depuis la session
    const artistId = 'temp-artist-id';
    
    const totalSongs = await prisma.song.count({
      where: { artistId }
    });
    
    const totalPlays = await prisma.play.count({
      where: {
        song: { artistId }
      }
    });
    
    const totalLikes = await prisma.like.count({
      where: {
        song: { artistId }
      }
    });
    
    const followers = await prisma.follow.count({
      where: { artistId }
    });
    
    res.json({
      totalSongs,
      totalPlays,
      totalLikes,
      followers,
    });
  } catch (error) {
    console.error('Erreur statistiques artiste:', error);
    res.json({
      totalSongs: 0,
      totalPlays: 0,
      totalLikes: 0,
      followers: 0,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🎵 Serveur API démarré sur le port ${PORT}`);
});
