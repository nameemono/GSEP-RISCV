import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface Props {
  key?: any;
  id?: string;
  children: ReactNode;
  hoverEffect?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({ id, children, hoverEffect = true, className = '', onClick }: Props) {
  const Component = hoverEffect ? motion.div : 'div';
  const motionProps = hoverEffect 
    ? {
        whileHover: { y: -5, scale: 1.01 },
        transition: { type: "spring", stiffness: 300, damping: 15 }
      } 
    : {};

  return (
    <Component
      id={id ?? undefined}
      onClick={onClick}
      {...motionProps}
      className={`bg-gradient-to-b from-[#101D34] to-[#13223D] border border-white/8 rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md relative overflow-hidden transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </Component>
  );
}
