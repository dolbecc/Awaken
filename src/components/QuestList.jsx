import React, { useState } from 'react';
import {
  ListFilter,
  Plus,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  Zap,
  Search
} from 'lucide-react';
import { QuestCard } from './QuestCard';
import { soundFx } from '../utils/soundFx';

export const QuestList = ({
  quests,
  completedQuestIds,
  activeQuestId,
  isClockedIn,
  onToggleComplete,
  onEditQuest,
  onDeleteQuest,
  onMoveUp,
  onMoveDown,
  onOpenNewQuestModal,
}) => {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'active', 'pending', 'completed'
  const [searchTerm, setSearchTerm] = useState('');

  const completedCount = quests.filter(q => completedQuestIds.includes(q.id)).length;
  const pendingCount = quests.length - completedCount;

  // Filtering logic
  const filteredQuests = quests.filter((quest) => {
    // Search filter
    const matchesSearch =
      quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quest.subtitle && quest.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (quest.tags && quest.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));

    if (!matchesSearch) return false;

    const isCompleted = completedQuestIds.includes(quest.id);
    const isActive = activeQuestId === quest.id;

    if (activeFilter === 'completed') return isCompleted;
    if (activeFilter === 'pending') return !isCompleted;
    if (activeFilter === 'active') return isActive;

    return true;
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl backdrop-blur-sm">
        
        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveFilter('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-cyber-green text-black shadow-neon-green font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Todas ({quests.length})
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveFilter('active');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap ${
              activeFilter === 'active'
                ? 'bg-cyber-cyan text-black shadow-neon-cyan font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Em Andamento ({activeQuestId ? 1 : 0})
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveFilter('pending');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap ${
              activeFilter === 'pending'
                ? 'bg-cyber-purple text-black font-bold shadow-neon-purple'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Pendentes ({pendingCount})
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveFilter('completed');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap ${
              activeFilter === 'completed'
                ? 'bg-emerald-500 text-black font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Concluídas ({completedCount})
          </button>
        </div>

        {/* Search input & Add button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar missão..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 text-white font-mono text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 focus:border-cyber-green outline-none"
            />
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenNewQuestModal();
            }}
            title="Adicionar nova missão à rotina"
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyber-green hover:text-white border border-slate-700 rounded-lg text-xs font-mono transition-all flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>

      </div>

      {/* Quests Grid / List */}
      {filteredQuests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filteredQuests.map((quest) => {
            const originalIndex = quests.findIndex(q => q.id === quest.id);
            const isCompleted = completedQuestIds.includes(quest.id);
            const isActive = activeQuestId === quest.id;

            return (
              <QuestCard
                key={quest.id}
                quest={quest}
                index={originalIndex}
                totalQuests={quests.length}
                isCompleted={isCompleted}
                isActive={isActive}
                isClockedIn={isClockedIn}
                onToggleComplete={onToggleComplete}
                onEdit={onEditQuest}
                onDelete={onDeleteQuest}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full py-12 px-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center flex flex-col items-center justify-center">
          <Sparkles className="w-8 h-8 text-slate-600 mb-2" />
          <h4 className="font-orbitron text-base text-slate-300 font-bold">Nenhuma missão encontrada</h4>
          <p className="text-xs font-mono text-slate-500 mt-1 max-w-sm">
            Nenhuma missão corresponde ao filtro selecionado. Ajuste os filtros ou crie uma nova quest.
          </p>
          <button
            onClick={onOpenNewQuestModal}
            className="mt-4 px-4 py-2 bg-cyber-green text-black font-semibold font-chakra text-xs rounded-lg shadow-neon-green"
          >
            + Criar Nova Missão
          </button>
        </div>
      )}
    </div>
  );
};
