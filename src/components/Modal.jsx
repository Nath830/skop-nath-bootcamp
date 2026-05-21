import { useEffect } from 'react';
import Icon from './Icon.jsx';

/**
 * Modale réutilisable. Ferme avec Échap, clic sur le fond, ou bouton X.
 */
export default function Modal({ open, onClose, title, subtitle, children, maxWidth = 'max-w-3xl' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-[fadeIn_.15s_ease-out]"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-skop ${maxWidth} w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-skop-gray-200 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="font-title text-xl font-bold text-skop-black">{title}</h2>
            )}
            {subtitle && (
              <p className="text-sm text-skop-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full hover:bg-skop-gray-100 flex items-center justify-center text-skop-gray-500 hover:text-skop-black transition shrink-0"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}
