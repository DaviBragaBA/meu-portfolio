import { ACTS, StoryPanels } from "./StoryPanels";
import { StorySceneLoader } from "./StorySceneLoader";

/**
 * A história: uma pista de scroll comprida (#story-track) com um palco de 100vh
 * (#story-stage) que o ScrollTrigger "pina". Dentro do palco: canvas Three.js
 * + painéis HTML com o conteúdo real de src/data.
 *
 * Sem JS/WebGL/reduced-motion → classe .story--static empilha os painéis.
 */
export function Story() {
  return (
    <section id="story-track" className="story-track" aria-label="Um passeio pela casa do Davi">
      <div id="story-stage" className="story-stage">
        <div id="story-canvas-host" className="story-canvas" aria-hidden />
        <div className="story-vignette" aria-hidden />

        <StoryPanels />

        <nav className="story-dots" aria-label="Capítulos">
          {ACTS.map((a, i) => (
            <button
              key={a.id}
              type="button"
              data-dot
              className={i === 0 ? "is-active" : undefined}
              aria-label={a.label}
            >
              <span>{a.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <StorySceneLoader />
    </section>
  );
}
