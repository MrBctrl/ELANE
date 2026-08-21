import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

const TONES = {
  success: "text-emerald",
  warning: "text-gold-text",
  info: "text-charcoal",
  error: "text-burgundy",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="fixed top-24 right-24 z-[100] flex flex-col gap-12 w-[calc(100%-48px)] max-w-[360px]"
      >
        {toasts.map((t) => {
          const Icon = ICONS[t.type];
          return (
            <div
              key={t.id}
              className="flex items-start gap-12 bg-warm-white border border-border rounded-card shadow-dropdown px-20 py-16 animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <Icon size={18} strokeWidth={1.5} className={`shrink-0 mt-2 ${TONES[t.type]}`} />
              <p className="text-body-sm text-charcoal flex-1">{t.message}</p>
              <button aria-label="Dismiss" onClick={() => dismiss(t.id)} className="text-muted hover:text-charcoal shrink-0">
                <X size={15} strokeWidth={1.5} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
