
import React from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { playSoundEffect } from "@/utils/soundEffects";

interface FloatingAddButtonProps {
  onClick: () => void;
  label?: string;
  position?: "bottom-right" | "bottom-center" | "top-right";
  className?: string;
  icon?: React.ReactNode;
  variant?: "default" | "glass" | "minimal";
}

const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({
  onClick,
  label = "Ajouter",
  position = "bottom-right",
  className,
  icon = <Plus />,
  variant = "default"
}) => {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
    "top-right": "top-6 right-6"
  };

  const variantClasses = {
    "default": "bg-gradient-synthwave text-white shadow-neon-pink hover:shadow-neon-purple",
    "glass": "glass text-white border border-white/10 hover:border-audio-synthwave-pink/50",
    "minimal": "bg-black/40 text-white backdrop-blur-sm border border-white/10 hover:bg-black/60"
  };

  const handleClick = () => {
    playSoundEffect("click");
    onClick();
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "fixed z-30 flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300",
        variantClasses[variant],
        positionClasses[position],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {icon}
      {label && <span>{label}</span>}
    </motion.button>
  );
};

export default FloatingAddButton;
