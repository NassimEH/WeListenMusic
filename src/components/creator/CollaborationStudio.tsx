import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  UserPlus, 
  MessageCircle, 
  Video, 
  Mic, 
  MicOff,
  VideoOff,
  Share2,
  Save,
  History,
  GitBranch,
  Clock,
  Send
} from 'lucide-react';
import { useApp, Song } from '@/contexts/AppContext';

interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'collaborator' | 'viewer';
  isOnline: boolean;
  lastSeen?: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'audio' | 'project-update';
}

interface ProjectVersion {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string;
  changes: string[];
  isCurrent: boolean;
}

interface CollaborationStudioProps {
  song: Song;
  onClose?: () => void;
}

const CollaborationStudio: React.FC<CollaborationStudioProps> = ({ song, onClose }) => {
  const { userProfile } = useApp();
  
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: 'owner',
      name: song.artist,
      role: 'owner',
      isOnline: true
    },
    {
      id: 'collab1',
      name: 'Producer Mike',
      role: 'collaborator',
      isOnline: true
    },
    {
      id: 'collab2',
      name: 'Singer Sarah',
      role: 'collaborator',
      isOnline: false,
      lastSeen: '2 hours ago'
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: 'collab1',
      userName: 'Producer Mike',
      message: 'Hey! I just added a new bass line. Check it out!',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      type: 'text'
    },
    {
      id: '2',
      userId: 'owner',
      userName: song.artist,
      message: 'Sounds great! Can we make it a bit heavier on the low end?',
      timestamp: new Date(Date.now() - 180000).toISOString(),
      type: 'text'
    },
    {
      id: '3',
      userId: 'collab1',
      userName: 'Producer Mike',
      message: 'Updated the bass track with more low-end presence',
      timestamp: new Date(Date.now() - 60000).toISOString(),
      type: 'project-update'
    }
  ]);

  const [projectVersions, setProjectVersions] = useState<ProjectVersion[]>([
    {
      id: 'v1',
      name: 'Initial Demo',
      createdBy: song.artist,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      changes: ['Created initial track structure', 'Added basic melody'],
      isCurrent: false
    },
    {
      id: 'v2',
      name: 'Added Drums',
      createdBy: 'Producer Mike',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      changes: ['Added drum track', 'Adjusted tempo to 128 BPM'],
      isCurrent: false
    },
    {
      id: 'v3',
      name: 'Enhanced Bass',
      createdBy: 'Producer Mike',
      createdAt: new Date().toISOString(),
      changes: ['Enhanced bass track', 'Increased low-end frequencies'],
      isCurrent: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const inviteCollaborator = () => {
    if (!inviteEmail.trim()) return;

    // Simulate sending invitation
    console.log(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setShowInviteDialog(false);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="h-full flex bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <img 
              src={song.cover} 
              alt={song.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-xl font-bold">{song.title} - Collaboration Studio</h1>
              <p className="text-muted-foreground">Real-time collaboration session</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {collaborators.filter(c => c.isOnline).length} online
            </Badge>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>

        {/* Collaboration Area */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="workspace" className="h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="workspace">Workspace</TabsTrigger>
              <TabsTrigger value="versions">Versions</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="workspace" className="h-full">
              <div className="h-full bg-white/30 backdrop-blur-sm rounded-lg p-6">
                <div className="text-center">
                  <GitBranch className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Collaborative Workspace</h3>
                  <p className="text-muted-foreground mb-6">
                    This is where the real-time collaboration magic happens.<br />
                    Audio stems, MIDI, and effects would be synchronized here.
                  </p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <Button variant="outline" className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Version
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="versions" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Project Versions</h3>
                <Button size="sm" className="gap-2">
                  <GitBranch className="w-4 h-4" />
                  Create Branch
                </Button>
              </div>
              
              <div className="space-y-3">
                {projectVersions.map((version) => (
                  <Card key={version.id} className={version.isCurrent ? 'ring-2 ring-blue-500' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{version.name}</h4>
                            {version.isCurrent && (
                              <Badge variant="default" className="text-xs">Current</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            by {version.createdBy} • {formatTime(version.createdAt)}
                          </div>
                          <ul className="text-sm space-y-1">
                            {version.changes.map((change, index) => (
                              <li key={index} className="text-muted-foreground">
                                • {change}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex gap-2">
                          {!version.isCurrent && (
                            <Button size="sm" variant="outline">
                              Restore
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <History className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Collaboration Settings</h3>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Project Permissions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Allow public viewing</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require approval for changes</span>
                        <input type="checkbox" className="rounded" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Enable version auto-save</span>
                        <input type="checkbox" className="rounded" defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l bg-white/30 backdrop-blur-sm flex flex-col">
        {/* Collaborators */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Collaborators</h3>
            <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Invite
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Collaborator</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input 
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                  <Button onClick={inviteCollaborator} className="w-full">
                    Send Invitation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-3">
            {collaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {collaborator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    collaborator.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{collaborator.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {collaborator.isOnline ? 'Online' : collaborator.lastSeen}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {collaborator.role}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Voice/Video Controls */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isMicOn ? "default" : "outline"}
              onClick={() => setIsMicOn(!isMicOn)}
              className="flex-1 gap-2"
            >
              {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              {isMicOn ? 'Mute' : 'Unmute'}
            </Button>
            <Button
              size="sm"
              variant={isVideoCall ? "default" : "outline"}
              onClick={() => setIsVideoCall(!isVideoCall)}
              className="flex-1 gap-2"
            >
              {isVideoCall ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              {isVideoCall ? 'Video' : 'Camera'}
            </Button>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Chat</h3>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((message) => (
              <div key={message.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">{message.userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <div className={`text-sm p-2 rounded-lg ${
                  message.type === 'project-update' ? 
                  'bg-blue-100 text-blue-800 border border-blue-200' :
                  'bg-gray-100'
                }`}>
                  {message.type === 'project-update' && (
                    <GitBranch className="w-3 h-3 inline mr-1" />
                  )}
                  {message.message}
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button size="sm" onClick={sendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationStudio;
