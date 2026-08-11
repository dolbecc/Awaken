import React, { useState, useEffect, useMemo } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { SystemMessage } from './components/SystemMessage';
import { ClockInBanner } from './components/ClockInBanner';
import { ActiveQuestHero } from './components/ActiveQuestHero';
import { QuestList } from './components/QuestList';
import { QuestModal } from './components/QuestModal';
import { LevelUpModal } from './components/LevelUpModal';
import { DEFAULT_QUESTS } from './data/defaultQuests';
import { getInitialData, saveState } from './utils/storage';
import { calculateSchedule, getActiveQuestInfo } from './utils/timeEngine';
import { soundFx } from './utils/soundFx';

export default function App() {
  const [appState, setAppState] = useState(() => getInitialData());
  const [showIntro, setShowIntro] = useState(true);
  const [nowMs, setNowMs] = useState(Date.now());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState(null);
  const [isLevelUpOpen, setIsLevelUpOpen] = useState(false);

  // Sync sound setting to soundFx manager
  useEffect(() => {
    soundFx.setEnabled(appState.soundEnabled);
  }, [appState.soundEnabled]);

  // Persist state to localStorage
  useEffect(() => {
    saveState(appState);
  }, [appState]);

  // Live timer interval (ticks every second for countdown and current time)
  useEffect(() => {
    const timer = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute dynamic schedule
  const scheduleData = useMemo(() => {
    return calculateSchedule(appState.quests, appState.clockInTime);
  }, [appState.quests, appState.clockInTime]);

  // Compute active quest and progress info
  const activeInfo = useMemo(() => {
    return getActiveQuestInfo(
      scheduleData.scheduledQuests,
      appState.completedQuestIds,
      nowMs
    );
  }, [scheduleData.scheduledQuests, appState.completedQuestIds, nowMs]);

  // Total and earned XP
  const totalXp = useMemo(() => {
    return appState.quests.reduce((acc, q) => acc + (q.xp || 100), 0);
  }, [appState.quests]);

  const earnedXp = useMemo(() => {
    return appState.quests
      .filter(q => appState.completedQuestIds.includes(q.id))
      .reduce((acc, q) => acc + (q.xp || 100), 0);
  }, [appState.quests, appState.completedQuestIds]);

  const isAllDone = appState.quests.length > 0 && appState.completedQuestIds.length === appState.quests.length;

  // Clock-in handler
  const handleClockIn = (startDate) => {
    setAppState(prev => ({
      ...prev,
      clockInTime: startDate ? startDate.toISOString() : new Date().toISOString(),
    }));
  };

  // Recalculate remaining schedule starting right now
  const handleRecalculateNow = () => {
    if (!appState.clockInTime) return;

    // Calculate elapsed duration of already completed quests
    const completedQuests = appState.quests.filter(q => appState.completedQuestIds.includes(q.id));
    const completedMinutes = completedQuests.reduce((acc, q) => acc + (Number(q.duration) || 0), 0);

    // Set new clock-in time shifted so that the first uncompleted quest starts right now
    const newClockIn = new Date(Date.now() - (completedMinutes * 60 * 1000));

    setAppState(prev => ({
      ...prev,
      clockInTime: newClockIn.toISOString(),
    }));
  };

  // Toggle Quest Completion
  const handleToggleComplete = (questId) => {
    setAppState(prev => {
      const isAlreadyCompleted = prev.completedQuestIds.includes(questId);
      let updatedCompleted = [];

      if (isAlreadyCompleted) {
        updatedCompleted = prev.completedQuestIds.filter(id => id !== questId);
      } else {
        updatedCompleted = [...prev.completedQuestIds, questId];
      }

      // Check if all quests completed
      const willBeAllDone = updatedCompleted.length === prev.quests.length && prev.quests.length > 0;
      
      let updatedLevel = prev.playerLevel || 12;
      let updatedRank = prev.playerRank || 'Rank B - Caçador Desperto';

      if (willBeAllDone && !prev.hasLeveledUpToday) {
        setIsLevelUpOpen(true);
        updatedLevel += 1;
        if (updatedLevel >= 15) {
          updatedRank = 'Rank S - Monarca das Sombras';
        } else if (updatedLevel >= 13) {
          updatedRank = 'Rank A - Mestre da Execução';
        }
      }

      return {
        ...prev,
        completedQuestIds: updatedCompleted,
        hasLeveledUpToday: willBeAllDone ? true : prev.hasLeveledUpToday,
        playerLevel: updatedLevel,
        playerRank: updatedRank,
      };
    });
  };

  // Complete active quest and shift next ones to start right now
  const handleCompleteAndRecalculate = (questId) => {
    handleToggleComplete(questId);
    setTimeout(() => {
      handleRecalculateNow();
    }, 50);
  };

  // Quest CRUD Operations
  const handleSaveQuest = (questData) => {
    setAppState(prev => {
      const existingIdx = prev.quests.findIndex(q => q.id === questData.id);
      let updatedQuests = [];
      if (existingIdx >= 0) {
        updatedQuests = [...prev.quests];
        updatedQuests[existingIdx] = questData;
      } else {
        updatedQuests = [...prev.quests, questData];
      }
      return {
        ...prev,
        quests: updatedQuests,
      };
    });
  };

  const handleDeleteQuest = (questId) => {
    if (window.confirm('Deseja realmente remover esta missão do Sistema?')) {
      setAppState(prev => ({
        ...prev,
        quests: prev.quests.filter(q => q.id !== questId),
        completedQuestIds: prev.completedQuestIds.filter(id => id !== questId),
      }));
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    setAppState(prev => {
      const newQuests = [...prev.quests];
      const temp = newQuests[index - 1];
      newQuests[index - 1] = newQuests[index];
      newQuests[index] = temp;
      return { ...prev, quests: newQuests };
    });
  };

  const handleMoveDown = (index) => {
    setAppState(prev => {
      if (index >= prev.quests.length - 1) return prev;
      const newQuests = [...prev.quests];
      const temp = newQuests[index + 1];
      newQuests[index + 1] = newQuests[index];
      newQuests[index] = temp;
      return { ...prev, quests: newQuests };
    });
  };

  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar a rotina original com as 12 missões padrão?')) {
      setAppState(prev => ({
        ...prev,
        quests: DEFAULT_QUESTS,
        completedQuestIds: [],
        clockInTime: null,
      }));
    }
  };

  const handleToggleSound = () => {
    setAppState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col selection:bg-cyber-green selection:text-black">
      
      {/* Intro Splash Screen */}
      {showIntro && (
        <SplashScreen onFinish={() => setShowIntro(false)} />
      )}

      {/* Top Header & HUD */}
      <Header
        streak={appState.streak || 3}
        totalXp={totalXp}
        earnedXp={earnedXp}
        completedCount={appState.completedQuestIds.length}
        totalCount={appState.quests.length}
        soundEnabled={appState.soundEnabled}
        onToggleSound={handleToggleSound}
        onReplayIntro={() => setShowIntro(true)}
        onOpenNewQuestModal={() => {
          setEditingQuest(null);
          setIsModalOpen(true);
        }}
        onResetDefaults={handleResetDefaults}
        playerRank={appState.playerRank || 'Rank B - Caçador Desperto'}
        playerLevel={appState.playerLevel || 12}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        
        {/* System Message / Boss Directive */}
        <SystemMessage
          activeQuestCategory={activeInfo.activeQuest ? activeInfo.activeQuest.category : null}
          isClockedIn={!!appState.clockInTime}
          isAllDone={isAllDone}
        />

        {/* Clock In Banner / HUD */}
        <ClockInBanner
          isClockedIn={!!appState.clockInTime}
          clockInTime={appState.clockInTime}
          onClockIn={handleClockIn}
          onRecalculateNow={handleRecalculateNow}
          totalRoutineMinutes={scheduleData.totalMinutes}
          estimatedEndTime={scheduleData.estimatedEndTime}
        />

        {/* Active Quest Hero Timer */}
        {appState.clockInTime && (
          <ActiveQuestHero
            activeQuest={activeInfo.activeQuest}
            nextQuest={activeInfo.nextQuest}
            remainingSeconds={activeInfo.remainingSeconds}
            progressPercent={activeInfo.progressPercent}
            isOvertime={activeInfo.isOvertime}
            isAllDone={activeInfo.isAllDone}
            onCompleteQuest={handleToggleComplete}
            onCompleteAndRecalculate={handleCompleteAndRecalculate}
            isClockedIn={!!appState.clockInTime}
            onStartSystemNow={() => handleClockIn(new Date())}
          />
        )}

        {/* Quests Section Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-green"></span>
            <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl tracking-wide text-white">
              ROTINA DE MISSÕES DIÁRIAS
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {appState.quests.length} Missões Registradas
          </span>
        </div>

        {/* Quests List with Filter Tabs & CRUD */}
        <QuestList
          quests={scheduleData.scheduledQuests}
          completedQuestIds={appState.completedQuestIds}
          activeQuestId={activeInfo.activeQuest ? activeInfo.activeQuest.id : null}
          isClockedIn={!!appState.clockInTime}
          onToggleComplete={handleToggleComplete}
          onEditQuest={(quest) => {
            setEditingQuest(quest);
            setIsModalOpen(true);
          }}
          onDeleteQuest={handleDeleteQuest}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onOpenNewQuestModal={() => {
            setEditingQuest(null);
            setIsModalOpen(true);
          }}
        />

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 bg-[#06070a] py-6 px-4 text-center font-mono text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-cyber-green font-bold font-orbitron">AWAKEN: SYSTEM</span>
            <span>• Wake up, build, repeat.</span>
          </div>
          <div>
            Desenvolvido para Máxima Eficiência & Foco Absoluto ⚡
          </div>
        </div>
      </footer>

      {/* CRUD Quest Modal */}
      <QuestModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingQuest(null);
        }}
        onSave={handleSaveQuest}
        editingQuest={editingQuest}
      />

      {/* Daily Level Up Modal */}
      <LevelUpModal
        isOpen={isLevelUpOpen}
        onClose={() => setIsLevelUpOpen(false)}
        playerLevel={appState.playerLevel || 12}
        playerRank={appState.playerRank || 'Rank B - Caçador Desperto'}
        earnedXp={earnedXp}
        streak={appState.streak || 3}
      />

    </div>
  );
}
