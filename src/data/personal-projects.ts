// Projetos pessoais (HTML e outros) — edite em src/data/personal-projects.ts
// Quando publicar os arquivos em algum lugar, preencha url.

export type PersonalProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  /** Link para o projeto (quando estiver publicado). Deixe vazio se for só local. */
  url?: string;
};

export const personalProjects: PersonalProject[] = [
  {
    id: "receita-metricas-cartao",
    title: "Guia: Componentes de Receita e Métricas de Cartão",
    description:
      "Material em HTML com os componentes de receita e métricas que envolvem cartão de crédito para políticas de crédito. Tema escuro, navegação por seções.",
    tags: ["HTML", "Métricas", "Crédito", "Documentação"],
  },
  {
    id: "budget-metrics-flow",
    title: "Budget Metrics – Diagrama de fluxo",
    description:
      "Diagrama de fluxo e estrutura de métricas de budget, com visão por país (BR/MX/COL). Diagrama interativo em HTML.",
    tags: ["HTML", "Diagrama", "Métricas"],
  },
  {
    id: "credit-limit-policies-flow",
    title: "Políticas de limite – Diagrama de fluxo",
    description:
      "Diagrama de fluxo de políticas de limite de crédito. Estrutura visual em HTML para consulta e estudo.",
    tags: ["HTML", "Diagrama", "Crédito"],
  },
  {
    id: "materiais-estudo",
    title: "Materiais de estudo – Ciência de dados",
    description:
      "Conteúdo de estudo em ciência de dados organizado em HTML. Tema escuro, navegação por tópicos.",
    tags: ["HTML", "Ciência de dados", "Estudo"],
  },
  {
    id: "plano-desenvolvimento",
    title: "Plano de desenvolvimento",
    description:
      "Acompanhamento de progresso e metas de desenvolvimento em HTML. Inclui índice e página de progresso.",
    tags: ["HTML", "Produtividade", "Metas"],
  },
  {
    id: "mexico-compliance-arch",
    title: "Compliance – Arquitetura",
    description:
      "Diagrama de arquitetura de compliance bancária. Documentação visual em HTML.",
    tags: ["HTML", "Diagrama", "Compliance"],
  },
  {
    id: "fpna-learning-lab",
    title: "FP&A – Learning lab",
    description:
      "Material de apoio e learning lab sobre métricas financeiras e budget por país.",
    tags: ["HTML", "FP&A", "Métricas"],
  },
  {
    id: "template-tarefa",
    title: "Template de tarefa",
    description:
      "Template em HTML para registro e acompanhamento de tarefas. Estrutura reutilizável para organização de trabalho.",
    tags: ["HTML", "Template", "Produtividade"],
  },
];
