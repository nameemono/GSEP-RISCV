import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  id?: string;
  icon?: LucideIcon;
  title: string;
  description: string;
  indexText?: string;
  highlight?: boolean;
}

export default function FeatureCard({ id, icon: Icon, title, description, indexText, highlight = false }: Props) {
  return (
    <motion.div
      id={id}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`p-6 rounded-2xl border backdrop-blur-md relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${
        highlight 
          ? 'bg-gradient-to-b from-[#13223D] to-[#101D34] border-[#D9B15D]/40 shadow-lg shadow-[#D9B15D]/5' 
          : 'bg-[#101D34]/70 border-white/5 hover:border-white/10'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          {Icon ? (
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highlight ? 'bg-[#D9B15D]/10 text-[#D9B15D]' : 'bg-white/5 text-[#93A4BC]'}`}>
              <Icon className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-2 h-2 rounded-full bg-[#D9B15D]"></div>
          )}
          
          {indexText && (
            <span className="text-xs font-mono font-bold text-[#93A4BC]">{indexText}</span>
          )}
        </div>

        <h3 className="text-base font-bold text-white font-display mb-2 uppercase tracking-wide">
          {title}
        </h3>
        
        <p className="text-xs text-[#93A4BC] leading-relaxed font-sans">
          {description}
        </p>
      </div>

      {highlight && (
        <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-[#D9B15D]/10 rounded-full blur-xl"></div>
      )}
    </motion.div>
  );
}
