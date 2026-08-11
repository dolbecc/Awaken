import React from 'react';
import {
  Swords,
  BookOpen,
  Scroll,
  Terminal,
  Flame,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';
import { AwakenFramedIcon } from './AwakenLogo';
import { formatMinutesToDisplay } from '../utils/timeEngine';
import { getTitleForLevel } from '../utils/levelEngine';
import { soundFx } from '../utils/soundFx';

export const Sidebar = ({
  playerLevel = 1,
  completedCount = 0,
  totalCount = 11,
  totalFocusedMinutes = 0,
  todayEarnedXp = 0,
  streak = 0,
  activeView = 'quests', // 'quests' | 'diary'
  onViewChange,
}) => {
  const playerTitle = getTitleForLevel(playerLevel);

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0A0A0A] border-r border-[#00FF11]/20 flex flex-col justify-between p-5 z-40 hidden lg:flex select-none">
      
      {/* Upper Area: Profile / Avatar & Navigation */}
      <div className="flex flex-col gap-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#1A1A1A]">
          <AwakenFramedIcon className="w-8 h-8" glow={true} />
          <div>
            <div className="text-sm font-black text-[#00FF11] tracking-wider font-mono leading-tight">
              AWAKEN<span className="text-white text-xs font-normal ml-1">OS</span>
            </div>
            <div className="text-[10px] text-[#A0A0A0] font-mono tracking-widest uppercase">
              TACTICAL DASHBOARD
            </div>
          </div>
        </div>

        {/* Profile / Hunter Identity Card */}
        <div className="p-3.5 bg-[#121212] border border-[#222222] rounded-xl flex items-center gap-3">
          {/* Avatar with Initials "IV" */}
          <div className="w-11 h-11 rounded-lg bg-[#1A1A1A] border border-[#00FF11]/40 flex items-center justify-center text-[#00FF11] font-black text-sm tracking-wider shadow-loud-glow-sm flex-shrink-0">
            IV
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white truncate">
                Ian Victor
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF11] animate-pulse"></span>
            </div>
            <div className="text-[11px] font-mono text-[#00FF11] font-semibold truncate">
              {playerTitle}
            </div>
            <div className="text-[10px] font-mono text-[#A0A0A0]">
              Nível {playerLevel}
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono font-bold text-[#A0A0A0] uppercase tracking-wider px-1">
            ESTATÍSTICAS DA OFENSIVA
          </span>

          <div className="grid grid-cols-2 gap-2">
            {/* Streak */}
            <div className="bg-[#121212] border border-[#1F1F1F] p-2.5 rounded-lg flex flex-col">
              <span className="text-[10px] font-mono text-[#A0A0A0] flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#00FF11]" />
                Ofensiva
              </span>
              <span className="text-sm font-black text-white font-mono mt-0.5">
                {streak} {streak === 1 ? 'Dia' : 'Dias'}
              </span>
            </div>

            {/* Quests Completed */}
            <div className="bg-[#121212] border border-[#1F1F1F] p-2.5 rounded-lg flex flex-col">
              <span className="text-[10px] font-mono text-[#A0A0A0] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#00FF11]" />
                Missões
              </span>
              <span className="text-sm font-black text-white font-mono mt-0.5">
                {completedCount} / {totalCount}
              </span>
            </div>

            {/* Total Focused Time */}
            <div className="bg-[#121212] border border-[#1F1F1F] p-2.5 rounded-lg flex flex-col">
              <span className="text-[10px] font-mono text-[#A0A0A0] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#00FF11]" />
                Carga Total
              </span>
              <span className="text-xs font-bold text-white font-mono mt-0.5 truncate">
                {formatMinutesToDisplay(totalFocusedMinutes)}
              </span>
            </div>

            {/* Real XP Today */}
            <div className="bg-[#121212] border border-[#1F1F1F] p-2.5 rounded-lg flex flex-col">
              <span className="text-[10px] font-mono text-[#A0A0A0] flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#00FF11]" />
                XP Hoje
              </span>
              <span className="text-sm font-black text-[#00FF11] font-mono mt-0.5">
                +{todayEarnedXp} XP
              </span>
            </div>
          </div>
        </div>

        {/* Navigation / System Commands */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono font-bold text-[#A0A0A0] uppercase tracking-wider px-1 mb-1">
            COMANDOS DO SISTEMA
          </span>

          {/* Button 1: Quests Diárias */}
          <button
            onClick={() => {
              soundFx.playClick();
              onViewChange('quests');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold font-mono text-left transition-all ${
              activeView === 'quests'
                ? 'bg-[#141414] border border-[#00FF11]/40 text-[#00FF11] shadow-loud-glow-sm'
                : 'bg-transparent hover:bg-[#141414] text-[#A0A0A0] hover:text-white border border-transparent'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>Quests Diárias</span>
          </button>

          {/* Button 2: Diário de Aulas */}
          <button
            onClick={() => {
              soundFx.playClick();
              onViewChange('diary');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold font-mono text-left transition-all ${
              activeView === 'diary'
                ? 'bg-[#141414] border border-[#00FF11]/40 text-[#00FF11] shadow-loud-glow-sm'
                : 'bg-transparent hover:bg-[#141414] text-[#A0A0A0] hover:text-white border border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Diário de Aulas</span>
          </button>
        </div>

      </div>

      {/* Footer Area */}
      <div className="pt-4 border-t border-[#1A1A1A] flex items-center justify-between text-[11px] font-mono text-[#A0A0A0]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF11] animate-ping"></span>
          <span>STATUS: ONLINE</span>
        </div>
        <span className="text-[#00FF11] font-bold">V2.4</span>
      </div>

    </aside>
  );
};
