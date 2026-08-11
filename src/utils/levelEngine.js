// Awaken Leveling & XP Engine (Hardcore RPG Curve)

/**
 * 1 minute of focused routine = 1 XP
 * (e.g. 30 min = +30 XP, 90 min = +90 XP, 120 min = +120 XP)
 */
export const getXpForQuest = (durationInMinutes) => {
  const duration = Number(durationInMinutes) || 0;
  return Math.max(5, Math.round(duration * 1));
};

/**
 * Hardcore RPG Level Curve:
 * Nível 1: 2.500 XP (~3 dias de rotina completa sem falhas)
 * Nível 2: 5.000 XP (~6 dias)
 * Nível 3: 7.500 XP (~9 dias)
 * Nível 5: 12.500 XP (~15 dias / Soldado em Ascensão)
 * Nível 10: 25.000 XP (~1 mês / Guerreiro Focado)
 * Nível 20: 50.000 XP (~2 meses / Cavaleiro Real)
 * Nível 50: 125.000 XP (~5 meses / Caçador de Elite)
 * Nível 100: 250.000 XP (~1 ano+ / Monarca)
 */
export const getXpRequiredForLevel = (level) => {
  const lvl = Math.max(1, Number(level) || 1);
  return lvl * 2500;
};

export const getTitleForLevel = (level) => {
  const lvl = Math.max(1, Number(level) || 1);

  if (lvl >= 100) return 'Monarca';
  if (lvl >= 75) return 'Lenda Desperta';
  if (lvl >= 60) return 'Mestre do Sistema (Classe S)';
  if (lvl >= 50) return 'Caçador de Elite (Classe A)';
  if (lvl >= 40) return 'Herói da Rotina';
  if (lvl >= 30) return 'Aventureiro Veterano';
  if (lvl >= 20) return 'Cavaleiro Real';
  if (lvl >= 15) return 'Cavaleiro de Elite';
  if (lvl >= 10) return 'Guerreiro Focado';
  if (lvl >= 5) return 'Soldado em Ascensão';
  return 'Recruta do Sistema';
};

/**
 * Adds XP and computes potential Level Up(s)
 */
export const processXpGain = (currentLevel, currentXp, xpToAdd) => {
  let level = Math.max(1, Number(currentLevel) || 1);
  let xp = Math.max(0, Number(currentXp) || 0) + Number(xpToAdd || 0);
  let didLevelUp = false;
  let levelsGained = 0;

  while (xp >= getXpRequiredForLevel(level)) {
    const required = getXpRequiredForLevel(level);
    xp -= required;
    level += 1;
    didLevelUp = true;
    levelsGained += 1;
  }

  return {
    level,
    xp,
    didLevelUp,
    levelsGained,
    title: getTitleForLevel(level),
  };
};

/**
 * Removes XP if a quest is unchecked
 */
export const processXpLoss = (currentLevel, currentXp, xpToRemove) => {
  let level = Math.max(1, Number(currentLevel) || 1);
  let xp = Math.max(0, Number(currentXp) || 0) - Number(xpToRemove || 0);

  while (xp < 0 && level > 1) {
    level -= 1;
    const required = getXpRequiredForLevel(level);
    xp += required;
  }

  if (xp < 0) {
    xp = 0;
  }

  return {
    level,
    xp,
    title: getTitleForLevel(level),
  };
};
