import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: "cyan" | "green" | "purple" | "orange" | "blue";
  hover?: boolean;
}

const glowColors = {
  cyan: "hover:shadow-[0_0_30px_hsl(190_90%_50%/0.15)]",
  green: "hover:shadow-[0_0_30px_hsl(160_70%_45%/0.15)]",
  purple: "hover:shadow-[0_0_30px_hsl(270_60%_60%/0.15)]",
  orange: "hover:shadow-[0_0_30px_hsl(30_90%_55%/0.15)]",
  blue: "hover:shadow-[0_0_30px_hsl(215_80%_55%/0.15)]",
};

export const GlassCard = ({ children, className = "", glow = "cyan", hover = true }: GlassCardProps) => {
  return (
    <div
      className={`glass-card rounded-lg p-5 ${hover ? `transition-all duration-300 ${glowColors[glow]}` : ""} ${className}`}
    >
      {children}
    </div>
  );
};
