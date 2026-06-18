import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Map, 
  Compass, 
  BookOpen, 
  Home, 
  Coffee, 
  Navigation, 
  Cpu, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { MapPoint } from '../types';
import { CAMPUS_MAP_SPOTS } from '../data';

export default function InteractiveMap() {
  const [selectedSpot, setSelectedSpot] = useState<MapPoint>(CAMPUS_MAP_SPOTS[0]);
  const [hoveredSpot, setHoveredSpot] = useState<MapPoint | null>(null);

  return (
    <div id="iit-madras-blueprint-map" class="w-full max-w-7xl mx-auto px-4 md:px-6 mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Card: 8-columns Interactive Blueprint Map */}
        <div class="lg:col-span-8 bg-[#101D34]/90 border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl relative flex flex-col justify-between overflow-hidden">
          {/* Subtle circuit lines background */}
          <div class="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>
          
          <div class="flex items-center justify-between mb-6 z-10">
            <div>
              <span class="text-[10px] font-mono text-[#D9B15D] tracking-widest font-semibold uppercase">INTERACTIVE SCHEMATIC // GEOLOCATION HUB</span>
              <h4 class="text-xl font-bold text-white font-display flex items-center gap-2">
                <Map class="w-5 h-5 text-[#D9B15D]" /> Explore IIT Madras
              </h4>
            </div>
            <div class="hidden sm:block text-right">
              <span class="text-xs font-mono text-[#93A4BC]">MAP COMPILING ENGINE V1.3</span>
              <p class="text-[10px] font-mono text-[#D9B15D]">{selectedSpot.coordinates}</p>
            </div>
          </div>

          {/* Interactive Blueprint Canvas Representation */}
          <div class="bg-[#07111F] rounded-2xl border border-white/5 relative aspect-[16/9] overflow-hidden group shadow-inner mb-6 flex flex-col justify-between p-4">
            {/* Symmetrical technical coordinate grid lines */}
            <div class="absolute inset-y-0 left-1/4 border-l border-white/5 pointer-events-none"></div>
            <div class="absolute inset-y-0 left-2/4 border-l border-white/5 pointer-events-none"></div>
            <div class="absolute inset-y-0 left-3/4 border-l border-white/5 pointer-events-none"></div>
            <div class="absolute inset-x-0 top-1/3 border-t border-white/5 pointer-events-none"></div>
            <div class="absolute inset-x-0 top-2/3 border-t border-white/5 pointer-events-none"></div>
            
            {/* Glowing nodes representation */}
            <div class="absolute bottom-6 left-6 text-[#93A4BC] font-mono text-[9px] z-10 select-none">
              LAT: 12.9917° N | LON: 80.2337° E
            </div>
            <div class="absolute top-4 right-6 text-[#93A4BC] font-mono text-[9px] z-10 select-none uppercase tracking-wider">
              IIT Madras — Chennai, IN
            </div>

            {/* Simulated forest/campus outline */}
            <div class="absolute inset-8 rounded-full border border-dashed border-blue-500/5 bg-blue-500/1 pointer-events-none"></div>

            {/* Interactive Pins Overlay */}
            {CAMPUS_MAP_SPOTS.map((spot) => {
              const isSelected = selectedSpot.id === spot.id;
              const isHovered = hoveredSpot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  id={`map-pin-${spot.id}`}
                  type="button"
                  onClick={() => setSelectedSpot(spot)}
                  onMouseEnter={() => setHoveredSpot(spot)}
                  onMouseLeave={() => setHoveredSpot(null)}
                  style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                  class="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin pointer-events-auto"
                >
                  <div class="relative flex items-center justify-center">
                    {/* Ring animation */}
                    <span class={`absolute inline-flex h-10 w-10 rounded-full bg-[#D9B15D]/20 transition-all duration-1000 ${
                      isSelected ? 'animate-ping opacity-100' : 'scale-0 opacity-0 group-hover/pin:scale-100 group-hover/pin:opacity-75'
                    }`}></span>

                    {/* Outer glow aura */}
                    <div class={`w-5 h-5 rounded-full flex items-center justify-center border shadow-lg transition-all duration-300 ${
                      isSelected 
                        ? 'bg-[#D9B15D] border-white text-[#07111F] shadow-[#D9B15D]/20' 
                        : 'bg-[#101D34] border-[#D9B15D] text-[#D9B15D] group-hover/pin:bg-[#D9B15D] group-hover/pin:text-[#07111F]'
                    }`}>
                      {spot.category === 'academic' && <Cpu class="w-3 h-3" />}
                      {spot.category === 'residential' && <Home class="w-3 h-3" />}
                      {spot.category === 'social' && <Coffee class="w-3 h-3" />}
                      {spot.category === 'heritage' && <Compass class="w-3 h-3" />}
                    </div>

                    {/* Mini floating card on hover */}
                    <AnimatePresence>
                      {(isHovered || isSelected) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: -28, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-6 flex flex-col items-center pointer-events-none"
                        >
                          <div class="bg-[#101D34] border border-[#D9B15D]/50 px-2.5 py-1.5 rounded-lg shadow-xl text-[10px] font-mono font-bold text-white whitespace-nowrap flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#D9B15D]"></span>
                            {spot.name}
                          </div>
                          {/* Triangle arrow caret */}
                          <div class="w-2 h-2 bg-[#101D34] border-r border-b border-[#D9B15D]/50 rotate-45 -mt-1"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>

          <p class="text-[11px] text-[#93A4BC] font-mono italic flex items-center gap-1">
            <Sparkles class="w-3 h-3 text-[#D9B15D] shrink-0" /> Note: Touch or click any of the golden glowing navigation nodes over the motherboard canvas to compile geodata coordinates.
          </p>
        </div>

        {/* Right Card: 4-columns Spot Details Panel */}
        <div class="lg:col-span-4 bg-[#101D34]/90 border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSpot.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center gap-2 mb-3">
                  <span class={`text-[10px] font-mono tracking-widest font-semibold uppercase px-2 py-0.5 rounded-md ${
                    selectedSpot.category === 'academic' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/15' :
                    selectedSpot.category === 'residential' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/15' :
                    selectedSpot.category === 'social' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15' :
                    'bg-purple-500/10 text-purple-400 border border-purple-500/15'
                  }`}>
                    {selectedSpot.category}
                  </span>
                  <span class="text-[10px] font-mono text-[#93A4BC]">{selectedSpot.coordinates}</span>
                </div>

                <h4 class="text-xl font-bold text-white font-display tracking-tight uppercase border-b border-white/5 pb-3 mb-4">
                  {selectedSpot.name}
                </h4>

                <p class="text-sm text-[#D8E3F2] leading-relaxed mb-4">
                  {selectedSpot.description}
                </p>

                <p class="text-xs text-[#93A4BC] leading-relaxed bg-[#07111F]/50 p-4 rounded-xl border border-white/5 font-sans mb-6">
                  {selectedSpot.fullDetail}
                </p>
              </div>

              {/* Extra immersive specs */}
              <div class="bg-[#07111F] rounded-xl border border-white/5 p-4 mt-auto">
                <span class="text-[9px] font-mono text-[#D9B15D] tracking-wider block font-semibold uppercase mb-1">Interactive Trivia Fact</span>
                <p class="text-[11px] text-[#D8E3F2] font-mono leading-relaxed">
                  {selectedSpot.id === 'm_shakti' && "This is the flagship birthplace of Shakti - India's first ever domestically designed corporate-grade microprocessor!"}
                  {selectedSpot.id === 'm_tapti' && "Tapti Hostel is surrounded by banyan trees where spotted deer regularly shelter during hot high-noon periods."}
                  {selectedSpot.id === 'm_himalaya' && "Himalaya serves over 4,000 engineering candidates daily, utilizing automated clean steam boilers and massive layout bakeries."}
                  {selectedSpot.id === 'm_oat' && "At OAT, fellows enjoy global blockbusters with surround-speaker soundscapes under Chennai's breezy night-sky."}
                  {selectedSpot.id === 'm_gcentre' && "Features retro hardware prototypes: including legacy printed-circuit boards and early magnetic memory tapes!"}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
