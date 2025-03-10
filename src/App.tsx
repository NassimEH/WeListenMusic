
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoleSelection from "./pages/RoleSelection";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import CreatorDashboard from "./pages/CreatorDashboard";
import { AppProvider } from "./contexts/AppContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" theme="dark" closeButton={true} />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/app" element={<RoleSelection />} />
              <Route path="/app/consumer" element={<ConsumerDashboard />} />
              <Route path="/app/creator" element={<CreatorDashboard />} />
              <Route path="/app/consumer/*" element={<ConsumerDashboard />} />
              <Route path="/app/creator/*" element={<CreatorDashboard />} />
              {/* Redirects for more consistent routing */}
              <Route path="/consumer" element={<Navigate to="/app/consumer" replace />} />
              <Route path="/creator" element={<Navigate to="/app/creator" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
