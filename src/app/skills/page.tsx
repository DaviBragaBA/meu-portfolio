import { skillCategories } from "@/data/skills";

export const metadata = {
  title: "Competências | Davi Braga",
  description: "Competências e habilidades",
};

export default function SkillsPage() {
  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--muted)]">
        Competências
      </h1>

      <div className="space-y-10">
        {skillCategories.map((category) => (
          <section key={category.id}>
            <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-1">
              {category.name}
            </h2>
            <p className="text-xs text-[var(--muted)]/80 mb-4">
              {category.nameEn}
            </p>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="inline-block px-3 py-1.5 text-sm rounded-lg bg-[var(--border)] text-[var(--text)]"
                >
                  <span className="font-medium">{skill}</span>
                  <span className="text-[var(--muted)] font-normal"> · </span>
                  <span className="text-xs text-[var(--muted)]">
                    {category.skillsEn[i]}
                  </span>
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
