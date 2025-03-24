import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
  hoverEffect?: boolean;
}

const CustomCard: React.FC<CardProps> = ({
  children,
  className,
  glassEffect = false,
  hoverEffect = false,
}) => {
  return (
    <div
      className={cn(
        "rounded-lg p-5 shadow-sm transition-all duration-300",
        glassEffect
          ? "glass-card shadow-lg"
          : "bg-card text-card-foreground border",
        hoverEffect && "hover-lift",
        className
      )}
    >
      {children}
    </div>
  );
};

export default CustomCard;
