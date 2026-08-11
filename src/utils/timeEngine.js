// Awaken Dynamic Time Engine

/**
 * Format a Date object to "HH:MM" (24h)
 */
export const formatTime = (date) => {
  if (!date) return '--:--';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '--:--';
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Format seconds into MM:SS or HH:MM:SS
 */
export const formatSecondsToMMSS = (totalSeconds) => {
  if (totalSeconds <= 0) return '00:00';
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  const mm = String(mins).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');

  if (hrs > 0) {
    const hh = String(hrs).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
};

/**
 * Format minutes into readable Portuguese duration: "2h 30min" or "45min"
 */
export const formatMinutesToDisplay = (minutes) => {
  if (!minutes || minutes <= 0) return '0 min';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0 && mins > 0) return `${hrs}h ${mins}min`;
  if (hrs > 0) return `${hrs}h`;
  return `${mins} min`;
};

/**
 * Calculates start and end times for all quests in sequence based on clock-in time.
 */
export const calculateSchedule = (quests, clockInTime) => {
  if (!clockInTime || !quests || quests.length === 0) {
    return {
      scheduledQuests: quests.map(q => ({
        ...q,
        startMs: null,
        endMs: null,
        formattedStart: '--:--',
        formattedEnd: '--:--',
      })),
      totalMinutes: quests.reduce((acc, q) => acc + (q.duration || 0), 0),
      estimatedEndTime: null,
    };
  }

  const startDate = new Date(clockInTime);
  let currentCursor = new Date(startDate.getTime());

  const scheduledQuests = quests.map((quest) => {
    const startMs = currentCursor.getTime();
    const durationMs = (Number(quest.duration) || 0) * 60 * 1000;
    const endMs = startMs + durationMs;

    const questWithTimes = {
      ...quest,
      startMs,
      endMs,
      formattedStart: formatTime(currentCursor),
      formattedEnd: formatTime(new Date(endMs)),
    };

    currentCursor = new Date(endMs);
    return questWithTimes;
  });

  const totalMinutes = quests.reduce((acc, q) => acc + (Number(q.duration) || 0), 0);

  return {
    scheduledQuests,
    totalMinutes,
    estimatedEndTime: formatTime(currentCursor),
    finalEndMs: currentCursor.getTime(),
  };
};

/**
 * Determine the current active quest and timing details
 */
export const getActiveQuestInfo = (scheduledQuests, completedIds = [], nowMs = Date.now()) => {
  if (!scheduledQuests || scheduledQuests.length === 0) {
    return { activeQuest: null, nextQuest: null, remainingSeconds: 0, progressPercent: 0, isOvertime: false };
  }

  // Filter uncompleted quests
  const uncompleted = scheduledQuests.filter(q => !completedIds.includes(q.id));
  
  if (uncompleted.length === 0) {
    return { activeQuest: null, nextQuest: null, remainingSeconds: 0, progressPercent: 100, isAllDone: true };
  }

  // 1. Is there an uncompleted quest whose scheduled window covers now?
  let activeQuest = uncompleted.find(q => q.startMs && q.endMs && nowMs >= q.startMs && nowMs < q.endMs);

  // 2. If not strictly in window, pick the earliest uncompleted quest
  if (!activeQuest) {
    activeQuest = uncompleted[0];
  }

  // Find next quest
  const activeIdx = scheduledQuests.findIndex(q => q.id === activeQuest.id);
  const nextQuest = scheduledQuests.slice(activeIdx + 1).find(q => !completedIds.includes(q.id)) || null;

  let remainingSeconds = 0;
  let progressPercent = 0;
  let isOvertime = false;

  if (activeQuest.startMs && activeQuest.endMs) {
    const totalMs = activeQuest.endMs - activeQuest.startMs;
    const elapsedMs = nowMs - activeQuest.startMs;

    if (nowMs >= activeQuest.endMs) {
      // Overtime
      remainingSeconds = 0;
      progressPercent = 100;
      isOvertime = true;
    } else if (nowMs < activeQuest.startMs) {
      // Not yet started
      remainingSeconds = Math.floor(totalMs / 1000);
      progressPercent = 0;
    } else {
      // Currently in progress
      remainingSeconds = Math.max(0, Math.floor((activeQuest.endMs - nowMs) / 1000));
      progressPercent = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
    }
  }

  return {
    activeQuest,
    nextQuest,
    remainingSeconds,
    progressPercent,
    isOvertime,
    isAllDone: false,
  };
};
