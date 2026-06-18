import React from 'react';
import { motion } from 'motion/react';
import { ImageCard } from '../types';

interface Props {
  key?: any;
  card: ImageCard;
}

export default function GalleryCard({ card }: Props) {
  return (
    <motion.div
      id={`gallery-card-${card.id}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-2xl border border-white/8 bg-[#101D34] group shadow-[0_4px_30px_rgba(0,0,0,0.2)] ${
        card.size === 'large' ? 'md:col-span-2 md:row-span-2 min-h-[380px]' :
        card.size === 'wide' ? 'md:col-span-2 min-h-[190px]' :
        card.size === 'tall' ? 'md:row-span-2 min-h-[380px]' :
        'min-h-[190px]'
      }`}
    >
      {/* Background Image with ReferrerPolicy */}
      <img
        src={card.imageUrl}
        alt={card.title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 absolute inset-0 filter brightness-[0.7] contrast-[1.05]"
      />

      {/* Decorative vignette gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/90 via-[#07111F]/30 to-transparent pointer-events-none"></div>

      {/* Text Context Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-10 flex flex-col justify-end h-1/2">
        <span className="text-[9px] font-mono font-bold text-[#D9B15D] uppercase tracking-widest mb-1 block">
          // {card.subtitle}
        </span>
        <h4 className="text-base font-black text-white font-display uppercase tracking-tight mb-1.5 group-hover:text-[#F0C87A] transition-colors">
          {card.title}
        </h4>
        <p className="text-[11px] text-[#93A4BC] font-sans leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {card.description}
        </p>
      </div>

      {/* Hover thin board wire lines */}
      <div className="absolute inset-0 border border-[#D9B15D]/0 group-hover:border-[#D9B15D]/20 rounded-2xl pointer-events-none transition-all duration-300"></div>
    </motion.div>
  );
}
