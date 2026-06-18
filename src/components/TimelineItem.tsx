import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { TimelineStep } from '../types';

interface Props {
  key?: any;
  step: TimelineStep;
  index: number;
  totalSteps: number;
}

export default function TimelineItem({ step, index, totalSteps }: Props) {
  const isCompleted = step.status === 'COMPLETED';
  const isActive = step.status === 'ACTIVE';

  return (
    <div id={`journey-step-${step.id}`} class="relative flex-1 min-w-[240px] lg:min-w-0">
      
      {/* Connector Line (Desktop) */}
      {index < totalSteps - 1 && (
        <div class="hidden lg:block absolute top-[21px] left-[55%] right-0 h-0.5 z-0 bg-gradient-to-r from-[#D9B15D] to-white/10"></div>
      )}

      <div class="flex lg:flex-col items-start gap-4 lg:gap-0 relative z-10">
        
        {/* Node indicator */}
        <div class="flex flex-col items-center shrink-0 lg:mb-4">
          <div class={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            isCompleted 
              ? 'bg-[#D9B15D]/10 border-[#D9B15D] text-[#D9B15D]' 
              : isActive 
                ? 'bg-blue-500/10 border-blue-400 text-blue-400 animate-pulse' 
                : 'bg-[#07111F] border-white/10 text-[#93A4BC]'
          }`}>
            {isCompleted ? (
              <CheckCircle2 class="w-5 h-5 text-[#D9B15D]" />
            ) : (
              <span class="text-xs font-bold font-mono">0{step.id}</span>
            )}
          </div>
          
          {/* Connector Line (Mobile) */}
          {index < totalSteps - 1 && (
            <div class="lg:hidden w-0.5 h-16 bg-gradient-to-b from-[#D9B15D]/80 to-white/5 my-2"></div>
          )}
        </div>

        {/* Text Container as a premium Glass card */}
        <div class="bg-[#101D34]/70 border border-white/5 rounded-xl p-4 flex-1 hover:border-white/10 transition-all duration-300 lg:-ml-2 w-full">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[9px] font-mono font-bold text-[#D9B15D] uppercase tracking-wider bg-[#D9B15D]/5 border border-[#D9B15D]/10 px-1.5 py-0.5 rounded">
              {step.timeframe}
            </span>
            <span class={`text-[8px] font-mono font-black ${
              isCompleted ? 'text-emerald-400' : isActive ? 'text-blue-400' : 'text-[#93A4BC]'
            }`}>
              {step.status}
            </span>
          </div>

          <h4 class="text-sm font-bold text-white font-display mb-1">{step.title}</h4>
          <p class="text-xs text-[#93A4BC] leading-relaxed mb-3">{step.description}</p>
          
          {/* Mini tags */}
          <div class="flex flex-wrap gap-1">
            {step.details.map((detail, dIdx) => (
              <span key={dIdx} class="text-[9px] font-mono text-[#D8E3F2] bg-white/3 px-2 py-0.5 rounded-md border border-white/5">
                • {detail}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
