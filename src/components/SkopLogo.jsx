/**
 * Logo officiel Skop — recréation vectorielle fidèle.
 * Marque « diabolo » : demi-disque rose (haut), pilule noire arrondie
 * (centre), demi-disque teal (bas), suivie du mot-symbole « Skop ».
 */
export default function SkopLogo({ size = 32, withText = true }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={(size * 56) / 64}
        height={size}
        viewBox="0 0 56 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Logo Skop"
        role="img"
      >
        {/* Demi-disque rose vif — bord plat en haut, arc vers le bas */}
        <path d="M8 5 H48 A20 20 0 0 1 8 5 Z" fill="#FE277E" />
        {/* Pilule noire centrale */}
        <rect x="6" y="26" width="44" height="12" rx="6" fill="#0A0A0A" />
        {/* Demi-disque teal — bord plat en bas, arc vers le haut */}
        <path d="M8 59 H48 A20 20 0 0 0 8 59 Z" fill="#47EAD0" />
      </svg>
      {withText && (
        <span className="font-logo text-2xl font-semibold text-skop-black tracking-tight">
          Skop
        </span>
      )}
    </div>
  );
}
