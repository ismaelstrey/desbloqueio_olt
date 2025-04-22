'use client';

import { motion } from 'framer-motion';
import { ButtonProps } from '@/@types';
export function Button({ 
  children, 
  variant = 'primary', 
  className = '',
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-full font-medium transition-all text-sm md:text-base';
  const variants = {
    primary: 'bg-accent text-background hover:bg-accent/90',
    secondary: 'border-2 border-accent text-accent hover:bg-accent/10'
  };
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className} `}
    
    >
      {children}
  
    </motion.button>
  );
}