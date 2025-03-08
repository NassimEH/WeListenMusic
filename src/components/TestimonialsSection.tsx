
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Quote, Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  className?: string;
}

const Testimonial = ({ name, role, content, rating, image, className }: TestimonialProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      card.style.transition = 'none';
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "glass border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group",
        "transition-all duration-500 ease-spring animate-float",
        className
      )}
    >
      {/* Glow effects */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-audio-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex items-start gap-4 mb-4 relative z-10">
        <div className="flex-shrink-0">
          <div className="relative">
            <img 
              src={image} 
              alt={name}
              className="w-14 h-14 rounded-full object-cover border-2 border-audio-accent/30"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-audio-dark border-2 border-audio-accent flex items-center justify-center">
              <Quote size={12} className="text-audio-accent" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-audio-light/60 text-sm">{role}</p>
          <div className="flex items-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < rating ? "text-audio-accent fill-audio-accent" : "text-audio-light/20"}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-audio-light/80 italic text-balance">{content}</p>
      </div>
      
      {/* Interactive particles */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-audio-accent/60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animation: 'float 4s ease-in-out infinite'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-audio-dark via-audio-dark/95 to-audio-dark"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-xs font-medium rounded-full glass-accent text-audio-accent inline-block mb-4">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">Ce que disent nos utilisateurs</h2>
          <p className="text-audio-light/70 max-w-2xl mx-auto text-balance">
            Découvrez les expériences de notre communauté et pourquoi ils ont choisi WeListen pour leur expérience musicale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial 
            name="Emilie Melis" 
            role="Auditrice passionnée"
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
            rating={5}
            content="L'interface est incroyablement fluide et intuitive. J'adore découvrir de nouveaux artistes grâce aux recommandations personnalisées. La qualité audio est exceptionnelle !"
            className="md:translate-y-8"
          />
          <Testimonial 
            name="Rebecca Ringuet" 
            role="Productrice de musique"
            image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"
            rating={5}
            content="En tant que productrice, WeListen me permet de suivre les tendances actuelles et de m'inspirer. La diversité des genres est impressionnante et l'expérience d'écoute est incomparable."
          />
          <Testimonial 
            name="Lucas Dréano" 
            role="DJ & Musicien"
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
            rating={4}
            content="WeListen a révolutionné ma façon de préparer mes sets. L'interface est magnifique et l'algorithme de recommandation est incroyablement précis. Mes playlists n'ont jamais été aussi bonnes !"
            className="md:translate-y-8"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
