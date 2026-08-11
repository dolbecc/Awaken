import React from 'react';
import { Plus, RotateCcw } from 'lucide-react';
import { QuestCard } from './QuestCard';
import { soundFx } from '../utils/soundFx';

export const QuestList = ({
  quests,
  completedQuestIds,
  activeQuestId,
  isClockedIn,
  remainingSeconds,
  onToggleComplete,
  onEditQuest,
  onDeleteQuest,
  onOpenNewQuestModal,
  onResetDefaults,
}) => {
  const completedCount = quests.filter(q => completedQuestIds.includes(q.id)).length;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Section Header Row */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-black text-[#00FF11] uppercase tracking-tight">
            MISSÕES DO DIA
          </h2>
          <span className="text-xs font-mono text-[#A0A0A0] bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#2A2A2A]">
            {completedCount} / {quests.length}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playClick();
              onResetDefaults();
            }}
            title="Restaurar as 11 missões padrão"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#222222] text-[#A0A0A0] hover:text-white border border-[#2A2A2A] rounded-lg text-xs font-mono transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Padrão</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenNewQuestModal();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#00FF11] hover:bg-[#00CC0E] text-[#000000] font-bold text-xs uppercase tracking-wider rounded-lg shadow-loud-glow-sm transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Nova Missão</span>
          </button>
        </div>
      </div>

      {/* Quests Cards List */}
      <div className="flex flex-col gap-2.5">
        {quests.map((quest, index) => {
          const isCompleted = completedQuestIds.includes(quest.id);
          const isActive = activeQuestId === quest.id;

          return (
            <QuestCard
              key={quest.id}
              quest={quest}
              index={index}
              isCompleted={isCompleted}
              isActive={isActive}
              isClockedIn={isClockedIn}
              remainingSeconds={isActive ? remainingSeconds : 0}
              onToggleComplete={onToggleComplete}
              onEdit={onEditQuest}
              onDelete={onDeleteQuest}
            />
          );
        })}
      </div>
    </div>
  );
};
