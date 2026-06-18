import React from 'react';

interface Props {
  id?: string;
  badge: string;
  title: string;
  subtitle?: string;
  glow?: boolean;
}

export default function SectionHeading({ id, badge, title, subtitle, glow = false }: Props) {
  return (
    <div id={id} className="text-center max-w-3xl mx-auto mb-16 relative">
      {glow && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      )}
      
      <span className="inline-block text-[11px] font-mono font-bold text-[#D9B15D] uppercase tracking-[0.2em] bg-[#D9B15D]/5 border border-[#D9B15D]/20 rounded-full px-4 py-1.5 mb-4 shadow-sm shadow-yellow-500/5">
        // {badge}
      </span>
      
      <h2 className="text-3xl md:text-4xl font-black text-white font-display uppercase tracking-tight">
        {title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9B15D] to-[#F0C87A]">{title.split(' ').slice(1).join(' ')}</span>
      </h2>
      
      {subtitle && (
        <p className="text-sm text-[#93A4BC] mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
