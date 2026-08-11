import React, { useState, useEffect } from 'react';
import {
  Flame,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Plus,
  Award,
  Clock,
  Sparkles,
  Shield,
  Zap,
  Activity
} from 'lucide-react';
import { soundFx } from '../utils/soundFx';

export const Header = ({
  streak,
  totalXp,
  earnedXp,
  completedCount,
  totalCount,
  soundEnabled,
  onToggleSound,
  onReplayIntro,
  onOpenNewQuestModal,
  onResetDefaults,
  playerRank,
  playerLevel,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const xpPercent = totalXp > 0 ? Math.min(100, Math.round((earnedXp / totalXp) * 100)) : 0;

  const formattedHours = String(currentTime.getHours()).padStart(2, '0');
  const formattedMinutes = String(currentTime.getMinutes()).padStart(2, '0');
  const formattedSeconds = String(currentTime.getSeconds()).padStart(2, '0');

  const formattedDate = currentTime.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  return (
    <header className="relative z-20 w-full border-b border-cyber-border bg-[#0b0e14]/85 backdrop-blur-md sticky top-0 shadow-lg">
      {/* Top Ambient Glow Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyber-green via-cyber-purple to-cyber-cyan opacity-80"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Upper Row: Title, Live Clock, Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo / System Title */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-slate-900 border border-cyber-green/40 shadow-neon-green">
              <Zap className="w-5 h-5 text-cyber-green animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyber-green animate-ping"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-orbitron font-extrabold text-xl sm:text-2xl tracking-wider text-white">
                  AWAKEN<span className="text-cyber-green">:</span><span className="text-xs sm:text-sm font-mono text-cyber-purple ml-1 font-normal">SYSTEM</span>
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-cyber-green/10 text-cyber-green border border-cyber-green/30 rounded">
                  ONLINE v2.4
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                DAILY QUESTS & DYNAMIC TIME ENGINE
              </p>
            </div>
          </div>

          {/* Center Info: Live Clock & Streak */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Live Clock HUD */}
            <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-md font-mono">
              <Clock className="w-4 h-4 text-cyber-cyan animate-pulse" />
              <div className="text-right">
                <div className="text-sm sm:text-base font-bold text-cyber-cyan tracking-widest font-orbitron">
                  {formattedHours}:{formattedMinutes}:{formattedSeconds}
                </div>
                <div className="text-[9px] text-slate-500 uppercase tracking-tight">
                  {formattedDate}
                </div>
              </div>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-2 bg-slate-950/70 border border-amber-500/30 px-3 py-1.5 rounded-md shadow-[0_0_10px_rgba(245,158,11,0.15)]">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-bounce" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-amber-400 font-orbitron">
                  {streak} DIAS
                </div>
                <div className="text-[9px] text-slate-400 uppercase font-mono tracking-tight">
                  DESPERTO 🔥
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                soundFx.playClick();
              }}
              title={soundEnabled ? "Desativar Efeitos Sonoros" : "Ativar Efeitos Sonoros"}
              className={`p-2 rounded-lg border text-xs font-mono transition-all flex items-center justify-center ${
                soundEnabled
                  ? 'bg-cyber-green/10 text-cyber-green border-cyber-green/40 hover:bg-cyber-green/20'
                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Replay Intro */}
            <button
              onClick={() => {
                soundFx.playClick();
                onReplayIntro();
              }}
              title="Rever Tela de Introdução (Awaken)"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyber-purple border border-slate-800 hover:border-cyber-purple/40 rounded-lg transition-all"
            >
              <Play className="w-4 h-4" />
            </button>

            {/* Reset Routine Defaults */}
            <button
              onClick={() => {
                soundFx.playClick();
                onResetDefaults();
              }}
              title="Restaurar Rotina Padrão (12 Missões)"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 hover:border-amber-500/40 rounded-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Add New Quest Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenNewQuestModal();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyber-green to-emerald-500 hover:from-emerald-400 hover:to-cyber-green text-black font-semibold font-chakra text-xs sm:text-sm rounded-lg shadow-neon-green transition-all transform hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Nova Missão</span>
            </button>
          </div>
        </div>

        {/* Lower Row: Player Status, XP Bar, Level Progress */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          {/* Player Rank & Level Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-cyber-purple/15 border border-cyber-purple/40 rounded text-cyber-purple font-chakra text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>NÍVEL {playerLevel}</span>
            </div>
            <div className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyber-cyan" />
              <span className="font-semibold text-white">{playerRank}</span>
            </div>
          </div>

          {/* XP Progress Bar Section */}
          <div className="w-full sm:w-auto flex-1 max-w-xl flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyber-green" />
                <span className="text-cyber-green font-semibold">XP DIÁRIO:</span> {earnedXp} / {totalXp} XP
              </span>
              <span className="text-slate-400">
                Missões: <strong className="text-white">{completedCount}</strong>/{totalCount} (<span className="text-cyber-purple font-bold font-orbitron">{xpPercent}%</span>)
              </span>
            </div>

            {/* Glowing Neon XP Bar */}
            <div className="relative w-full h-3 bg-slate-950 border border-slate-700/80 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-cyber-green via-cyber-cyan to-cyber-purple rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(0,255,157,0.7)]"
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
