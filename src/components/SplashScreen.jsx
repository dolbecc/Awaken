import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/soundFx';

export const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [statusLog, setStatusLog] = useState('Status: System initialising... 0%');

  useEffect(() => {
    // Total animation duration: ~3.8 seconds
    const totalDuration = 3600;
    const intervalTime = 40;
    const step = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step + (Math.random() * 0.8);
        if (next >= 100) {
          clearInterval(timer);
          setStatusLog('Status: System initialising... 100% [SYSTEM READY]');
          setTimeout(() => {
            setIsFadingOut(true);
            soundFx.playClockIn();
            setTimeout(() => {
              onFinish();
            }, 600); // 600ms fade out transition
          }, 400);
          return 100;
        }

        const rounded = Math.floor(next);
        if (rounded < 15) {
          setStatusLog(`Status: System initialising... ${rounded}%`);
        } else if (rounded < 35) {
          setStatusLog(`Status: Loading neural modules... ${rounded}%`);
        } else if (rounded < 70) {
          setStatusLog(`Status: Synchronizing daily quests... ${rounded}%`);
        } else if (rounded < 95) {
          setStatusLog(`Status: Calibrating hunter rank... ${rounded}%`);
        } else {
          setStatusLog(`Status: Finalizing protocol... ${rounded}%`);
        }

        return next;
      });
    }, intervalTime);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        skipIntro();
      }
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
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between items-center p-6 md:p-12 bg-[#08090d] text-white scanlines transition-all duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none filter blur-sm' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Hologram Grid & Scanlines */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-purple/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top HUD Metadata */}
      <div className="relative z-10 w-full flex justify-between items-center text-xs font-mono text-slate-500 tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></span>
          <span>AWAKEN_OS // BOOT_SEQUENCE</span>
        </div>
        <button
          onClick={skipIntro}
          className="px-3 py-1 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyber-green border border-slate-700/50 hover:border-cyber-green/50 rounded text-[11px] transition-all font-mono"
        >
          Pular [ESC]
        </button>
      </div>

      {/* Center Hero: "Awaken" Title & Subtitle */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
        <div className="relative group">
          {/* Glowing Aura Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyber-green/20 via-cyber-purple/25 to-cyber-cyan/20 rounded-2xl blur-xl opacity-80 animate-pulse-fast"></div>
          
          <h1 className="relative font-orbitron text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,157,0.7)] animate-glitch">
            <span className="text-cyber-green drop-shadow-[0_0_20px_rgba(0,255,157,0.8)]">A</span>
            <span>WAK</span>
            <span className="text-cyber-purple drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">E</span>
            <span>N</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mt-4 sm:mt-6 flex items-center gap-3">
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyber-purple"></span>
          <p className="font-chakra text-lg sm:text-2xl md:text-3xl font-medium tracking-widest text-slate-300 uppercase">
            Wake up, <span className="text-cyber-green font-bold">build</span>, <span className="text-cyber-purple font-bold">repeat.</span>
          </p>
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyber-green"></span>
        </div>

        {/* Cyber Tagline */}
        <p className="mt-3 text-xs sm:text-sm font-mono text-slate-500 max-w-md tracking-wider">
          DAILY QUEST & TIME STACKING MOTOR • SYSTEM PROTOCOL
        </p>
      </div>

      {/* Footer: Retro Pixel Loading Bar & Status Counter */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-3">
        {/* Status Line */}
        <div className="flex justify-between items-center text-xs sm:text-sm font-mono">
          <span className="text-cyber-green font-medium animate-pulse">{statusLog}</span>
          <span className="text-cyber-purple font-bold font-orbitron">{Math.min(100, Math.floor(progress))}%</span>
        </div>

        {/* Retro Pixelated Progress Bar */}
        <div className="relative w-full h-5 sm:h-6 bg-slate-950/90 border-2 border-slate-700/80 rounded-sm p-1 shadow-[0_0_15px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Inner segmented bar */}
          <div
            className="h-full bg-gradient-to-r from-cyber-green via-cyber-cyan to-cyber-purple transition-all duration-75 ease-out rounded-sm shadow-[0_0_10px_rgba(0,255,157,0.8)]"
            style={{ width: `${Math.min(100, progress)}%` }}
          >
            {/* Retro grid lines over the bar */}
            <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#000_4px,#000_6px)]"></div>
          </div>
        </div>

        {/* Pixel Segments Count */}
        <div className="flex justify-between text-[10px] font-mono text-slate-600">
          <span>MEM_ALLOC: 0x88F92</span>
          <span>SYSTEM_INIT: READY</span>
          <span>FPS: 60.0</span>
        </div>
      </div>
    </div>
  );
};
