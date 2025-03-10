
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { playSoundEffect } from "@/utils/soundEffects";

interface BackButtonProps {
  to?: string;
  label?: string;
  variant?: "default" | "minimal" | "synthwave";
  className?: string;
}

const BackButton = ({
  to,
  label = "Retour",
  variant = "default",
  className,
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    playSoundEffect("pop");
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  const buttonStyles = {
    default: "bg-black/40 backdrop-blur-md text-white hover:bg-black/60 border border-white/10 px-4 py-2 rounded-lg",
    minimal: "text-white/80 hover:text-white",
    synthwave: "bg-gradient-synthwave hover:shadow-neon-pink text-white px-4 py-2 rounded-lg"
  };

  return (
    <motion.button
      onClick={handleBack}
      className={cn(
        "flex items-center gap-2 transition-all duration-300",
        buttonStyles[variant],
        className
      )}
      whileHover={{ x: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <ArrowLeft size={16} />
      {label}
    </motion.button>
  );
};

export default BackButton;
