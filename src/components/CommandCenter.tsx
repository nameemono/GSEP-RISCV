import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  Terminal, 
  PlusCircle, 
  HelpCircle, 
  Save, 
  Search, 
  Clock, 
  CheckSquare, 
  AlertTriangle,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';
import { Milestone, Reflection, InterviewQuery } from '../types';
import { INITIAL_MILESTONES, INITIAL_INTERVIEW_QUERIES } from '../data';

export default function CommandCenter() {
  // Tabs & Navigation State
  const [activeTab, setActiveTab ] = useState<'dashboard' | 'learning' | 'calendar' | 'notes' | 'progress'>('dashboard');

  // Study Planner states
  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const saved = localStorage.getItem('gsep_milestones');
    return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
  });
  const [newMilestoneText, setNewMilestoneText] = useState('');
  const [newMilestoneCategory, setNewMilestoneCategory] = useState<'daily' | 'monthly'>('daily');

  // Reflection Journal states
  const [reflection, setReflection] = useState<Reflection>(() => {
    const saved = localStorage.getItem('gsep_reflection');
    return saved ? JSON.parse(saved) : {
      q1: "Cleared Verilog simulation test benches on multiplexer and priority encoder models.",
      q2: "Setup and hold constraints on sub-circuits are challenging to visualize without synthesis logs.",
      q3: "Configure clock frequency division modules and implement a full finite state machine (FSM).",
      timestamp: new Date().toLocaleDateString()
    };
  });
  const [isSavedGlow, setIsSavedGlow] = useState(false);

  // Interview Quiz Prep states
  const [interviewQueries, setInterviewQueries] = useState<InterviewQuery[]>(() => {
    const saved = localStorage.getItem('gsep_interview');
    return saved ? JSON.parse(saved) : INITIAL_INTERVIEW_QUERIES;
  });
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCategory, setNewCategory] = useState('Digital Design');
  const [showAddQueryModal, setShowAddQueryModal] = useState(false);
  const [queryFilter, setQueryFilter] = useState<'ALL' | 'LEARNED' | 'IN_PROGRESS' | 'NOT_STARTED'>('ALL');

  // Persist states
  useEffect(() => {
    localStorage.setItem('gsep_milestones', JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem('gsep_reflection', JSON.stringify(reflection));
  }, [reflection]);

  useEffect(() => {
    localStorage.setItem('gsep_interview', JSON.stringify(interviewQueries));
  }, [interviewQueries]);

  // Add milestone
  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneText.trim()) return;
    const item: Milestone = {
      id: 'm_' + Date.now(),
      title: newMilestoneText,
      completed: false,
      category: newMilestoneCategory,
      dueDate: newMilestoneCategory === 'daily' ? 'Today' : '30 June 2026'
    };
    setMilestones([item, ...milestones]);
    setNewMilestoneText('');
  };

  // Toggle milestone completion
  const handleToggleMilestone = (id: string) => {
    setMilestones(milestones.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  // Delete milestone
  const handleDeleteMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  // Force Save Reflection
  const triggerForceSave = () => {
    const updated = { ...reflection, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setReflection(updated);
    setIsSavedGlow(true);
    setTimeout(() => setIsSavedGlow(false), 1200);
  };

  // Quick prep helpers
  const handleStatusChange = (id: number, status: 'LEARNED' | 'IN_PROGRESS' | 'NOT_STARTED') => {
    setInterviewQueries(interviewQueries.map(q => q.id === id ? { ...q, status } : q));
  };

  // Add custom query question
  const handleAddQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    const item: InterviewQuery = {
      id: Math.floor(Math.random() * 100) + 100,
      question: newQuestion,
      answer: newAnswer,
      status: 'NOT_STARTED',
      category: newCategory
    };
    setInterviewQueries([item, ...interviewQueries]);
    setNewQuestion('');
    setNewAnswer('');
    setShowAddQueryModal(false);
  };

  const filteredQueries = interviewQueries.filter(q => {
    if (queryFilter === 'ALL') return true;
    return q.status === queryFilter;
  });

  return (
    <div id="development-dashboard" class="w-full max-w-7xl mx-auto px-4 md:px-6 mt-8">
      {/* HUD Bar - Program details (as seen in screenshot) */}
      <div class="bg-gradient-to-r from-[#0D1A2E] to-[#101D34] border border-white/8 rounded-2xl p-4 md:p-6 mb-8 shadow-2xl flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D9B15D] to-[#F0C87A] flex items-center justify-center shadow-lg shadow-yellow-500/10">
            <Terminal class="w-6 h-6 text-[#07111F]" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono text-[#D9B15D] tracking-widest font-semibold">GSEP SHAKTI (ARM + IITM)</span>
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h3 class="text-lg font-bold text-white font-display">Malaysia-Chennai Talent Workspace</h3>
          </div>
        </div>

        {/* Technical focus pills */}
        <div class="flex flex-wrap items-center gap-3">
          <div class="bg-[#101D34] border border-white/5 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <span class="text-[10px] font-mono text-[#93A4BC]">PROGRAMME START</span>
            <span class="text-xs font-semibold text-white font-mono">20 JUNE 2026</span>
          </div>
          <div class="bg-[#101D34] border border-white/5 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <span class="text-[10px] font-mono text-[#93A4BC]">FACILITY HUB</span>
            <span class="text-xs font-semibold text-white">IIT Madras, Chennai</span>
          </div>
          <div class="bg-[#101D34] border border-white/5 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <span class="text-[10px] font-mono text-[#93A4BC]">RTL DESIGN GOAL</span>
            <span class="text-xs font-semibold text-white">Verification Engineer</span>
          </div>
          <div class="bg-[#101D34] border border-[#D9B15D]/20 rounded-lg px-3 py-1.5 flex items-center gap-2 bg-[#D9B15D]/5">
            <Flame class="w-3.5 h-3.5 text-[#D9B15D] animate-pulse" />
            <span class="text-[10px] font-mono text-[#D9B15D] font-bold">CURRENT FOCUS</span>
            <span class="text-xs font-semibold text-[#F0C87A] font-mono">VERILOG HDL</span>
          </div>
        </div>
      </div>

      {/* Main Study Workspace & Planner */}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column - Planner & Checklist */}
        <div class="lg:col-span-7 bg-[#101D34]/80 backdrop-blur-md border border-white/8 rounded-2xl overflow-hidden shadow-2xl">
          {/* Sub Navigation Bar - Matches Screenshot layout */}
          <div class="flex border-b border-white/8 bg-[#0A1628]/90 overflow-x-auto scrollbar-none">
            {(['dashboard', 'learning', 'calendar', 'notes', 'progress'] as const).map((tab) => (
              <button
                key={tab}
                id={`tab-btn-${tab}`}
                onClick={() => setActiveTab(tab)}
                class={`flex-1 min-w-[100px] text-center py-4 px-3 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/2 ${
                  activeTab === tab 
                    ? 'border-[#D9B15D] text-[#D9B15D] bg-white/2' 
                    : 'border-transparent text-[#93A4BC] hover:text-white'
                }`}
              >
                {tab === 'dashboard' && <Terminal class="w-3.5 h-3.5" />}
                {tab === 'learning' && <BookOpen class="w-3.5 h-3.5" />}
                {tab === 'calendar' && <Calendar class="w-3.5 h-3.5" />}
                {tab === 'notes' && <Sparkles class="w-3.5 h-3.5" />}
                {tab === 'progress' && <Award class="w-3.5 h-3.5" />}
                {tab}
              </button>
            ))}
          </div>

          <div class="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div class="flex items-center justify-between mb-6">
                    <div>
                      <h4 class="text-lg font-bold text-white font-display">Personal Study Planner</h4>
                      <p class="text-xs text-[#93A4BC]">Manage daily priorities and weekly hardware milestones.</p>
                    </div>
                    <span class="text-xs font-mono text-[#D9B15D] bg-[#D9B15D]/10 border border-[#D9B15D]/20 px-2.5 py-1 rounded-full">
                      {milestones.filter(m => m.completed).length}/{milestones.length} Done
                    </span>
                  </div>

                  {/* Add Milestone Form */}
                  <form onSubmit={handleAddMilestone} class="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6">
                    <div class="sm:col-span-7">
                      <input
                        type="text"
                        placeholder="Define new technical task or milestone..."
                        value={newMilestoneText}
                        onChange={(e) => setNewMilestoneText(e.target.value)}
                        class="w-full bg-[#07111F] text-white border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#D9B15D]"
                      />
                    </div>
                    <div class="sm:col-span-3">
                      <select
                        value={newMilestoneCategory}
                        onChange={(e) => setNewMilestoneCategory(e.target.value as 'daily' | 'monthly')}
                        class="w-full bg-[#07111F] text-white border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#D9B15D]"
                      >
                        <option value="daily">Daily Priority</option>
                        <option value="monthly">Monthly Goal</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      class="sm:col-span-2 cursor-pointer bg-gradient-to-r from-[#D9B15D] to-[#F0C87A] hover:bg-opacity-90 text-[#07111F] font-bold text-sm px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-yellow-500/10 transition-all duration-300"
                    >
                      <Plus class="w-4 h-4 text-[#07111F]" /> Add
                    </button>
                  </form>

                  {/* Milestones Checklist */}
                  <div class="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {milestones.map((milestone) => (
                      <div
                        id={`milestone-${milestone.id}`}
                        key={milestone.id}
                        class={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${
                          milestone.completed 
                            ? 'bg-[#07111F]/50 border-emerald-500/15 opacity-60' 
                            : 'bg-[#101D34] border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div class="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleToggleMilestone(milestone.id)}
                            class="text-[#93A4BC] hover:text-[#D9B15D] transition-colors"
                          >
                            {milestone.completed ? (
                              <CheckCircle2 class="w-5 h-5 text-[#D9B15D]" />
                            ) : (
                              <Circle class="w-5 h-5" />
                            )}
                          </button>
                          <div>
                            <p class={`text-sm ${milestone.completed ? 'line-through text-[#93A4BC]' : 'text-[#D8E3F2] font-medium'}`}>
                              {milestone.title}
                            </p>
                            <div class="flex items-center gap-2 mt-1">
                              <span class={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md ${
                                milestone.category === 'daily' 
                                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/15' 
                                  : 'bg-purple-500/10 text-purple-400 border border-purple-500/15'
                              }`}>
                                {milestone.category}
                              </span>
                              <span class="text-[10px] font-mono text-[#93A4BC]">DueDate: {milestone.dueDate}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteMilestone(milestone.id)}
                          class="text-[#93A4BC] hover:text-red-400 p-1.5 rounded-md hover:bg-white/5 transition-all"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {milestones.length === 0 && (
                      <div class="text-center py-10 bg-[#07111F]/30 rounded-xl border border-dashed border-white/5">
                        <CheckSquare class="w-8 h-8 text-[#93A4BC] mx-auto mb-2 opacity-40" />
                        <p class="text-sm text-[#93A4BC]">No active milestones declared. Go ahead and add one!</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'learning' && (
                <motion.div
                  key="learning"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  class="space-y-4 text-[#D8E3F2] leading-relaxed text-sm"
                >
                  <h4 class="text-base font-bold text-white font-display">Semiconductor Training Path</h4>
                  <p class="text-xs text-[#93A4BC]">Core curricula provided across five rapid cycles inside the Indian Institute of Technology (IIT).</p>
                  
                  <div class="grid grid-cols-1 gap-4 mt-2">
                    <div class="bg-[#07111F] border border-white/5 p-4 rounded-xl">
                      <div class="flex items-center gap-3 mb-2">
                        <span class="w-6 h-6 rounded-md bg-[#D9B15D]/10 text-[#D9B15D] flex items-center justify-center font-mono text-xs font-bold font-display">1</span>
                        <h5 class="text-sm font-semibold text-white">RISC-V Architecture Foundations</h5>
                      </div>
                      <p class="text-xs text-[#93A4BC]">Instruction set architecture (ISA), integer pipelines, decoding stages, and load-store modules execution.</p>
                    </div>
                    <div class="bg-[#07111F] border border-white/5 p-4 rounded-xl">
                      <div class="flex items-center gap-3 mb-2">
                        <span class="w-6 h-6 rounded-md bg-[#D9B15D]/10 text-[#D9B15D] flex items-center justify-center font-mono text-xs font-bold font-display">2</span>
                        <h5 class="text-sm font-semibold text-white">Digital Electronics & HDL Design</h5>
                      </div>
                      <p class="text-xs text-[#93A4BC]">Translating complex state machines (FSM) into fully compilable, race-condition-free Verilog files.</p>
                    </div>
                    <div class="bg-[#07111F] border border-white/5 p-4 rounded-xl">
                      <div class="flex items-center gap-3 mb-2">
                        <span class="w-6 h-6 rounded-md bg-[#D9B15D]/10 text-[#D9B15D] flex items-center justify-center font-mono text-xs font-bold font-display">3</span>
                        <h5 class="text-sm font-semibold text-white">RTL Simulation & Gate Synthesis</h5>
                      </div>
                      <p class="text-xs text-[#93A4BC]">Executing testing environments in Vivado/Icarus and reviewing synthesis pathways with timing slack thresholds.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'calendar' && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 class="text-base font-bold text-white font-display mb-4">Academic Residence Schedule</h4>
                  <div class="grid grid-cols-4 gap-2 mb-4">
                    {['Mon', 'Tue', 'Wed', 'Thu'].map((day) => (
                      <div key={day} class="text-center font-mono text-xs text-[#93A4BC] font-semibold py-1 bg-[#0A1628] rounded-md">{day}</div>
                    ))}
                  </div>
                  <div class="space-y-4">
                    <div class="flex items-start gap-3 border-l-2 border-[#D9B15D] pl-3 py-1">
                      <div>
                        <span class="text-[10px] font-mono text-[#D9B15D]">09:00 AM - 12:30 PM</span>
                        <p class="text-xs font-bold text-[#D8E3F2]">Session 1: CPU Hazard Mitigation Methods</p>
                        <p class="text-[10px] text-[#93A4BC]">Core Faculty lecture on data forwarding and branch control loops.</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3 border-l-2 border-blue-400 pl-3 py-1">
                      <div>
                        <span class="text-[10px] font-mono text-blue-400">02:00 PM - 05:30 PM</span>
                        <p class="text-xs font-bold text-[#D8E3F2]">Session 2: Active Verilog Compiler Layout Lab</p>
                        <p class="text-[10px] text-[#93A4BC]">Practical testbench validation with custom microcore files.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notes' && (
                <motion.div
                  key="notes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  class="space-y-4"
                >
                  <h4 class="text-base font-bold text-white font-display">Fellow Research Scratchpad</h4>
                  <p class="text-xs text-[#93A4BC]">Quick scratch space for writing custom command syntax and memory checks.</p>
                  <textarea
                    rows={4}
                    placeholder="E.g., iverilog -o testbench_riscv board_tb.v board_core.v"
                    class="w-full bg-[#07111F] text-mono text-xs text-[#D9B15D] border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[#D9B15D]"
                  ></textarea>
                  <span class="text-[10px] font-mono text-[#93A4BC]">Autosaved to your browser local active workspace.</span>
                </motion.div>
              )}

              {activeTab === 'progress' && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  class="space-y-6"
                >
                  <h4 class="text-base font-bold text-white font-display">Scholarship Merit Matrix</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="bg-[#07111F] border border-white/5 p-4 rounded-xl flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        ✓
                      </div>
                      <div>
                        <p class="text-xs font-mono text-[#93A4BC]">PRE-FLIGHT LOGS</p>
                        <p class="text-sm font-bold text-white">9 Documents Ready</p>
                      </div>
                    </div>
                    <div class="bg-[#07111F] border border-white/5 p-4 rounded-xl flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                        ⚡
                      </div>
                      <div>
                        <p class="text-xs font-mono text-[#93A4BC]">LAB ACCREDITATIONS</p>
                        <p class="text-sm font-bold text-white">2 Modules Certified</p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full bg-[#07111F] rounded-full h-2.5 overflow-hidden border border-white/5">
                    <div class="bg-gradient-to-r from-[#D9B15D] to-[#F0C87A] h-full" style={{ width: '45%' }}></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right column - Reflection is on top, Quiz Prep underneath as requested */}
        <div class="lg:col-span-5 flex flex-col gap-8">
          
          {/* Today's Reflection Journal */}
          <div class="bg-[#101D34]/80 backdrop-blur-md border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl relative">
            <div class={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D9B15D] to-[#F0C87A] rounded-t-2xl transition-opacity duration-1000 ${isSavedGlow ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
            
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-base font-bold text-white font-display flex items-center gap-2">
                  <BookOpen class="w-4 h-4 text-[#D9B15D]" /> Today's Reflection Journal
                </h4>
                <p class="text-[11px] text-[#93A4BC]">Saved locally to keep track of residency struggles.</p>
              </div>
              <span class="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-[#93A4BC] flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> AUTO-SAVED
              </span>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-[11px] font-mono text-[#D9B15D] font-bold uppercase mb-1">✓ What did I learn today?</label>
                <textarea
                  value={reflection.q1}
                  onChange={(e) => setReflection({ ...reflection, q1: e.target.value })}
                  rows={2}
                  class="w-full bg-[#07111F] text-xs text-[#D8E3F2] border border-white/5 rounded-xl p-3 focus:outline-none focus:border-[#D9B15D] resize-none"
                />
              </div>

              <div>
                <label class="block text-[11px] font-mono text-[#D9B15D] font-bold uppercase mb-1">⚠ Challenges Faced / Blockers?</label>
                <textarea
                  value={reflection.q2}
                  onChange={(e) => setReflection({ ...reflection, q2: e.target.value })}
                  rows={2}
                  class="w-full bg-[#07111F] text-xs text-[#D8E3F2] border border-white/5 rounded-xl p-3 focus:outline-none focus:border-[#D9B15D] resize-none"
                />
              </div>

              <div>
                <label class="block text-[11px] font-mono text-[#D9B15D] font-bold uppercase mb-1">⦿ What will I study tomorrow?</label>
                <textarea
                  value={reflection.q3}
                  onChange={(e) => setReflection({ ...reflection, q3: e.target.value })}
                  rows={2}
                  class="w-full bg-[#07111F] text-xs text-[#D8E3F2] border border-white/5 rounded-xl p-3 focus:outline-none focus:border-[#D9B15D] resize-none"
                />
              </div>

              <div class="flex items-center justify-between pt-2">
                <span class="text-[10px] font-mono text-[#93A4BC]">Last written: {reflection.timestamp}</span>
                <button
                  type="button"
                  onClick={triggerForceSave}
                  class="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-300"
                >
                  <Save class="w-3.5 h-3.5 text-[#D9B15D]" /> FORCE WRITE SNAPSHOT
                </button>
              </div>
            </div>
          </div>

          {/* Technical Interview Preparation Tracker */}
          <div class="bg-[#101D34]/80 backdrop-blur-md border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl flex-1">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-base font-bold text-white font-display">Interview Prep Tracker</h4>
                <p class="text-xs text-[#93A4BC]">Accelerate hardware design concepts retention.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddQueryModal(true)}
                class="cursor-pointer bg-[#D9B15D]/10 hover:bg-[#D9B15D]/20 border border-[#D9B15D]/20 text-[#D9B15D] font-bold text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all duration-300"
              >
                <PlusCircle class="w-3.5 h-3.5" /> ADD QUERY
              </button>
            </div>

            {/* Filter buttons */}
            <div class="flex flex-wrap gap-1.5 mb-4">
              {(['ALL', 'LEARNED', 'IN_PROGRESS', 'NOT_STARTED'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setQueryFilter(filter)}
                  class={`text-[10px] font-mono px-2 py-1 rounded-md border uppercase font-semibold transition-all ${
                    queryFilter === filter 
                      ? 'bg-[#D9B15D] text-[#07111F] border-[#D9B15D]' 
                      : 'bg-[#07111F]/50 text-[#93A4BC] border-white/5 hover:border-white/10'
                  }`}
                >
                  {filter.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Quizzes list */}
            <div class="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              {filteredQueries.map((query) => (
                <div key={query.id} class="bg-[#07111F]/60 border border-white/5 p-3.5 rounded-xl transition-all hover:border-white/10">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-[10px] font-mono text-[#D9B15D] bg-[#D9B15D]/10 border border-[#D9B15D]/20 px-1.5 py-0.5 rounded">
                      ID: {query.id} — {query.category}
                    </span>
                    
                    {/* Status toggler */}
                    <select
                      value={query.status}
                      onChange={(e) => handleStatusChange(query.id, e.target.value as any)}
                      class={`text-[9px] font-mono font-bold bg-transparent border-0 focus:ring-0 cursor-pointer ${
                        query.status === 'LEARNED' ? 'text-emerald-400' :
                        query.status === 'IN_PROGRESS' ? 'text-amber-400' : 'text-[#93A4BC]'
                      }`}
                    >
                      <option value="LEARNED" class="bg-[#07111F] text-emerald-400">LEARNED</option>
                      <option value="IN_PROGRESS" class="bg-[#07111F] text-amber-500">IN PROGRESS</option>
                      <option value="NOT_STARTED" class="bg-[#07111F] text-gray-400">NOT STARTED</option>
                    </select>
                  </div>
                  
                  <h5 class="text-xs font-bold text-white mb-1.5">{query.question}</h5>
                  <p class="text-xs text-[#93A4BC] leading-relaxed bg-[#0A1628]/80 p-2.5 rounded-lg border border-white/5 font-mono text-[11px]">
                    {query.answer}
                  </p>
                </div>
              ))}
              {filteredQueries.length === 0 && (
                <div class="text-center py-8 bg-[#07111F]/30 rounded-xl border border-dashed border-white/5">
                  <HelpCircle class="w-6 h-6 text-[#93A4BC] mx-auto mb-1.5 opacity-30" />
                  <p class="text-xs text-[#93A4BC]">No records matched this filter.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Add Custom Question Modal (Inline styled glass container) */}
      <AnimatePresence>
        {showAddQueryModal && (
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111F]/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              class="w-full max-w-md bg-[#101D34] border border-[#D9B15D]/40 rounded-2xl p-6 md:p-8 shadow-2xl relative"
            >
              <h4 class="text-base font-bold text-white font-display mb-1">Add Semiconductor Concept</h4>
              <p class="text-xs text-[#93A4BC] mb-4">Include custom RTL hardware questions to memorize.</p>
              
              <form onSubmit={handleAddQuery} class="space-y-4">
                <div>
                  <label class="block text-xs font-mono text-[#D9B15D] mb-1">Technical Question</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., What is Setup Slack constraint?"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    class="w-full bg-[#07111F] text-white border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#D9B15D]"
                  />
                </div>

                <div>
                  <label class="block text-xs font-mono text-[#D9B15D] mb-1">Detailed Answer Core</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="E.g., The margin by which the signal arrival time satisfies setup hold..."
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    class="w-full bg-[#07111F] text-white border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-[#D9B15D]"
                  />
                </div>

                <div class="grid grid-cols-2 gap-3 pb-2">
                  <div>
                    <label class="block text-[11px] font-mono text-[#93A4BC] mb-1">Category Domain</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      class="w-full bg-[#07111F] text-white border border-white/10 rounded-xl px-2 py-1.5 text-xs focus:outline-none"
                    >
                      <option value="Digital Design">Digital Design</option>
                      <option value="Verification">Verification</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Physical Layout">Physical Layout</option>
                    </select>
                  </div>
                </div>

                <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowAddQueryModal(false)}
                    class="cursor-pointer bg-white/5 hover:bg-white/10 text-[#93A4BC] font-semibold text-xs px-4 py-2 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="cursor-pointer bg-gradient-to-r from-[#D9B15D] to-[#F0C87A] text-[#07111F] font-bold text-xs px-4 py-2 rounded-xl shadow transition"
                  >
                    Submit Query
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
