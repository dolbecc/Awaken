import React from 'react';
import {
  Check,
  Clock,
  Edit3,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Zap,
  CheckCircle2,
  Play
} from 'lucide-react';
import { getQuestIcon } from '../utils/iconMap';
import { formatMinutesToDisplay } from '../utils/timeEngine';
import { soundFx } from '../utils/soundFx';

export const QuestCard = ({
  quest,
  index,
  totalQuests,
  isCompleted,
  isActive,
  isClockedIn,
  onToggleComplete,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const handleToggle = () => {
    if (!isCompleted) {
      soundFx.playQuestComplete();
    } else {
      soundFx.playClick();
    }
    onToggleComplete(quest.id);
  };

  // Determine state style
  let containerClasses = "relative w-full rounded-xl transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between gap-3 ";
  
  if (isCompleted) {
    // 1. Estado: CONCLUÍDA
    containerClasses += "bg-slate-950/60 border border-emerald-500/30 opacity-75 hover:opacity-100 hover:border-emerald-500/60";
  } else if (isActive) {
    // 2. Estado: EM ANDAMENTO
    containerClasses += "bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-950/95 border-2 border-cyber-green shadow-neon-green transform scale-[1.01]";
  } else {
    // 3. Estado: PENDENTE
    containerClasses += "bg-slate-900/70 border border-slate-800/80 hover:border-cyber-purple/50 hover:bg-slate-900/90 hover:shadow-card-glow";
  }

  return (
    <div className={containerClasses}>
      {/* Top Row: Icon, Titles, Scheduled Time & Status Badge */}
      <div className="flex items-start justify-between gap-3">
        
        {/* Left: Checkbox + Quest info */}
        <div className="flex items-start gap-3 flex-1">
          {/* Custom Cyber Checkbox */}
          <button
            onClick={handleToggle}
            title={isCompleted ? "Marcar como pendente" : "Concluir missão (+XP)"}
            className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center transition-all flex-shrink-0 cursor-pointer ${
              isCompleted
                ? 'bg-cyber-green text-black border border-cyber-green shadow-[0_0_10px_rgba(0,255,157,0.7)]'
                : isActive
                ? 'bg-slate-950 border-2 border-cyber-green hover:bg-cyber-green/20 text-cyber-green'
                : 'bg-slate-950 border border-slate-700 hover:border-cyber-green text-transparent hover:text-slate-500'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
          </button>

          {/* Icon & Details */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {/* Quest Index Badge */}
              <span className="text-[10px] font-mono font-bold text-slate-500">
                #{String(index + 1).padStart(2, '0')}
              </span>

              {/* Status Badge */}
              {isCompleted ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                  <Check className="w-3 h-3 stroke-[3]" />
                  CONCLUÍDA
                </span>
              ) : isActive ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyber-green/20 text-cyber-green border border-cyber-green/60 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping"></span>
                  EM ANDAMENTO
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-950 text-slate-400 border border-slate-800">
                  PENDENTE
                </span>
              )}

              {/* Scheduled Time Window */}
              {isClockedIn && quest.formattedStart && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-950/80 text-cyber-cyan border border-slate-800">
                  <Clock className="w-3 h-3" />
                  {quest.formattedStart} - {quest.formattedEnd}
                </span>
              )}

              {/* Duration Badge */}
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800/60">
                ⏱ {formatMinutesToDisplay(quest.duration)}
              </span>

              {/* XP Badge */}
              <span className="text-[10px] font-mono font-bold text-cyber-purple bg-cyber-purple/10 px-2 py-0.5 rounded border border-cyber-purple/30">
                +{quest.xp || 100} XP
              </span>
            </div>

            {/* Title */}
            <h3 className={`font-orbitron font-bold text-base sm:text-lg transition-colors ${
              isCompleted
                ? 'line-through text-slate-400'
                : isActive
                ? 'text-white drop-shadow-[0_0_8px_rgba(0,255,157,0.4)]'
                : 'text-slate-100'
            }`}>
              {quest.title}
            </h3>

            {/* Subtitle / Description */}
            {quest.subtitle && (
              <p className={`mt-0.5 text-xs sm:text-sm font-chakra ${
                isCompleted ? 'text-slate-500' : 'text-slate-300'
              }`}>
                {quest.subtitle}
              </p>
            )}

            {/* Tags */}
            {quest.tags && quest.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {quest.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-1.5 py-0.2 text-[10px] font-mono text-slate-400 bg-slate-950/60 border border-slate-800 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Icon & Quick Actions */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className={`p-2 rounded-lg border ${
            isCompleted
              ? 'bg-slate-950 border-emerald-500/30 text-emerald-400'
              : isActive
              ? 'bg-slate-950 border-cyber-green text-cyber-green shadow-neon-green'
              : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {getQuestIcon(quest.icon, "w-5 h-5")}
          </div>
        </div>

      </div>

      {/* Bottom Action Controls: Reorder, Edit, Delete */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2 text-xs font-mono">
        {/* Reorder Buttons */}
        <div className="flex items-center gap-1 text-slate-500">
          <button
            onClick={() => {
              soundFx.playClick();
              onMoveUp(index);
            }}
            disabled={index === 0}
            title="Mover para cima"
            className="p-1 rounded hover:bg-slate-800 hover:text-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              onMoveDown(index);
            }}
            disabled={index === totalQuests - 1}
            title="Mover para baixo"
            className="p-1 rounded hover:bg-slate-800 hover:text-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] text-slate-500 ml-1">Posição {index + 1}</span>
        </div>

        {/* Edit & Delete Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundFx.playClick();
              onEdit(quest);
            }}
            title="Editar Missão (Duração, Nome, XP)"
            className="flex items-center gap-1 px-2 py-1 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-cyber-cyan border border-slate-800 hover:border-cyber-cyan/40 rounded transition-all"
          >
            <Edit3 className="w-3 h-3" />
            <span className="text-[11px]">Editar</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onDelete(quest.id);
            }}
            title="Excluir Missão"
            className="p-1 bg-slate-950 hover:bg-rose-950/80 text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 rounded transition-all"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
