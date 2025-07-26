import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Création des données de test...');

  try {
    // Nettoyage direct sans vérification
    console.log('🧹 Nettoyage des données existantes...');
    await prisma.song.deleteMany({});
    await prisma.artist.deleteMany({});
    await prisma.user.deleteMany({});
    console.log('✅ Nettoyage terminé');

    // Créer un utilisateur test
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Utilisateur Test',
        provider: 'email',
        providerId: 'test-provider-id',
        isArtist: true,
      },
    });

    console.log('👤 Utilisateur créé :', user.email);

    // Créer un profil artiste
    const artist = await prisma.artist.create({
      data: {
        userId: user.id,
        stageName: 'MC Test',
        bio: 'Artiste de test pour WeListen',
        verified: true,
      },
    });

    console.log('🎤 Artiste créé :', artist.stageName);

    // Créer quelques morceaux de test
    const songs = [
      {
        title: 'Premier Morceau',
        duration: 240,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        coverUrl: 'https://picsum.photos/300/300?random=1',
        genre: 'Hip-Hop',
        lyrics: 'Paroles du premier morceau...',
        artistId: artist.id,
      },
      {
        title: 'Deuxième Beat',
        duration: 180,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        coverUrl: 'https://picsum.photos/300/300?random=2',
        genre: 'Rap',
        lyrics: 'Paroles du deuxième morceau...',
        artistId: artist.id,
      },
      {
        title: 'Troisième Flow',
        duration: 200,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        coverUrl: 'https://picsum.photos/300/300?random=3',
        genre: 'Trap',
        artistId: artist.id,
      },
    ];

    for (const songData of songs) {
      const song = await prisma.song.create({ data: songData });
      console.log('🎵 Morceau créé :', song.title);
    }

    console.log('✅ Données de test créées avec succès !');
    console.log(`� Résumé :`);
    console.log(`   - 1 utilisateur : ${user.email}`);
    console.log(`   - 1 artiste : ${artist.stageName}`);
    console.log(`   - ${songs.length} morceaux`);
    
  } catch (error) {
    console.error('❌ Erreur détaillée :', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors de la création des données :', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('🔌 Fermeture de la connexion Prisma...');
    await prisma.$disconnect();
    console.log('👋 Terminé !');
  });
