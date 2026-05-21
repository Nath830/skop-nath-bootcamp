/**
 * Card — conteneur standard.
 *
 * accent : au lieu d'un fond rose plein (fatigant en masse), on signale
 * l'importance par un filet rose vif à gauche sur fond blanc (style "callout"
 * Linear/Stripe). Beaucoup plus calme quand il y a 40 cards à l'écran.
 */
export default function Card({ title, subtitle, children, action, className = '', accent = false }) {
  return (
    <section
      className={`rounded-skop bg-white border border-skop-gray-200 shadow-skop-card p-7 ${
        accent ? 'border-l-4 border-l-skop-pink-vivid' : ''
      } ${className}`}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            {title && (
              <h2 className="font-title text-lg font-bold text-skop-black leading-snug">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[13px] text-skop-gray-400 mt-1 leading-relaxed">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
