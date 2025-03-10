
import React, { ReactNode } from 'react';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import AppPlayer from './AppPlayer';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
  headerTitle?: string;
  isCreator?: boolean;
}

const AppLayout = ({ children, headerTitle = 'WeListen', isCreator = false }: AppLayoutProps) => {
  const navigate = useNavigate();
  const { userRole, setUserRole } = useApp();
  
  // Ensure user can't access unauthorized areas
  React.useEffect(() => {
    if (!userRole) {
      navigate('/app');
    } else if (isCreator && userRole !== 'creator') {
      navigate('/app/consumer');
    } else if (!isCreator && userRole !== 'consumer') {
      navigate('/app/creator');
    }
  }, [userRole, navigate, isCreator]);
  
  return (
    <div className="min-h-screen flex flex-col bg-audio-dark text-audio-light">
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar isCreator={isCreator} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <AppHeader title={headerTitle} isCreator={isCreator} />
          <div className={cn(
            "flex-1 overflow-y-auto p-6 pt-0",
            "scrollbar-thin scrollbar-thumb-audio-surface scrollbar-track-transparent"
          )}>
            {children}
          </div>
        </main>
      </div>
      <AppPlayer />
    </div>
  );
};

export default AppLayout;
