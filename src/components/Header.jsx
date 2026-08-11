import React, { useState, useEffect } from 'react';
import { AwakenBrandLogo } from './AwakenLogo';

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        
        {/* Left Side: Logo 4 Emoldurado + Title */}
        <AwakenBrandLogo showSubtitle={false} />

        {/* Right Side: Digital Clock & Date */}
        <div className="flex flex-col items-end font-mono">
          <div className="text-lg sm:text-xl font-bold text-[#00FF11] tracking-wider leading-none drop-shadow-[0_0_8px_rgba(0,255,17,0.3)]">
            {formattedHours}:{formattedMinutes}:{formattedSeconds}
          </div>
          <div className="text-[10px] sm:text-[11px] text-[#A0A0A0] tracking-widest uppercase mt-1 font-semibold">
            {formattedDate}
          </div>
        </div>

      </div>
    </header>
  );
};
