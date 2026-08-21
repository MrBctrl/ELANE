import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, children, maxWidth = "max-w-[560px]" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-24">
      <div
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px] animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div
        className={`relative bg-warm-white rounded-card shadow-modal w-full ${maxWidth} max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300`}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-20 right-20 w-36 h-36 rounded-full flex items-center justify-center text-charcoal hover:bg-beige transition-colors z-10"
        >
          <X size={18} strokeWidth={1.5} />
        </button>
        {children}
      </div>
    </div>
  );
}
