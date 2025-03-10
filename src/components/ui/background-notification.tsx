
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Star, Music, Heart, Clock, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  variant?: "success" | "info" | "event";
  className?: string;
  interval?: number; // Intervalle en secondes entre les notifications
}

const getRandomIcon = () => {
  const icons = [Bell, Star, Music, Heart, Clock, User, Plus];
  return icons[Math.floor(Math.random() * icons.length)];
};

const getRandomMessage = () => {
  const messages = [
    "Nouvel album disponible",
    "Un utilisateur a aimé votre titre",
    "Nouvelle tendance détectée",
    "Playlist mise à jour",
    "Concert à venir",
    "Recommandation personnalisée",
    "Un artiste vous a mentionné"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

const BackgroundNotification: React.FC<NotificationProps> = ({
  position = "bottom-right",
  variant = "info",
  className,
  interval = 30
}) => {
  const [notifications, setNotifications] = useState<Array<{ id: number; message: string; icon: any }>>([]);
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-20 right-4",
    "bottom-left": "bottom-20 left-4"
  };

  const variantClasses = {
    success: "bg-audio-synthwave-teal/10 border-audio-synthwave-teal/30 text-audio-synthwave-teal",
    info: "bg-audio-synthwave-blue/10 border-audio-synthwave-blue/30 text-audio-synthwave-blue",
    event: "bg-audio-synthwave-pink/10 border-audio-synthwave-pink/30 text-audio-synthwave-pink"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const RandomIcon = getRandomIcon();
      const randomMessage = getRandomMessage();
      
      // 40% de chance d'afficher une notification
      if (Math.random() > 0.6) {
        setNotifications((prev) => [
          ...prev,
          { id: Date.now(), message: randomMessage, icon: RandomIcon }
        ]);
        setVisible(true);
        
        // Masquer après 3 secondes
        setTimeout(() => {
          setVisible(false);
          // Nettoyer après l'animation de sortie
          setTimeout(() => {
            setNotifications((prev) => prev.slice(1));
          }, 500);
        }, 3000);
      }
    }, interval * 1000);
    
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className={cn("fixed z-50", positionClasses[position], className)}>
      <AnimatePresence>
        {visible && notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={cn(
              "px-4 py-3 rounded-lg backdrop-blur-md border flex items-center gap-3 shadow-lg",
              variantClasses[variant]
            )}
          >
            {React.createElement(notifications[0].icon, { size: 16 })}
            <span className="text-sm font-medium">{notifications[0].message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackgroundNotification;
