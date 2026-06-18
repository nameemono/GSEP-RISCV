import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckSquare, 
  Square, 
  Briefcase, 
  AlertCircle, 
  RotateCcw, 
  Percent, 
  Check, 
  X, 
  Luggage, 
  FileCheck, 
  AlertTriangle 
} from 'lucide-react';
import { TransitDocument, SuitcaseItem } from '../types';
import { TRANSIT_CHECKLIST, PACKING_ITEMS } from '../data';

export default function SuitcasePacker() {
  // Checklist State
  const [checklist, setChecklist] = useState<TransitDocument[]>(() => {
    const saved = localStorage.getItem('gsep_transit_checklist');
    return saved ? JSON.parse(saved) : TRANSIT_CHECKLIST;
  });

  // Suitcase Items State
  const [packingItems, setPackingItems] = useState<SuitcaseItem[]>(() => {
    const saved = localStorage.getItem('gsep_packing_items');
    return saved ? JSON.parse(saved) : PACKING_ITEMS;
  });

  // Track weight & alerts
  const [totalWeight, setTotalWeight] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // Sync state to local storage and update metrics
  useEffect(() => {
    localStorage.setItem('gsep_transit_checklist', JSON.stringify(checklist));
    setCompletedCount(checklist.filter(c => c.completed).length);
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('gsep_packing_items', JSON.stringify(packingItems));
    
    // Calculate total packed weight
    const weight = packingItems
      .filter(item => item.isPacked)
      .reduce((sum, item) => sum + item.weightKg, 0);
    setTotalWeight(parseFloat(weight.toFixed(2)));
  }, [packingItems]);

  // Handle checklist item toggle
  const toggleChecklistItem = (id: string) => {
    setChecklist(
      checklist.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };

  // Toggle pack/unpack item
  const togglePackItem = (id: string) => {
    setPackingItems(
      packingItems.map(item => item.id === id ? { ...item, isPacked: !item.isPacked } : item)
    );
  };

  // Reset packing sequence
  const resetPacking = () => {
    setPackingItems(packingItems.map(item => ({ ...item, isPacked: false })));
  };

  const percentComplete = Math.round((completedCount / checklist.length) * 100);

  return (
    <div id="suitcase-logistics-section" className="w-full max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Card: Documentation & Transit Checklist Tracker */}
        <div className="lg:col-span-6 bg-[#101D34]/80 backdrop-blur-md border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono text-[#D9B15D] tracking-widest font-semibold uppercase">ROADMAP PROTOCOL // FLIGHT TRANSIT</span>
              <h4 className="text-xl font-bold text-white font-display">Documentation & Device Tracker</h4>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-white block">STATE DEPLOYED</span>
              <span className="text-[10px] font-mono text-[#93A4BC]">IMMIGRATION SYNC</span>
            </div>
          </div>

          {/* Symmetrical flight operations status progress gauge from screenshot */}
          <div className="bg-[#07111F] rounded-xl p-4 border border-white/5 mb-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                <span className="text-xs font-mono font-bold text-[#D8E3F2]">FLIGHT OPERATIONS & LOGISTICS</span>
              </div>
              <span className="text-xs font-mono text-[#D9B15D] font-bold">
                {completedCount} of {checklist.length} Completed
              </span>
            </div>
            
            {/* ProgressBar */}
            <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/5 relative">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-[#D9B15D] h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentComplete}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] font-mono text-[#93A4BC]">KLIA & CHENNAI DEPARTURE PROTOCOL</span>
              <span className="text-[11px] font-mono text-[#D9B15D] font-bold">{percentComplete}% Done</span>
            </div>
          </div>

          {/* Checklist Toggles list */}
          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {checklist.map((item) => (
              <div 
                key={item.id}
                id={`checklist-item-${item.id}`}
                onClick={() => toggleChecklistItem(item.id)}
                className={`flex items-start gap-4 p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                  item.completed 
                    ? 'bg-[#07111F]/60 border-emerald-500/20' 
                    : 'bg-[#13223D]/50 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="mt-0.5 text-[#93A4BC] hover:text-[#D9B15D] transition-colors shrink-0">
                  {item.completed ? (
                    <div className="w-5 h-5 rounded-md bg-[#D9B15D]/10 border border-[#D9B15D] flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#D9B15D]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border border-white/20 hover:border-[#D9B15D]" />
                  )}
                </div>
                <div>
                  <h5 className={`text-xs font-bold ${item.completed ? 'text-[#93A4BC] line-through' : 'text-white'}`}>
                    {item.name}
                  </h5>
                  <p className="text-[11px] text-[#93A4BC] mt-0.5 leading-relaxed">{item.description}</p>
                  <p className="text-[9px] font-mono text-[#D9B15D] mt-1 italic">Tip: {item.helpTip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Interactive Suitcase Loading Simulator */}
        <div className="lg:col-span-6 bg-[#101D34]/80 backdrop-blur-md border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-between self-stretch">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D9B15D] tracking-widest font-semibold uppercase">HAND LUGGAGE COMPARTMENT SETUP</span>
                <h4 className="text-xl font-bold text-white font-display">Hand Carry Suitcase Packing</h4>
              </div>
              <button
                type="button"
                onClick={resetPacking}
                className="cursor-pointer text-[#93A4BC] hover:text-[#D9B15D] text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" /> RESET
              </button>
            </div>
            
            <p className="text-xs text-[#93A4BC] leading-relaxed mb-6">
              Click on the essentials below to pack them dynamically into your hand carry suitcase. Ensure items with lithium-ion batteries (power banks, laptop computer cells) are categorized under your active deck cabin loadout.
            </p>

            {/* Packers Selection Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {packingItems.map((item) => (
                <button
                  key={item.id}
                  id={`pack-btn-${item.id}`}
                  type="button"
                  onClick={() => togglePackItem(item.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all duration-300 relative overflow-hidden group ${
                    item.isPacked 
                      ? 'bg-[#D9B15D]/10 border-[#D9B15D] shadow-inner' 
                      : 'bg-[#07111F]/70 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-2.5 z-10">
                    <span className="text-xl filter drop-shadow">{item.icon}</span>
                    <div>
                      <h5 className={`text-[10px] font-bold font-mono tracking-tight leading-tight ${item.isPacked ? 'text-[#D9B15D]' : 'text-white'}`}>
                        {item.name}
                      </h5>
                      <span className="text-[9px] font-mono text-[#93A4BC]">{item.weightKg} kg</span>
                    </div>
                  </div>
                  
                  <div className="shrink-0 z-10">
                    {item.isPacked ? (
                      <span className="w-4.5 h-4.5 rounded-full bg-[#D9B15D] text-[#07111F] flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    ) : (
                      <span className="w-4.5 h-4.5 rounded-full bg-white/5 text-transparent border border-white/20 flex items-center justify-center text-[10px] group-hover:border-[#D9B15D]">
                        +
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Symmetrical Visual Suitcase payload box */}
          <div className="bg-[#07111F] rounded-2xl border border-white/5 p-5 flex flex-col justify-between flex-1 min-h-[180px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
              <span className="text-[10px] font-mono text-[#93A4BC] uppercase tracking-wider font-semibold">GSEP FELLOW CABIN BAG (MAX 7KG)</span>
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#D9B15D]" /> 
                PACKED: {packingItems.filter(p => p.isPacked).length}/{packingItems.length} ITEMS
              </span>
            </div>

            {/* List inside bag */}
            <div className="flex-1 overflow-y-auto max-h-[140px] mb-4 pr-1">
              <AnimatePresence mode="popLayout">
                {packingItems.filter(p => p.isPacked).length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {packingItems.filter(p => p.isPacked).map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-[#101D34]/80 border border-[#D9B15D]/20 px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-xs text-[#D8E3F2] font-mono font-medium"
                      >
                        <span>{item.icon}</span>
                        <span>{item.name.replace('PRO WORKSTATION', 'PRO')}</span>
                        <button
                          type="button"
                          onClick={() => togglePackItem(item.id)}
                          className="hover:text-red-400 font-bold ml-1"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-4">
                    <Luggage className="w-8 h-8 text-[#93A4BC] mb-2 animate-bounce" />
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Suitcase is Empty</p>
                    <p className="text-[10px] text-[#93A4BC] mt-0.5">Click elements on the left shelf to pack your travel essentials.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Total cargo bar metrics */}
            <div className="border-t border-white/5 pt-3">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#93A4BC]">ESTIMATED WEIGHT:</span>
                <span className={`font-bold ${totalWeight > 7 ? 'text-red-400' : 'text-[#D9B15D]'}`}>
                  {totalWeight} kg / 7.0kg Max
                </span>
              </div>
              
              {/* Load meter bar */}
              <div className="w-full bg-[#101D34] rounded-full h-2 overflow-hidden border border-white/5 mb-2.5">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${totalWeight > 7 ? 'bg-red-500' : 'bg-gradient-to-r from-blue-400 to-[#D9B15D]'}`}
                  style={{ width: `${Math.min((totalWeight / 7) * 100, 100)}%` }}
                ></div>
              </div>

              {/* Safety alerts details */}
              {totalWeight > 7 ? (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 p-2 rounded-xl text-[10px] text-red-300 font-mono">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>CRITICAL OVERWEIGHT LIMIT: Please unpack unneeded clothing or manuals for Airport gate clearance safety.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-blue-500/5 border border-blue-500/15 p-2 rounded-xl text-[10px] text-blue-300 font-mono">
                  <AlertTriangle className="w-4 h-4 text-[#D9B15D] shrink-0" />
                  <span>SECURE CHECKMATE: Do NOT pack power banks or lithium-ion batteries inside your checked luggage carrier holes.</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
