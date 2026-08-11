export const SYSTEM_QUOTES = [
  {
    category: 'general',
    text: "O fracasso não é uma opção para quem busca maestria. Conquiste seu dia bloco a bloco.",
    author: "O ARQUITETO DO SISTEMA"
  },
  {
    category: 'general',
    text: "Cada minuto de procrastinação é XP cedido ao seu eu medíocre. Execute a rotina agora.",
    author: "PROTOCOLO DE EFICIÊNCIA"
  },
  {
    category: 'general',
    text: "A consistência diária vence o talento inconsistente em 100% das vezes. Sem desculpas.",
    author: "NÚCLEO DO SISTEMA"
  },
  {
    category: 'unclocked',
    text: "ALERTA: Ponto diário não registrado! O relógio universal não espera. Inicie o sistema para computar sua trajetória.",
    author: "SENSOR TEMPORAL"
  },
  {
    category: 'python',
    text: "PROTOCOLO DEV: Python não se aprende por osmose. Abra o terminal, escreva testes, quebre código e resolva.",
    author: "MÓDULO DE PROGRAMAÇÃO"
  },
  {
    category: 'prospecting',
    text: "MODO CAÇADOR ATIVADO: Clientes pagadores não batem à porta por telepatia. Mande propostas, faça follow-ups e feche.",
    author: "RADAR COMERCIAL"
  },
  {
    category: 'fitness',
    text: "OBJETIVO 90KG: O corpo deve sustentar a mente. Cada série e repetição no treino forja sua couraça.",
    author: "BIO-MONITOR"
  },
  {
    category: 'college',
    text: "XP ACADÊMICO: A faculdade de ADS dá os alicerces teóricos da engenharia. Extraia o máximo da matéria.",
    author: "DIRETIVA EDUCACIONAL"
  },
  {
    category: 'completed',
    text: "EXTRAORDINÁRIO: Todas as missões do dia foram subjugadas. 100% de XP adquirido. Descanse, Caçador.",
    author: "STATUS MÁXIMO"
  }
];

export const getRandomQuote = (category = null) => {
  if (category) {
    const filtered = SYSTEM_QUOTES.filter(q => q.category === category);
    if (filtered.length > 0) {
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
  }
  return SYSTEM_QUOTES[Math.floor(Math.random() * SYSTEM_QUOTES.length)];
};
