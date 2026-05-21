import { createContext, useCallback, useContext, useState } from 'react';
import Icon from './Icon.jsx';

const ToastContext = createContext({ toast: () => {} });

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message, options = {}) => {
      const id = nextId++;
      const variant = options.variant || 'success';
      const duration = options.duration ?? 2500;
      setToasts((list) => [...list, { id, message, variant, icon: options.icon }]);
      if (duration > 0) {
        setTimeout(() => remove(id), duration);
      }
      return id;
    },
    [remove],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={remove} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext).toast;
}

function ToastContainer({ toasts, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={() => onClose(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  const variants = {
    success: {
      bg: 'bg-skop-black',
      text: 'text-white',
      defaultIcon: 'Check',
    },
    info: {
      bg: 'bg-white border border-skop-pink-vivid',
      text: 'text-skop-black',
      defaultIcon: 'Lightbulb',
    },
    warning: {
      bg: 'bg-skop-pink-vivid',
      text: 'text-white',
      defaultIcon: 'TriangleAlert',
    },
    error: {
      bg: 'bg-skop-black border border-skop-pink-vivid',
      text: 'text-white',
      defaultIcon: 'X',
    },
  };

  const v = variants[toast.variant] || variants.success;

  return (
    <div
      role="status"
      className={`${v.bg} ${v.text} pointer-events-auto rounded-skop shadow-skop-hover px-4 py-3 flex items-center gap-3 min-w-[280px] max-w-md animate-[toastIn_.25s_ease-out]`}
    >
      <span className="shrink-0">
        {typeof toast.icon === 'string' && toast.icon.length <= 3 ? (
          /* Si toast.icon est un emoji court (rétro-compat), on l'affiche tel quel */
          <span className="text-base">{toast.icon}</span>
        ) : (
          <Icon name={toast.iconName ?? v.defaultIcon} size={18} />
        )}
      </span>
      <span className="text-sm font-medium flex-1">{toast.message}</span>
      <button
        onClick={onClose}
        className="shrink-0 w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center opacity-60 hover:opacity-100 transition"
        aria-label="Fermer"
      >
        <Icon name="X" size={14} />
      </button>
    </div>
  );
}
