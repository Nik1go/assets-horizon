
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ 
        type: "spring", 
        damping: 25, 
        stiffness: 300, 
        duration: 0.3 
      }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
