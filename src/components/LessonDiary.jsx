import React, { useState } from 'react';
import {
  BookOpen,
  Code2,
  Globe,
  Plus,
  Trash2,
  ExternalLink,
  Save,
  Clock,
  Sparkles,
  Calendar
} from 'lucide-react';
import { soundFx } from '../utils/soundFx';

export const LessonDiary = ({ logs, onAddLog, onDeleteLog }) => {
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'programming', 'english'
  
  // Form State
  const [category, setCategory] = useState('programming'); // 'programming' | 'english'
  const [titleOrUrl, setTitleOrUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [insights, setInsights] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titleOrUrl.trim()) {
      setError('Por favor, informe o título ou link da aula.');
      return;
    }
    if (!summary.trim()) {
      setError('Por favor, escreva um resumo do que você aprendeu.');
      return;
    }

    const newLog = {
      id: `log-${Date.now()}`,
      category,
      titleOrUrl: titleOrUrl.trim(),
      summary: summary.trim(),
      insights: insights.trim(),
      createdAt: new Date().toISOString(),
    };

    soundFx.playClick();
    onAddLog(newLog);

    // Reset Form
    setTitleOrUrl('');
    setSummary('');
    setInsights('');
    setError('');
  };

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    if (activeCategory === 'programming') return log.category === 'programming';
    if (activeCategory === 'english') return log.category === 'english';
    return true;
  });

  // Helper to format date
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Helper to detect URL
  const isUrl = (text) => {
    return /^https?:\/\//i.test(text) || /^www\./i.test(text);
  };

  return (
    <div className="w-full flex flex-col gap-8 select-none">
      
      {/* Screen Header & Category Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#1A1A1A]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#00FF11] uppercase tracking-tight">
            DIÁRIO DE AULAS
          </h2>
          <p className="text-xs font-mono text-[#A0A0A0] mt-0.5">
            KNOWLEDGE LOG // REGISTRO DE APRENDIZADO & INSIGHTS
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveCategory('all');
            }}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all ${
              activeCategory === 'all'
                ? 'text-[#00FF11] border-b-2 border-[#00FF11]'
                : 'text-[#A0A0A0] hover:text-white border-b-2 border-transparent'
            }`}
          >
            Todas ({logs.length})
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveCategory('programming');
            }}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeCategory === 'programming'
                ? 'text-[#00FF11] border-b-2 border-[#00FF11]'
                : 'text-[#A0A0A0] hover:text-white border-b-2 border-transparent'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Programação</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveCategory('english');
            }}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeCategory === 'english'
                ? 'text-[#00FF11] border-b-2 border-[#00FF11]'
                : 'text-[#A0A0A0] hover:text-white border-b-2 border-transparent'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Inglês</span>
          </button>
        </div>
      </div>

      {/* New Entry Form Card */}
      <div className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 sm:p-6 shadow-loud-glow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#00FF11] uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 stroke-[3]" />
            NOVO REGISTRO DE ESTUDO
          </span>

          {/* Category Toggle */}
          <div className="flex items-center gap-1 bg-[#111111] p-1 rounded-lg border border-[#333333]">
            <button
              type="button"
              onClick={() => setCategory('programming')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                category === 'programming'
                  ? 'bg-[#00FF11] text-black shadow-loud-glow-sm'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Programação</span>
            </button>
            <button
              type="button"
              onClick={() => setCategory('english')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                category === 'english'
                  ? 'bg-[#00FF11] text-black shadow-loud-glow-sm'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>Inglês</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-sans">
          
          {/* Title or URL */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-[#A0A0A0] uppercase mb-1">
              Título ou Link da Aula *
            </label>
            <input
              type="text"
              value={titleOrUrl}
              onChange={(e) => setTitleOrUrl(e.target.value)}
              placeholder={
                category === 'programming'
                  ? 'Ex: Python: Estrutura de Funções, Decorators ou https://youtube.com/...'
                  : 'Ex: Inglês: Phrasal Verbs essenciais no trabalho ou Mairo Vergara Aula 04'
              }
              className="w-full bg-[#111111] text-white px-3.5 py-2.5 rounded-lg border border-[#333333] focus:border-[#00FF11] outline-none text-sm font-medium transition-colors placeholder:text-[#555555]"
            />
          </div>

          {/* Summary / Learnings */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-[#A0A0A0] uppercase mb-1">
              O que você aprendeu / Resumo *
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Descreva os conceitos centrais, a lógica e como aplicar na prática..."
              className="w-full bg-[#111111] text-white px-3.5 py-2.5 rounded-lg border border-[#333333] focus:border-[#00FF11] outline-none text-sm font-medium transition-colors placeholder:text-[#555555] resize-y"
            />
          </div>

          {/* Insights / Observations */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-[#A0A0A0] uppercase mb-1">
              Observações / Insights (Opcional)
            </label>
            <textarea
              rows={2}
              value={insights}
              onChange={(e) => setInsights(e.target.value)}
              placeholder="Dúvidas para pesquisar depois, erros comuns para evitar, macetes..."
              className="w-full bg-[#111111] text-white px-3.5 py-2 rounded-lg border border-[#333333] focus:border-[#00FF11] outline-none text-xs font-medium transition-colors placeholder:text-[#555555] resize-y"
            />
          </div>

          {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

          {/* Submit Button */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#00FF11] hover:bg-[#00CC0E] text-black font-black font-mono text-xs uppercase tracking-wider rounded-lg shadow-loud-button transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 stroke-[3]" />
              <span>Salvar Registro</span>
            </button>
          </div>

        </form>
      </div>

      {/* Feed / History of Logs */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#A0A0A0] uppercase tracking-wider">
            REGISTROS SALVOS ({filteredLogs.length})
          </span>
        </div>

        {filteredLogs.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredLogs.map((log) => {
              const isLogUrl = isUrl(log.titleOrUrl);
              const urlHref = isLogUrl
                ? log.titleOrUrl.startsWith('http')
                  ? log.titleOrUrl
                  : `https://${log.titleOrUrl}`
                : null;

              return (
                <div
                  key={log.id}
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#444444] rounded-xl p-5 transition-all flex flex-col gap-3"
                >
                  {/* Top Meta: Category Tag, Date & Delete */}
                  <div className="flex items-center justify-between gap-2 border-b border-[#242424] pb-2.5">
                    <div className="flex items-center gap-2">
                      {log.category === 'programming' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#00FF11]/10 text-[#00FF11] border border-[#00FF11]/30">
                          <Code2 className="w-3 h-3" />
                          #Programação
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30">
                          <Globe className="w-3 h-3" />
                          #Inglês
                        </span>
                      )}

                      <span className="text-[11px] font-mono text-[#777777] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(log.createdAt)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onDeleteLog(log.id);
                      }}
                      title="Excluir Registro"
                      className="p-1.5 bg-[#111111] hover:bg-[#222222] text-[#A0A0A0] hover:text-red-400 border border-[#2A2A2A] rounded-md transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title / Link */}
                  <div>
                    {isLogUrl ? (
                      <a
                        href={urlHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base sm:text-lg font-bold text-[#00FF11] hover:underline flex items-center gap-1.5 group"
                      >
                        <span className="truncate">{log.titleOrUrl}</span>
                        <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-70 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {log.titleOrUrl}
                      </h3>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="bg-[#121212] p-3.5 rounded-lg border border-[#222222]">
                    <span className="text-[10px] font-mono font-bold text-[#A0A0A0] uppercase block mb-1">
                      RESUMO DO APRENDIZADO
                    </span>
                    <p className="text-sm text-[#CCCCCC] whitespace-pre-wrap leading-relaxed">
                      {log.summary}
                    </p>
                  </div>

                  {/* Insights (if present) */}
                  {log.insights && (
                    <div className="bg-[#121212] p-3 rounded-lg border border-[#222222]">
                      <span className="text-[10px] font-mono font-bold text-[#00FF11] uppercase block mb-1">
                        OBSERVAÇÕES & INSIGHTS
                      </span>
                      <p className="text-xs text-[#A0A0A0] whitespace-pre-wrap leading-relaxed">
                        {log.insights}
                      </p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full py-12 px-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-center flex flex-col items-center justify-center">
            <BookOpen className="w-8 h-8 text-[#555555] mb-2" />
            <h4 className="font-bold text-sm text-white">Nenhum registro encontrado</h4>
            <p className="text-xs font-mono text-[#A0A0A0] mt-1 max-w-sm">
              Use o formulário acima para registrar seus resumos de aulas de Programação e Inglês.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
