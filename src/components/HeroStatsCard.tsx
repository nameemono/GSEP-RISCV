import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  id?: string;
  icon: LucideIcon;
  value: string;
  label: string;
  detail: string;
  highlight?: boolean;
}

export default function HeroStatsCard({ id, icon: Icon, value, label, detail, highlight = false }: Props) {
  return (
    <div
      id={id}
      class={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full ${
        highlight 
          ? 'bg-gradient-to-br from-[#101D34] to-[#13223D] border-[#D9B15D]/40 shadow-lg shadow-[#D9B15D]/5' 
          : 'bg-[#101D34]/70 border-white/5 hover:border-white/10'
      }`}
    >
      <div class="flex items-center justify-between mb-4">
        <span class="text-[10px] font-mono text-[#93A4BC] uppercase tracking-wider">{label}</span>
        <div class={`w-8 h-8 rounded-lg flex items-center justify-center ${highlight ? 'bg-[#D9B15D]/10 text-[#D9B15D]' : 'bg-white/5 text-[#93A4BC]'}`}>
          <Icon class="w-4 h-4" />
        </div>
      </div>

      <div>
        <h4 class="text-2xl font-black text-white font-display uppercase tracking-tight mb-1">
          {value}
        </h4>
        <p class="text-xs text-[#93A4BC] leading-relaxed">
          {detail}
        </p>
      </div>
    </div>
  );
}
