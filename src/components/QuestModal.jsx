import React, { useState, useEffect } from 'react';
import { X, Sparkles, Clock, Tag, Award, Layers, Save, Plus } from 'lucide-react';
import { AVAILABLE_ICONS, getQuestIcon } from '../utils/iconMap';
import { soundFx } from '../utils/soundFx';

const PRESET_DURATIONS = [15, 20, 30, 45, 60, 75, 90, 120, 150];

const CATEGORIES = [
  { id: 'code', label: 'Código / Dev', defaultXp: 180 },
  { id: 'study', label: 'Estudo / Teoria', defaultXp: 150 },
  { id: 'mana', label: 'Pausa de Mana', defaultXp: 30 },
  { id: 'work', label: 'Trabalho / Vendas', defaultXp: 200 },
  { id: 'language', label: 'Idiomas', defaultXp: 90 },
  { id: 'fitness', label: 'Treino / Shape', defaultXp: 180 },
  { id: 'college', label: 'Faculdade / ADS', defaultXp: 160 },
  { id: 'break', label: 'Save Point / Almoço', defaultXp: 50 },
  { id: 'project', label: 'Side Quest / Portfólio', defaultXp: 180 },
  { id: 'leisure', label: 'Lazer / Descanso', defaultXp: 50 },
];

export const QuestModal = ({ isOpen, onClose, onSave, editingQuest }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [duration, setDuration] = useState(60);
  const [category, setCategory] = useState('code');
  const [icon, setIcon] = useState('Code2');
  const [xp, setXp] = useState(100);
  const [tagsInput, setTagsInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingQuest) {
      setTitle(editingQuest.title || '');
      setSubtitle(editingQuest.subtitle || '');
      setDuration(editingQuest.duration || 60);
      setCategory(editingQuest.category || 'code');
      setIcon(editingQuest.icon || 'Code2');
      setXp(editingQuest.xp || 100);
      setTagsInput(editingQuest.tags ? editingQuest.tags.join(', ') : '');
    } else {
      // Defaults for new quest
      setTitle('');
      setSubtitle('');
      setDuration(60);
      setCategory('code');
      setIcon('Terminal');
      setXp(150);
      setTagsInput('Foco, Evolução');
    }
    setErrors({});
  }, [editingQuest, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'O título da missão é obrigatório';
    if (!duration || duration <= 0) newErrors.duration = 'A duração deve ser maior que 0 minutos';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const questData = {
      ...(editingQuest ? { id: editingQuest.id } : { id: `quest-${Date.now()}` }),
      title: title.trim(),
      subtitle: subtitle.trim(),
      duration: Number(duration),
      category,
      icon,
      xp: Number(xp) || 50,
      tags,
    };

    soundFx.playClick();
    onSave(questData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-cyber-green/60 rounded-2xl p-6 shadow-neon-green max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyber-green animate-pulse" />
            <h2 className="font-orbitron text-lg sm:text-xl font-black text-white">
              {editingQuest ? 'EDITAR MISSÃO DO SISTEMA' : 'CRIAR NOVA MISSÃO'}
            </h2>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Nome da Missão *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Python: A Prática ou Treino de Força"
              className="w-full bg-slate-950 text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-cyber-green outline-none text-sm font-chakra"
            />
            {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Subtitle / Objective */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Subtítulo / Descrição da Meta
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ex: Codar, errar e resolver na prática"
              className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-slate-700 focus:border-cyber-green outline-none text-xs font-chakra"
            />
          </div>

          {/* Duration in minutes + Preset Chips */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300 uppercase flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyber-cyan" />
                Duração (Minutos) *
              </label>
              <span className="text-xs text-cyber-cyan font-bold font-orbitron">{duration} min</span>
            </div>

            <input
              type="number"
              min="1"
              max="480"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-slate-700 focus:border-cyber-green outline-none text-sm font-bold"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PRESET_DURATIONS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setDuration(preset)}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-all ${
                    Number(duration) === preset
                      ? 'bg-cyber-cyan text-black font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {preset}m
                </button>
              ))}
            </div>
            {errors.duration && <p className="text-rose-400 text-xs mt-1">{errors.duration}</p>}
          </div>

          {/* Category & XP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  const found = CATEGORIES.find(c => c.id === e.target.value);
                  if (found) setXp(found.defaultXp);
                }}
                className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-slate-700 focus:border-cyber-green outline-none text-xs"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-cyber-purple" />
                Recompensa em XP
              </label>
              <input
                type="number"
                min="10"
                max="1000"
                step="10"
                value={xp}
                onChange={(e) => setXp(e.target.value)}
                className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-slate-700 focus:border-cyber-purple outline-none text-xs font-bold text-cyber-purple"
              />
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Ícone da Missão
            </label>
            <div className="flex flex-wrap gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800 max-h-28 overflow-y-auto">
              {AVAILABLE_ICONS.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={`p-2 rounded-lg border transition-all ${
                    icon === ic
                      ? 'bg-cyber-green text-black border-cyber-green shadow-neon-green'
                      : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                  }`}
                >
                  {getQuestIcon(ic, "w-4 h-4")}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              Tags (separadas por vírgula)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Ex: Dev, Python, Lógica"
              className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-slate-700 focus:border-cyber-green outline-none text-xs font-chakra"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyber-green to-emerald-500 hover:from-emerald-400 hover:to-cyber-green text-black font-extrabold font-orbitron text-xs rounded-xl shadow-neon-green transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{editingQuest ? 'Salvar Alterações' : 'Criar Missão'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
