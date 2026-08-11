import { DEFAULT_QUESTS } from '../data/defaultQuests';

const STORAGE_KEY = 'AWAKEN_SYSTEM_DATA_V2';

export const getTodayKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getInitialData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    
    const parsed = JSON.parse(raw);
    const today = getTodayKey();

    // Check if it's a new day to reset daily progress cleanly while maintaining streak & customized quests
    if (parsed.currentDayKey !== today) {
      // Calculate streak continuation
      let updatedStreak = parsed.streak || 1;
      const yesterday = new Date(Date.now() - 86400000);
      const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
      
      // If user had activity yesterday, streak continues, else if they missed more than 1 day reset to 1
      if (parsed.lastActiveDay && parsed.lastActiveDay !== yesterdayKey && parsed.lastActiveDay !== today) {
        updatedStreak = 1;
      }

      return {
        ...parsed,
        currentDayKey: today,
        clockInTime: null,
        completedQuestIds: [],
        hasLeveledUpToday: false,
        streak: updatedStreak,
        quests: parsed.quests && parsed.quests.length > 0 ? parsed.quests : DEFAULT_QUESTS,
      };
    }

    return {
      ...getDefaultState(),
      ...parsed,
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
    streak: 3, // Initial boost for immediate gamification feel
    lastActiveDay: today,
    soundEnabled: true,
    hasSeenIntro: false,
    hasLeveledUpToday: false,
    playerLevel: 12,
    playerRank: 'Rank B - Caçador Desperto',
  };
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
};
