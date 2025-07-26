import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Music, Image, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { uploadAudio, uploadImage, mockUploadAudio, mockUploadImage } from '@/lib/cloudinary';
import { useSession } from '@/lib/auth-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SongUploadForm {
  title: string;
  genre: string;
  lyrics: string;
  albumId?: string;
}

const SongUploadForm = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<SongUploadForm>({
    title: '',
    genre: '',
    lyrics: '',
  });
  const [uploadProgress, setUploadProgress] = useState<{
    audio: number;
    cover: number;
  }>({ audio: 0, cover: 0 });

  const onAudioDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    }
  }, []);

  const onCoverDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setCoverFile(file);
    }
  }, []);

  const { getRootProps: getAudioRootProps, getInputProps: getAudioInputProps, isDragActive: isAudioDragActive } = useDropzone({
    onDrop: onAudioDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.flac'],
    },
    maxFiles: 1,
  });

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps, isDragActive: isCoverDragActive } = useDropzone({
    onDrop: onCoverDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
    },
    maxFiles: 1,
  });

  const uploadSongMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      genre: string;
      lyrics: string;
      audioUrl: string;
      coverUrl?: string;
      duration: number;
    }) => {
      const response = await fetch('/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload song');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      // Reset form
      setAudioFile(null);
      setCoverFile(null);
      setFormData({ title: '', genre: '', lyrics: '' });
      setUploadProgress({ audio: 0, cover: 0 });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!audioFile || !session?.user) {
      return;
    }

    try {
      // Use mock uploads in development
      const isProduction = import.meta.env.PROD;
      
      // Upload audio file
      setUploadProgress(prev => ({ ...prev, audio: 50 }));
      const audioUrl = isProduction ? 
        await uploadAudio(audioFile) : 
        await mockUploadAudio(audioFile);
      setUploadProgress(prev => ({ ...prev, audio: 100 }));

      // Upload cover if provided
      let coverUrl: string | undefined;
      if (coverFile) {
        setUploadProgress(prev => ({ ...prev, cover: 50 }));
        coverUrl = isProduction ? 
          await uploadImage(coverFile) : 
          await mockUploadImage(coverFile);
        setUploadProgress(prev => ({ ...prev, cover: 100 }));
      }

      // Get audio duration
      const audio = new Audio(URL.createObjectURL(audioFile));
      const duration = await new Promise<number>((resolve) => {
        audio.addEventListener('loadedmetadata', () => {
          resolve(Math.floor(audio.duration));
        });
        audio.load();
      });

      // Upload song data to database
      await uploadSongMutation.mutateAsync({
        title: formData.title,
        genre: formData.genre,
        lyrics: formData.lyrics,
        audioUrl,
        coverUrl,
        duration,
      });

    } catch (error) {
      console.error('Error uploading song:', error);
    }
  };

  const removeAudioFile = () => {
    setAudioFile(null);
    setUploadProgress(prev => ({ ...prev, audio: 0 }));
  };

  const removeCoverFile = () => {
    setCoverFile(null);
    setUploadProgress(prev => ({ ...prev, cover: 0 }));
  };

  if (!session?.user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <Music className="w-16 h-16 mx-auto mb-4 text-audio-muted" />
          <h3 className="text-xl font-semibold mb-2">Connectez-vous pour uploader</h3>
          <p className="text-audio-muted">Vous devez être connecté pour publier vos morceaux.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Publier un nouveau morceau
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Audio Upload */}
          <div className="space-y-2">
            <Label>Fichier audio *</Label>
            {!audioFile ? (
              <div
                {...getAudioRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${isAudioDragActive ? 'border-audio-accent bg-audio-accent/5' : 'border-audio-muted hover:border-audio-accent'}
                `}
              >
                <input {...getAudioInputProps()} />
                <Music className="w-12 h-12 mx-auto mb-4 text-audio-muted" />
                <p className="text-lg font-medium mb-2">
                  {isAudioDragActive ? 'Déposez votre fichier audio ici' : 'Cliquez ou glissez votre fichier audio'}
                </p>
                <p className="text-sm text-audio-muted">MP3, WAV, M4A, FLAC (max 50MB)</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-audio-surface rounded-lg">
                <Music className="w-8 h-8 text-audio-accent" />
                <div className="flex-1">
                  <p className="font-medium">{audioFile.name}</p>
                  <p className="text-sm text-audio-muted">
                    {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  {uploadProgress.audio > 0 && uploadProgress.audio < 100 && (
                    <div className="w-full bg-audio-dark rounded-full h-2 mt-2">
                      <div 
                        className="bg-audio-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress.audio}%` }}
                      />
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeAudioFile}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Cover Upload */}
          <div className="space-y-2">
            <Label>Pochette (optionnel)</Label>
            {!coverFile ? (
              <div
                {...getCoverRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                  ${isCoverDragActive ? 'border-audio-accent bg-audio-accent/5' : 'border-audio-muted hover:border-audio-accent'}
                `}
              >
                <input {...getCoverInputProps()} />
                <Image className="w-8 h-8 mx-auto mb-2 text-audio-muted" />
                <p className="text-sm">
                  {isCoverDragActive ? 'Déposez votre image ici' : 'Cliquez ou glissez une image'}
                </p>
                <p className="text-xs text-audio-muted">JPG, PNG, WebP (max 5MB)</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-audio-surface rounded-lg">
                <div className="w-12 h-12 bg-audio-dark rounded overflow-hidden">
                  <img
                    src={URL.createObjectURL(coverFile)}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{coverFile.name}</p>
                  <p className="text-sm text-audio-muted">
                    {(coverFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  {uploadProgress.cover > 0 && uploadProgress.cover < 100 && (
                    <div className="w-full bg-audio-dark rounded-full h-2 mt-2">
                      <div 
                        className="bg-audio-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress.cover}%` }}
                      />
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeCoverFile}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Song Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Nom de votre morceau"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                placeholder="Hip-Hop, Pop, Rock..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lyrics">Paroles (optionnel)</Label>
            <Textarea
              id="lyrics"
              value={formData.lyrics}
              onChange={(e) => setFormData(prev => ({ ...prev, lyrics: e.target.value }))}
              placeholder="Les paroles de votre morceau..."
              rows={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!audioFile || !formData.title || uploadSongMutation.isPending}
          >
            {uploadSongMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Publication en cours...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Publier le morceau
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SongUploadForm;
