import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['error']
});

async function main() {
  console.log('🌱 Création rapide des données de test...');

  // Nettoyage rapide
  try {
    await prisma.$executeRaw`TRUNCATE TABLE "Song" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Artist" RESTART IDENTITY CASCADE`;  
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    console.log('✅ Tables vidées');
  } catch (error) {
    console.log('⚠️ Erreur nettoyage:', error.message);
  }

  // Création directe
  try {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        provider: 'email',
        providerId: 'test-123',
        isArtist: true,
      },
    });
    console.log('👤 Utilisateur créé');

    const artist = await prisma.artist.create({
      data: {
        userId: user.id,
        stageName: 'MC Test',
        bio: 'Artiste de test',
        verified: true,
      },
    });
    console.log('🎤 Artiste créé');

    // Songs en une seule fois
    await prisma.song.createMany({
      data: [
        {
          title: 'Test Song 1',
          duration: 180,
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          coverUrl: 'https://picsum.photos/300/300?random=1',
          genre: 'Hip-Hop',
          artistId: artist.id,
        },
        {
          title: 'Test Song 2', 
          duration: 200,
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          coverUrl: 'https://picsum.photos/300/300?random=2',
          genre: 'Rap',
          artistId: artist.id,
        },
        {
          title: 'Test Song 3',
          duration: 160,
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
          coverUrl: 'https://picsum.photos/300/300?random=3',
          genre: 'Trap',
          artistId: artist.id,
        }
      ]
    });
    console.log('🎵 3 morceaux créés');
    console.log('✅ Seed terminé avec succès !');

  } catch (error) {
    console.error('❌ Erreur création:', error.message);
  }
}

main()
  .then(() => {
    console.log('🔌 Fermeture connexion...');
    return prisma.$disconnect();
  })
  .then(() => {
    console.log('👋 Terminé !');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Erreur fatale:', error);
    process.exit(1);
  });
