import React, { useState, useEffect } from 'react';
import { Terminal, RefreshCw, AlertTriangle, ShieldAlert, Zap } from 'lucide-react';
import { getRandomQuote } from '../data/systemQuotes';
import { soundFx } from '../utils/soundFx';

export const SystemMessage = ({ activeQuestCategory, isClockedIn, isAllDone }) => {
  const [quote, setQuote] = useState(() => getRandomQuote('general'));
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isAllDone) {
      setQuote(getRandomQuote('completed'));
    } else if (!isClockedIn) {
      setQuote(getRandomQuote('unclocked'));
    } else if (activeQuestCategory === 'code') {
      setQuote(getRandomQuote('python'));
    } else if (activeQuestCategory === 'work') {
      setQuote(getRandomQuote('prospecting'));
    } else if (activeQuestCategory === 'fitness') {
      setQuote(getRandomQuote('fitness'));
    } else if (activeQuestCategory === 'college') {
      setQuote(getRandomQuote('college'));
    }
  }, [activeQuestCategory, isClockedIn, isAllDone]);

  const handleNextQuote = () => {
    soundFx.playClick();
    setIsRefreshing(true);
    setTimeout(() => {
      setQuote(getRandomQuote());
      setIsRefreshing(false);
    }, 200);
  };

  return (
    <div className="relative w-full rounded-xl bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-slate-950/90 border border-cyber-purple/40 p-4 shadow-card-glow overflow-hidden group">
      {/* Ambient background glow & scanline */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-cyber-purple/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyber-purple via-cyber-green to-cyber-cyan"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 pl-2">
        {/* Left Side: System Icon & Boss Quote */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple flex-shrink-0 mt-0.5 sm:mt-0 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
            <Terminal className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-cyber-purple font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple animate-ping"></span>
                MENSAGEM DO SISTEMA // {quote.author || 'O ARQUITETO'}
              </span>
            </div>
            <p className={`mt-1 text-sm sm:text-base font-chakra font-medium text-slate-200 tracking-wide transition-opacity duration-200 ${isRefreshing ? 'opacity-30' : 'opacity-100'}`}>
              "{quote.text}"
            </p>
          </div>
        </div>

        {/* Right Side: Refresh directive button */}
        <div className="flex items-center self-end sm:self-center gap-2 flex-shrink-0">
          <button
            onClick={handleNextQuote}
            title="Receber nova diretiva do Sistema"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-cyber-green border border-slate-700/60 hover:border-cyber-green/40 rounded-lg text-xs font-mono transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Nova Diretiva</span>
          </button>
        </div>
      </div>
    </div>
  );
};
