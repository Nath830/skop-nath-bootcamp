/**
 * Icon — wrapper léger autour de lucide-react.
 *
 * Conforme à la charte Skop :
 * - stroke 1.5px (capuchons arrondis natifs Lucide)
 * - taille par défaut 18 (compact UI)
 * - couleur héritée du parent (`currentColor`)
 *
 * Usage :
 *   <Icon name="Search" />
 *   <Icon name="Sparkles" size={24} className="text-skop-pink-vivid" />
 *
 * Pour utiliser une icône Lucide qui n'est pas dans le mapping ci-dessous,
 * importer directement depuis lucide-react :
 *   import { Heart } from 'lucide-react'
 *   <Heart size={18} strokeWidth={1.5} />
 */
import * as Lucide from 'lucide-react';

export default function Icon({ name, size = 18, strokeWidth = 1.5, className = '', ...props }) {
  const Cmp = Lucide[name];
  if (!Cmp) {
    if (typeof console !== 'undefined') {
      console.warn(`[Icon] "${name}" introuvable dans lucide-react`);
    }
    return null;
  }
  return <Cmp size={size} strokeWidth={strokeWidth} className={className} {...props} />;
}

/**
 * SkopBotIcon — icône custom pour les bots IA / crawlers.
 * Lucide n'a pas d'icône "spider" — celle-ci est dessinée au même style
 * (stroke 1.5px, capuchons arrondis, géométrie propre).
 */
export function SkopBotIcon({ size = 18, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* corps central */}
      <rect x="6" y="9" width="12" height="9" rx="2" />
      {/* antennes */}
      <path d="M9 9V6" />
      <path d="M15 9V6" />
      <circle cx="9" cy="5" r="1" />
      <circle cx="15" cy="5" r="1" />
      {/* yeux */}
      <circle cx="9.5" cy="13" r="0.5" fill="currentColor" />
      <circle cx="14.5" cy="13" r="0.5" fill="currentColor" />
      {/* pieds (pattes simplifiées) */}
      <path d="M6 14H4" />
      <path d="M6 17H4" />
      <path d="M18 14h2" />
      <path d="M18 17h2" />
    </svg>
  );
}
