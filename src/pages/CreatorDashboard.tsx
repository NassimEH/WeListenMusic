import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, BarChart, Users, TrendingUp, Clock, Plus, ArrowUpRight, Music, Play, Zap, Sparkles, Layers, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { playSoundEffect, playSynthBlip } from '@/utils/soundEffects';
import SynthwaveBackground from '@/components/SynthwaveBackground';
import BackButton from '@/components/ui/back-button';
import BackgroundNotification from '@/components/ui/background-notification';
import FloatingAddButton from '@/components/ui/floating-add-button';
import { toast } from 'sonner';

// Mock data for stats
const stats = [
  { title: 'Écoutes totales', value: '24.5K', change: '+12%', trend: 'up', icon: TrendingUp },
  { title: 'Nouveaux auditeurs', value: '1.2K', change: '+8%', trend: 'up', icon: Users },
  { title: 'Revenus', value: '€560', change: '+15%', trend: 'up', icon: Zap },
  { title: 'Abonnés', value: '3.8K', change: '+5%', trend: 'up', icon: Sparkles },
];

// Mock data for top tracks
const topTracks = [
  { id: '1', title: 'DKR', streams: '850K', duration: '3:15', cover: 'https://i1.sndcdn.com/artworks-000224127351-494034-t500x500.jpg' },
  { id: '2', title: 'GIMS', streams: '720K', duration: '4:05', cover: 'https://i1.sndcdn.com/artworks-sLK6Oe4dvKWLvVLB-U8S6mg-t500x500.jpg' },
  { id: '3', title: 'Longueur d\'avance', streams: '540K', duration: '2:55', cover: 'https://cdn.alza.cz/Foto/ImgGalery/Image/booba-ultra-cover.jpg' },
  { id: '4', title: 'Pitbull', streams: '480K', duration: '3:45', cover: 'https://pbs.twimg.com/media/D9XTKcYWwAEAA0W.jpg' },
];

const CreatorDashboard = () => {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'trending' | 'recent' | 'analytics'>('trending');
  
  useEffect(() => {
    // Play a synthwave blip on component mount
    playSynthBlip();
  }, []);
  
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

  const handleUpload = () => {
    playSoundEffect('click');
    playSynthBlip();
    toast.success("Prêt à télécharger un nouveau titre");
  };
  
  return (
    <>
      <SynthwaveBackground variant="mountains" />
      <BackgroundNotification position="top-right" variant="success" interval={25} />
      
      <div className="container max-w-7xl mx-auto px-6 pt-6 pb-20">
        <div className="flex justify-between items-center mb-6">
          <BackButton to="/app" variant="synthwave" label="Retour à l'accueil" />
        </div>
        
        {/* Welcome section */}
        <section className="mb-8 relative">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-1 text-transparent bg-gradient-synthwave bg-clip-text"
          >
            Salut, Créateur
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-audio-light/70"
          >
            Bienvenue dans votre espace créateur
          </motion.p>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-0 right-0 w-24 h-24 rounded-full bg-audio-synthwave-purple/20 blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
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
              variant="synthwave"
              onClick={handleUpload}
            >
              <Upload size={18} />
              Télécharger un titre
            </Button>
            <Button 
              variant="synthwave-outline"
              onClick={() => playSoundEffect('click')}
            >
              <BarChart size={18} />
              Voir les statistiques
            </Button>
            <Button 
              variant="glass"
              onClick={() => playSoundEffect('click')}
            >
              <Users size={18} />
              Gérer la communauté
            </Button>
            <Button 
              variant="synthwave-ghost"
              onClick={() => playSoundEffect('click')}
            >
              <Rocket size={18} />
              Promouvoir
            </Button>
          </div>
        </motion.section>
        
        {/* Stats overview */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-transparent bg-gradient-synthwave bg-clip-text">Aperçu des statistiques</h2>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                variants={item}
                whileHover={{ 
                  y: -5, 
                  boxShadow: stat.trend === 'up' 
                    ? '0 0 15px rgba(249, 115, 22, 0.3), 0 0 30px rgba(249, 115, 22, 0.1)' 
                    : '0 0 15px rgba(239, 68, 68, 0.3), 0 0 30px rgba(239, 68, 68, 0.1)' 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="glass overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-audio-synthwave-purple/10 via-transparent to-transparent"></div>
                  <CardHeader className="pb-2 relative">
                    <div className="absolute top-2 right-2">
                      <stat.icon size={20} className={cn(
                        stat.trend === 'up' ? 'text-audio-synthwave-pink' : 'text-red-400'
                      )} />
                    </div>
                    <CardDescription className="text-audio-light/70">{stat.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="flex justify-between items-baseline">
                      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-synthwave">{stat.value}</div>
                      <div className={cn(
                        "text-sm flex items-center",
                        stat.trend === 'up' ? 'text-audio-synthwave-pink' : 'text-red-400'
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
        
        {/* Content Tabs */}
        <div className="mb-6 flex space-x-4 border-b border-white/10">
          {[
            { id: 'trending', label: 'Titres populaires', icon: TrendingUp },
            { id: 'recent', label: 'Activité récente', icon: Clock },
            { id: 'analytics', label: 'Métriques', icon: BarChart }
          ].map((tab) => (
            <button 
              key={tab.id}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300",
                activeTab === tab.id 
                  ? "border-audio-synthwave-pink text-audio-synthwave-pink" 
                  : "border-transparent text-audio-light/60 hover:text-audio-light"
              )}
              onClick={() => {
                setActiveTab(tab.id as 'trending' | 'recent' | 'analytics');
                playSoundEffect('pop');
              }}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Top tracks */}
        {activeTab === 'trending' && (
          <motion.section 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-transparent bg-gradient-synthwave bg-clip-text">Titres populaires</h2>
              <Button 
                variant="synthwave-ghost"
                size="sm"
                className="gap-1"
                onClick={() => playSoundEffect('hover')}
              >
                Voir tout <ArrowUpRight size={14} />
              </Button>
            </div>
            
            <Card className="glass overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-audio-synthwave-blue/5 via-transparent to-audio-synthwave-purple/5"></div>
              <CardContent className="p-6 relative">
                <div className="space-y-4">
                  {topTracks.map((track) => (
                    <motion.div 
                      key={track.id}
                      className="flex items-center justify-between hover:bg-white/5 p-3 rounded-lg transition-colors cursor-pointer group"
                      onMouseEnter={() => handleTrackHover(track.id)}
                      onMouseLeave={() => handleTrackHover(null)}
                      whileHover={{ 
                        backgroundColor: "rgba(255,255,255,0.05)", 
                        boxShadow: "0 0 10px rgba(249, 115, 22, 0.2)"
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img 
                            src={track.cover} 
                            alt={track.title} 
                            className="w-12 h-12 object-cover rounded group-hover:shadow-neon-pink transition-all duration-300"
                          />
                          {hoveredTrack === track.id ? (
                            <motion.button 
                              className="absolute inset-0 flex items-center justify-center bg-black/60"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              onClick={() => {
                                playSoundEffect('click');
                                toast.info(`Lecture de "${track.title}"`);
                              }}
                            >
                              <Play size={20} className="text-audio-synthwave-pink" />
                            </motion.button>
                          ) : null}
                        </div>
                        <div>
                          <h3 className="font-medium group-hover:text-audio-synthwave-pink transition-colors">{track.title}</h3>
                          <p className="text-sm text-audio-light/70">{track.streams} streams</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="w-32">
                          <Progress value={80} className="h-1 bg-audio-surface/30 [&>div]:bg-gradient-synthwave" />
                        </div>
                        <span className="text-sm text-audio-light/70">{track.duration}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>
        )}
        
        {/* Recent Activity */}
        {activeTab === 'recent' && (
          <motion.section 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-transparent bg-gradient-synthwave bg-clip-text">Activité récente</h2>
              <a 
                href="#" 
                className="text-sm text-audio-light/70 hover:text-audio-synthwave-pink flex items-center gap-1 transition-colors"
                onClick={() => playSoundEffect('hover')}
              >
                Voir tout <ArrowUpRight size={14} />
              </a>
            </div>
            
            <Card className="bg-black/40 backdrop-blur-md border-white/5 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-audio-synthwave-pink/10 via-transparent to-audio-synthwave-blue/10"></div>
              <CardContent className="p-6 relative">
                <ul className="space-y-4">
                  {[
                    { icon: Clock, text: 'Vous avez uploadé <b>Freestyle #12</b>', time: 'Il y a 2 heures', color: 'pink' },
                    { icon: Users, text: 'Vous avez gagné <b>120 nouveaux fans</b>', time: 'Hier', color: 'purple' },
                    { icon: TrendingUp, text: '<b>DKR</b> a atteint <b>1 million</b> d\'écoutes', time: 'Il y a 3 jours', color: 'blue' },
                    { icon: Plus, text: 'Votre titre a été ajouté à <b>25 playlists</b>', time: 'La semaine dernière', color: 'teal' },
                  ].map((activity, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className={cn(
                        "p-2 rounded-full",
                        activity.color === 'pink' ? 'bg-audio-synthwave-pink/20' : 
                        activity.color === 'purple' ? 'bg-audio-synthwave-purple/20' :
                        activity.color === 'blue' ? 'bg-audio-synthwave-blue/20' : 'bg-audio-synthwave-teal/20'
                      )}>
                        <activity.icon size={16} className={cn(
                          activity.color === 'pink' ? 'text-audio-synthwave-pink' : 
                          activity.color === 'purple' ? 'text-audio-synthwave-purple' :
                          activity.color === 'blue' ? 'text-audio-synthwave-blue' : 'text-audio-synthwave-teal'
                        )} />
                      </div>
                      <div>
                        <p className="text-sm" dangerouslySetInnerHTML={{ __html: activity.text }}></p>
                        <p className="text-xs text-audio-light/60 mt-1">{activity.time}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.section>
        )}
        
        {/* Audience metrics */}
        {activeTab === 'analytics' && (
          <motion.section 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4 text-transparent bg-gradient-synthwave bg-clip-text">Métriques d'audience</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/40 backdrop-blur-md border-white/5 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-audio-synthwave-blue/10 via-transparent to-transparent"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-lg text-transparent bg-gradient-synthwave bg-clip-text">Répartition par pays</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-4">
                    {[
                      { country: 'France', percentage: 65, color: 'pink' },
                      { country: 'Belgique', percentage: 15, color: 'purple' },
                      { country: 'Canada', percentage: 10, color: 'blue' },
                      { country: 'Suisse', percentage: 5, color: 'teal' },
                      { country: 'Autres', percentage: 5, color: 'gray' },
                    ].map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="space-y-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between text-sm">
                          <span>{item.country}</span>
                          <span>{item.percentage}%</span>
                        </div>
                        <div className="relative h-1 bg-audio-surface/30 rounded-full overflow-hidden">
                          <motion.div 
                            className={cn(
                              "absolute top-0 left-0 h-full rounded-full",
                              item.color === 'pink' ? 'bg-audio-synthwave-pink' : 
                              item.color === 'purple' ? 'bg-audio-synthwave-purple' :
                              item.color === 'blue' ? 'bg-audio-synthwave-blue' : 
                              item.color === 'teal' ? 'bg-audio-synthwave-teal' : 'bg-gray-500'
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 backdrop-blur-md border-white/5 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-audio-synthwave-purple/10 via-transparent to-transparent"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-lg text-transparent bg-gradient-synthwave bg-clip-text">Données démographiques</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
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
                            <div className="h-24 w-full bg-audio-surface/30 rounded-t-sm relative overflow-hidden">
                              <motion.div 
                                className="absolute bottom-0 left-0 right-0 bg-gradient-synthwave rounded-t-sm"
                                initial={{ height: 0 }}
                                animate={{ height: `${item.percentage}%` }}
                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              />
                            </div>
                            <span className="mt-1">{item.age}</span>
                            <span className="text-audio-light/70">{item.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex justify-between text-sm mb-3">
                        <span>Genre</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-32 relative rounded-full overflow-hidden">
                          <motion.div 
                            className="absolute inset-0 bg-gradient-synthwave" 
                            initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
                            animate={{ clipPath: 'polygon(0 0, 65% 0, 65% 100%, 0 100%)' }}
                            transition={{ duration: 1, delay: 0.8 }}
                          />
                          <div className="absolute inset-0 bg-audio-surface/50" style={{ clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 65% 100%)' }} />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Music size={40} className="text-audio-light/30" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-synthwave"></div>
                            <span>Hommes: 65%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-audio-surface/50"></div>
                            <span>Femmes: 35%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        )}
      </div>
      
      <FloatingAddButton 
        onClick={handleUpload} 
        label="Nouveau titre" 
        icon={<Upload size={16} />}
      />
    </>
  );
};

export default CreatorDashboard;
