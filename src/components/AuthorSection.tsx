
import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthorProps {
  name: string;
  role: string;
  image: string;
  className?: string;
  socials?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

const Author = ({ name, role, image, className, socials }: AuthorProps) => {
  return (
    <div className={cn("group relative overflow-hidden rounded-2xl glass hover-scale", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-audio-dark/90 z-10"></div>
      
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <h3 className="text-xl md:text-2xl font-bold mb-1">{name}</h3>
        <p className="text-audio-light/70 mb-4">{role}</p>
        
        {socials && (
          <div className="flex gap-3">
            {socials.github && (
              <a 
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 glass rounded-full hover:bg-audio-accent/20 transition-colors"
              >
                <Github size={18} />
              </a>
            )}
            {socials.twitter && (
              <a 
                href={socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 glass rounded-full hover:bg-audio-accent/20 transition-colors"
              >
                <Twitter size={18} />
              </a>
            )}
            {socials.linkedin && (
              <a 
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 glass rounded-full hover:bg-audio-accent/20 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const AuthorSection = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-audio-dark/95 via-audio-dark to-audio-dark/95"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-xs font-medium rounded-full glass-accent text-audio-accent inline-block mb-4">
            L'équipe derrière WeListen
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">Nos créateurs</h2>
          <p className="text-audio-light/70 max-w-2xl mx-auto text-balance">
            Rencontrez les esprits créatifs qui ont conçu et développé cette plateforme musicale innovante.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Author 
            name="Nassim" 
            role="Développeur Full Stack & Designer UX"
            image="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1740&auto=format&fit=crop"
            socials={{
              github: "https://github.com",
              twitter: "https://twitter.com",
              linkedin: "https://linkedin.com"
            }}
          />
          <Author 
            name="Chadi" 
            role="Architecte Audio & Développeur Back-end"
            image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1740&auto=format&fit=crop"
            socials={{
              github: "https://github.com",
              twitter: "https://twitter.com",
              linkedin: "https://linkedin.com"
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
