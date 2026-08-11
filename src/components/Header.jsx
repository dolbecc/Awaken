import React, { useState, useEffect } from 'react';

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedHours = String(currentTime.getHours()).padStart(2, '0');
  const formattedMinutes = String(currentTime.getMinutes()).padStart(2, '0');
  const formattedSeconds = String(currentTime.getSeconds()).padStart(2, '0');

  const formattedDate = currentTime.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  return (
    <header className="w-full bg-[#000000] border-b border-[#1A1A1A] sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* Left Side: Clean Bold LOUD Title */}
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-[#00FF11] rounded-none rotate-45 shadow-loud-glow-sm"></span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#00FF11] uppercase select-none drop-shadow-[0_0_10px_rgba(0,255,17,0.4)]">
            AWAKEN
          </h1>
        </div>

        {/* Right Side: Digital Clock & Date */}
        <div className="flex flex-col items-end font-mono">
          <div className="text-lg sm:text-xl font-bold text-[#00FF11] tracking-wider leading-none">
            {formattedHours}:{formattedMinutes}:{formattedSeconds}
          </div>
          <div className="text-[11px] text-[#A0A0A0] tracking-widest uppercase mt-1">
            {formattedDate}
          </div>
        </div>

      </div>
    </header>
  );
};
