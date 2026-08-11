import React, { useState } from 'react';
import { Play, RotateCcw, Clock, Zap, Calendar, ArrowRight, CheckCircle2, Sparkles, Sliders } from 'lucide-react';
import { soundFx } from '../utils/soundFx';
import { formatTime, formatMinutesToDisplay } from '../utils/timeEngine';

export const ClockInBanner = ({
  isClockedIn,
  clockInTime,
  onClockIn,
  onRecalculateNow,
  totalRoutineMinutes,
  estimatedEndTime,
}) => {
  const [customTime, setCustomTime] = useState(() => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  });
  const [isEditingStartTime, setIsEditingStartTime] = useState(false);

  const handleStartNow = () => {
    soundFx.playClockIn();
    onClockIn(new Date());
  };

  const handleStartCustom = () => {
    soundFx.playClockIn();
    const [hours, minutes] = customTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    onClockIn(date);
    setIsEditingStartTime(false);
  };

  if (!isClockedIn) {
    return (
      <div className="relative w-full rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-950/95 border-2 border-cyber-green/50 p-6 sm:p-8 shadow-neon-green overflow-hidden">
        {/* Glow particles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-green/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-cyber-purple/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Text */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded-full text-cyber-green text-xs font-mono font-semibold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>MOTOR DE TEMPO DINÂMICO DESCONECTADO</span>
            </div>

            <h2 className="font-orbitron text-2xl sm:text-3xl font-black text-white tracking-wide">
              BATER PONTO & <span className="text-cyber-green">INICIAR SISTEMA</span>
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-300 font-chakra leading-relaxed">
              Inicie a rotina agora e o Sistema calculará automaticamente o horário de início e término de 
              <strong> todas as {formatMinutesToDisplay(totalRoutineMinutes)}</strong> de missões do seu dia, empilhando as durações em tempo real.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-cyber-cyan" />
                Carga Total: <strong className="text-white ml-1">{formatMinutesToDisplay(totalRoutineMinutes)}</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded border border-slate-800">
                <Zap className="w-3.5 h-3.5 text-cyber-green" />
                Stack Dinâmico Ativo
              </span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 flex-shrink-0">
            {/* Primary Action Button */}
            <button
              onClick={handleStartNow}
              className="group relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyber-green via-emerald-400 to-cyber-cyan hover:from-emerald-300 hover:to-cyber-green text-black font-extrabold font-orbitron text-sm sm:text-base rounded-xl shadow-neon-green transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-black stroke-black group-hover:animate-bounce" />
              <span>BATER PONTO AGORA</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Custom Time Selector */}
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800">
              <span>Ou iniciar às:</span>
              <input
                type="time"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                className="bg-slate-900 text-white font-mono font-bold px-2 py-1 rounded border border-slate-700 focus:border-cyber-green outline-none text-xs"
              />
              <button
                onClick={handleStartCustom}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyber-green rounded hover:text-white transition-all font-semibold"
              >
                Definir
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Already Clocked In HUD Summary
  return (
    <div className="relative w-full rounded-xl bg-slate-900/80 border border-slate-800 p-4 shadow-md backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Clocked In Metadata */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyber-green animate-ping"></div>
            <span className="font-orbitron font-bold text-xs sm:text-sm text-cyber-green tracking-wider uppercase">
              SISTEMA EM EXECUÇÃO
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>Ponto iniciado às: <strong className="text-white font-bold">{formatTime(clockInTime)}</strong></span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-cyber-purple" />
            <span>Término previsto: <strong className="text-cyber-purple font-bold">{estimatedEndTime || '--:--'}</strong></span>
          </div>

          <div className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <span>Duração total: <strong className="text-slate-200">{formatMinutesToDisplay(totalRoutineMinutes)}</strong></span>
          </div>
        </div>

        {/* Action Controls when Clocked In */}
        <div className="flex items-center gap-2 self-end md:self-center">
          {/* Recalculate from Now */}
          <button
            onClick={() => {
              soundFx.playClick();
              onRecalculateNow();
            }}
            title="Recalcular o restante das missões a partir do minuto atual"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-cyber-green border border-slate-700/60 hover:border-cyber-green/40 rounded-lg text-xs font-mono transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recalcular a partir de agora</span>
          </button>

          {/* Edit Start Time */}
          {isEditingStartTime ? (
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-700">
              <input
                type="time"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                className="bg-slate-900 text-white font-mono px-2 py-0.5 rounded border border-slate-700 text-xs outline-none"
              />
              <button
                onClick={handleStartCustom}
                className="px-2 py-0.5 bg-cyber-green text-black font-semibold text-xs rounded"
              >
                Salvar
              </button>
              <button
                onClick={() => setIsEditingStartTime(false)}
                className="px-1.5 py-0.5 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingStartTime(true)}
              title="Ajustar horário de início do ponto"
              className="p-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 rounded-lg transition-all"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
