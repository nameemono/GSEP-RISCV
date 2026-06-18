import React from 'react';

interface Props {
  stepNumber: string;
  title: string;
  description: string;
  timeframe: string;
  statusText: string;
  statusColor: 'completed' | 'active' | 'upcoming';
}

export default function ApplicationStepCard({ stepNumber, title, description, timeframe, statusText, statusColor }: Props) {
  return (
    <div
      id={`admission-step-${stepNumber}`}
      class={`p-6 rounded-2xl border flex flex-col sm:flex-row items-start gap-4 transition-all duration-300 relative overflow-hidden ${
        statusColor === 'active' 
          ? 'bg-gradient-to-r from-[#101D34] to-[#13223D] border-[#D9B15D]/40 shadow-md shadow-[#D9B15D]/5' 
          : 'bg-[#101D34]/50 border-white/5 hover:border-white/10'
      }`}
    >
      {/* Decorative vertical connection line hint behind step numbers */}
      <div class="absolute left-6 top-16 bottom-0 w-0.5 bg-white/5 md:block hidden"></div>

      {/* Circle Badge Number */}
      <div class={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center font-mono font-black text-lg ${
        statusColor === 'active' 
          ? 'bg-gradient-to-br from-[#D9B15D] to-[#F0C87A] text-[#07111F]' 
          : statusColor === 'completed'
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            : 'bg-[#07111F] text-[#93A4BC] border border-white/10'
      }`}>
        {stepNumber}
      </div>

      <div class="flex-1">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h4 class="text-base font-bold text-white font-display uppercase tracking-wide">
            {title}
          </h4>
          
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-mono text-[#93A4BC] font-semibold">{timeframe}</span>
            <span class={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
              statusColor === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15' :
              statusColor === 'active' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/15 animate-pulse' :
              'bg-[#07111F] text-gray-500 border border-white/5'
            }`}>
              {statusText}
            </span>
          </div>
        </div>

        <p class="text-xs text-[#93A4BC] leading-relaxed font-sans">
          {description}
        </p>
      </div>
    </div>
  );
}
