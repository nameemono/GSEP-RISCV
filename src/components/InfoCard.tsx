import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  id?: string;
  icon: LucideIcon;
  title: string;
  description: string;
  statusBadge?: string;
}

export default function InfoCard({ id, icon: Icon, title, description, statusBadge }: Props) {
  return (
    <div
      id={id}
      className="bg-gradient-to-b from-[#101D34] to-[#13223D] border border-white/8 rounded-2xl p-6 shadow-md transition-all duration-300 hover:border-white/12 hover:shadow-lg relative overflow-hidden"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#D9B15D]/10 border border-[#D9B15D]/20 text-[#D9B15D] flex items-center justify-center shrink-0">
          <Icon className="font-bold w-5 h-5 text-[#D9B15D]" />
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
            {statusBadge && (
              <span className="text-[9px] font-mono font-bold text-[#D9B15D] bg-[#D9B15D]/10 border border-[#D9B15D]/20 px-2 py-0.5 rounded">
                {statusBadge}
              </span>
            )}
          </div>
          <p className="text-xs text-[#93A4BC] leading-relaxed font-sans">{description}</p>
        </div>
      </div>
    </div>
  );
}
