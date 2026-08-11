import React, { useState, useEffect, useMemo } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { LevelBar } from './components/LevelBar';
import { Sidebar } from './components/Sidebar';
import { PersistentEmbers } from './components/PersistentEmbers';
import { CommandCenter } from './components/CommandCenter';
import { QuestList } from './components/QuestList';
import { QuestModal } from './components/QuestModal';
import { LessonDiary } from './components/LessonDiary';
import { DEFAULT_QUESTS } from './data/defaultQuests';
import { getInitialData, saveState, getTodayKey } from './utils/storage';
import { calculateSchedule, getActiveQuestInfo } from './utils/timeEngine';
import { getXpForQuest, processXpGain, processXpLoss, getTitleForLevel } from './utils/levelEngine';
import { soundFx } from './utils/soundFx';
import { Swords, BookOpen } from 'lucide-react';

const LESSONS_STORAGE_KEY = 'AWAKEN_LESSON_LOGS_V1';

const DEFAULT_LESSON_LOGS = [
  {
    id: 'log-default-1',
    category: 'programming',
    titleOrUrl: 'Python: List Comprehensions, Decorators e Clean Code',
    summary: 'Compreensões de lista tornam a transformação de dados concisa. Decorators permitem desacoplar responsabilidades como logging, cache e validações.',
    insights: 'Sempre utilizar functools.wraps para manter a assinatura original e docstrings das funções decoradas.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'log-default-2',
    category: 'english',
    titleOrUrl: 'Inglês: Phrasal Verbs no Ambiente Tech (ABC Fluent)',
    summary: 'Expressões frequentes em standups: "figure out" (resolver/entender), "roll out" (lançar funcionalidade), "break down" (dividir tarefas) e "follow up" (acompanhar).',
    insights: 'Praticar o shadowing repetindo as frases em voz alta para destravar a pronúncia natural.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  }
];

export default function App() {
  const [appState, setAppState] = useState(() => getInitialData());
  const [activeView, setActiveView] = useState('quests'); // 'quests' | 'diary'
  const [showIntro, setShowIntro] = useState(true);
  const [nowMs, setNowMs] = useState(Date.now());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState(null);
  const [isLeveledUpFlash, setIsLeveledUpFlash] = useState(false);

  // Lesson Logs State with LocalStorage
  const [lessonLogs, setLessonLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(LESSONS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      return DEFAULT_LESSON_LOGS;
    } catch (e) {
      console.error('Error loading lesson logs:', e);
      return DEFAULT_LESSON_LOGS;
    }
  });

  // Auto-save Lesson Logs
  useEffect(() => {
    try {
      localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(lessonLogs));
    } catch (e) {
      console.error('Error saving lesson logs:', e);
    }
  }, [lessonLogs]);

  // Auto-save App State to LocalStorage
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

  // Calculate real XP earned today
  const todayEarnedXp = useMemo(() => {
    return appState.quests
      .filter(q => appState.completedQuestIds.includes(q.id))
      .reduce((acc, q) => acc + getXpForQuest(q.duration), 0);
  }, [appState.quests, appState.completedQuestIds]);

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

  // Toggle Quest Completion with XP & Level Processing
  const handleToggleComplete = (questId) => {
    setAppState(prev => {
      const isAlreadyCompleted = prev.completedQuestIds.includes(questId);
      const quest = prev.quests.find(q => q.id === questId);
      const questDuration = quest ? quest.duration : 0;
      const xpValue = getXpForQuest(questDuration);
      const today = getTodayKey();

      let updatedCompleted = [];
      let newLevel = prev.playerLevel || 1;
      let newXp = prev.currentXp || 0;
      let newTitle = prev.playerTitle || getTitleForLevel(newLevel);
      let currentStreak = Math.max(0, Number(prev.streak) || 0);
      let lastCompletedDay = prev.lastCompletedStreakDay;

      if (isAlreadyCompleted) {
        // Uncompleting quest: subtract XP safely
        updatedCompleted = prev.completedQuestIds.filter(id => id !== questId);
        const result = processXpLoss(newLevel, newXp, xpValue);
        newLevel = result.level;
        newXp = result.xp;
        newTitle = result.title;
      } else {
        // Completing quest: add XP and evaluate level ups
        updatedCompleted = [...prev.completedQuestIds, questId];
        const result = processXpGain(newLevel, newXp, xpValue);
        newLevel = result.level;
        newXp = result.xp;
        newTitle = result.title;

        // Check if all quests completed today to increment streak
        if (updatedCompleted.length === prev.quests.length && prev.quests.length > 0) {
          if (lastCompletedDay !== today) {
            currentStreak += 1;
            lastCompletedDay = today;
          }
        }

        if (result.didLevelUp) {
          soundFx.playLevelUp();
          setIsLeveledUpFlash(true);
          setTimeout(() => {
            setIsLeveledUpFlash(false);
          }, 1500);
        }
      }

      return {
        ...prev,
        completedQuestIds: updatedCompleted,
        playerLevel: newLevel,
        currentXp: newXp,
        streak: currentStreak,
        lastCompletedStreakDay: lastCompletedDay,
        playerTitle: newTitle,
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
    if (window.confirm('Restaurar as 11 missões padrão e resetar progresso para o Nível 1?')) {
      setAppState(prev => ({
        ...prev,
        quests: DEFAULT_QUESTS,
        completedQuestIds: [],
        clockInTime: null,
        playerLevel: 1,
        currentXp: 0,
        streak: 0,
        lastCompletedStreakDay: null,
        playerTitle: getTitleForLevel(1),
      }));
    }
  };

  // Lesson Log Operations
  const handleAddLessonLog = (newLog) => {
    setLessonLogs(prev => [newLog, ...prev]);
  };

  const handleDeleteLessonLog = (logId) => {
    if (window.confirm('Excluir este registro do Diário de Aulas?')) {
      soundFx.playClick();
      setLessonLogs(prev => prev.filter(l => l.id !== logId));
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col selection:bg-[#00FF11] selection:text-black relative overflow-x-hidden">
      
      {/* Persistent Green Embers Canvas (Continuous Background FX) */}
      <PersistentEmbers />

      {/* Intro Splash Screen */}
      {showIntro && (
        <SplashScreen onFinish={() => setShowIntro(false)} />
      )}

      {/* Left Sidebar (Fixed for Desktop) */}
      <Sidebar
        playerLevel={appState.playerLevel || 1}
        completedCount={appState.completedQuestIds.length}
        totalCount={appState.quests.length}
        totalFocusedMinutes={scheduleData.totalMinutes}
        todayEarnedXp={todayEarnedXp}
        streak={appState.streak || 0}
        activeView={activeView}
        onViewChange={(view) => setActiveView(view)}
      />

      {/* Main App Content Area (Padded on Left to Accommodate Sidebar) */}
      <div className="flex-1 flex flex-col lg:pl-64 z-10 min-h-screen">
        
        {/* Fixed / Sticky Top HUD (Header + LevelBar with Backdrop Blur) */}
        <div className="sticky top-0 z-30 bg-[#000000]/95 backdrop-blur-md border-b border-[#1A1A1A] shadow-md">
          {/* Header */}
          <Header />

          {/* Minimalist Level & XP Progress Bar */}
          <LevelBar
            level={appState.playerLevel || 1}
            currentXp={appState.currentXp || 0}
            isLeveledUpFlash={isLeveledUpFlash}
          />

          {/* Mobile View Switcher (Visible on small screens where Sidebar is hidden) */}
          <div className="flex lg:hidden items-center justify-center gap-2 p-2 bg-[#0A0A0A] border-t border-[#1A1A1A]">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveView('quests');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                activeView === 'quests'
                  ? 'bg-[#1A1A1A] text-[#00FF11] border border-[#00FF11]/40'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Quests</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveView('diary');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                activeView === 'diary'
                  ? 'bg-[#1A1A1A] text-[#00FF11] border border-[#00FF11]/40'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Diário de Aulas</span>
            </button>
          </div>
        </div>

        {/* Content Container */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
          
          {/* View 1: Quests Diárias & Centro de Comando */}
          {activeView === 'quests' && (
            <>
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
            </>
          )}

          {/* View 2: Diário de Aulas (Knowledge Log) */}
          {activeView === 'diary' && (
            <LessonDiary
              logs={lessonLogs}
              onAddLog={handleAddLessonLog}
              onDeleteLog={handleDeleteLessonLog}
            />
          )}

        </main>

        {/* Minimal Footer */}
        <footer className="w-full border-t border-[#1A1A1A] py-6 px-4 text-center font-mono text-xs text-[#A0A0A0] bg-[#000000]">
          <span className="text-[#00FF11] font-bold">AWAKEN</span> • WAKE UP, BUILD, REPEAT.
        </footer>

      </div>

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
