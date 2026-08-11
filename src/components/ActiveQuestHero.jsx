import React from 'react';
import {
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
  AlertCircle,
  RotateCcw,
  Check
} from 'lucide-react';
import { getQuestIcon } from '../utils/iconMap';
import { formatSecondsToMMSS, formatMinutesToDisplay } from '../utils/timeEngine';
import { soundFx } from '../utils/soundFx';

export const ActiveQuestHero = ({
  activeQuest,
  nextQuest,
  remainingSeconds,
  progressPercent,
  isOvertime,
  isAllDone,
  onCompleteQuest,
  onCompleteAndRecalculate,
  isClockedIn,
  onStartSystemNow,
}) => {
  // If all quests are completed
  if (isAllDone) {
    return (
      <div className="relative w-full rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-purple-950/80 border-2 border-cyber-green p-6 sm:p-8 shadow-neon-green text-center overflow-hidden animate-pulse-glow">
        <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-cyber-green/20 border-2 border-cyber-green flex items-center justify-center text-cyber-green mb-4 shadow-[0_0_25px_rgba(0,255,157,0.6)]">
            <Trophy className="w-8 h-8 animate-bounce" />
          </div>

          <span className="text-xs font-mono font-bold tracking-widest text-cyber-green uppercase">
            PROTOCOLO DIÁRIO FINALIZADO COM SUCESSO
          </span>

          <h2 className="mt-1 font-orbitron text-2xl sm:text-4xl font-black text-white">
            TODAS AS MISSÕES CUMPRIDAS!
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-300 font-chakra">
            Você atingiu 100% de XP diário. O Sistema registrou seu progresso e sua evolução como Caçador continua amanhã.
          </p>
        </div>
      </div>
    );
  }

  // If not yet clocked in
  if (!isClockedIn) {
    return null; // The ClockInBanner handles this state
  }

  // If no active quest found
  if (!activeQuest) {
    return null;
  }

  const handleComplete = () => {
    soundFx.playQuestComplete();
    onCompleteQuest(activeQuest.id);
  };

  const handleCompleteAndRecalc = () => {
    soundFx.playQuestComplete();
    onCompleteAndRecalculate(activeQuest.id);
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950/95 border-2 border-cyber-green p-6 sm:p-8 shadow-neon-green overflow-hidden">
      {/* Background Holographic Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyber-cyan/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Info: Quest Details */}
        <div className="flex-1 max-w-2xl">
          {/* Status Badge & Time Window */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyber-green/15 border border-cyber-green/50 rounded-full text-cyber-green text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,157,0.3)]">
              <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping"></span>
              MISSÃO ATIVA AGORA
            </span>

            <span className="px-2.5 py-1 bg-slate-950/80 border border-slate-800 rounded text-xs font-mono text-cyber-cyan">
              ⏰ {activeQuest.formattedStart} → {activeQuest.formattedEnd} ({formatMinutesToDisplay(activeQuest.duration)})
            </span>

            <span className="px-2.5 py-1 bg-cyber-purple/15 border border-cyber-purple/40 rounded text-xs font-mono text-cyber-purple font-semibold">
              +{activeQuest.xp || 100} XP
            </span>
          </div>

          {/* Title & Subtitle with Icon */}
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-cyber-green/40 text-cyber-green shadow-neon-green flex-shrink-0">
              {getQuestIcon(activeQuest.icon, "w-8 h-8")}
            </div>
            <div>
              <h2 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide leading-tight">
                {activeQuest.title}
              </h2>
              <p className="mt-1 text-sm sm:text-base text-slate-300 font-chakra font-medium">
                {activeQuest.subtitle || 'Execute esta missão com foco absoluto.'}
              </p>
            </div>
          </div>

          {/* Tags */}
          {activeQuest.tags && activeQuest.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {activeQuest.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-slate-950/80 border border-slate-800 text-slate-400 rounded text-[11px] font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Next Quest Preview */}
          {nextQuest && (
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-slate-500">Próxima missão:</span>
              <strong className="text-slate-200">{nextQuest.title}</strong>
              <span className="text-cyber-cyan font-semibold">às {nextQuest.formattedStart}</span>
            </div>
          )}
        </div>

        {/* Right Info: Live Countdown Timer & Actions */}
        <div className="flex flex-col items-center lg:items-end justify-center gap-4 flex-shrink-0">
          
          {/* Live Countdown Display */}
          <div className="w-full sm:w-72 bg-slate-950/90 border border-cyber-green/40 p-4 rounded-xl shadow-inner text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              <Clock className="w-3.5 h-3.5 text-cyber-green" />
              <span>TEMPO RESTANTE</span>
            </div>

            <div className={`font-orbitron text-4xl sm:text-5xl font-black tracking-wider ${
              isOvertime ? 'text-rose-500 animate-pulse' : 'text-cyber-green drop-shadow-[0_0_15px_rgba(0,255,157,0.6)]'
            }`}>
              {formatSecondsToMMSS(remainingSeconds)}
            </div>

            {isOvertime && (
              <div className="mt-1 text-[11px] font-mono text-rose-400 flex items-center justify-center gap-1 font-semibold">
                <AlertCircle className="w-3 h-3" />
                Tempo previsto excedido! Conclua ou recalcule.
              </div>
            )}

            {/* Linear Progress Bar */}
            <div className="mt-3 w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyber-green via-cyber-cyan to-cyber-purple transition-all duration-1000 ease-linear rounded-full shadow-[0_0_8px_rgba(0,255,157,0.8)]"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-2">
            {/* Primary Complete Button */}
            <button
              onClick={handleComplete}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-cyber-green via-emerald-400 to-cyber-cyan hover:from-emerald-300 hover:to-cyber-green text-black font-extrabold font-orbitron text-sm rounded-xl shadow-neon-green transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>CONCLUIR MISSÃO (+{activeQuest.xp || 100} XP)</span>
            </button>

            {/* Recalculate and Complete Button */}
            <button
              onClick={handleCompleteAndRecalc}
              title="Concluir esta missão agora e adiantar todas as próximas a partir deste instante"
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyber-green border border-slate-700/60 hover:border-cyber-green/40 font-mono text-xs rounded-lg transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Concluir e Recalcular Próximas</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
