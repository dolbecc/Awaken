import React, { useState, useEffect } from 'react';
import { AwakenFramedIcon } from './AwakenLogo';
import { soundFx } from '../utils/soundFx';

export const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [statusLog, setStatusLog] = useState('Status: System initialising... 0%');

  useEffect(() => {
    const totalDuration = 3200;
    const intervalTime = 40;
    const step = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step + (Math.random() * 0.9);
        if (next >= 100) {
          clearInterval(timer);
          setStatusLog('Status: System initialising... 100% [READY]');
          setTimeout(() => {
            setIsFadingOut(true);
            soundFx.playClockIn();
            setTimeout(() => {
              onFinish();
            }, 400);
          }, 300);
          return 100;
        }

        const rounded = Math.floor(next);
        setStatusLog(`Status: System initialising... ${rounded}%`);
        return next;
      });
    }, intervalTime);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') skipIntro();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onFinish]);

  const skipIntro = () => {
    setIsFadingOut(true);
    soundFx.playClick();
    setTimeout(() => {
      onFinish();
    }, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between items-center p-6 md:p-12 bg-[#000000] text-white transition-opacity duration-500 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center text-xs font-mono text-[#A0A0A0]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#00FF11] rounded-full animate-pulse"></span>
          <span>AWAKEN // SYSTEM_ONLINE</span>
        </div>
        <button
          onClick={skipIntro}
          className="px-3 py-1 bg-[#1A1A1A] hover:bg-[#222222] text-[#A0A0A0] hover:text-[#00FF11] border border-[#2A2A2A] rounded text-[11px] font-mono transition-all"
        >
          Pular [ESC]
        </button>
      </div>

      {/* Center Framed Logo & Title */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        {/* Logo 4 Emoldurado */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
          <AwakenFramedIcon className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-[0_0_30px_rgba(0,255,17,0.7)]" glow={true} />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase text-[#00FF11] drop-shadow-[0_0_20px_rgba(0,255,17,0.6)]">
          AWAKEN
        </h1>

        <p className="mt-3 text-sm sm:text-xl font-bold tracking-[0.25em] text-white uppercase">
          WAKE UP. <span className="text-[#00FF11]">BUILD.</span> REPEAT.
        </p>
      </div>

      {/* Footer: Pixel Loading Bar & Status */}
      <div className="w-full max-w-xl flex flex-col gap-3">
        <div className="flex justify-between items-center text-xs sm:text-sm font-mono">
          <span className="text-[#00FF11] font-semibold">{statusLog}</span>
          <span className="text-[#00FF11] font-bold">{Math.min(100, Math.floor(progress))}%</span>
        </div>

        {/* Retro Pixel Progress Bar */}
        <div className="w-full h-3.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded p-0.5 overflow-hidden">
          <div
            className="h-full bg-[#00FF11] shadow-[0_0_10px_rgba(0,255,17,0.8)] transition-all duration-75 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
