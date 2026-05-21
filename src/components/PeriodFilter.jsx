/**
 * Filtre jour / semaine / mois.
 * Mode contrôlé : passer `value` + `onChange`.
 * Mode défaut : passer juste `defaultValue` (state interne).
 */
import { useState } from 'react';

const defaultOptions = [
  { value: 'day', label: 'Jour' },
  { value: 'week', label: 'Semaine' },
  { value: 'month', label: 'Mois' },
];

export default function PeriodFilter({ value, onChange, defaultValue = 'week', options = defaultOptions }) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const active = isControlled ? value : internal;

  const handleClick = (v) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div className="inline-flex rounded-full bg-skop-gray-100 p-1 text-xs">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => handleClick(opt.value)}
          className={`px-3 py-1 rounded-full transition font-medium ${
            active === opt.value
              ? 'bg-white text-skop-black shadow-sm'
              : 'text-skop-gray-500 hover:text-skop-black'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
