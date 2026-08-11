import React from 'react';
import { Check, Edit3, Trash2, Clock } from 'lucide-react';
import { formatMinutesToDisplay, formatSecondsToMMSS } from '../utils/timeEngine';
import { soundFx } from '../utils/soundFx';

export const QuestCard = ({
  quest,
  index,
  isCompleted,
  isActive,
  isClockedIn,
  remainingSeconds,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const handleToggle = () => {
    if (!isCompleted) {
      soundFx.playQuestComplete();
    } else {
      soundFx.playClick();
    }
    onToggleComplete(quest.id);
  };

  return (
    <div
      className={`w-full rounded-xl p-4 sm:p-5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isActive
          ? 'bg-[#1A1A1A] border-2 border-[#00FF11] shadow-loud-glow-sm'
          : isCompleted
          ? 'bg-[#141414] border border-[#222222] opacity-50'
          : 'bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#444444]'
      }`}
    >
      {/* Left Column: Checkbox + Titles */}
      <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
        {/* LOUD Check Button */}
        <button
          onClick={handleToggle}
          title={isCompleted ? "Marcar como pendente" : "Concluir missão"}
          className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
            isCompleted
              ? 'bg-[#00FF11] text-black border border-[#00FF11]'
              : isActive
              ? 'bg-[#111111] border-2 border-[#00FF11] text-[#00FF11] hover:bg-[#00FF11]/20'
              : 'bg-[#111111] border border-[#333333] hover:border-[#00FF11] text-transparent'
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </button>

        {/* Quest Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#A0A0A0]">
              #{String(index + 1).padStart(2, '0')}
            </span>
            {isActive && (
              <span className="text-[10px] font-mono font-bold text-[#00FF11] uppercase tracking-wider px-1.5 py-0.2 bg-[#00FF11]/10 rounded border border-[#00FF11]/30">
                EM ANDAMENTO
              </span>
            )}
            {isCompleted && (
              <span className="text-[10px] font-mono text-[#A0A0A0] uppercase">
                CONCLUÍDA
              </span>
            )}
          </div>

          <h3
            className={`text-base sm:text-lg font-bold truncate mt-0.5 ${
              isCompleted
                ? 'line-through text-[#666666]'
                : 'text-[#FFFFFF]'
            }`}
          >
            {quest.title}
          </h3>

          {quest.subtitle && (
            <p className="text-xs sm:text-sm text-[#A0A0A0] truncate mt-0.5">
              {quest.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Column: Time & Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#2A2A2A]">
        
        {/* Timing Information */}
        <div className="text-left sm:text-right font-mono">
          {isActive && isClockedIn ? (
            <div className="text-base sm:text-lg font-black text-[#00FF11]">
              {formatSecondsToMMSS(remainingSeconds)}
            </div>
          ) : (
            <div className="text-xs sm:text-sm font-bold text-[#00FF11]">
              {isClockedIn && quest.formattedStart ? (
                <span>{quest.formattedStart} - {quest.formattedEnd}</span>
              ) : (
                <span>{formatMinutesToDisplay(quest.duration)}</span>
              )}
            </div>
          )}
          <div className="text-[11px] text-[#A0A0A0]">
            {formatMinutesToDisplay(quest.duration)}
          </div>
        </div>

        {/* Edit & Delete Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundFx.playClick();
              onEdit(quest);
            }}
            title="Editar Missão"
            className="p-2 bg-[#111111] hover:bg-[#222222] text-[#00FF11] border border-[#2A2A2A] hover:border-[#00FF11] rounded-lg transition-all"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onDelete(quest.id);
            }}
            title="Excluir Missão"
            className="p-2 bg-[#111111] hover:bg-[#222222] text-[#A0A0A0] hover:text-red-400 border border-[#2A2A2A] rounded-lg transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
