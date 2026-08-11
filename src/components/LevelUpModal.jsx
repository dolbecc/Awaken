import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Award, Sparkles, X, Flame, Shield, ArrowRight, Check } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

export const LevelUpModal = ({ isOpen, onClose, playerLevel, playerRank, earnedXp, streak }) => {
  useEffect(() => {
    if (isOpen) {
      soundFx.playLevelUp();

      // Launch epic confetti fireworks
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#00ff9d', '#a855f7', '#00f0ff', '#fbbf24', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-cyber-green rounded-3xl p-6 sm:p-8 shadow-neon-green text-center overflow-hidden animate-pulse-glow">
        
        {/* Holographic background rays */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyber-green/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10 flex flex-col items-center">
          {/* Trophy / Level Icon */}
          <div className="relative my-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-cyber-green/20 via-cyber-purple/30 to-cyber-cyan/20 border-2 border-cyber-green flex items-center justify-center text-cyber-green shadow-neon-green">
              <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-cyber-green animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-cyber-purple text-black font-orbitron font-extrabold text-xs rounded-full border border-white">
              LVL {playerLevel}
            </div>
          </div>

          {/* Subtitle & Title */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-cyber-green/15 border border-cyber-green/40 rounded-full text-cyber-green text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SISTEMA DE EVOLUÇÃO DIÁRIA</span>
          </div>

          <h2 className="mt-2 font-orbitron text-3xl sm:text-4xl font-black text-white tracking-wider">
            LEVEL UP <span className="text-cyber-green">DIÁRIO!</span>
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-300 font-chakra max-w-sm">
            Você conquistou 100% do XP previsto para hoje. Sua disciplina e foco forjam sua ascensão.
          </p>

          {/* Stats Breakdown */}
          <div className="mt-6 w-full grid grid-cols-3 gap-2 sm:gap-3 bg-slate-950/80 border border-slate-800 p-3 sm:p-4 rounded-2xl">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">XP Ganho</span>
              <span className="font-orbitron font-extrabold text-base sm:text-lg text-cyber-green">+{earnedXp}</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-800 px-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Streak</span>
              <span className="font-orbitron font-extrabold text-base sm:text-lg text-amber-400 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-amber-400" />
                {streak} Dias
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Novo Nível</span>
              <span className="font-orbitron font-extrabold text-base sm:text-lg text-cyber-purple">LVL {playerLevel}</span>
            </div>
          </div>

          {/* Player Rank Card */}
          <div className="mt-4 w-full p-3 bg-cyber-purple/10 border border-cyber-purple/40 rounded-xl flex items-center justify-between text-left">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-cyber-purple" />
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Patente Atual</div>
                <div className="font-orbitron font-bold text-xs sm:text-sm text-white">{playerRank}</div>
              </div>
            </div>
            <Check className="w-5 h-5 text-cyber-green stroke-[3]" />
          </div>

          {/* Claim Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyber-green to-emerald-400 hover:from-emerald-300 hover:to-cyber-green text-black font-orbitron font-black text-sm rounded-xl shadow-neon-green transition-all transform hover:scale-105 active:scale-95"
          >
            <span>REIVINDICAR RECOMPENSA & FECHAR</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </div>
    </div>
  );
};
