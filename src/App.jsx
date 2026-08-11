import React, { useState, useEffect, useMemo } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { CommandCenter } from './components/CommandCenter';
import { QuestList } from './components/QuestList';
import { QuestModal } from './components/QuestModal';
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

  // Auto-save to LocalStorage
  useEffect(() => {
    saveState(appState);
  }, [appState]);

  // Live timer interval (updates countdown each second)
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

  // Compute active quest and timing details
  const activeInfo = useMemo(() => {
    return getActiveQuestInfo(
      scheduleData.scheduledQuests,
      appState.completedQuestIds,
      nowMs
    );
  }, [scheduleData.scheduledQuests, appState.completedQuestIds, nowMs]);

  const isAllDone = appState.quests.length > 0 && appState.completedQuestIds.length === appState.quests.length;

  // Clock-in handler
  const handleClockIn = (startDate) => {
    setAppState(prev => ({
      ...prev,
      clockInTime: startDate ? startDate.toISOString() : new Date().toISOString(),
    }));
  };

  // Recalculate remaining schedule starting from now
  const handleRecalculateNow = () => {
    if (!appState.clockInTime) return;

    const completedQuests = appState.quests.filter(q => appState.completedQuestIds.includes(q.id));
    const completedMinutes = completedQuests.reduce((acc, q) => acc + (Number(q.duration) || 0), 0);

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
      const updatedCompleted = isAlreadyCompleted
        ? prev.completedQuestIds.filter(id => id !== questId)
        : [...prev.completedQuestIds, questId];

      return {
        ...prev,
        completedQuestIds: updatedCompleted,
      };
    });
  };

  // Complete Active Quest
  const handleCompleteActiveQuest = (questId) => {
    handleToggleComplete(questId);
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
    if (window.confirm('Excluir esta missão?')) {
      setAppState(prev => ({
        ...prev,
        quests: prev.quests.filter(q => q.id !== questId),
        completedQuestIds: prev.completedQuestIds.filter(id => id !== questId),
      }));
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Restaurar as 11 missões padrão?')) {
      setAppState(prev => ({
        ...prev,
        quests: DEFAULT_QUESTS,
        completedQuestIds: [],
        clockInTime: null,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col selection:bg-[#00FF11] selection:text-black">
      
      {/* Intro Splash Screen */}
      {showIntro && (
        <SplashScreen onFinish={() => setShowIntro(false)} />
      )}

      {/* Ultra Clean Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        
        {/* Command Center: Bater Ponto & Active Task Hero */}
        <CommandCenter
          isClockedIn={!!appState.clockInTime}
          clockInTime={appState.clockInTime}
          estimatedEndTime={scheduleData.estimatedEndTime}
          activeQuest={activeInfo.activeQuest}
          remainingSeconds={activeInfo.remainingSeconds}
          isOvertime={activeInfo.isOvertime}
          isAllDone={isAllDone}
          onClockIn={handleClockIn}
          onCompleteActiveQuest={handleCompleteActiveQuest}
          onRecalculateNow={handleRecalculateNow}
        />

        {/* Daily Quests List */}
        <QuestList
          quests={scheduleData.scheduledQuests}
          completedQuestIds={appState.completedQuestIds}
          activeQuestId={activeInfo.activeQuest ? activeInfo.activeQuest.id : null}
          isClockedIn={!!appState.clockInTime}
          remainingSeconds={activeInfo.remainingSeconds}
          onToggleComplete={handleToggleComplete}
          onEditQuest={(quest) => {
            setEditingQuest(quest);
            setIsModalOpen(true);
          }}
          onDeleteQuest={handleDeleteQuest}
          onOpenNewQuestModal={() => {
            setEditingQuest(null);
            setIsModalOpen(true);
          }}
          onResetDefaults={handleResetDefaults}
        />

      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-[#1A1A1A] py-6 px-4 text-center font-mono text-xs text-[#A0A0A0]">
        <span className="text-[#00FF11] font-bold">AWAKEN</span> • WAKE UP, BUILD, REPEAT.
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

    </div>
  );
}
