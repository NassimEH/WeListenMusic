
import React, { useEffect } from 'react';
import AppLayout from '@/components/app/AppLayout';
import { cn } from '@/lib/utils';
import { PlusCircle, Users, Play, BarChart2, Headphones, Clock, ArrowUpRight, Upload, Music } from 'lucide-react';
import { playSoundEffect } from '@/utils/soundEffects';
import { motion } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Mock data for charts
const listeningData = [
  { name: 'Jan', streams: 1200 },
  { name: 'Fév', streams: 1900 },
  { name: 'Mar', streams: 3000 },
  { name: 'Avr', streams: 2780 },
  { name: 'Mai', streams: 4890 },
  { name: 'Juin', streams: 3390 },
  { name: 'Juil', streams: 4490 },
];

// Mock tracks data
const yourTracks = [
  { id: '1', title: 'Dream On', plays: 12567, duration: '3:45', date: '12 juin 2024', cover: 'https://images.unsplash.com/photo-1584048333538-90f8670661ab?q=80&w=300&auto=format&fit=crop' },
  { id: '2', title: 'Higher Ground', plays: 8912, duration: '4:12', date: '23 mai 2024', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop' },
  { id: '3', title: 'Stellar', plays: 5438, duration: '2:56', date: '5 avril 2024', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop' },
];

// Stats data
const statsCards = [
  { 
    title: 'Auditeurs mensuels', 
    value: '15.8k', 
    change: '+12.7%', 
    isPositive: true,
    icon: Users,
    color: 'from-blue-600 to-cyan-400'
  },
  { 
    title: 'Écoutes totales', 
    value: '245.6k', 
    change: '+8.1%', 
    isPositive: true,
    icon: Headphones,
    color: 'from-purple-600 to-pink-400'
  },
  { 
    title: 'Temps d\'écoute', 
    value: '2 436h', 
    change: '+5.3%', 
    isPositive: true,
    icon: Clock,
    color: 'from-amber-500 to-orange-400'
  },
  { 
    title: 'Revenus', 
    value: '€1,280', 
    change: '+22.4%', 
    isPositive: true,
    icon: BarChart2,
    color: 'from-green-500 to-emerald-400'
  },
];

const CreatorDashboard = () => {
  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <AppLayout headerTitle="Tableau de bord" isCreator>
      <div className="pb-24">
        {/* Greeting */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-6 pb-8"
        >
          <h1 className="text-3xl font-bold">Bonjour, Créateur</h1>
          <p className="text-audio-light/70 mt-1">Voici un aperçu de votre activité musicale</p>
        </motion.div>
        
        {/* Upload button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <button 
            className="bg-gradient-to-r from-audio-accent to-purple-500 hover:from-audio-accent-light hover:to-purple-400 transition-all text-white px-6 py-4 rounded-xl font-medium flex items-center gap-2 shadow-neon hover-scale"
            onClick={() => playSoundEffect('click')}
          >
            <Upload size={20} />
            Ajouter un nouveau morceau
          </button>
        </motion.div>
        
        {/* Stats cards */}
        <motion.section 
          initial="hidden"
          animate="show"
          variants={container}
          className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-audio-surface/20 backdrop-blur-sm rounded-xl p-6 hover:bg-audio-surface/40 transition-all hover-scale"
              onClick={() => playSoundEffect('hover')}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  `bg-gradient-to-r ${stat.color}`
                )}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <span className={cn(
                  "text-sm px-2 py-1 rounded-full flex items-center gap-1", 
                  stat.isPositive ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"
                )}>
                  {stat.change}
                  <ArrowUpRight size={14} className={stat.isPositive ? "" : "rotate-180"} />
                </span>
              </div>
              <h3 className="text-audio-light/70 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </motion.section>
        
        {/* Listening stats chart */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-10"
        >
          <div className="bg-audio-surface/20 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold">Écoutes mensuelles</h2>
                <p className="text-audio-light/70 text-sm">Suivi de vos auditeurs sur les derniers mois</p>
              </div>
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1.5 text-sm rounded-lg bg-audio-surface/50 hover:bg-audio-surface/80 transition-colors"
                  onClick={() => playSoundEffect('hover')}
                >
                  7 jours
                </button>
                <button 
                  className="px-3 py-1.5 text-sm rounded-lg bg-audio-accent text-white"
                  onClick={() => playSoundEffect('hover')}
                >
                  Mois
                </button>
                <button 
                  className="px-3 py-1.5 text-sm rounded-lg bg-audio-surface/50 hover:bg-audio-surface/80 transition-colors"
                  onClick={() => playSoundEffect('hover')}
                >
                  Année
                </button>
              </div>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={listeningData}>
                  <defs>
                    <linearGradient id="streamGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      borderRadius: '0.5rem',
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: 'white'
                    }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Bar 
                    dataKey="streams" 
                    fill="url(#streamGradient)" 
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>
        
        {/* Your tracks */}
        <motion.section 
          initial="hidden"
          animate="show"
          variants={container}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Vos titres récents</h2>
            <a 
              href="#" 
              className="text-audio-light/60 hover:text-audio-light text-sm transition-colors flex items-center gap-1"
              onClick={() => playSoundEffect('hover')}
            >
              <span>Voir tous vos titres</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
          
          <motion.div
            variants={item}
            className="bg-audio-surface/20 backdrop-blur-sm rounded-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-xs text-audio-light/60 font-medium">#</th>
                    <th className="px-6 py-4 text-left text-xs text-audio-light/60 font-medium">TITRE</th>
                    <th className="px-6 py-4 text-left text-xs text-audio-light/60 font-medium">ÉCOUTES</th>
                    <th className="px-6 py-4 text-left text-xs text-audio-light/60 font-medium">DURÉE</th>
                    <th className="px-6 py-4 text-left text-xs text-audio-light/60 font-medium">DATE</th>
                    <th className="px-6 py-4 text-right text-xs text-audio-light/60 font-medium">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {yourTracks.map((track, index) => (
                    <tr 
                      key={track.id} 
                      className="hover:bg-audio-surface/30 transition-colors group cursor-pointer"
                      onClick={() => playSoundEffect('hover')}
                    >
                      <td className="px-6 py-4 text-audio-light/60">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded overflow-hidden">
                            <img 
                              src={track.cover} 
                              alt={track.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Play size={16} className="text-white" />
                            </div>
                          </div>
                          <span className="font-medium">{track.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-audio-light/80">{track.plays.toLocaleString()}</td>
                      <td className="px-6 py-4 text-audio-light/80">{track.duration}</td>
                      <td className="px-6 py-4 text-audio-light/80">{track.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            className="p-1.5 rounded-full hover:bg-audio-surface/50 transition-colors"
                            aria-label="Edit"
                          >
                            <Music size={16} className="text-audio-light/60" />
                          </button>
                          <button 
                            className="p-1.5 rounded-full hover:bg-audio-surface/50 transition-colors"
                            aria-label="Stats"
                          >
                            <BarChart2 size={16} className="text-audio-light/60" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-white/10 flex justify-center">
              <button 
                className="text-audio-accent hover:text-audio-accent-light transition-colors flex items-center gap-1"
                onClick={() => playSoundEffect('click')}
              >
                <PlusCircle size={16} />
                <span>Ajouter un nouveau titre</span>
              </button>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </AppLayout>
  );
};

export default CreatorDashboard;
