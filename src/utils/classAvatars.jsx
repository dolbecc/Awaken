import React from 'react';

/**
 * Returns class identifier key based on level
 */
export const getClassKeyForLevel = (level) => {
  const lvl = Math.max(1, Number(level) || 1);

  if (lvl >= 100) return 'monarca';
  if (lvl >= 75) return 'lenda';
  if (lvl >= 60) return 'mestre';
  if (lvl >= 50) return 'cacador_a';
  if (lvl >= 40) return 'heroi';
  if (lvl >= 30) return 'veterano';
  if (lvl >= 20) return 'cavaleiro_real';
  if (lvl >= 15) return 'cavaleiro_elite';
  if (lvl >= 10) return 'guerreiro';
  if (lvl >= 5) return 'soldado';
  return 'recruta';
};

/**
 * High-definition Stylized Vector Avatars for each Rank in LOUD Neon Aesthetic
 */
export const ClassAvatar = ({ level = 1, className = "w-11 h-11" }) => {
  const classKey = getClassKeyForLevel(level);

  switch (classKey) {
    case 'monarca': // Nv 100+
      return (
        <svg viewBox="0 0 100 100" className={`${className} select-none rounded-lg overflow-hidden`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-monarca" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0B1A0E" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            <filter id="glow-monarca">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100" height="100" fill="url(#bg-monarca)" />
          {/* Cosmic Aura & Corona */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="#00FF11" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3"/>
          <path d="M 50 8 L 56 22 L 72 14 L 64 28 L 80 34 L 66 40 L 74 54 L 58 50 L 50 68 L 42 50 L 26 54 L 34 40 L 20 34 L 36 28 L 28 14 L 44 22 Z" fill="#00FF11" fillOpacity="0.12" />
          {/* Monarch Sharp Crown */}
          <path d="M 28 36 L 36 20 L 50 28 L 64 20 L 72 36 L 62 38 L 50 32 L 38 38 Z" fill="#00FF11" filter="url(#glow-monarca)" />
          {/* Helm & Faceplate */}
          <path d="M 32 42 L 50 36 L 68 42 L 64 70 L 50 86 L 36 70 Z" fill="#141414" stroke="#00FF11" strokeWidth="2.5" />
          {/* Piercing Emerald Eyes */}
          <polygon points="40,54 48,56 46,58 38,56" fill="#00FF11" filter="url(#glow-monarca)" />
          <polygon points="60,54 52,56 54,58 62,56" fill="#00FF11" filter="url(#glow-monarca)" />
          {/* Crown Jewel */}
          <polygon points="50,22 54,26 50,30 46,26" fill="#FFFFFF" />
          {/* Energy Core Mandible */}
          <path d="M 46 68 L 50 64 L 54 68 L 50 78 Z" fill="#00FF11" />
        </svg>
      );

    case 'lenda': // Nv 75-99
      return (
        <svg viewBox="0 0 100 100" className={`${className} select-none rounded-lg overflow-hidden`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-lenda" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#102014" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            <filter id="glow-lenda">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100" height="100" fill="url(#bg-lenda)" />
          {/* Energy Horns & Halo */}
          <path d="M 22 26 Q 36 12 44 26 L 40 34 Q 32 24 24 32 Z" fill="#00FF11" filter="url(#glow-lenda)" />
          <path d="M 78 26 Q 64 12 56 26 L 60 34 Q 68 24 76 32 Z" fill="#00FF11" filter="url(#glow-lenda)" />
          {/* Awakened Mask */}
          <path d="M 30 36 L 50 28 L 70 36 L 66 68 L 50 84 L 34 68 Z" fill="#141414" stroke="#00FF11" strokeWidth="2.5" />
          {/* Sharp Optics */}
          <path d="M 36 50 L 48 52 L 44 56 L 34 53 Z" fill="#00FF11" filter="url(#glow-lenda)" />
          <path d="M 64 50 L 52 52 L 56 56 L 66 53 Z" fill="#00FF11" filter="url(#glow-lenda)" />
          <polygon points="50,38 55,44 50,50 45,44" fill="#00FF11" />
        </svg>
      );

    case 'mestre': // Nv 60-74
      return (
        <svg viewBox="0 0 100 100" className={`${className} select-none rounded-lg overflow-hidden`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-mestre" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#141B16" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#bg-mestre)" />
          {/* S-Class Halo Ring */}
          <circle cx="50" cy="50" r="38" fill="none" stroke="#00FF11" strokeWidth="2" strokeDasharray="6 4" opacity="0.6"/>
          {/* Master Visor Hood */}
          <path d="M 26 38 L 50 18 L 74 38 L 68 76 L 50 86 L 32 76 Z" fill="#141414" stroke="#00FF11" strokeWidth="2" />
          {/* High-tech Quad-Optics */}
          <circle cx="42" cy="48" r="3" fill="#00FF11" />
          <circle cx="58" cy="48" r="3" fill="#00FF11" />
          <circle cx="38" cy="58" r="2.5" fill="#00FF11" />
          <circle cx="62" cy="58" r="2.5" fill="#00FF11" />
          <polygon points="50,62 55,68 50,74 45,68" fill="#00FF11" />
        </svg>
      );

    case 'cacador_a': // Nv 50-59
      return (
        <svg viewBox="0 0 100 100" className={`${className} select-none rounded-lg overflow-hidden`} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#0D120E" />
          {/* Shadow Hunter Hood */}
          <path d="M 24 40 L 50 20 L 76 40 L 70 78 L 50 88 L 30 78 Z" fill="#141414" stroke="#00FF11" strokeWidth="2" />
          {/* Slit Eyes */}
          <path d="M 34 50 L 46 53 L 42 56 L 32 52 Z" fill="#00FF11" />
          <path d="M 66 50 L 54 53 L 58 56 L 68 52 Z" fill="#00FF11" />
          <path d="M 44 66 L 50 62 L 56 66 L 50 72 Z" fill="#00FF11" />
        </svg>
      );

    case 'heroi': // Nv 40-49
      return (
        <svg viewBox="0 0 100 100" className={`${className} select-none rounded-lg overflow-hidden`} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#0A0E0B" />
          {/* Hero Plate */}
          <path d="M 28 32 L 50 22 L 72 32 L 66 72 L 50 84 L 34 72 Z" fill="#161616" stroke="#00FF11" strokeWidth="2" />
          {/* V-Shape Crest */}
          <path d="M 38 34 L 50 42 L 62 34 L 50 26 Z" fill="#00FF11" />
          {/* Visor */}
          <polygon points="36,52 64,52 60,60 40,60" fill="#00FF11" opacity="0.9" />
          <polygon points="50,68 54,72 50,76 46,72" fill="#00FF11" />
        </svg>
      );

    case 'veterano': // Nv 30-39
      return (
        <svg viewBox="0 0 100 100" className={`${className} select-none rounded-lg overflow-hidden`} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#0D0F0E" />
          {/* Veteran Cyber Mask */}
          <path d="M 30 32 L 50 24 L 70 32 L 66 72 L 50 82 L 34 72 Z" fill="#141414" stroke="#00FF11" strokeWidth="2" />
          {/* Left Cybernetic Eye */}
          <circle cx="42" cy="50" r="4.5" fill="#00FF11" />
          <circle cx="42" cy="50" r="2" fill="#FFFFFF" />
          {/* Right Scar Eye */}
          <path d="M 58 45 L 62 55" stroke="#00FF11" strokeWidth="2" strokeLinecap="round" />
          <path d="M 56 49 L 64 51" stroke="#00FF11" strokeWidth="2" strokeLinecap="round" />
          <path d="M 44 66 L 50 62 L 56 66 L 50 72 Z" fill="#00FF11" opacity="0.6"/>
        </svg>
      );

    case 'cavaleiro_real': // Nv 20-29
      return (
        <svg viewBox="0 0 100 100" className={`${className} select-none rounded-lg overflow-hidden`} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#0C100D" />
          {/* Royal Crown Crest */}
          <path d="M 34 26 L 42 16 L 50 24 L 58 16 L 66 26 L 50 28 Z" fill="#00FF11" />
          {/* Knight Greathelm */}
          <path d="M 30 32 L 50 24 L 70 32 L 66 74 L 50 84 L 34 74 Z" fill="#141414" stroke="#00FF11" strokeWidth="2" />
          {/* Cross Visor */}
          <path d="M 38 50 L 62 50" stroke="#00FF11" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 50 42 L 50 64" stroke="#00FF11" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'cavaleiro_elite': // Nv 15-19
      return (
        <svg viewBox="0 0 100 100" className={`${className} select-none rounded-lg overflow-hidden`} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#0A0D0B" />
          {/* Elite Plated Helmet */}
          <path d="M 32 30 L 50 20 L 68 30 L 64 74 L 50 84 L 36 74 Z" fill="#141414" stroke="#00FF11" strokeWidth="2" />
          {/* T-Visor */}
          <path d="M 38 48 L 62 48" stroke="#00FF11" strokeWidth="3" strokeLinecap="round" />
          <path d="M 50 48 L 50 66" stroke="#00FF11" strokeWidth="3" strokeLinecap="round" />
          <polygon points="50,26 54,32 50,38 46,32" fill="#00FF11" />
        </svg>
      );

    case 'guerreiro': // Nv 10-14
      return (
        <svg viewBox="0 0 100 100" className={`${className} select-none rounded-lg overflow-hidden`} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#0A0C0A" />
          {/* Warrior Mask */}
          <path d="M 32 30 L 50 22 L 68 30 L 64 72 L 50 82 L 36 72 Z" fill="#141414" stroke="#00FF11" strokeWidth="2" />
          {/* Dual Visor Slits */}
          <polygon points="38,48 48,50 46,54 36,52" fill="#00FF11" />
          <polygon points="62,48 52,50 54,54 64,52" fill="#00FF11" />
          <path d="M 44 64 L 50 60 L 56 64 L 50 70 Z" fill="#00FF11" opacity="0.8" />
        </svg>
      );

    case 'soldado': // Nv 5-9
      return (
        <svg viewBox="0 0 100 100" className={`${className} select-none rounded-lg overflow-hidden`} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#0A0C0A" />
          {/* Soldier Tactical Helmet */}
          <path d="M 32 30 L 50 24 L 68 30 L 64 72 L 50 80 L 36 72 Z" fill="#141414" stroke="#00FF11" strokeWidth="1.8" />
          {/* Goggles / Visor */}
          <rect x="38" y="46" width="24" height="8" rx="2" fill="#00FF11" opacity="0.9" />
          <path d="M 46 62 L 54 62" stroke="#00FF11" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'recruta': // Nv 1-4
    default:
      return (
        <svg viewBox="0 0 100 100" className={`${className} select-none rounded-lg overflow-hidden`} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#080A09" />
          {/* Recruit Hood / Cap */}
          <path d="M 34 32 L 50 24 L 66 32 L 62 70 L 50 78 L 38 70 Z" fill="#141414" stroke="#00FF11" strokeWidth="1.5" />
          {/* Simple Headset & Visor */}
          <rect x="40" y="48" width="20" height="6" rx="1.5" fill="#00FF11" />
          {/* Recruit Chevron Badge */}
          <path d="M 46 64 L 50 68 L 54 64" stroke="#00FF11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
  }
};
