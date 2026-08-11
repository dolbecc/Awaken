import React, { useState, useEffect } from 'react';
import { X, Clock, Save } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

const PRESET_DURATIONS = [15, 20, 30, 45, 60, 75, 90, 120, 150];

export const QuestModal = ({ isOpen, onClose, onSave, editingQuest }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [duration, setDuration] = useState(60);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingQuest) {
      setTitle(editingQuest.title || '');
      setSubtitle(editingQuest.subtitle || '');
      setDuration(editingQuest.duration || 60);
    } else {
      setTitle('');
      setSubtitle('');
      setDuration(60);
    }
    setError('');
  }, [editingQuest, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('O nome da missão é obrigatório');
      return;
    }
    if (!duration || duration <= 0) {
      setError('A duração deve ser maior que zero');
      return;
    }

    const questData = {
      ...(editingQuest ? { id: editingQuest.id } : { id: `quest-${Date.now()}` }),
      title: title.trim(),
      subtitle: subtitle.trim(),
      duration: Number(duration),
    };

    soundFx.playClick();
    onSave(questData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#1A1A1A] border-2 border-[#00FF11] rounded-xl p-6 shadow-loud-glow">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A] mb-4">
          <h2 className="text-lg sm:text-xl font-black text-[#00FF11] uppercase tracking-tight">
            {editingQuest ? 'EDITAR MISSÃO' : 'NOVA MISSÃO'}
          </h2>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1 rounded bg-[#111111] text-[#A0A0A0] hover:text-white border border-[#333333]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#A0A0A0] uppercase mb-1">
              Nome da Missão *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Python: Teoria e Foco"
              className="w-full bg-[#111111] text-white px-3 py-2.5 rounded-lg border border-[#333333] focus:border-[#00FF11] outline-none text-sm font-semibold"
            />
          </div>

          {/* Subtitle / Objective */}
          <div>
            <label className="block text-xs font-bold text-[#A0A0A0] uppercase mb-1">
              Descrição / Subtítulo
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ex: Assistir e entender a fundo"
              className="w-full bg-[#111111] text-white px-3 py-2 rounded-lg border border-[#333333] focus:border-[#00FF11] outline-none text-xs"
            />
          </div>

          {/* Duration */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#A0A0A0] uppercase flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#00FF11]" />
                Duração (Minutos) *
              </label>
              <span className="text-xs font-mono font-bold text-[#00FF11]">{duration} min</span>
            </div>

            <input
              type="number"
              min="1"
              max="480"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-[#111111] text-white px-3 py-2 rounded-lg border border-[#333333] focus:border-[#00FF11] outline-none text-sm font-mono font-bold"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PRESET_DURATIONS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setDuration(preset)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                    Number(duration) === preset
                      ? 'bg-[#00FF11] text-black font-bold'
                      : 'bg-[#111111] text-[#A0A0A0] hover:text-white border border-[#333333]'
                  }`}
                >
                  {preset}m
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2A2A2A] mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#111111] hover:bg-[#222222] text-[#A0A0A0] hover:text-white rounded-lg text-xs font-bold uppercase"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#00FF11] hover:bg-[#00CC0E] text-black font-black text-xs uppercase rounded-lg shadow-loud-button transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Salvar</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
