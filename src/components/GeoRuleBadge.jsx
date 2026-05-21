import { useState } from 'react';

/**
 * Badge d'une règle GEO appliquée à un contenu.
 * - variant="icon"   = juste l'icône (compact, pour les listes)
 * - variant="full"   = icône + label (pour le détail / éditeur)
 */
export default function GeoRuleBadge({ rule, variant = 'icon' }) {
  const [open, setOpen] = useState(false);

  if (!rule) return null;

  const isFull = variant === 'full';

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span
        tabIndex={0}
        className={
          isFull
            ? 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-skop-pink-soft border border-skop-pink text-xs font-semibold text-skop-black hover:bg-skop-pink transition cursor-help'
            : 'inline-flex items-center justify-center w-6 h-6 rounded-full bg-skop-pink-soft border border-skop-pink text-xs hover:bg-skop-pink transition cursor-help'
        }
        aria-label={rule.label}
      >
        <span className={isFull ? 'text-sm' : 'text-[11px]'}>{rule.icon}</span>
        {isFull && <span>{rule.short}</span>}
      </span>

      {open && (
        <span
          role="tooltip"
          className="absolute z-50 w-64 p-3 bg-skop-black text-white text-xs leading-relaxed rounded-skop shadow-lg pointer-events-none bottom-full left-1/2 -translate-x-1/2 mb-2"
        >
          <strong className="block mb-1 text-skop-pink">
            {rule.icon} {rule.label}
          </strong>
          {rule.description}
          <span className="absolute w-0 h-0 border-4 border-transparent border-t-skop-black top-full left-1/2 -translate-x-1/2" />
        </span>
      )}
    </span>
  );
}
