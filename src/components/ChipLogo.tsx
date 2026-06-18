import React from 'react';

interface Props {
  size?: number;
  className?: string;
  glow?: boolean;
}

export default function ChipLogo({ size = 36, className = '', glow = false }: Props) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {glow && (
        <span className="absolute inset-0 bg-[#D9B15D]/25 blur-md rounded-lg animate-pulse" />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow-[0_2px_8px_rgba(217,177,93,0.15)]"
      >
        {/* Navy Base */}
        <rect width="32" height="32" rx="6" fill="#0A1628" stroke="#ffffff" strokeOpacity="0.08" />
        
        {/* Silicon chip inner square */}
        <rect x="6" y="6" width="20" height="20" rx="3" fill="#101D34" stroke="#D9B15D" strokeWidth="1.5" />
        
        {/* 4 Pins Top */}
        <rect x="9" y="3" width="1.5" height="3" fill="#D9B15D" />
        <rect x="13" y="3" width="1.5" height="3" fill="#D9B15D" />
        <rect x="17" y="3" width="1.5" height="3" fill="#D9B15D" />
        <rect x="21" y="3" width="1.5" height="3" fill="#D9B15D" />
        
        {/* 4 Pins Bottom */}
        <rect x="9" y="26" width="1.5" height="3" fill="#D9B15D" />
        <rect x="13" y="26" width="1.5" height="3" fill="#D9B15D" />
        <rect x="17" y="26" width="1.5" height="3" fill="#D9B15D" />
        <rect x="21" y="26" width="1.5" height="3" fill="#D9B15D" />
        
        {/* 4 Pins Left */}
        <rect x="3" y="9" width="3" height="1.5" fill="#D9B15D" />
        <rect x="3" y="13" width="3" height="1.5" fill="#D9B15D" />
        <rect x="3" y="17" width="3" height="1.5" fill="#D9B15D" />
        <rect x="3" y="21" width="3" height="1.5" fill="#D9B15D" />
        
        {/* 4 Pins Right */}
        <rect x="26" y="9" width="3" height="1.5" fill="#D9B15D" />
        <rect x="26" y="13" width="3" height="1.5" fill="#D9B15D" />
        <rect x="26" y="17" width="3" height="1.5" fill="#D9B15D" />
        <rect x="26" y="21" width="3" height="1.5" fill="#D9B15D" />
        
        {/* Monogram "RV" inside */}
        <text
          x="16"
          y="18.5"
          fill="#FFFFFF"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="9.5"
          textAnchor="middle"
          dominantBaseline="middle"
          letterSpacing="-0.02em"
        >
          RV
        </text>
        
        {/* Symmetrical corner trace details */}
        <path d="M 6,6 L 3,3 M 26,6 L 29,3 M 6,26 L 3,29 M 26,26 L 29,29" stroke="#D9B15D" strokeWidth="0.75" strokeLinecap="round" />
      </svg>
    </div>
  );
}
