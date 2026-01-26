"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "font-bold text-[17px] transition-all duration-200 focus:outline-none";
  
  const variantStyles = {
    primary: "bg-brand-blue text-text-white rounded-[18px] py-4 active:scale-[0.96]",
    secondary: "bg-brand-blue-light text-brand-blue font-semibold rounded-[16px] py-3 px-5 active:scale-[0.96]",
    ghost: "text-text-secondary underline-offset-4 hover:underline active:scale-[0.96]",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
