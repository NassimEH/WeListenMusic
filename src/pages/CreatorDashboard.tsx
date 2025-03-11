
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, BarChart, Users, TrendingUp, Clock, Plus, ArrowUpRight, Music, Play, Calendar, Disc, X, Image, MusicIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { playSoundEffect } from '@/utils/soundEffects';
import StarBackground from '@/components/StarBackground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

const CreatorDashboard = () => {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    duration: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };
  
  const handleTrackHover = (id: string | null) => {
    if (id !== hoveredTrack) {
      playSoundEffect('hover', 0.1);
    }
    setHoveredTrack(id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUploadFormData({
      ...uploadFormData,
      [name]: value
    });
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simuler le téléchargement
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setShowUploadForm(false);
          setUploadProgress(0);
          setUploadFormData({
            title: '',
            description: '',
            releaseDate: '',
            duration: '',
          });
          toast({
            title: "Titre téléchargé avec succès",
            description: `"${uploadFormData.title}" est maintenant disponible à l'écoute.`,
          });
        }, 500);
      }
    }, 100);
  };
  
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
  
  return (
    <div className="min-h-screen overflow-x-hidden pb-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-audio-dark via-audio-dark/95 to-audio-dark"></div>
        <StarBackground intensity={0.4} speed={0.25} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-audio-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 relative pt-6">
        {/* Welcome section */}
        <section className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-audio-accent to-purple-500"
          >
            Espace Créateur
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-audio-light/70 text-sm"
          >
            Gérez votre contenu et suivez vos performances
          </motion.p>
        </section>

        {/* Tabs navigation */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="bg-audio-surface/20 border border-white/5 backdrop-blur-sm p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-audio-accent/20 data-[state=active]:text-audio-accent">
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="uploads" className="data-[state=active]:bg-audio-accent/20 data-[state=active]:text-audio-accent">
              Vos titres
            </TabsTrigger>
            <TabsTrigger value="audience" className="data-[state=active]:bg-audio-accent/20 data-[state=active]:text-audio-accent">
              Audience
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-audio-accent/20 data-[state=active]:text-audio-accent">
              Activité
            </TabsTrigger>
          </TabsList>

          {/* Tab Content: Overview */}
          <TabsContent value="overview" className="mt-6">
            {/* Quick actions */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="bg-gradient-to-r from-audio-accent to-purple-500 hover:from-audio-accent hover:to-purple-600 gap-2 text-sm py-2 h-auto"
                  onClick={() => {
                    setShowUploadForm(true);
                    playSoundEffect('click');
                  }}
                >
                  <Upload size={16} />
                  Télécharger un titre
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/10 bg-audio-surface/20 hover:bg-audio-surface/40 gap-2 text-sm py-2 h-auto"
                  onClick={() => playSoundEffect('click')}
                >
                  <BarChart size={16} />
                  Statistiques
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/10 bg-audio-surface/20 hover:bg-audio-surface/40 gap-2 text-sm py-2 h-auto"
                  onClick={() => playSoundEffect('click')}
                >
                  <Users size={16} />
                  Communauté
                </Button>
              </div>
            </motion.section>
            
            {/* Recent uploads section */}
            <motion.section
              variants={container}
              initial="hidden"
              animate="show" 
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-medium">Téléchargements récents</h2>
                <button 
                  className="text-audio-accent hover:text-audio-accent-light flex items-center gap-1 text-sm"
                  onMouseEnter={() => playSoundEffect('hover')}
                  onClick={() => playSoundEffect('click')}
                >
                  Voir tout <ArrowUpRight size={14} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentUploads.map((upload, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="bg-audio-surface/20 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-audio-accent/5 transition-shadow duration-300"
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <div className="relative aspect-square">
                      <img 
                        src={upload.cover} 
                        alt={upload.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button 
                          className="w-12 h-12 rounded-full bg-audio-accent/90 flex items-center justify-center hover:bg-audio-accent transition-colors"
                          onClick={() => playSoundEffect('click')}
                        >
                          <Play size={22} fill="white" className="text-white ml-1" />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-base">{upload.title}</h3>
                      <div className="flex justify-between items-center mt-2 text-audio-light/60 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{upload.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Play size={12} />
                          <span>{upload.streams}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
            
            {/* Quick stats section */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-medium">Performance</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-audio-surface/20 border-white/5 backdrop-blur-sm">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardDescription className="text-audio-light/60 text-xs">Écoutes (30j)</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="text-xl font-medium">24.5K</div>
                    <div className="text-xs text-green-400 flex items-center mt-1">
                      +12% <TrendingUp size={12} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-audio-surface/20 border-white/5 backdrop-blur-sm">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardDescription className="text-audio-light/60 text-xs">Nouveaux fans</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="text-xl font-medium">1.2K</div>
                    <div className="text-xs text-green-400 flex items-center mt-1">
                      +8% <TrendingUp size={12} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-audio-surface/20 border-white/5 backdrop-blur-sm">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardDescription className="text-audio-light/60 text-xs">Revenus</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="text-xl font-medium">€560</div>
                    <div className="text-xs text-green-400 flex items-center mt-1">
                      +15% <TrendingUp size={12} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-audio-surface/20 border-white/5 backdrop-blur-sm">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardDescription className="text-audio-light/60 text-xs">Abonnés</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="text-xl font-medium">3.8K</div>
                    <div className="text-xs text-green-400 flex items-center mt-1">
                      +5% <TrendingUp size={12} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            {/* Top tracks */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-medium">Titres populaires</h2>
                <a 
                  href="#" 
                  className="text-sm text-audio-accent hover:text-audio-accent-light flex items-center gap-1"
                  onClick={() => playSoundEffect('hover')}
                >
                  Voir tout <ArrowUpRight size={14} />
                </a>
              </div>
              
              <Card className="bg-audio-surface/20 border-white/5 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="space-y-1">
                    {topTracks.map((track) => (
                      <div 
                        key={track.id}
                        className="flex items-center justify-between hover:bg-audio-surface/30 p-2 rounded-lg transition-colors cursor-pointer"
                        onMouseEnter={() => handleTrackHover(track.id)}
                        onMouseLeave={() => handleTrackHover(null)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img 
                              src={track.cover} 
                              alt={track.title} 
                              className="w-10 h-10 object-cover rounded"
                            />
                            {hoveredTrack === track.id ? (
                              <button 
                                className="absolute inset-0 flex items-center justify-center bg-black/40"
                                onClick={() => playSoundEffect('click')}
                              >
                                <Play size={16} className="text-white" />
                              </button>
                            ) : null}
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{track.title}</h3>
                            <p className="text-xs text-audio-light/60">{track.streams} streams</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="w-24">
                            <Progress value={80} className="h-1 bg-audio-surface/30" />
                          </div>
                          <span className="text-xs text-audio-light/60">{track.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* Upload tab content - Empty state with upload functionality */}
          <TabsContent value="uploads" className="mt-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-medium">Vos titres</h2>
              <Button 
                className="bg-audio-accent hover:bg-audio-accent-light gap-2 text-sm py-1.5 h-auto px-3"
                onClick={() => {
                  setShowUploadForm(true);
                  playSoundEffect('click');
                }}
              >
                <Upload size={14} />
                Télécharger
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Modal */}
      {showUploadForm && (
        <motion.div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-audio-surface/90 backdrop-blur-md border border-white/10 rounded-lg w-full max-w-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-medium">Télécharger un nouveau titre</h3>
              <button 
                className="text-audio-light/60 hover:text-audio-light transition-colors"
                onClick={() => setShowUploadForm(false)}
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-4">
              {isUploading ? (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <Progress value={uploadProgress} className="h-1 bg-audio-surface/30" />
                    <p className="text-sm mt-2 text-audio-light/70">Téléchargement en cours... {uploadProgress}%</p>
                  </div>
                  {uploadProgress === 100 && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center"
                    >
                      <CheckCircle2 className="text-green-400 mb-2" size={32} />
                      <p className="font-medium">Téléchargement réussi!</p>
                    </motion.div>
                  )}
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm text-audio-light/70 mb-1">Titre *</label>
                      <input
                        type="text"
                        name="title"
                        value={uploadFormData.title}
                        onChange={handleInputChange}
                        className="w-full bg-audio-surface/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-audio-accent/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-audio-light/70 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={uploadFormData.description}
                        onChange={handleInputChange}
                        className="w-full bg-audio-surface/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-audio-accent/50 min-h-[80px]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-audio-light/70 mb-1">Date de sortie *</label>
                        <input
                          type="date"
                          name="releaseDate"
                          value={uploadFormData.releaseDate}
                          onChange={handleInputChange}
                          className="w-full bg-audio-surface/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-audio-accent/50"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-audio-light/70 mb-1">Durée *</label>
                        <input
                          type="text"
                          name="duration"
                          value={uploadFormData.duration}
                          onChange={handleInputChange}
                          placeholder="Ex: 3:45"
                          className="w-full bg-audio-surface/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-audio-accent/50"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm text-audio-light/70 mb-1">Fichier audio *</label>
                      <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center">
                        <MusicIcon size={24} className="mx-auto mb-2 text-audio-light/40" />
                        <p className="text-audio-light/60 text-sm mb-2">Glissez votre fichier audio ici ou</p>
                        <button 
                          type="button"
                          className="px-3 py-1.5 bg-audio-accent/20 text-audio-accent rounded-lg text-sm hover:bg-audio-accent/30 transition-colors"
                        >
                          Parcourir
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm text-audio-light/70 mb-1">Image de couverture *</label>
                      <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center">
                        <Image size={24} className="mx-auto mb-2 text-audio-light/40" />
                        <p className="text-audio-light/60 text-sm mb-2">Glissez votre image ici ou</p>
                        <button 
                          type="button"
                          className="px-3 py-1.5 bg-audio-accent/20 text-audio-accent rounded-lg text-sm hover:bg-audio-accent/30 transition-colors"
                        >
                          Parcourir
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10 hover:bg-audio-surface/50 text-sm py-1.5 h-auto px-3"
                      onClick={() => setShowUploadForm(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      className="bg-audio-accent hover:bg-audio-accent-light text-sm py-1.5 h-auto px-3"
                    >
                      Télécharger
                    </Button>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CreatorDashboard;
