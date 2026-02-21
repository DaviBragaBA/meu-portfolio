// Informações pessoais para a seção Sobre — edite em src/data/personal.ts

/** Data de nascimento para cálculo da idade (idade soma 1 em ago/set). Ajuste month (8 = ago, 9 = set) e day se quiser. */
export const birthDate = { year: 1998, month: 9, day: 1 };

export const personal = {
  fullName: "Davi Braga Moreira",
  /** Idade exibida (atualize quando fizer aniversário). Hoje: 26 anos. */
  age: 26,
  email: "davibragamoreira@hotmail.com",
  linkedin: "https://www.linkedin.com/in/davibragamor/",
  birthCity: "Varginha",
  currentCity: "São Paulo",
  alunoDestaque: "Aluno destaque no 2º e 3º ano do ensino médio.",
  alunoDestaqueEn: "Honor student in 2nd and 3rd year of high school.",
  idiomas: "Inglês intermediário/avançado",
  idiomasEn: "Intermediate/advanced English",
  formacaoEmUmaLinha:
    "Formado em Sistemas de Informação (UNIFEI). Pós em andamento: Inteligência de Dados em Negócios (ESPM) e Engenharia de Software em IA Aplicada (EAD).",
  formacaoEmUmaLinhaEn:
    "Degree in Information Systems (UNIFEI). In progress: Business Data Intelligence (ESPM) and Software Engineering in Applied AI (EAD).",
  motivacao:
    "O que mais me motiva é o desconforto: acredito que crescemos quando saímos da zona de conforto, encaramos desafios e aprendemos com o que ainda não dominamos. Gosto de ambientes que exigem adaptação, aprendizado contínuo e entrega com propósito.",
  motivacaoEn:
    "What motivates me most is discomfort: I believe we grow when we leave our comfort zone, face challenges and learn from what we don’t yet master. I like environments that demand adaptation, continuous learning and purpose-driven delivery.",
  /** Traços de personalidade / o que te define (ex.: paixão por dados, perfil comunicativo). */
  personalidade:
    "Apaixonado por análise de dados e números; extrovertido e conversador.",
  personalidadeEn:
    "Passionate about data analysis and numbers; extroverted and conversational.",
};

/** Retorna a idade atual (aniversário em ago/set = soma 1 nesses meses). */
export function getAge(): number {
  const today = new Date();
  const { year, month } = birthDate;
  let age = today.getFullYear() - year;
  if (today.getMonth() + 1 < month) age -= 1;
  return age;
}
