import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { signIn, signUp, useSession } from '@/lib/auth-client';
import { User, Music, Github } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

interface AuthDialogProps {
  children: React.ReactNode;
}

const AuthDialog = ({ children }: AuthDialogProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isArtist, setIsArtist] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const { data: session } = useSession();

  const handleGoogleAuth = async () => {
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (error) {
      console.error('Google auth error:', error);
    }
  };

  const handleGithubAuth = async () => {
    try {
      await signIn.social({
        provider: 'github',
        callbackURL: '/',
      });
    } catch (error) {
      console.error('GitHub auth error:', error);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isSignUp) {
        await signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          callbackURL: '/',
        });
      } else {
        await signIn.email({
          email: formData.email,
          password: formData.password,
          callbackURL: '/',
        });
      }
    } catch (error) {
      console.error('Email auth error:', error);
    }
  };

  if (session?.user) {
    return null; // Ne pas afficher si déjà connecté
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {isSignUp ? 'Rejoindre WeListen' : 'Se connecter'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSignUp 
              ? 'Créez votre compte pour commencer à partager votre musique'
              : 'Connectez-vous pour accéder à votre bibliothèque musicale'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* OAuth Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleAuth}
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Continuer avec Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGithubAuth}
            >
              <Github className="w-5 h-5 mr-2" />
              Continuer avec GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuer avec
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Votre nom"
                  required={isSignUp}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
                required
              />
            </div>

            {isSignUp && (
              <div className="flex items-center space-x-2 p-4 bg-audio-surface rounded-lg">
                <Music className="w-5 h-5 text-audio-accent" />
                <div className="flex-1">
                  <Label htmlFor="artist-mode" className="text-sm font-medium">
                    Je suis un artiste
                  </Label>
                  <p className="text-xs text-audio-muted">
                    Créer un profil d'artiste pour publier vos morceaux
                  </p>
                </div>
                <Switch
                  id="artist-mode"
                  checked={isArtist}
                  onCheckedChange={setIsArtist}
                />
              </div>
            )}

            <Button type="submit" className="w-full">
              {isSignUp ? 'Créer mon compte' : 'Se connecter'}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-audio-accent hover:underline"
            >
              {isSignUp 
                ? 'Déjà un compte ? Se connecter'
                : 'Pas de compte ? S\'inscrire'
              }
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Composant pour afficher le profil utilisateur
export const UserProfile = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <AuthDialog>
        <Button variant="outline" size="sm">
          <User className="w-4 h-4 mr-2" />
          Se connecter
        </Button>
      </AuthDialog>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || 'User'}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-audio-accent rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        )}
        <span className="text-sm font-medium">
          {session.user.name || 'Utilisateur'}
        </span>
      </div>
    </div>
  );
};

export default AuthDialog;
