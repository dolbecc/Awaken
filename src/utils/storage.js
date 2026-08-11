import { DEFAULT_QUESTS } from '../data/defaultQuests';
import { getTitleForLevel } from './levelEngine';

const STORAGE_KEY = 'AWAKEN_LOUD_SYSTEM_STATE_V2';
const RESET_FLAG = 'AWAKEN_RESET_STREAK_TO_0_V2';

export const getTodayKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getInitialData = () => {
  try {
    // Clean reset to initialize streak at 0 and level at 1
    if (!localStorage.getItem(RESET_FLAG)) {
      localStorage.clear();
      localStorage.setItem(RESET_FLAG, 'true');
      const freshState = getDefaultState();
      saveState(freshState);
      return freshState;
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    
    const parsed = JSON.parse(raw);
    const today = getTodayKey();

    let currentLevel = Math.max(1, Number(parsed.playerLevel) || 1);
    let currentXp = Math.max(0, Number(parsed.currentXp) || 0);
    let currentStreak = Math.max(0, Number(parsed.streak) || 0);

    // New day reset
    if (parsed.currentDayKey !== today) {
      return {
        ...parsed,
        currentDayKey: today,
        clockInTime: null,
        completedQuestIds: [],
        playerLevel: currentLevel,
        currentXp: currentXp,
        streak: currentStreak,
        playerTitle: getTitleForLevel(currentLevel),
        quests: parsed.quests && parsed.quests.length > 0 ? parsed.quests : DEFAULT_QUESTS,
      };
    }

    return {
      ...getDefaultState(),
      ...parsed,
      playerLevel: currentLevel,
      currentXp: currentXp,
      streak: currentStreak,
      playerTitle: getTitleForLevel(currentLevel),
      quests: parsed.quests && parsed.quests.length > 0 ? parsed.quests : DEFAULT_QUESTS,
    };
  } catch (err) {
    console.error('Error reading localStorage:', err);
    return getDefaultState();
  }
};

export const getDefaultState = () => {
  const today = getTodayKey();
  return {
    currentDayKey: today,
    quests: DEFAULT_QUESTS,
    clockInTime: null,
    completedQuestIds: [],
    playerLevel: 1,
    currentXp: 0,
    streak: 0, // Starts at 0 real offensive days
    lastCompletedStreakDay: null,
    playerTitle: getTitleForLevel(1), // "Recruta do Sistema"
  };
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
};
