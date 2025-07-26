import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du script de seed...');

  try {
    // Test de connexion
    console.log('🔌 Test de connexion à la base de données...');
    await prisma.$connect();
    console.log('✅ Connexion réussie !');

    // Nettoyage direct sans vérification
    console.log('🧹 Nettoyage des données existantes...');
    try {
      await prisma.song.deleteMany({});
      console.log('🎵 Morceaux supprimés');
    } catch (e) {
      console.log('⚠️ Pas de morceaux à supprimer');
    }
    
    try {
      await prisma.artist.deleteMany({});
      console.log('� Artistes supprimés');
    } catch (e) {
      console.log('⚠️ Pas d\'artistes à supprimer');
    }
    
    try {
      await prisma.user.deleteMany({});
      console.log('👤 Utilisateurs supprimés');
    } catch (e) {
      console.log('⚠️ Pas d\'utilisateurs à supprimer');
    }

    // Création d'un utilisateur test
    console.log('👤 Création de l\'utilisateur test...');
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Utilisateur Test',
        provider: 'email',
        providerId: 'test-provider-id',
        isArtist: true,
      },
    });
    console.log('✅ Utilisateur créé:', user.email);

    // Création d'un artiste
    console.log('🎤 Création de l\'artiste...');
    const artist = await prisma.artist.create({
      data: {
        userId: user.id,
        stageName: 'MC Test',
        bio: 'Artiste de test pour WeListen',
        verified: true,
      },
    });
    console.log('✅ Artiste créé:', artist.stageName);

    // Création de morceaux
    console.log('🎵 Création des morceaux...');
    
    const song1 = await prisma.song.create({
      data: {
        title: 'Premier Test',
        duration: 180,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        coverUrl: 'https://picsum.photos/300/300?random=1',
        genre: 'Hip-Hop',
        lyrics: 'Paroles de test...',
        artistId: artist.id,
      },
    });
    console.log('✅ Morceau 1 créé:', song1.title);

    const song2 = await prisma.song.create({
      data: {
        title: 'Deuxième Test',
        duration: 200,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        coverUrl: 'https://picsum.photos/300/300?random=2',
        genre: 'Rap',
        artistId: artist.id,
      },
    });
    console.log('✅ Morceau 2 créé:', song2.title);

    const song3 = await prisma.song.create({
      data: {
        title: 'Troisième Test',
        duration: 220,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        coverUrl: 'https://picsum.photos/300/300?random=3',
        genre: 'Trap',
        artistId: artist.id,
      },
    });
    console.log('✅ Morceau 3 créé:', song3.title);

    console.log('🎉 Script terminé avec succès !');
    console.log('📊 Résumé:');
    console.log(`   - 1 utilisateur: ${user.email}`);
    console.log(`   - 1 artiste: ${artist.stageName}`);
    console.log(`   - 3 morceaux créés`);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error('📋 Détails:', error);
  }
}

main()
  .catch((e) => {
    console.error('❌ Erreur fatale:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('🔌 Fermeture de la connexion...');
    await prisma.$disconnect();
    console.log('👋 Terminé !');
  });
