import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';

/**
 * Sommaire flottant qui suit le scroll.
 * Props :
 * - sections: [{ id, label, iconName? }]   // iconName = nom Lucide
 */
export default function TableOfContents({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // On choisit l'entrée la plus proche du haut (rootMargin spécial)
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // La plus haute = celle qui a le plus petit top
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Considère "active" quand la section est dans la partie haute de l'écran
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <nav
      aria-label="Sommaire de la page"
      className="hidden xl:block fixed top-36 right-8 w-56 z-[5] max-h-[calc(100vh-10rem)] overflow-y-auto"
    >
      <div className="rounded-skop bg-white/95 backdrop-blur border border-skop-gray-200 shadow-skop-card p-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-500 px-2 mb-2">
          Sommaire
        </p>
        <ul className="space-y-0.5">
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => handleClick(e, s.id)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition relative ${
                    isActive
                      ? 'bg-skop-pink-soft text-skop-black font-semibold'
                      : 'text-skop-gray-500 hover:bg-skop-gray-50 hover:text-skop-black'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-skop-pink-vivid rounded-r" />
                  )}
                  {s.iconName && <Icon name={s.iconName} size={14} />}
                  <span className="truncate">{s.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
