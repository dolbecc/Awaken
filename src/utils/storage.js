import { DEFAULT_QUESTS } from '../data/defaultQuests';
import { getTitleForLevel } from './levelEngine';

const STORAGE_KEY = 'AWAKEN_SYSTEM_DATA_LOUD_V1';

export const getTodayKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getInitialData = () => {
  try {
    // Clear old legacy test keys from previous versions
    localStorage.removeItem('AWAKEN_SYSTEM_DATA_V1');
    localStorage.removeItem('AWAKEN_SYSTEM_DATA_V2');
    localStorage.removeItem('AWAKEN_SYSTEM_DATA_V3');

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    
    const parsed = JSON.parse(raw);
    const today = getTodayKey();

    const currentLevel = Math.max(1, Number(parsed.playerLevel) || 1);
    const currentXp = Math.max(0, Number(parsed.currentXp) || 0);

    // New day reset
    if (parsed.currentDayKey !== today) {
      return {
        ...parsed,
        currentDayKey: today,
        clockInTime: null,
        completedQuestIds: [],
        playerLevel: currentLevel,
        currentXp: currentXp,
        playerTitle: getTitleForLevel(currentLevel),
        quests: parsed.quests && parsed.quests.length > 0 ? parsed.quests : DEFAULT_QUESTS,
      };
    }

    return {
      ...getDefaultState(),
      ...parsed,
      playerLevel: currentLevel,
      currentXp: currentXp,
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
