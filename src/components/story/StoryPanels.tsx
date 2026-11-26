import Link from "next/link";
import { personal } from "@/data/personal";
import { experiences } from "@/data/experience";
import { education } from "@/data/education";
import { projects } from "@/data/projects";
import { personalProjects } from "@/data/personal-projects";
import { skillCategories } from "@/data/skills";
import { tcc } from "@/data/tcc";
import { PosProgressBar } from "@/components/PosProgressBar";

/**
 * Painéis HTML da história — um por ato. Todo o texto vem de src/data.
 * O GSAP só mexe em opacity/transform via [data-panel] e [data-item].
 */

export const ACTS = [
  { id: "desk", label: "Início" },
  { id: "living", label: "Quem sou" },
  { id: "war", label: "Nubank" },
  { id: "corridor", label: "Percurso" },
  { id: "workshop", label: "Oficina" },
  { id: "studio", label: "Formação" },
  { id: "balcony", label: "Contato" },
] as const;

export type ActId = (typeof ACTS)[number]["id"];

const nubank = experiences.find((e) => e.id === "nubank")!;
const path = experiences.filter((e) => e.id !== "nubank");

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="story-eyebrow">{children}</p>
  );
}

export function StoryPanels() {
  return (
    <>
      {/* ================= 0 · MONITOR ================= */}
      <article className="story-panel story-panel--left story-screen" data-panel="desk" aria-label="Resumo">
        <div className="story-screen__bar" aria-hidden>
          <span /><span /><span />
          <em>davi@sao-paulo — resumo</em>
        </div>
        <div className="story-screen__body">
          <h1 className="story-title">Davi Braga</h1>
          <p className="story-badge">Business Analyst</p>
          <p className="story-lead">
            <span className="story-accent">Core Limit Policies</span> (Excellence)
          </p>
          <p className="story-muted">
            Limites de cartão, métricas e experimentos de crédito · BR / MX / COL
          </p>
          <ul className="story-tags" aria-label="Ferramentas">
            {["Databricks", "SQL", "Python", "Dashboards", "A/B Testing"].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="story-progress">
            <p className="story-eyebrow">Pós em andamento</p>
            {education
              .filter((e) => e.startDate && e.endDate)
              .map((e) => (
                <div key={e.id} className="story-progress__row">
                  <span>{e.degree}</span>
                  <PosProgressBar startDate={e.startDate!} endDate={e.endDate!} />
                </div>
              ))}
          </div>
          <div className="story-ctas">
            <Link href="/projects" className="story-btn story-btn--solid">Experiência</Link>
            <Link href="/projetos" className="story-btn">Projetos</Link>
            <Link href="/formation" className="story-btn">Formação</Link>
          </div>
          <p className="story-hint" data-scroll-hint>
            <span className="story-hint__mouse" aria-hidden><i /></span>
            rola para eu levantar
          </p>
        </div>
      </article>

      {/* ================= 1 · SALA ================= */}
      <article className="story-panel story-panel--right" data-panel="living" aria-label="Quem sou eu">
        <Eyebrow>Sala · quem sou eu</Eyebrow>
        <h2 className="story-h2">{personal.fullName}</h2>
        <ul className="story-list">
          <li>{personal.age} anos · nascido em {personal.birthCity} · moro em {personal.currentCity}</li>
          <li>{personal.idiomas}</li>
          <li>{personal.personalidade}</li>
          <li>{personal.alunoDestaque}</li>
        </ul>
        <blockquote className="story-quote">{personal.motivacao}</blockquote>
        <p className="story-muted story-small">
          O de quatro patas é o <strong>Banguela</strong>, meu fiel companheiro.
        </p>
      </article>

      {/* ================= 2 · WAR ROOM ================= */}
      <article className="story-panel story-panel--left" data-panel="war" aria-label="Trabalho atual">
        <Eyebrow>War room · {nubank.period}</Eyebrow>
        <h2 className="story-h2">{nubank.company}</h2>
        <p className="story-lead">{nubank.role}</p>
        <p className="story-muted">{nubank.description}</p>
        <ul className="story-list story-list--check">
          {nubank.highlights.slice(0, 3).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ul className="story-tags">
          {nubank.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="story-small">
          <Link href="/projects" className="story-link">
            {projects.length} projetos em Core Limit Policies →
          </Link>
        </p>
      </article>

      {/* ================= 3 · CORREDOR ================= */}
      <article className="story-panel story-panel--right story-panel--wide" data-panel="corridor" aria-label="Percurso profissional">
        <Eyebrow>Corredor · cada porta, uma fase</Eyebrow>
        <h2 className="story-h2">O caminho até aqui</h2>
        <ol className="story-doors">
          {path.map((e) => (
            <li key={e.id} data-item>
              <span className="story-doors__period">{e.period}</span>
              <span className="story-doors__company">{e.company}</span>
              <span className="story-doors__role">{e.role}</span>
            </li>
          ))}
        </ol>
        <p className="story-small">
          <Link href="/projects" className="story-link">Ver a experiência completa →</Link>
        </p>
      </article>

      {/* ================= 4 · OFICINA ================= */}
      <article className="story-panel story-panel--left story-panel--wide" data-panel="workshop" aria-label="Projetos">
        <Eyebrow>Oficina · coisas que construí</Eyebrow>
        <h2 className="story-h2">Da monitoria ao diagrama</h2>
        <div className="story-columns">
          <div>
            <p className="story-eyebrow">No trabalho</p>
            <ul className="story-list">
              {projects.slice(0, 4).map((p) => (
                <li key={p.id}>{p.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="story-eyebrow">Por conta própria</p>
            <ul className="story-list">
              {personalProjects.slice(0, 5).map((p) => (
                <li key={p.id}>{p.title}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="story-small">
          <Link href="/projetos" className="story-link">Todos os projetos →</Link>
        </p>
      </article>

      {/* ================= 5 · ESTÚDIO ================= */}
      <article className="story-panel story-panel--right story-panel--wide" data-panel="studio" aria-label="Formação e competências">
        <Eyebrow>Estúdio · formação e o que estudo agora</Eyebrow>
        <h2 className="story-h2">Sistemas → Dados → IA</h2>
        <ul className="story-list">
          {education.map((e) => (
            <li key={e.id}>
              <strong>{e.degree}</strong> · {e.institution} <span className="story-muted">({e.period})</span>
            </li>
          ))}
          <li>
            <strong>TCC:</strong> {tcc.title} <span className="story-muted">({tcc.year})</span>
          </li>
        </ul>
        <ul className="story-tags">
          {skillCategories
            .filter((c) => c.id === "ia-engenharia" || c.id === "dados-experimentos")
            .flatMap((c) => c.skills.slice(0, 5))
            .map((s) => (
              <li key={s}>{s}</li>
            ))}
        </ul>
        <p className="story-small">
          <Link href="/formation" className="story-link">Formação →</Link>
          {" · "}
          <Link href="/skills" className="story-link">Competências →</Link>
          {" · "}
          <Link href="/tcc" className="story-link">TCC →</Link>
        </p>
      </article>

      {/* ================= 6 · VARANDA ================= */}
      <article className="story-panel story-panel--left" data-panel="balcony" aria-label="Contato">
        <Eyebrow>Varanda · {personal.currentCity}</Eyebrow>
        <h2 className="story-h2">Bora conversar?</h2>
        <p className="story-muted">
          Gosto de problemas que ainda não domino. Se o teu for um deles, escreve.
        </p>
        <div className="story-ctas">
          <a href={`mailto:${personal.email}`} className="story-btn story-btn--solid">{personal.email}</a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="story-btn">LinkedIn</a>
          <Link href="/en" className="story-btn">English</Link>
        </div>
        <p className="story-small story-muted">Continua a rolar para o perfil completo ↓</p>
      </article>
    </>
  );
}
