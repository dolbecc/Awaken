import React from 'react';
import {
  Sunrise,
  Code2,
  Zap,
  Terminal,
  Globe,
  Shield,
  Target,
  Sword,
  Dumbbell,
  GraduationCap,
  Moon,
  Coffee,
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  BookOpen,
  Briefcase,
  Play,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  Award,
  Volume2,
  VolumeX,
  Compass,
  Laptop
} from 'lucide-react';

export const getQuestIcon = (iconName, className = "w-5 h-5") => {
  switch (iconName) {
    case 'Sunrise':
      return <Sunrise className={className} />;
    case 'Code2':
      return <Code2 className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Terminal':
      return <Terminal className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'Shield':
      return <Shield className={className} />;
    case 'Target':
      return <Target className={className} />;
    case 'Sword':
      return <Sword className={className} />;
    case 'Dumbbell':
      return <Dumbbell className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Moon':
      return <Moon className={className} />;
    case 'Coffee':
      return <Coffee className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Laptop':
      return <Laptop className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const AVAILABLE_ICONS = [
  'Sunrise', 'Code2', 'Zap', 'Terminal', 'Globe', 'Shield',
  'Target', 'Sword', 'Dumbbell', 'GraduationCap', 'Moon',
  'Coffee', 'Sparkles', 'Flame', 'BookOpen', 'Briefcase', 'Laptop'
];
