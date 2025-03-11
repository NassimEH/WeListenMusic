
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { userRole } = useApp();
  
  const goBack = () => {
    navigate(-1);
  };
  
  const switchRole = () => {
    if (userRole === 'consumer') {
      navigate('/app/creator');
    } else if (userRole === 'creator') {
      navigate('/app/consumer');
    } else {
      navigate('/app');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-audio-dark">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-6 relative">
          {/* Navigation minimaliste */}
          <div className="flex justify-between items-center py-4 mb-4">
            <button 
              onClick={goBack}
              className="flex items-center gap-2 text-audio-light/70 hover:text-audio-light transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Retour</span>
            </button>
            
            <button 
              onClick={switchRole}
              className="text-sm text-audio-accent hover:text-audio-accent-light transition-colors"
            >
              {userRole === 'consumer' ? 'Passer en mode Créateur' : 'Passer en mode Auditeur'}
            </button>
          </div>
          
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppLayout;
