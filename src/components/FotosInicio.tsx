"use client";

const fotos = [
  { jpeg: "/fotos/cachorro.jpeg", svg: "/fotos/cachorro.svg", alt: "Cachorro" },
  { jpeg: "/fotos/davi-cachorro.jpeg", svg: "/fotos/davi-cachorro.svg", alt: "Davi Braga e cachorro" },
];

export function FotosInicio() {
  return (
    <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
      {fotos.map((foto) => (
        <div
          key={foto.jpeg}
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--border)]/20 flex-shrink-0"
        >
          <img
            src={foto.jpeg}
            alt={foto.alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src !== foto.svg) {
                img.src = foto.svg;
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
