import React, { useEffect, useState } from 'react';
import { getXpRequiredForLevel, getTitleForLevel } from '../utils/levelEngine';

export const LevelBar = ({ level = 1, currentXp = 0, isLeveledUpFlash = false }) => {
  const xpRequired = getXpRequiredForLevel(level);
  const title = getTitleForLevel(level);
  const progressPercent = Math.min(100, Math.max(0, (currentXp / xpRequired) * 100));

  return (
    <div className="w-full bg-[#000000] border-b border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        
        {/* Left Side: Level & Evolutive Title */}
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm whitespace-nowrap">
          <span className="text-[#00FF11] font-bold tracking-wider">
            NÍVEL {level}
          </span>
          <span className="text-[#444444]">//</span>
          <span className="text-[#FFFFFF] font-semibold tracking-wide">
            {title}
          </span>
        </div>

        {/* Right Side: Thin Minimal Linear Bar & Numbers */}
        <div className="flex items-center gap-3 flex-1 sm:max-w-md">
          {/* 4px thin linear progress bar */}
          <div className="relative flex-1 h-1 sm:h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
            <div
              className={`h-full bg-[#00FF11] rounded-full transition-all duration-500 ease-out ${
                isLeveledUpFlash
                  ? 'animate-pulse shadow-[0_0_15px_#00FF11]'
                  : 'shadow-[0_0_6px_rgba(0,255,17,0.6)]'
              }`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* XP Progress Values */}
          <div className="font-mono text-[11px] text-[#A0A0A0] flex-shrink-0 tracking-tight">
            <span className="text-[#00FF11] font-bold">{currentXp}</span>
            <span className="text-[#555555]"> / </span>
            <span>{xpRequired} XP</span>
          </div>
        </div>

      </div>
    </div>
  );
};
