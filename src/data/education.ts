// Formação acadêmica — edite em src/data/education.ts

export type Education = {
  id: string;
  institution: string;
  degree: string;
  description?: string;
  tags: string[];
  period: string;
  activities?: string;
  logo?: string;
  /** Link para página com programa completo / sumário detalhado */
  detailUrl?: string;
  /** Link para página do TCC (ex.: graduação UNIFEI) */
  tccUrl?: string;
};

export const education: Education[] = [
  {
    id: "espm",
    institution: "ESPM Escola Superior de Propaganda e Marketing",
    degree: "Pós-Graduação Inteligência de Dados em Negócios",
    description:
      "Formação voltada para a aplicação prática da inteligência de dados nos negócios, com disciplinas que abrangem marketing, finanças, estratégia corporativa, visualização de dados e ciência de dados aplicada. Foco em transformar dados em decisões estratégicas por meio de ferramentas como Tableau, Altair RapidMiner e conceitos como data storytelling, modelos preditivos e inteligência artificial. O curso capacita para atuar em empresas data driven, com domínio de indicadores de performance (KPIs e OKRs) e jornada analítica.",
    tags: ["Dados", "Inteligência de negócios (BI)", "Tableau", "Data storytelling", "Modelos preditivos"],
    period: "abr 2025 - dez 2026",
    activities:
      "Realização de atividades em grupo, discussão de cases reais com professores convidados do mercado e elaboração do projeto de conclusão de curso com aplicação prática em negócios orientados por dados.",
    detailUrl: "/formation/pos",
  },
  {
    id: "pos-ia",
    institution: "Pós-Graduação Lato Sensu (EAD)",
    degree: "Engenharia de Software em IA Aplicada",
    description:
      "Especialização na integração entre Engenharia de Software e Inteligência Artificial: LLMs, agentes autônomos, MCP, RAG, fine-tuning (LoRA/PEFT), MLOps, APIs generativas e governança em IA. Formação para projetar, desenvolver e implantar soluções inteligentes com foco em arquiteturas AI-first, DevOps inteligente e práticas seguras e éticas.",
    tags: ["LLMs", "Agentes autônomos", "MCP", "RAG", "Fine-tuning", "MLOps", "IA generativa"],
    period: "fev 2026",
    activities:
      "Modalidade EAD, 480h em 12 meses. Inclui Capstone Project integrador, disciplinas de carreira e entrevistas para engenheiros de IA, e módulos de 4ª Revolução Industrial, Foresight Estratégico e Ecossistema de Inovação.",
    detailUrl: "/formation/pos-ia",
  },
  {
    id: "unifei",
    institution: "Universidade Federal de Itajubá",
    degree: "Bacharelado, Sistemas de Informação",
    tags: ["Habilidades analíticas", "Python"],
    period: "2018 - 2023",
    tccUrl: "/tcc",
  },
];
