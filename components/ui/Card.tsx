"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export default function Card({
  children,
  className = "",
  onClick,
  interactive = false,
}: CardProps) {
  const baseStyles = "bg-bg-surface rounded-[24px] p-6 shadow-sm";
  const interactiveStyles = interactive
    ? "hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]"
    : "";

  const Component = interactive ? motion.div : "div";
  const motionProps = interactive
    ? {
        whileTap: { scale: 0.98 },
        onClick,
      }
    : {};

  if (interactive) {
    return (
      <Component
        {...motionProps}
        className={`${baseStyles} ${interactiveStyles} ${className}`}
      >
        {children}
      </Component>
    );
  }

  return (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  );
}
