import { useState } from 'react';
import Icon from './Icon.jsx';

/**
 * Petit "i" (Lucide Info) qui affiche une bulle d'explication au survol / clic.
 * Usage : <InfoTooltip text="Ce score représente..." />
 */
export default function InfoTooltip({ text, side = 'top' }) {
  const [open, setOpen] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrows = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-skop-black',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-skop-black',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-skop-black',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-skop-black',
  };

  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        aria-label="Voir l'explication"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full text-skop-gray-400 cursor-help hover:text-skop-pink-vivid transition"
      >
        <Icon name="Info" size={14} />
      </button>
      {open && (
        <span
          role="tooltip"
          className={`absolute z-50 w-64 p-3 bg-skop-black text-white text-xs leading-relaxed rounded-skop shadow-lg pointer-events-none ${positions[side]}`}
        >
          {text}
          <span
            className={`absolute w-0 h-0 border-4 border-transparent ${arrows[side]}`}
          />
        </span>
      )}
    </span>
  );
}
