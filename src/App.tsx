import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  MapPin, 
  Clock, 
  Compass, 
  Award, 
  ArrowRight, 
  Globe, 
  ChevronRight, 
  Cpu, 
  BookOpen, 
  Home, 
  Calendar, 
  Zap, 
  ShieldCheck, 
  Utensils, 
  Wifi, 
  Layers, 
  CheckCircle,
  HelpCircle,
  PhoneCall,
  Menu,
  X
} from 'lucide-react';

// Sub-components
import SectionHeading from './components/SectionHeading';
import GlassCard from './components/GlassCard';
import HeroStatsCard from './components/HeroStatsCard';
import TimelineItem from './components/TimelineItem';
import FeatureCard from './components/FeatureCard';
import InfoCard from './components/InfoCard';
import GalleryCard from './components/GalleryCard';
import ApplicationStepCard from './components/ApplicationStepCard';

// Widgets
import CommandCenter from './components/CommandCenter';
import SuitcasePacker from './components/SuitcasePacker';
import InteractiveMap from './components/InteractiveMap';

// Static Data
import { 
  TIMELINE_STEPS, 
  CHENNAI_GALLERY, 
  CHENNAI_FACTS, 
  CAMPUS_MAP_SPOTS, 
  PROGRAM_TIMING_SCHEDULE 
} from './data';

export default function App() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // High-fidelity active time-slot on "A Day in the Life" section
  const [selectedScheduleSlot, setSelectedScheduleSlot] = useState(PROGRAM_TIMING_SCHEDULE[1]);

  // Dynamic time clocks
  const [chennaiTime, setChennaiTime] = useState('');
  const [kualaLumpurTime, setKualaLumpurTime] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      
      // Chennai is UTC+5:30
      const inTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (330 * 60000));
      setChennaiTime(inTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));

      // Kuala Lumpur is UTC+8:00
      const klTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (480 * 60000));
      setKualaLumpurTime(klTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Soft scroll utility
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div class="min-h-screen bg-[#07111F] text-[#D8E3F2] selection:bg-[#D9B15D] selection:text-[#07111F] overflow-x-hidden relative font-sans">
      
      {/* Decorative Motherboard Grid Backgrounds */}
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#112240_1px,transparent_1px),linear-gradient(to_bottom,#112240_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none"></div>
      
      {/* Absolute Header Ribbon */}
      <header class="sticky top-0 z-40 bg-[#07111F]/85 backdrop-blur-md border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          
          {/* Logo with chip outline element */}
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg border border-[#D9B15D]/40 flex items-center justify-center bg-[#101D34]/80">
              <span class="text-xs font-mono font-black text-[#D9B15D]">GSEP</span>
            </div>
            <div>
              <h1 class="text-xs font-mono font-black tracking-widest text-white leading-none">RISC-V PROGRAMME</h1>
              <span class="text-[9px] font-mono text-[#93A4BC] tracking-wider">IIT MADRAS × MALAYSIA SYNC</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav class="hidden lg:flex items-center gap-6">
            <button onClick={() => scrollToSection('programme-overview')} class="cursor-pointer text-xs font-mono uppercase tracking-wider text-[#93A4BC] hover:text-white transition-colors">Overview</button>
            <button onClick={() => scrollToSection('preflight-checklist')} class="cursor-pointer text-xs font-mono uppercase tracking-wider text-[#93A4BC] hover:text-white transition-colors">Pre-flight</button>
            <button onClick={() => scrollToSection('program-timeline')} class="cursor-pointer text-xs font-mono uppercase tracking-wider text-[#93A4BC] hover:text-white transition-colors">Journey</button>
            <button onClick={() => scrollToSection('facility-showcase')} class="cursor-pointer text-xs font-mono uppercase tracking-wider text-[#93A4BC] hover:text-white transition-colors">Lodging</button>
            <button onClick={() => scrollToSection('hands-on-training')} class="cursor-pointer text-xs font-mono uppercase tracking-wider text-[#93A4BC] hover:text-white transition-colors">Syllabus</button>
            <button onClick={() => scrollToSection('development-dashboard')} class="cursor-pointer text-xs font-mono uppercase tracking-wider text-[#93A4BC] hover:text-white transition-colors">Command Center</button>
            <button onClick={() => scrollToSection('iit-madras-blueprint-map')} class="cursor-pointer text-xs font-mono uppercase tracking-wider text-[#93A4BC] hover:text-white transition-colors">Campus Map</button>
          </nav>

          {/* Symmetrical clocks & flag badges from screen right */}
          <div class="hidden md:flex items-center gap-4 border-l border-white/8 pl-4">
            <div class="text-right">
              <span class="text-[9px] font-mono text-[#D9B15D] tracking-wider uppercase block">// Chennai Time (IST)</span>
              <span class="text-xs font-mono text-white font-bold">{chennaiTime || '06:20:10 PM'}</span>
            </div>
            
            <div class="w-px h-6 bg-white/8"></div>

            <div class="text-right">
              <span class="text-[9px] font-mono text-blue-400 tracking-wider uppercase block">// Kuala Lumpur (MYT)</span>
              <span class="text-xs font-mono text-white font-bold">{kualaLumpurTime || '08:50:10 PM'}</span>
            </div>

            <span class="text-xs">🇮🇳</span>
            <span class="text-xs">🇲🇾</span>
          </div>

          {/* Toggle Menu mobile button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            class="cursor-pointer lg:hidden p-2 text-[#93A4BC] hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X class="w-5 h-5" /> : <Menu class="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-[70px] inset-x-0 z-30 bg-[#0A1628] border-b border-white/8 p-6 shadow-2xl flex flex-col gap-4 font-mono text-xs uppercase"
          >
            <button onClick={() => { scrollToSection('programme-overview'); setMobileMenuOpen(false); }} class="text-left py-2 text-[#93A4BC] hover:text-white">Overview</button>
            <button onClick={() => { scrollToSection('preflight-checklist'); setMobileMenuOpen(false); }} class="text-left py-2 text-[#93A4BC] hover:text-white">Pre-flight</button>
            <button onClick={() => { scrollToSection('program-timeline'); setMobileMenuOpen(false); }} class="text-left py-2 text-[#93A4BC] hover:text-white">Journey</button>
            <button onClick={() => { scrollToSection('facility-showcase'); setMobileMenuOpen(false); }} class="text-left py-2 text-[#93A4BC] hover:text-white">Lodging</button>
            <button onClick={() => { scrollToSection('hands-on-training'); setMobileMenuOpen(false); }} class="text-left py-2 text-[#93A4BC] hover:text-white">Syllabus</button>
            <button onClick={() => { scrollToSection('development-dashboard'); setMobileMenuOpen(false); }} class="text-left py-2 text-[#93A4BC] hover:text-white">Command Center</button>
            <button onClick={() => { scrollToSection('iit-madras-blueprint-map'); setMobileMenuOpen(false); }} class="text-[#D9B15D] text-left py-2 font-bold">Campus Map ➔</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1 — HERO SECTION */}
      <section id="hero-block" class="pt-16 pb-24 px-4 md:px-6 relative text-center">
        {/* Soft Gold/Blue Background Ambient Glows */}
        <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div class="absolute top-20 left-1/3 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div class="max-w-4xl mx-auto">
          {/* Symmetrical Top Badge ribbon */}
          <div class="inline-flex items-center gap-2 bg-[#13223D] border border-[#D9B15D]/35 rounded-full px-4 py-1.5 mb-8 text-[#D9B15D] text-xs font-mono font-medium shadow-sm shadow-[#D9B15D]/10">
            <span class="w-2 h-2 rounded-full bg-[#D9B15D] animate-ping"></span>
            <span>IIT MADRAS ACADEMIC BLUEPRINT </span>
            <span class="text-white/40">•</span>
            <span class="text-white">GSEP FELLOWSHIP 2026</span>
          </div>

          {/* Large Centered Title */}
          <h2 class="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tighter uppercase font-display leading-[0.9] mb-4">
            GSEP RISC-V PROGRAMME
          </h2>

          <div class="flex items-center justify-center gap-2 text-xl font-bold font-display text-white mb-6">
            <span>Malaysia</span>
            <ArrowRight class="w-4 h-4 text-[#D9B15D]" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#D9B15D] to-[#F0C87A]">Chennai, India</span>
          </div>

          <p class="text-sm md:text-base text-[#93A4BC] max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
            In collaboration with Intel developers and IIT Madras researchers, this is Malaysia's premier elite hardware talent program. Synthesize architectural designs on RISC-V instruction-sets and launch your Silicon designer career.
          </p>

          {/* Flight Badge & Status Indicator Rows */}
          <div class="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <span class="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-400 bg-emerald-400/5 border border-emerald-400/20 px-3.5 py-1.5 rounded-full">
              STATUS: APPROVED RESIDENCY
            </span>
            <span class="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-400 bg-amber-400/5 border border-amber-400/20 px-3.5 py-1.5 rounded-full">
              INTAKE: 20 JUNE 2026
            </span>
            <span class="text-[10px] uppercase font-mono font-bold tracking-wider text-blue-400 bg-blue-400/5 border border-blue-400/20 px-3.5 py-1.5 rounded-full">
              SCHOLARSHIP STATUS: FULLY DEPLOYED
            </span>
          </div>

          {/* CTA Buttons */}
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <button
              onClick={() => scrollToSection('development-dashboard')}
              class="cursor-pointer w-full bg-gradient-to-r from-[#D9B15D] to-[#F0C87A] hover:bg-opacity-90 text-[#07111F] font-extrabold uppercase text-xs tracking-widest font-mono py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/10 transition-transform duration-300 hover:scale-105"
            >
              LAUNCH COMMAND CENTER
            </button>
            <button
              onClick={() => scrollToSection('preflight-checklist')}
              class="cursor-pointer w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-extrabold uppercase text-xs tracking-widest font-mono py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-105"
            >
              OPEN BOARDING STUDY PLANNER
            </button>
          </div>
        </div>

        {/* Hero Bottom Stats grid */}
        <div class="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <HeroStatsCard
            icon={Clock}
            value="5 WEEKS"
            label="INTENSIVE RESIDENCY"
            detail="Hands-on chip compiler workshops inside Indian Institute core facilities."
            highlight={true}
          />
          <HeroStatsCard
            icon={Cpu}
            value="RISC-V ISA"
            label="ARCHITECTURE DECK"
            detail="Master Shakti microcores, hardware instruction sets, and digital FSM layouts."
          />
          <HeroStatsCard
            icon={Award}
            value="100% COVERED"
            label="MERIT SCHOLARSHIP"
            detail="Includes hostel residencies, flight logs, meals, and laboratory access."
          />
          <HeroStatsCard
            icon={Globe}
            value="MNC PLACEMENT"
            label="EMPLOYMENT OUTCOME"
            detail="Bridge directly into top-tier Malaysian semiconductor development groups."
          />
        </div>
      </section>

      {/* SECTION 2 — PROGRAMME OVERVIEW */}
      <section id="programme-overview" class="py-24 bg-gradient-to-b from-transparent to-[#0A1628] border-t border-white/5">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading
            badge="OVERVIEW"
            title="Symmetrical Curricular Path"
            subtitle="GSEP bridges academic engineering and physical foundry placement across five rapid, high-intensity modules."
            glow={true}
          />

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Academic Foundations"
              description="Review RISC-V pipelining systems, decoder buses, hazard forwarding, and address registers in rigorous classroom groups."
              indexText="MODULE 01"
              icon={BookOpen}
            />
            <FeatureCard
              title="Physical RTL Labwork"
              description="Code structural digital gates layout models in Verilog, optimizing setup times and managing slack properties."
              indexText="MODULE 02"
              icon={Terminal}
              highlight={true}
            />
            <FeatureCard
              title="FPGA Emulation"
              description="Synthesize hardware configurations directly on FPGA boards, debugging physical timing paths and circuit clocks."
              indexText="MODULE 03"
              icon={Cpu}
            />
            <FeatureCard
              title="MNC Apprenticeships"
              description="Work alongside industry VLSI architects on commercial layout files, prepping for permanent talent alignment."
              indexText="MODULE 04"
              icon={Award}
            />
          </div>
        </div>
      </section>

      {/* COMMAND CENTER DASHBOARD INSTALLED IN PREVALENT AREA */}
      <section id="command-center-widget" class="py-20 bg-[#0A1628] border-y border-white/5">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading
            badge="FELLOW DASHBOARD"
            title="Academic Command Center"
            subtitle="Your real-time residency dashboard. Track study milestones, write reflection journals, and verify concepts retention."
          />
          <CommandCenter />
        </div>
      </section>

      {/* SECTION 3 — BEFORE YOU FLY TO CHENNAI & PACKER */}
      <section id="preflight-checklist" class="py-24 bg-[#07111F]">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading
            badge="PRE-FLIGHT LOGISTICS"
            title="Before You Fly To Chennai"
            subtitle="Prepare your travel authorization, verify hardware compatibility, and complete packaging loadout logs before your group transfer at KLIA."
          />

          {/* 2x2 Responsive grid highlighting flight preparations info */}
          <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <InfoCard
              icon={Globe}
              title="PASSPORT VALIDITY LIMITS"
              description="Double check booklet expiration dates. Must exceed 6 months from entry. Recommend saving a scanned booklet copy on your remote drive."
              statusBadge="MANDATORY"
            />
            <InfoCard
              icon={Layers}
              title="INDIA ELECTRONIC VISA"
              description="Submit the e-Tourist form with biometrics. Print 2 copies. Ensure date stamp records match your GSEP offer documentation."
              statusBadge="READY STAMPED"
            />
            <InfoCard
              icon={ShieldCheck}
              title="SCHOLARSHIP TRANSCRIPTS"
              description="Assemble physical copies of GSEP agreements, university transcripts, and authorization cards for customs check gates."
              statusBadge="PHYSICAL COPY"
            />
            <InfoCard
              icon={Cpu}
              title="HARDWARE STATIONS"
              description="Prerequisite: A modern development laptop with Intel/M1 cores, capable of executing compiler files. Pack correct universal plugs."
              statusBadge="PRE-CONFIGURED"
            />
          </div>

          {/* Symmetrical digital Suitcase packer */}
          <h4 class="text-sm font-mono text-[#D9B15D] tracking-widest text-center uppercase mb-6">// Loadout & Baggage Check Simulator</h4>
          <SuitcasePacker />
        </div>
      </section>

      {/* SECTION 4 — PROGRAMME JOURNEY TIMELINE */}
      <section id="program-timeline" class="py-24 bg-gradient-to-b from-[#07111F] to-[#0A1628] border-t border-white/5 overflow-x-auto">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading
            badge="DEVELOPMENT ROUTE"
            title="GSEP Programme Journey"
            subtitle="Review your progression vectors from the initial competitive assessment pool up to design engineer placement."
          />

          {/* Horizontal desktop / Vertical mobile Timeline container */}
          <div class="flex flex-col lg:flex-row gap-6 pb-6 select-none max-w-full overflow-x-auto scrollbar-none">
            {TIMELINE_STEPS.map((step, idx) => (
              <TimelineItem
                key={step.id}
                step={step}
                index={idx}
                totalSteps={TIMELINE_STEPS.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — WELCOME TO CHENNAI, INDIA GALLERY */}
      <section id="destination-gallery" class="py-24 bg-[#0A1628] border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading
            badge="DESTINATION GATEWAY // INDIAN RESIDENCY"
            title="Welcome To Chennai, India"
            subtitle="Known as the Detroit of Asia, Chennai hosts a colossal electronic hardware ecosystem and prestigious Indian Institute banyans."
          />

          {/* Grid Pinterest-style representation */}
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {CHENNAI_GALLERY.map((card) => (
              <GalleryCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — ESSENTIAL INFORMATION QUICK FACTS */}
      <section id="essential-facts" class="py-24 bg-[#07111F]">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading
            badge="CAMPUS SPECTRA // LIVE CODES"
            title="Chennai Quick Facts"
            subtitle="A reference guideline for international GSEP scholars settling within the IIT Madras regional workspace."
          />

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHENNAI_FACTS.map((fact) => (
              <GlassCard key={fact.id} hoverEffect={true} className="flex flex-col justify-between min-h-[180px]">
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-[10px] font-mono text-[#93A4BC] uppercase tracking-wider font-semibold">{fact.label}</span>
                    <span class="text-xl">{fact.icon}</span>
                  </div>
                  <h4 class="text-base font-black text-white font-display tracking-tight mb-2">
                    {fact.value}
                  </h4>
                  <p class="text-[11px] text-[#93A4BC] leading-relaxed">
                    {fact.details}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — ACCOMMODATION / YOUR HOME FOR 5 WEEKS */}
      <section id="facility-showcase" class="py-24 bg-gradient-to-b from-[#07111F] to-[#0A1628] border-t border-white/5">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading
            badge="CAMPUS SPECTRA // FIVE-WEEK HUB"
            title="Your Home For 5 Weeks"
            subtitle="Enjoy premium residencies situated within IIT Madras' protected sanctuary forest. Quiet, secure, and fully connected."
          />

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left large photo */}
            <div class="relative rounded-2xl overflow-hidden border border-white/8 aspect-[4/3] group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
                alt="IIT Madras residence room"
                referrerPolicy="no-referrer"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/20 to-transparent pointer-events-none"></div>
              <div class="absolute bottom-6 left-6 z-10">
                <span class="text-[9px] font-mono font-bold text-[#D9B15D] uppercase tracking-widest mb-1 block">// LUSH CORIDORS</span>
                <h4 class="text-xl font-black text-white font-display uppercase">TAPTI STUDENT RESIDENCY</h4>
              </div>
            </div>

            {/* Right details grid inside a Luxury board showcase container */}
            <div class="bg-[#101D34]/80 border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl">
              <h4 class="text-lg font-bold text-white font-display tracking-tight uppercase mb-2">Premium Dorm Facilities</h4>
              <p class="text-xs text-[#93A4BC] leading-relaxed mb-6">
                All accommodation slots are managed by direct university residential offices, offering safety, comfort, and zero commutes.
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-white/5 mb-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-[#D9B15D]/10 text-[#D9B15D] flex items-center justify-center shrink-0">
                    <Home class="w-4 h-4" />
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-white">ROOM TYPE</h5>
                    <p class="text-[10px] text-[#93A4BC]">Single/Symmetrical Double</p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <Wifi class="w-4 h-4" />
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-white">INTERNET SPEED</h5>
                    <p class="text-[10px] text-[#93A4BC]">Gigabit LAN Nodes & Wi-Fi</p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck class="w-4 h-4" />
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-white">24/7 SECURITY</h5>
                    <p class="text-[10px] text-[#93A4BC]">Controlled gates checks</p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                    <Utensils class="w-4 h-4" />
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-white">REUSE LAUNDRIES</h5>
                    <p class="text-[10px] text-[#93A4BC]">Washing bay zones</p>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2 text-xs font-mono text-[#D9B15D]">
                <span class="w-1.5 h-1.5 rounded-full bg-[#D9B15D] animate-ping"></span>
                <span>Includes airport transfers, regional medical care coverage, and daily dining checks.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — IC DESIGN TRAINING & HARDWARE LABS */}
      <section id="hands-on-training" class="py-24 bg-[#0A1628] border-t border-white/5 relative">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading
            badge="VLSI LAB ROUTINE // SEMICONDUCTORS"
            title="IC Design Training Syllabus"
            subtitle="Acquire real competency on open-source toolchains, compiling, timing and layout routines supervised by veteran engineers."
          />

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            
            {/* Left specs detail text */}
            <div class="lg:col-span-5 space-y-6">
              <div class="bg-gradient-to-r from-blue-500/20 to-transparent border-l-4 border-[#D9B15D] p-5 rounded-r-xl">
                <h4 class="text-sm font-mono font-bold text-[#D9B15D] uppercase mb-1">SHAKTI Core Synthesizer</h4>
                <p class="text-xs text-[#93A4BC] leading-relaxed">
                  GSEP scholars run design simulations on India's premier RISC-V open core project, validating registers, pipelines, and instruction decoding loops.
                </p>
              </div>

              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#D9B15D] mt-2 shrink-0"></div>
                  <p class="text-xs text-[#D8E3F2] leading-relaxed">
                    <strong>Digital System Layouts:</strong> Translating hardware models into synthesizable finite state machine logics.
                  </p>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#D9B15D] mt-2 shrink-0"></div>
                  <p class="text-xs text-[#D8E3F2] leading-relaxed">
                    <strong>RTL Validation:</strong> Debugging clock setups, race hazards, and critical timing violations inside digital environments.
                  </p>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#D9B15D] mt-2 shrink-0"></div>
                  <p class="text-xs text-[#D8E3F2] leading-relaxed">
                    <strong>Physical Place & Route:</strong> Synthesizing layout lines onto mock foundries inside simulation environments.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Large Semiconductor board visual */}
            <div class="lg:col-span-7 relative rounded-2xl overflow-hidden border border-white/8 aspect-[16/10] group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                alt="Modern silicon microchip circuit"
                referrerPolicy="no-referrer"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 contrast-125"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/30 to-transparent pointer-events-none"></div>
              
              <div class="absolute bottom-6 left-6 right-6 p-4 bg-[#101D34]/90 backdrop-blur-md rounded-xl border border-white/8 flex items-center justify-between">
                <div>
                  <span class="text-[9px] font-mono text-[#D9B15D] uppercase tracking-wider block">COMPILER CONTEXT</span>
                  <p class="text-xs font-bold text-white uppercase font-mono">RISC-V SHAKTI SHIELD BOARDS</p>
                </div>
                <span class="text-xs font-mono font-bold text-emerald-400">ACTIVE LOGS RUNNING</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9 — LIVING IN CHENNAI & DAILY SCHEDULER TIMINGS */}
      <section id="living-in-chennai" class="py-24 bg-[#07111F] border-t border-white/5">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading
            badge="RESIDENCY AGENDA // HOURLY HUD"
            title="Living in Chennai // Daily Schedule"
            subtitle="What does an active day look like as a GSEP fellow inside the campus? Toggle through slots in our scheduler below."
          />

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left hand list selector */}
            <div class="lg:col-span-5 space-y-3">
              <span class="text-[9px] font-mono text-[#D9B15D] uppercase tracking-widest font-semibold block mb-2">// DIRECTORY SCHEDULE</span>
              {PROGRAM_TIMING_SCHEDULE.map((slot, idx) => {
                const isSelected = selectedScheduleSlot.time === slot.time;
                return (
                  <button
                    key={idx}
                    id={`schedule-slot-btn-${idx}`}
                    type="button"
                    onClick={() => setSelectedScheduleSlot(slot)}
                    class={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between font-mono ${
                      isSelected 
                        ? 'bg-[#101D34] border-[#D9B15D] text-white shadow-md shadow-[#D9B15D]/5' 
                        : 'bg-[#101D34]/30 border-white/5 text-[#93A4BC] hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <div class="flex items-center gap-3">
                      <span class={`text-[10px] ${isSelected ? 'text-[#D9B15D] font-bold' : ''}`}>{slot.time}</span>
                      <span class="text-xs font-bold text-white uppercase tracking-tight">{slot.title.substring(0,25)}...</span>
                    </div>
                    <ChevronRight class={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'translate-x-1.5 text-[#D9B15D]' : ''}`} />
                  </button>
                );
              })}
            </div>

            {/* Right hand dynamic card detail */}
            <div class="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedScheduleSlot.time}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  class="bg-[#101D34]/80 border border-[#D9B15D]/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
                >
                  <div class="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div>
                      <span class="text-[10px] font-mono text-[#D9B15D] uppercase font-bold px-2 py-0.5 rounded bg-[#D9B15D]/10">
                        {selectedScheduleSlot.period} ROUTINE
                      </span>
                      <h4 class="text-2xl font-black text-white font-display mt-2 uppercase">
                        {selectedScheduleSlot.title}
                      </h4>
                    </div>
                    <span class="text-lg font-mono font-bold text-[#D9B15D]">{selectedScheduleSlot.time}</span>
                  </div>

                  <p class="text-sm text-[#D8E3F2] leading-relaxed mb-6 font-sans">
                    {selectedScheduleSlot.description}
                  </p>

                  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 bg-[#07111F]/60 p-4 rounded-xl border border-white/5">
                    <div>
                      <span class="text-[8px] font-mono text-[#93A4BC] block">FACILITY UNIT</span>
                      <p class="text-xs text-white font-bold font-mono">IIT CAMPUS HUB</p>
                    </div>
                    <div>
                      <span class="text-[8px] font-mono text-[#93A4BC] block">ROUTINE TYPE</span>
                      <p class="text-xs text-white font-bold font-mono">MANDATORY ACTIVE</p>
                    </div>
                    <div class="col-span-2 md:col-span-1">
                      <span class="text-[8px] font-mono text-[#93A4BC] block">FELLOW SYMBOLS</span>
                      <p class="text-xs text-[#D9B15D] font-bold font-mono animate-pulse">✓ VERILOG CHECK OK</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10 — EXPLORE MADRAS GEOLOCATION BLUEPRINT MAP */}
      <section id="campus-blueprint-map" class="py-24 bg-[#0A1628] border-t border-white/5">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading
            badge="GEOLOCATION REGISTRY"
            title="Explore IIT Madras"
            subtitle="Browse key geographic milestones located across the forest sanctuary campus using our tech schematic registry."
          />
          <InteractiveMap />
        </div>
      </section>

      {/* SECTION 11 — APPLYING TO THE PROGRAMME */}
      <section id="applications-process" class="py-24 bg-[#07111F] border-t border-white/5">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading
            badge="ADMISSIONS SELECTION MATRIX"
            title="Applying To The Programme"
            subtitle="GSEP processes applications in seven rigorous steps, ensuring matching talent alignment for hardware research groups."
          />

          <div class="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
            <ApplicationStepCard
              stepNumber="01"
              title="Form Application Submission"
              timeframe="Late April 2026"
              description="Scholars fill out comprehensive engineering credentials, highlighting VLSI interests, digital circuit knowledge, and transcripts."
              statusText="COMPLETED"
              statusColor="completed"
            />
            <ApplicationStepCard
              stepNumber="02"
              title="Digital Screening Assess"
              timeframe="Early May 2026"
              description="Vite test sheets focusing on gates circuit arrays, digital systems pipelines registers, hazard bypass, and memory maps constraints."
              statusText="COMPLETED"
              statusColor="completed"
            />
            <ApplicationStepCard
              stepNumber="03"
              title="MNC Board Member Interview"
              timeframe="Mid May 2026"
              description="A 30-minute technical interrogation panel assessing motivation, design speed, and interest in microelectronic syntheses."
              statusText="ACTIVE SCREENING"
              statusColor="active"
            />
            <ApplicationStepCard
              stepNumber="04"
              title="Official Scholarship Offer award"
              timeframe="Late May 2026"
              description="Approved candidates receive formal agreement documentation highlighting full boarding and labor specifications."
              statusText="UPCOMING"
              statusColor="upcoming"
            />
            <ApplicationStepCard
              stepNumber="05"
              title="Visa permit registrations"
              timeframe="June 2026"
              description="Uploading e-Tourist credentials, processing passport biometrics, and printouting flight materials."
              statusText="UPCOMING"
              statusColor="upcoming"
            />
            <ApplicationStepCard
              stepNumber="06"
              title="KLIA boarding & Travel gate"
              timeframe="20 June 2026"
              description="Fellows join together at Kuala Lumpur International Airport for immediate group charters landing at Chennai Airport."
              statusText="UPCOMING"
              statusColor="upcoming"
            />
          </div>
        </div>
      </section>

      {/* SYSTEM FEEDBACK SECTION OR EMERGENCIES FOOTER HELP */}
      <section class="py-12 bg-[#0A1628] border-t border-white/5">
        <div class="max-w-7xl mx-auto px-4 md:px-6 text-center max-w-xl">
          <h4 class="text-xs font-mono font-bold text-[#D9B15D] uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <PhoneCall class="w-4 h-4 text-[#D9B15D]" /> GSEP FELLOW HOTLINE EMERGENCY INFO
          </h4>
          <p class="text-[11px] text-[#93A4BC] leading-relaxed mb-4">
            For visa delays or transit boarding problems, immediately contact GSEP Operations Centre at <strong>+60 12-345 6789</strong> or dial Chennai IIT Campus ward directly at <strong>+91 44 2257 8000</strong>.
          </p>
          <span class="text-[9px] font-mono bg-white/5 px-2.5 py-1 rounded border border-white/5 text-[#93A4BC]">SYS TIMEFRAME CLOCK OK — SECURE VERILOG SYSTEM ACTIVE</span>
        </div>
      </section>

      {/* PREMIUM CORPORATE FOOTER */}
      <footer class="bg-[#07111F] border-t border-white/8 py-12 text-[#93A4BC] text-xs font-mono">
        <div class="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded bg-[#101D34] flex items-center justify-center border border-[#D9B15D]/20">
              <span class="text-xs text-[#D9B15D] font-bold">G</span>
            </div>
            <div>
              <p class="text-white font-bold text-xs tracking-wider">GSEP RISC-V PROGRAMME</p>
              <p class="text-[10px] text-[#93A4BC]">Global Semiconductor Engineering Development Initiative</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-[11px]">
            <span class="hover:text-white cursor-pointer transition" onClick={() => scrollToSection('hero-block')}>Top Entry</span>
            <span class="hover:text-white cursor-pointer transition" onClick={() => scrollToSection('programme-overview')}>Curricular Details</span>
            <span class="hover:text-white cursor-pointer transition" onClick={() => scrollToSection('command-center-widget')}>Command Center Workspace</span>
          </div>

          <div class="text-center md:text-right text-[10px] text-zinc-500">
            <p>© 2026 GSEP Executive Board. Compiled for IIT Madras academic sync.</p>
            <p class="mt-1">Designed for elite digital IC design semiconductor placement.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
