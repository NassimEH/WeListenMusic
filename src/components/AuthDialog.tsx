import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { User, Music, Github } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useApp } from '@/contexts/AppContext';

interface AuthDialogProps {
  children: React.ReactNode;
}

const AuthDialog = ({ children }: AuthDialogProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isArtist, setIsArtist] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const { userRole, setUserRole } = useApp();

  const handleGoogleAuth = async () => {
    console.log('Google auth simulé');
    setUserRole(isArtist ? 'creator' : 'consumer');
    setIsOpen(false);
  };

  const handleGitHubAuth = async () => {
    console.log('GitHub auth simulé');
    setUserRole(isArtist ? 'creator' : 'consumer');
    setIsOpen(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email auth simulé:', formData);
    setUserRole(isArtist ? 'creator' : 'consumer');
    setIsOpen(false);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  // Si l'utilisateur est connecté, afficher le profil
  if (userRole) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4" />
          <span>Mode {userRole === 'creator' ? 'Artiste' : 'Auditeur'}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="border-white/20 text-white hover:bg-white/10"
        >
          Déconnexion
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-audio-dark border-white/10">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {isSignUp ? 'Créer un compte' : 'Se connecter'}
          </DialogTitle>
          <DialogDescription className="text-center text-audio-light/70">
            {isSignUp 
              ? 'Rejoignez WeListen et découvrez la musique autrement'
              : 'Connectez-vous pour accéder à votre espace personnel'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Toggle Artist Mode */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-audio-accent" />
                  <Label htmlFor="artist-mode" className="text-sm font-medium">
                    Mode Artiste
                  </Label>
                </div>
                <Switch
                  id="artist-mode"
                  checked={isArtist}
                  onCheckedChange={setIsArtist}
                />
              </div>
              <p className="text-xs text-audio-light/60 mt-2">
                {isArtist 
                  ? 'Vous pourrez uploader vos morceaux et gérer votre profil d\'artiste'
                  : 'Vous pourrez écouter et découvrir de la musique'
                }
              </p>
            </CardContent>
          </Card>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              onClick={handleGoogleAuth}
              variant="outline"
              className="w-full border-white/20 hover:bg-white/10"
            >
              <FcGoogle className="mr-2 h-4 w-4" />
              Continuer avec Google (Démo)
            </Button>
            
            <Button
              onClick={handleGitHubAuth}
              variant="outline"
              className="w-full border-white/20 hover:bg-white/10"
            >
              <Github className="mr-2 h-4 w-4" />
              Continuer avec GitHub (Démo)
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-audio-dark px-2 text-audio-light/60">ou</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-audio-accent hover:bg-audio-accent-light"
            >
              {isSignUp ? 'Créer mon compte (Démo)' : 'Se connecter (Démo)'}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-audio-light/70 hover:text-white"
            >
              {isSignUp 
                ? 'Déjà un compte ? Se connecter'
                : 'Pas de compte ? Créer un compte'
              }
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const UserProfile = () => {
  const { userRole, setUserRole } = useApp();

  if (!userRole) {
    return (
      <AuthDialog>
        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
          <User className="w-4 h-4 mr-2" />
          Se connecter
        </Button>
      </AuthDialog>
    );
  }

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-audio-accent rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-white">
          {userRole === 'creator' ? 'Artiste' : 'Auditeur'}
        </span>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleLogout}
        className="border-white/20 text-white hover:bg-white/10"
      >
        Déconnexion
      </Button>
    </div>
  );
};

export default AuthDialog;
