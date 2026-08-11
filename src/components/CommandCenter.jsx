import React, { useState } from 'react';
import { Play, Check, RotateCcw, Clock, ArrowRight } from 'lucide-react';
import { formatTime, formatSecondsToMMSS, formatMinutesToDisplay } from '../utils/timeEngine';
import { getXpForQuest } from '../utils/levelEngine';
import { soundFx } from '../utils/soundFx';

export const CommandCenter = ({
  isClockedIn,
  clockInTime,
  estimatedEndTime,
  activeQuest,
  remainingSeconds,
  isOvertime,
  isAllDone,
  onClockIn,
  onCompleteActiveQuest,
  onRecalculateNow,
}) => {
  const [customTime, setCustomTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });
  const [showCustomTime, setShowCustomTime] = useState(false);

  const handleStartNow = () => {
    soundFx.playClockIn();
    onClockIn(new Date());
  };

  const handleStartCustom = () => {
    soundFx.playClockIn();
    const [h, m] = customTime.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    onClockIn(d);
    setShowCustomTime(false);
  };

  // State 1: All Quests Completed
  if (isAllDone) {
    return (
      <div className="w-full bg-[#1A1A1A] border-2 border-[#00FF11] rounded-xl p-6 sm:p-8 text-center shadow-loud-glow">
        <span className="text-xs font-mono font-bold text-[#00FF11] tracking-widest uppercase">
          STATUS DO SISTEMA
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase mt-1">
          TODAS AS MISSÕES FORAM CONCLUÍDAS!
        </h2>
        <p className="text-sm text-[#A0A0A0] mt-2">
          Rotina diária finalizada com 100% de aproveitamento.
        </p>
      </div>
    );
  }

  // State 2: System Disconnected (Not yet Clocked In)
  if (!isClockedIn) {
    return (
      <div className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-6">
        <div>
          <span className="text-xs font-mono font-bold text-[#A0A0A0] tracking-widest uppercase">
            STATUS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
            SISTEMA DESCONECTADO
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Inicie a rotina para empilhar e calcular os horários das suas missões.
          </p>
        </div>

        {/* Giant Centralized Button */}
        <button
          onClick={handleStartNow}
          className="w-full max-w-md py-5 bg-[#00FF11] hover:bg-[#00CC0E] active:scale-[0.98] text-[#000000] font-black text-lg sm:text-xl uppercase tracking-wider rounded-lg shadow-loud-button transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <Play className="w-6 h-6 fill-black stroke-black" />
          <span>BATER PONTO AGORA</span>
        </button>

        {/* Subtle Custom Time Option */}
        <div className="flex items-center gap-2 text-xs text-[#A0A0A0]">
          {!showCustomTime ? (
            <button
              onClick={() => setShowCustomTime(true)}
              className="hover:text-[#00FF11] underline transition-colors"
            >
              Definir horário de início manual
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-[#111111] p-1.5 rounded border border-[#333333]">
              <span>Iniciar às:</span>
              <input
                type="time"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                className="bg-[#1A1A1A] text-white px-2 py-0.5 rounded border border-[#333333] text-xs outline-none"
              />
              <button
                onClick={handleStartCustom}
                className="px-2 py-0.5 bg-[#00FF11] text-black font-bold rounded text-xs"
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const activeQuestXp = activeQuest ? getXpForQuest(activeQuest.duration) : 0;

  // State 3: System Running with Active Quest
  return (
    <div className="w-full bg-[#1A1A1A] border border-[#00FF11] rounded-xl p-6 sm:p-8 shadow-loud-glow-sm flex flex-col gap-6">
      
      {/* Top Header Row of Command Center */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#00FF11] rounded-full animate-pulse"></span>
          <span className="text-xs sm:text-sm font-bold text-[#00FF11] tracking-widest uppercase">
            SISTEMA EM EXECUÇÃO
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#A0A0A0]">
          <span>Iniciado: <strong className="text-white">{formatTime(clockInTime)}</strong></span>
          <span>•</span>
          <span>Término: <strong className="text-[#00FF11]">{estimatedEndTime || '--:--'}</strong></span>
        </div>
      </div>

      {/* Active Quest Details & Giant Countdown */}
      {activeQuest ? (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <span className="text-[11px] font-mono font-bold text-[#00FF11] uppercase tracking-wider">
              MISSÃO ATUAL // {activeQuest.formattedStart} - {activeQuest.formattedEnd} ({formatMinutesToDisplay(activeQuest.duration)})
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1 tracking-tight">
              {activeQuest.title}
            </h2>
            {activeQuest.subtitle && (
              <p className="text-sm sm:text-base text-[#A0A0A0] mt-1">
                {activeQuest.subtitle}
              </p>
            )}
          </div>

          {/* Countdown Display & Action */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3">
            <div className="font-mono text-4xl sm:text-5xl font-black text-[#00FF11] tracking-wider drop-shadow-[0_0_15px_rgba(0,255,17,0.5)]">
              {formatSecondsToMMSS(remainingSeconds)}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  soundFx.playQuestComplete();
                  onCompleteActiveQuest(activeQuest.id);
                }}
                className="flex-1 sm:flex-initial px-6 py-3 bg-[#00FF11] hover:bg-[#00CC0E] text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-loud-button transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>CONCLUIR MISSÃO (+{activeQuestXp} XP)</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onRecalculateNow();
                }}
                title="Recalcular horários a partir de agora"
                className="p-3 bg-[#111111] hover:bg-[#222222] text-[#A0A0A0] hover:text-[#00FF11] border border-[#2A2A2A] hover:border-[#00FF11] rounded-lg transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
};
