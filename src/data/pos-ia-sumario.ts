export type ModuloPosIA = {
  id: string;
  titulo: string;
  cargaHoraria: number;
  descricao: string;
};

export const modulosPosIA: ModuloPosIA[] = [
  {
    id: "ambientacao",
    titulo: "Ambientação",
    cargaHoraria: 0,
    descricao:
      "Ensino a distância: características desta modalidade de estudo. A tecnologia e o ensino à distância. Legislação do Ensino a Distância no Brasil. Aspectos relacionados ao perfil no Ensino a Distância. Conteúdos: Introdução ao EAD; Tecnologia e educação; Legislação do EAD no Brasil; Perfil do aluno no Ensino a Distância.",
  },
  {
    id: "fundamentos-ia-llms",
    titulo: "Fundamentos de IA e LLMs para Programadores",
    cargaHoraria: 30,
    descricao:
      "Estudo dos fundamentos teóricos e práticos da Inteligência Artificial, Machine Learning, Deep Learning e Large Language Models (LLMs). Aborda conceitos de redes neurais, embeddings, tensores, attention e transformers, com aplicação em projetos de desenvolvimento web e automação inteligente. Explora o uso de frameworks, IDEs e ferramentas assistidas por IA, bem como a integração de agentes autônomos e bancos vetoriais em aplicações práticas. Conteúdos: Fundamentos de ML, Deep Learning e Redes Neurais; Estrutura e funcionamento dos LLMs e transformers; Engenharia de prompt e ferramentas inteligentes para desenvolvedores; Implementação prática de modelos e agentes em JavaScript.",
  },
  {
    id: "apis-ia-prompt",
    titulo: "APIs de IA Generativa e Prompt Engineering",
    cargaHoraria: 30,
    descricao:
      "Aplicação de APIs generativas em modelos de texto, imagem, áudio e vídeo. Aborda o design de prompts avançados, automação de fluxos multimodais e integração de serviços OpenAI, Gemini, Anthropic e Hugging Face. Explora práticas de custo-eficiência e consistência de resultados na criação de sistemas generativos. Conteúdos: Fundamentos de APIs de IA generativa e multimodalidade; Engenharia de prompt avançada e encadeamento de prompts; Integração prática com OpenAI, Gemini e Anthropic; Aplicações em OCR, bots e análise de mídia inteligente.",
  },
  {
    id: "mcp",
    titulo: "Model Context Protocol (MCP)",
    cargaHoraria: 30,
    descricao:
      "Introdução ao padrão Model Context Protocol (MCP) para integração de LLMs, ferramentas e agentes. Explora arquitetura, autenticação, tokens de serviço, WAF e interoperabilidade entre plataformas, com ênfase em implementação prática de servidores MCP em JavaScript. Conteúdos: Fundamentos e estrutura do MCP; Criação e integração de MCPs em ambientes de desenvolvimento; Interoperabilidade entre LLMs, ferramentas e IDEs; Implementação de segurança e controle de acesso em MCPs.",
  },
  {
    id: "agentes-autonomos",
    titulo: "Criação de Agentes Autônomos",
    cargaHoraria: 30,
    descricao:
      "Arquiteturas, padrões e metodologias de desenvolvimento de agentes autônomos, com aplicação em sistemas inteligentes e ambientes computacionais complexos. Abordagem de modelos de raciocínio e execução (ReAct, Plan-and-Execute), memória, reflexão e adaptação contextual. Uso de LangChain e LangGraph para fluxos autônomos, integração entre agentes e APIs, e sistemas multiagentes colaborativos para automação e tomada de decisão. Conteúdos: Arquitetura e funcionamento de agentes autônomos; Padrões ReAct e Tree of Thoughts; Desenvolvimento com LangGraph; Implementação prática de agentes multiagentes colaborativos.",
  },
  {
    id: "ia-ux-ui",
    titulo: "Ferramentas de IA para UX e UI",
    cargaHoraria: 30,
    descricao:
      "Aplicação de ferramentas e técnicas de IA no design de interfaces e na experiência do usuário (UX/UI): prototipação inteligente, geração automatizada de fluxos de interação e design assistido por IA. Uso de ferramentas generativas para criação visual, análise de comportamento do usuário com IA, e integração de protótipos em ambientes colaborativos e sistemas MCP. Princípios de usabilidade, acessibilidade, personalização e interação adaptativa. Conteúdos: Prototipação inteligente com IA; Integração de IA em fluxos de UX e design responsivo; Automação de testes e análise de usabilidade; Design system e interação com usuários com IA.",
  },
  {
    id: "ia-devops",
    titulo: "Ferramentas de IA para DevOps",
    cargaHoraria: 30,
    descricao:
      "Integração entre IA e práticas DevOps: agentes inteligentes e modelos generativos na automação, observabilidade e otimização de ambientes de desenvolvimento e operação. Infraestrutura como Código (IaC), AIOps e automação de pipelines CI/CD. Uso de modelos de linguagem natural para troubleshooting automatizado, detecção de anomalias, dashboards inteligentes e auto-remediação de incidentes. FinOps e compliance com políticas de segurança e governança. Conteúdos: IaC e automação inteligente; AIOps e observabilidade baseada em IA; Segurança, compliance e FinOps; Auto-remediação e pipelines inteligentes.",
  },
  {
    id: "ia-gestao-projetos",
    titulo: "Ferramentas de IA para Gestão de Projetos",
    cargaHoraria: 30,
    descricao:
      "Aplicação de IA na automação, análise e otimização da gestão de projetos de software, integrando práticas ágeis e ferramentas inteligentes. Planejamento assistido por IA, geração automatizada de cronogramas e roadmaps, priorização inteligente de backlog. Uso de modelos generativos e ML para análise de riscos, previsão de prazos e custos, e automação de relatórios em Jira, Trello, Notion e Asana. Governança, compliance e rastreabilidade de projetos. Conteúdos: Planejamento e escopo com IA; Priorização e previsão inteligente; Riscos, mitigação e governança assistida; Automação em Jira, Trello, Notion.",
  },
  {
    id: "arquitetura-ia",
    titulo: "Arquitetura de Sistemas com IA",
    cargaHoraria: 30,
    descricao:
      "Fundamentos, princípios e padrões de design de sistemas orientados à IA (AI-first): arquitetura, escalabilidade e governança. Componentes e camadas de sistemas baseados em IA, arquitetura distribuída, roteamento inteligente de modelos, integração de agentes e multiagentes, otimização de custo, latência e desempenho. Padrões de RAG (Retrieval-Augmented Generation), orquestração, observabilidade e auditoria de sistemas inteligentes. Conteúdos: Fundamentos das arquiteturas AI-first; Modelagem de agentes e multiagentes; Padrões de design e otimização custo-latência; Arquitetura corporativa e observabilidade em IA.",
  },
  {
    id: "fine-tuning",
    titulo: "Processamento de Dados e Fine-Tuning de Modelos",
    cargaHoraria: 30,
    descricao:
      "Processamento de dados, preparação de datasets e ajuste fino (fine-tuning) de modelos de IA em ambientes corporativos e de pesquisa. Coleta, limpeza, balanceamento e estruturação de dados; uso de APIs comerciais (OpenAI, Gemini) para treinamento supervisionado e monitoramento. Técnicas LoRA (Low-Rank Adaptation) e PEFT (Parameter-Efficient Fine-Tuning). Avaliação e validação de modelos; projeto prático de modelo customizado com automação, métricas e documentação. Conteúdos: Fundamentos e decisão de fine-tuning; Preparação e engenharia de dados (JSONL, automação via JavaScript); Execução e monitoramento de fine-tuning; LoRA/PEFT, testes A/B e integração em sistemas.",
  },
  {
    id: "seguranca-governanca-ia",
    titulo: "Segurança e Governança em IA",
    cargaHoraria: 30,
    descricao:
      "Fundamentos legais, éticos e de segurança no desenvolvimento e uso da IA: LGPD, GDPR e diretrizes internacionais de governança. Boas práticas de segurança cibernética, mitigação de ataques adversariais e prevenção de vulnerabilidades em LLMs e sistemas inteligentes. Impactos sociais e éticos: viés algorítmico, transparência, accountability e explicabilidade. Conteúdos: LGPD e GDPR aplicados à IA; Mitigação de ataques e vulnerabilidades em LLMs; Avaliação de viés e responsabilidade ética; Governança e padrões de segurança em IA corporativa.",
  },
  {
    id: "capstone",
    titulo: "Projeto Integrador – Capstone Project",
    cargaHoraria: 30,
    descricao:
      "Desenvolvimento de um projeto integrador que consolida os conhecimentos da pós em Engenharia de Software em IA Aplicada. Projetar, implementar e documentar uma solução completa baseada em IA, aplicando engenharia de software, arquitetura AI-first, MCP, RAG e integração full-stack. Definição do problema, planejamento técnico, prototipagem, versionamento, testes, implantação e defesa técnica perante banca. Conteúdos: Planejamento e definição do problema; Desenvolvimento de microsaas com IA integrada; Aplicação de MCP, RAG e agentes orquestrados; Defesa técnica e documentação do projeto.",
  },
  {
    id: "carreira-entrevistas",
    titulo: "Carreira e Entrevistas para Engenheiros de IA Aplicada",
    cargaHoraria: 30,
    descricao:
      "Competências profissionais para atuação no mercado de Engenharia de Software e IA Aplicada. Posicionamento estratégico, criação e otimização de perfis em LinkedIn e GitHub, portfólios e projetos demonstráveis. System design para entrevistas técnicas, problem solving, live coding, comunicação técnica, storytelling e negociação salarial. Projeção de carreira, progressão por níveis (Júnior a Principal) e planejamento no ecossistema global de IA. Conteúdos: Branding e posicionamento profissional em IA; Portfólio técnico e presença digital; Preparação para entrevistas técnicas e system design; Planejamento de carreira e negociação salarial.",
  },
  {
    id: "industria-4",
    titulo: "4ª Revolução Industrial e Tecnologias Emergentes",
    cargaHoraria: 40,
    descricao:
      "Conceitos, princípios e evolução da Indústria 4.0. Inovação e tecnologia aplicada à Indústria 4.0. Internet das Coisas (IoT), Inteligência Artificial, Big Data e Computação em Nuvem. Supply Chain/Logística 4.0. Indústria criativa e economia digital. Impactos sociais, éticos e ambientais das tecnologias emergentes. Conteúdos: Fundamentos da Indústria 4.0 e transformação digital; IoT, IA, Machine Learning e Big Data; Supply Chain/Logística 4.0 e automação; Indústria criativa, sustentabilidade e futuro do trabalho.",
  },
  {
    id: "foresight",
    titulo: "Foresight Estratégico",
    cargaHoraria: 40,
    descricao:
      "Foresight no contexto estratégico corporativo. Modelos de foresight: Formal (Intencional/Acidental), Informal, Mapa Matricial, Matriz de Atratividade e Business Cube. Futurismo. Predições e modelos de predições. Método Delphi. Método Brainstorming. Conteúdos: Foresight e prospectiva: conceitos e modelos; Mapa Matricial, Matriz de Atratividade e Business Cube; Futurismo, predições e modelos de predições; Estratégia e decisão: métodos Delphi e Brainstorm.",
  },
  {
    id: "ecossistema-inovacao",
    titulo: "Ecossistema de Inovação",
    cargaHoraria: 40,
    descricao:
      "Ambiente, redes e ecossistema de inovação. Colaboração entre universidade, empreendedores e investidores. Incubadoras e aceleradoras. Modelo de Maturidade de Ecossistema de Inovação. Conteúdos: Ambiente, redes e ecossistema de inovação; Colaboração universidade, empreendedores e investidores; Incubadoras e Aceleradoras; Modelo de Maturidade de Ecossistema de Inovação.",
  },
];

export const cargaHorariaTotalPosIA = 480;
