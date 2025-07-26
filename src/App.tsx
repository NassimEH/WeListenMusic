
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoleSelection from "./pages/RoleSelection";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import CreatorDashboard from "./pages/CreatorDashboard";
import ArtistDashboard from "./pages/ArtistDashboard";
import RemixPage from "./pages/RemixPage";
import { AppProvider } from "./contexts/AppContext";
import { AudioProvider } from "./contexts/AudioContext";
import { SocialProvider } from "./contexts/SocialContext";
import PageTransition from "./components/PageTransition";
import AppLayout from "./components/app/AppLayout";
import { GlobalAudioPlayer } from "./components/GlobalAudioPlayer";
import { SongDetail } from "./pages/SongDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <SocialProvider>
        <AudioProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/song/:songId" element={<PageTransition><SongDetail /></PageTransition>} />
                <Route path="/remix" element={<PageTransition><RemixPage /></PageTransition>} />
                <Route path="/artist" element={<PageTransition><ArtistDashboard /></PageTransition>} />
                <Route path="/app" element={<PageTransition><RoleSelection /></PageTransition>} />
                <Route path="/app/consumer" element={<PageTransition><AppLayout><ConsumerDashboard /></AppLayout></PageTransition>} />
                <Route path="/app/creator" element={<PageTransition><AppLayout><CreatorDashboard /></AppLayout></PageTransition>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <GlobalAudioPlayer />
            </BrowserRouter>
          </TooltipProvider>
        </AudioProvider>
      </SocialProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
