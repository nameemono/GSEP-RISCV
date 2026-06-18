export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  category: 'daily' | 'monthly';
  dueDate?: string;
}

export interface Reflection {
  q1: string; // What did I learn today?
  q2: string; // Challenges faced / Blockers?
  q3: string; // What will I study tomorrow?
  timestamp: string;
}

export interface InterviewQuery {
  id: number;
  question: string;
  answer: string;
  status: 'LEARNED' | 'IN_PROGRESS' | 'NOT_STARTED';
  category: string;
}

export interface SuitcaseItem {
  id: string;
  name: string;
  weightKg: number;
  isRequired: boolean;
  isPacked: boolean;
  category: 'hand-carry' | 'checked-in' | 'documents';
  icon: string;
}

export interface TransitDocument {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  helpTip: string;
}

export interface MapPoint {
  id: string;
  name: string;
  coordinates: string;
  description: string;
  fullDetail: string;
  category: 'academic' | 'residential' | 'social' | 'heritage' | 'leisure';
  xPercent: number; // For position on blueprint map
  yPercent: number; // For position on blueprint map
  lat?: number;
  lng?: number;
}

export interface TimelineStep {
  id: number;
  title: string;
  timeframe: string;
  description: string;
  status: 'COMPLETED' | 'ACTIVE' | 'UPCOMING';
  details: string[];
}

export interface QuickFact {
  id: string;
  label: string;
  value: string;
  category: string;
  details: string;
  icon: string;
}

export interface ImageCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  size: 'large' | 'small-square' | 'wide' | 'tall';
}

export interface DaySchedule {
  time: string;
  title: string;
  description: string;
  period: 'MORNING' | 'AFTERNOON' | 'EVENING';
  iconName: string;
}
