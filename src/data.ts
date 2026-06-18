import { 
  Milestone, 
  InterviewQuery, 
  SuitcaseItem, 
  TransitDocument, 
  MapPoint, 
  TimelineStep, 
  QuickFact, 
  ImageCard, 
  DaySchedule 
} from './types';

export const INITIAL_MILESTONES: Milestone[] = [
  { id: 'm1', title: 'Revise Verilog blocking vs non-blocking assignments', completed: true, category: 'daily', dueDate: 'Today' },
  { id: 'm2', title: 'Complete logic gate layout check in Cadence', completed: false, category: 'daily', dueDate: 'Today' },
  { id: 'm3', title: 'Set up local open-source RISC-V toolchain with gcc compile checks', completed: false, category: 'daily', dueDate: 'Tomorrow' },
  { id: 'm4', title: 'Achieve stable RTL simulation with zero timing critical path alerts', completed: false, category: 'monthly', dueDate: '30 June 2026' },
  { id: 'm5', title: 'Consolidate 5 critical pipeline stage diagrams for final lab reviews', completed: true, category: 'monthly', dueDate: '15 July 2026' }
];

export const INITIAL_INTERVIEW_QUERIES: InterviewQuery[] = [
  {
    id: 45,
    question: "What is RTL?",
    answer: "Register-Transfer Level is a design abstraction used in hardware description languages (HDLs) like Verilog/VHDL to describe circuits as registers, signals, and Boolean hardware loops.",
    status: 'LEARNED',
    category: 'Digital Design'
  },
  {
    id: 62,
    question: "What is STA?",
    answer: "Static Timing Analysis is a method of validating the timing performance of a digital circuit by checking all paths for setup and hold timing violations without dynamic signal simulations.",
    status: 'IN_PROGRESS',
    category: 'Verification'
  },
  {
    id: 65,
    question: "What is pipelining?",
    answer: "A CPU design technique where multiple instructions overlap in execution, dividing instructions into sequential stages (Fetch, Decode, Execute, Memory, Write-back) to maximize clock dispatch rates.",
    status: 'NOT_STARTED',
    category: 'Architecture'
  }
];

export const TRANSIT_CHECKLIST: TransitDocument[] = [
  { id: 'tc1', name: 'Passport (6+ months validity)', description: 'Double check booklet expiration date. Must be valid at least through March 2027.', completed: true, helpTip: 'Keep physical copies and scan a backup to cloud' },
  { id: 'tc2', name: 'India Visa (e-Tourist Visa)', description: 'Print out 2 copies of your electronic visa approval. Immigration officer will review and stamp it.', completed: true, helpTip: 'Make sure biographical details match passport EXACTLY' },
  { id: 'tc3', name: 'ASEM / GSEP Offer Letter', description: 'Bring your official printed and digital offer letters. Crucial for customs verification checkpoints.', completed: true, helpTip: 'Letter certifies scholarship and lodging at IIT Madras' },
  { id: 'tc4', name: 'Laptop & Charger (Pro workstation)', description: 'Essential for Verilog, RTL compiler tasks, and FPGA emulation boards.', completed: true, helpTip: 'Pack charger in carry-on as baggage weight permits' },
  { id: 'tc5', name: 'Power Bank (<20,000mAh)', description: 'Required for device backups on long transfers. Must keep strictly in hand-carry luggage.', completed: false, helpTip: 'Checked baggage will reject lithium batteries above limits' },
  { id: 'tc6', name: 'Personal Medicines (With Prescriptions)', description: 'Keep a 5-week supply of your personal prescription drug tablets with official labels.', completed: false, helpTip: 'Airport security requires doctor prescriptions for liquid meds' },
  { id: 'tc7', name: 'Universal Travel Adapter', description: 'Supports standard Indian Type D and Type M pins for laptop and mobile plug-ins.', completed: true, helpTip: 'Adapts standard flat pins to heavy-duty round pins' },
  { id: 'tc8', name: 'Mobile eSIM / International Roaming', description: 'Prepare international data setup (Airtel/Jio tourist setup) for immediate transit alerts.', completed: false, helpTip: 'You can buy local SIM at Chennai airport with passport copies' },
  { id: 'tc9', name: 'Cash in Rupees (INR)', description: 'Recommended 5,000 to 10,000 Rupees in cash for small auto-rickshaw fares or local cafes.', completed: false, helpTip: 'Larger merchant outlets accept Visa/Mastercard credit chips' }
];

export const PACKING_ITEMS: SuitcaseItem[] = [
  { id: 'p1', name: 'OFFICIAL PASSPORT', weightKg: 0.1, isRequired: true, isPacked: false, category: 'documents', icon: '🛂' },
  { id: 'p2', name: 'PRO INTEL LAPTOP', weightKg: 2.2, isRequired: true, isPacked: false, category: 'hand-carry', icon: '💻' },
  { id: 'p3', name: 'LI-ION POWER BANK', weightKg: 0.4, isRequired: true, isPacked: false, category: 'hand-carry', icon: '🔋' },
  { id: 'p4', name: 'GSEP OFFER LETTER', weightKg: 0.1, isRequired: true, isPacked: false, category: 'documents', icon: '📄' },
  { id: 'p5', name: 'UNIVERSAL ADAPTER', weightKg: 0.2, isRequired: true, isPacked: false, category: 'hand-carry', icon: '🔌' },
  { id: 'p6', name: 'TRAVEL TOILETRIES KIT', weightKg: 0.6, isRequired: false, isPacked: false, category: 'checked-in', icon: '🧴' },
  { id: 'p7', name: 'PRESCRIPTION MEDICINE', weightKg: 0.3, isRequired: false, isPacked: false, category: 'hand-carry', icon: '💊' },
  { id: 'p8', name: 'ENGINEERING NOTEBOOK', weightKg: 0.4, isRequired: false, isPacked: false, category: 'checked-in', icon: '📓' },
  { id: 'p9', name: 'SANDALS & COMBO APPAREL', weightKg: 1.8, isRequired: false, isPacked: false, category: 'checked-in', icon: '👕' }
];

export const CHENNAI_GALLERY: ImageCard[] = [
  {
    id: "g1",
    title: "Marina Beach Sunset",
    subtitle: "Coastal Landmarks",
    description: "The second longest natural urban beach in the world, defining Chennai's beautiful scenic coastline.",
    imageUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=800&q=80",
    size: "large"
  },
  {
    id: "g2",
    title: "South Indian Cuisine",
    subtitle: "Culinary Legacy",
    description: "Gourmet delights consisting of Crispy Ghee Dosas and steaming Idlis paired with rich Madras Filter Coffee.",
    imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    size: "tall"
  },
  {
    id: "g3",
    title: "IIT Madras Research Park",
    subtitle: "Innovation Nexus",
    description: "India's premier state-of-the-art industry-academia base containing leading VLSI foundries and scientific teams.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    size: "wide"
  },
  {
    id: "g4",
    title: "Modern Chennai Skyline",
    subtitle: "Metropolitan Progress",
    description: "A fast-growing technological master hub blending ancient monument architecture with massive high-tech zones.",
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    size: "small-square"
  }
];

export const CHENNAI_FACTS: QuickFact[] = [
  { id: 'f1', label: 'AVERAGE TEMPERATURE', value: '32°C - Coastal Warmth', category: 'climate', details: 'Tropical wet-and-dry climate tempered by cooling maritime breezes in late evening hours.', icon: '🌡️' },
  { id: 'f2', label: 'LANGUAGES SPOKEN', value: 'Tamil & English', category: 'language', details: 'Tamil is national & official; English is universally matching for technical instructions, retail, and hospitality.', icon: '🗣️' },
  { id: 'f3', label: 'CURRENCY TYPE', value: 'Indian Rupee (INR - ₹)', category: 'currency', details: 'Rupee notes are essential. Recommend digital credit cards or international debit cards alongside.', icon: '💸' },
  { id: 'f4', label: 'TIME ZONE', value: 'IST (UTC+5:30)', category: 'time', details: '2 hours 30 minutes behind Malaysian Standard Time (MYT). Double check team calendar synchs.', icon: '🕒' },
  { id: 'f5', label: 'RECOMMENDED SIM', value: 'Airtel / Jio Tourist', category: 'telecom', details: 'Airtel offers top coverage on campus grounds. Tourist SIMs require passport and copy of boarding pass.', icon: '📱' },
  { id: 'f6', label: 'TRANSIT & RIDES', value: 'Ola Cabs, Uber, Rapido', category: 'transit', details: 'Pre-book rides via apps for safe fixed rates; auto-rickshaws are plentiful for short-distance trips around IIT.', icon: '🛺' },
  { id: 'f7', label: 'MUST-TRY GOURMET', value: 'Dosa & Filter Coffee', category: 'food', details: 'Unbelievable ghee-infused roast dosas and high-froth strong filter coffee from local mess and Saravana Bhavan.', icon: '☕' },
  { id: 'f8', label: 'HEALTHCARE SUPPORT', value: 'IITM Campus Hospital', category: 'health', details: '24/7 on-campus medical center with pharmacy services, ambulance, and full expert doctor roster.', icon: '🏥' }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 1,
    title: "Selection",
    timeframe: "April - May 2026",
    description: "Rigorous academic filter evaluating digital electronics logic, aptitude, and problem-solving passion.",
    status: 'COMPLETED',
    details: ["Aptitude screening", "Micro-interview assessments", "Academic record filter"]
  },
  {
    id: 2,
    title: "Offer Letter",
    timeframe: "Late May 2026",
    description: "Official awarding of the prestigious GSEP semiconductor scholarship fellowship sponsored for IIT Madras placement.",
    status: 'COMPLETED',
    details: ["Hostel reservations", "Scholarship award details", "Agreement checklists signed"]
  },
  {
    id: 3,
    title: "Visa Process",
    timeframe: "June 2026",
    description: "Compiling of official travel forms, biometric registrations, and prompt processing of India e-Tourist permits.",
    status: 'ACTIVE',
    details: ["Documentation compilation", "e-Visa submission", "Double-copy printouts prepared"]
  },
  {
    id: 4,
    title: "Chennai Travel",
    timeframe: "20 June 2026",
    description: "Departure briefing matching standard flights. Landing safely at Chennai International Airport (MAA).",
    status: 'UPCOMING',
    details: ["KLIA group departure", "Group shuttle directly to IIT Madras", "Hostel check-in & ID induction"]
  },
  {
    id: 5,
    title: "Training",
    timeframe: "Late June - July 2026",
    description: "A 5-week hyper-focused residency at leading IIT Madras VLSI and RISC-V labs, including SHAKTI core simulations.",
    status: 'UPCOMING',
    details: ["RISC-V hardware mapping", "Physical digital board lab routines", "Semiconductor compiler tools training"]
  },
  {
    id: 6,
    title: "Internship",
    timeframe: "Aug - Dec 2026",
    description: "Placement within semiconductor MNC alliances, working on commercial-grade RTL layout verification and FPGA emulation.",
    status: 'UPCOMING',
    details: ["Mentorship by VLSI architects", "Commercial grade project cycles", "Hands-on chip layout drills"]
  },
  {
    id: 7,
    title: "Employment",
    timeframe: "Jan 2027 onwards",
    description: "Transitioning directly as fully integrated Semiconductor RTL/Verification designers within the Malaysian engineering ecosystem.",
    status: 'UPCOMING',
    details: ["Direct engineer placement", "Ecosystem talent leadership", "Advanced hardware core contribution"]
  }
];

export const CAMPUS_MAP_SPOTS: MapPoint[] = [
  {
    id: "m_iitm",
    name: "IIT MADRAS MAIN CAMPUS",
    coordinates: "12.9917° N | 80.2337° E",
    description: "The premier engineering institute, hosting advanced research frameworks amidst beautiful lush forests.",
    fullDetail: "A serene 617-acre sanctuary home to rare wildlife like blackbucks, spotted deer, and pristine local foliage, creating an inspiring environment for engineers.",
    category: "heritage",
    xPercent: 50,
    yPercent: 50,
    lat: 12.9917,
    lng: 80.2337
  },
  {
    id: "m_shakti",
    name: "SHAKTI MICROPROCESSOR LABS",
    coordinates: "12.9912° N | 80.2307° E",
    description: "The birthplace of India's first indigenous RISC-V processor models, engineered entirely by local research groups.",
    fullDetail: "GSEP fellows obtain hands-on privileges here to run syntheses and explore hardware architectures on actual ARM and Shakti microprocessor models.",
    category: "academic",
    xPercent: 40,
    yPercent: 40,
    lat: 12.9912,
    lng: 80.2307
  },
  {
    id: "m_research_park",
    name: "IIT RESEARCH PARK",
    coordinates: "12.9863° N | 80.2425° E",
    description: "Asia's top technology park bridging academic research and corporate innovation with state-of-the-art incubation hubs.",
    fullDetail: "Collaborative tech park facilitating groundbreaking work in electronics, deep tech, and microchips validation.",
    category: "academic",
    xPercent: 60,
    yPercent: 70,
    lat: 12.9863,
    lng: 80.2425
  },
  {
    id: "m_marina_beach",
    name: "MARINA BEACH",
    coordinates: "13.0405° N | 80.2810° E",
    description: "The iconic, longest natural urban beach in the country, bounding Chennai's coastal skyline.",
    fullDetail: "Located a short drive from the IITM campus, offering a breezy seaside getaway after rigorous software tape-out sessions.",
    category: "social",
    xPercent: 85,
    yPercent: 20,
    lat: 13.0405,
    lng: 80.2810
  },
  {
    id: "m_phoenix_mall",
    name: "PHOENIX MARKETCITY",
    coordinates: "12.9847° N | 80.2202° E",
    description: "A premier modern lifestyle center and shopping hub situated close to the campus.",
    fullDetail: "Features modern dining, cinema screens, and retail spaces-perfect for GSEP fellows to unwind on weekends.",
    category: "social",
    xPercent: 20,
    yPercent: 80,
    lat: 12.9847,
    lng: 80.2202
  }
];

export const PROGRAM_TIMING_SCHEDULE: DaySchedule[] = [
  {
    time: "07:30 AM",
    title: "MORNING FUEL & COFFEE",
    description: "Aromatic breakfast meals featuring South Indian specialties at Himalaya Complex, centering steaming idlis, coconut chutney, and piping-hot tea.",
    period: "MORNING",
    iconName: "Breakfast"
  },
  {
    time: "09:00 AM",
    title: "ADVANCED CPU ARCHITECTURE LECTURES",
    description: "Intimate and intensive theory instruction on RISC-V pipelined registers, bypassing networks, and memory alignment bounds.",
    period: "MORNING",
    iconName: "Lecture"
  },
  {
    time: "02:00 PM",
    title: "SEMICONDUCTOR COMPILATION & HDL LABS",
    description: "Take command of physical workstations executing FPGA synthesis, Verilog debugging files, and timing delay analysis.",
    period: "AFTERNOON",
    iconName: "Lab"
  },
  {
    time: "04:30 PM",
    title: "FORESTRY STROLLS & CAMPUS NETWORKING",
    description: "Dynamic group code reviews, custom instruction sets testing runs, and cooperative debugging sessions.",
    period: "AFTERNOON",
    iconName: "Colleague"
  },
  {
    time: "07:30 PM",
    title: "SELF-GUIDED SYNTHESES DRILLS",
    description: "Diverge into individual research projects, study Assembly code structures, and compile hardware logs.",
    period: "EVENING",
    iconName: "Study"
  },
  {
    time: "09:30 PM",
    title: "RELAXATION & CAMPUS NETWORKING",
    description: "Decompress with GSEP colleagues walking along shaded forestry walkways under active streetlamp rows.",
    period: "EVENING",
    iconName: "Sleep"
  }
];
