
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, BarChart, Users, TrendingUp, Clock, Plus, ArrowUpRight, Music, Play, Calendar, Disc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { playSoundEffect } from '@/utils/soundEffects';
import StarBackground from '@/components/StarBackground';

// Mock data for stats
const stats = [
  { title: 'Écoutes totales', value: '24.5K', change: '+12%', trend: 'up' },
  { title: 'Nouveaux auditeurs', value: '1.2K', change: '+8%', trend: 'up' },
  { title: 'Revenus', value: '€560', change: '+15%', trend: 'up' },
  { title: 'Abonnés', value: '3.8K', change: '+5%', trend: 'up' },
];

// Mock data for top tracks
const topTracks = [
  { id: '1', title: 'DKR', streams: '850K', duration: '3:15', cover: 'https://i1.sndcdn.com/artworks-000224127351-494034-t500x500.jpg' },
  { id: '2', title: 'GIMS', streams: '720K', duration: '4:05', cover: 'https://i1.sndcdn.com/artworks-sLK6Oe4dvKWLvVLB-U8S6mg-t500x500.jpg' },
  { id: '3', title: 'Longueur d\'avance', streams: '540K', duration: '2:55', cover: 'https://cdn.alza.cz/Foto/ImgGalery/Image/booba-ultra-cover.jpg' },
  { id: '4', title: 'Pitbull', streams: '480K', duration: '3:45', cover: 'https://pbs.twimg.com/media/D9XTKcYWwAEAA0W.jpg' },
];

// Mock data for recent uploads
const recentUploads = [
  { title: 'Freestyle #12', date: '15 juin 2023', streams: '45K', cover: 'https://i.scdn.co/image/ab67616d00001e02b0fe40a6e1692822115acfce' },
  { title: 'En direct du tier', date: '2 mai 2023', streams: '120K', cover: 'https://i.scdn.co/image/ab67616d00001e02a8142ce89cebb0da0505a2a5' },
  { title: 'Ratpi World', date: '20 avril 2023', streams: '350K', cover: 'https://i.scdn.co/image/ab67616d00001e022dafecade03c775ac1c1fbf0' },
];

const CreatorDashboard = () => {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const handleTrackHover = (id: string | null) => {
    if (id !== hoveredTrack) {
      playSoundEffect('hover', 0.1);
    }
    setHoveredTrack(id);
  };
  
  return (
    <div className="min-h-screen bg-audio-dark overflow-x-hidden pb-20 pt-16">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-audio-dark via-audio-dark/95 to-audio-dark z-0"></div>
        <StarBackground intensity={0.5} speed={0.3} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-audio-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Welcome section */}
        <section className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-audio-accent to-purple-500"
          >
            Bienvenue, Créateur
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-audio-light/70"
          >
            Suivez vos performances et gérez votre contenu
          </motion.p>
        </section>
        
        {/* Quick actions */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-gradient-to-r from-audio-accent to-purple-500 hover:from-audio-accent hover:to-purple-600 gap-2"
              onClick={() => playSoundEffect('click')}
            >
              <Upload size={18} />
              Télécharger un titre
            </Button>
            <Button 
              variant="outline" 
              className="border-white/10 bg-audio-surface/20 hover:bg-audio-surface/40 gap-2"
              onClick={() => playSoundEffect('click')}
            >
              <BarChart size={18} />
              Voir les statistiques
            </Button>
            <Button 
              variant="outline" 
              className="border-white/10 bg-audio-surface/20 hover:bg-audio-surface/40 gap-2"
              onClick={() => playSoundEffect('click')}
            >
              <Users size={18} />
              Gérer la communauté
            </Button>
          </div>
        </motion.section>
        
        {/* Recent uploads section */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show" 
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Téléchargements récents</h2>
            <button 
              className="text-audio-accent hover:text-audio-accent-light flex items-center gap-1"
              onMouseEnter={() => playSoundEffect('hover')}
              onClick={() => playSoundEffect('click')}
            >
              Voir tout <ArrowUpRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentUploads.map((upload, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-audio-surface/20 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-audio-accent/5 transition-shadow duration-300"
              >
                <div className="relative aspect-square">
                  <img 
                    src={upload.cover} 
                    alt={upload.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      className="w-14 h-14 rounded-full bg-audio-accent flex items-center justify-center hover:bg-audio-accent-light transition-colors"
                      onClick={() => playSoundEffect('click')}
                    >
                      <Play size={26} fill="white" className="text-white ml-1" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{upload.title}</h3>
                  <div className="flex justify-between items-center mt-2 text-audio-light/70 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{upload.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Play size={14} />
                      <span>{upload.streams}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Stats overview */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Aperçu des statistiques</h2>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={item}>
                <Card className="bg-audio-surface/20 border-white/5 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-audio-light/70">{stat.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-baseline">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className={cn(
                        "text-sm flex items-center",
                        stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      )}>
                        {stat.change}
                        <TrendingUp size={14} className="ml-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* Top tracks */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Titres populaires</h2>
            <a 
              href="#" 
              className="text-sm text-audio-accent hover:text-audio-accent-light flex items-center gap-1"
              onClick={() => playSoundEffect('hover')}
            >
              Voir tout <ArrowUpRight size={14} />
            </a>
          </div>
          
          <Card className="bg-audio-surface/20 border-white/5 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {topTracks.map((track) => (
                  <div 
                    key={track.id}
                    className="flex items-center justify-between hover:bg-audio-surface/30 p-3 rounded-lg transition-colors cursor-pointer"
                    onMouseEnter={() => handleTrackHover(track.id)}
                    onMouseLeave={() => handleTrackHover(null)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={track.cover} 
                          alt={track.title} 
                          className="w-12 h-12 object-cover rounded"
                        />
                        {hoveredTrack === track.id ? (
                          <button 
                            className="absolute inset-0 flex items-center justify-center bg-black/40"
                            onClick={() => playSoundEffect('click')}
                          >
                            <Play size={20} className="text-white" />
                          </button>
                        ) : null}
                      </div>
                      <div>
                        <h3 className="font-medium">{track.title}</h3>
                        <p className="text-sm text-audio-light/70">{track.streams} streams</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="w-32">
                        <Progress value={80} className="h-1 bg-audio-surface/30" />
                      </div>
                      <span className="text-sm text-audio-light/70">{track.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Audience metrics */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Métriques d'audience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-audio-surface/20 border-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Répartition par pays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: 'France', percentage: 65 },
                    { country: 'Belgique', percentage: 15 },
                    { country: 'Canada', percentage: 10 },
                    { country: 'Suisse', percentage: 5 },
                    { country: 'Autres', percentage: 5 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.country}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-1 bg-audio-surface/30" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-audio-surface/20 border-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Données démographiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Âge</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-xs">
                      {[
                        { age: '18-24', percentage: 35 },
                        { age: '25-34', percentage: 40 },
                        { age: '35-44', percentage: 15 },
                        { age: '45-54', percentage: 7 },
                        { age: '55+', percentage: 3 },
                      ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="h-24 w-full bg-audio-surface/30 rounded-t-sm relative">
                            <div 
                              className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-audio-accent to-purple-500 rounded-t-sm"
                              style={{ height: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="mt-1">{item.age}</span>
                          <span className="text-audio-light/70">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex justify-between text-sm mb-3">
                      <span>Genre</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-32 relative rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-audio-accent to-purple-500" style={{ clipPath: 'polygon(0 0, 65% 0, 65% 100%, 0% 100%)' }}></div>
                        <div className="absolute inset-0 bg-audio-surface/50" style={{ clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 65% 100%)' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Music size={40} className="text-audio-light/30" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-audio-accent to-purple-500"></div>
                          <span>Hommes: 65%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-audio-surface/50"></div>
                          <span>Femmes: 35%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Recent activity */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Activité récente</h2>
            <a 
              href="#" 
              className="text-sm text-audio-accent hover:text-audio-accent-light flex items-center gap-1"
              onClick={() => playSoundEffect('hover')}
            >
              Voir tout <ArrowUpRight size={14} />
            </a>
          </div>
          
          <Card className="bg-audio-surface/20 border-white/5 backdrop-blur-sm">
            <CardContent className="p-6">
              <ul className="space-y-4">
                {[
                  { icon: Clock, text: 'Vous avez uploadé <b>Freestyle #12</b>', time: 'Il y a 2 heures' },
                  { icon: Users, text: 'Vous avez gagné <b>120 nouveaux fans</b>', time: 'Hier' },
                  { icon: TrendingUp, text: '<b>DKR</b> a atteint <b>1 million</b> d\'écoutes', time: 'Il y a 3 jours' },
                  { icon: Plus, text: 'Votre titre a été ajouté à <b>25 playlists</b>', time: 'La semaine dernière' },
                ].map((activity, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-audio-accent/20">
                      <activity.icon size={16} className="text-audio-accent" />
                    </div>
                    <div>
                      <p className="text-sm" dangerouslySetInnerHTML={{ __html: activity.text }}></p>
                      <p className="text-xs text-audio-light/60 mt-1">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default CreatorDashboard;
