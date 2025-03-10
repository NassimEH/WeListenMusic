
import React from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { playSoundEffect } from "@/utils/soundEffects";

interface FloatingAddButtonProps {
  onClick: () => void;
  label?: string;
  position?: "bottom-right" | "bottom-center";
  className?: string;
  icon?: React.ReactNode;
}

const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({
  onClick,
  label = "Ajouter",
  position = "bottom-right",
  className,
  icon = <Plus />
}) => {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2"
  };

  const handleClick = () => {
    playSoundEffect("click");
    onClick();
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "fixed z-30 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-synthwave text-white shadow-neon-pink hover:shadow-neon-purple transition-all duration-300",
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
