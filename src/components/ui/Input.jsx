import { ChevronDown, Minus, Plus } from "lucide-react";

const fieldBase =
  "w-full bg-warm-white border border-border rounded-btn px-20 py-14 text-body-sm text-charcoal placeholder:text-muted focus:outline-none focus:border-gold transition-colors";

export function TextField({ label, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-tiny uppercase tracking-[0.08em] text-muted mb-8">{label}</span>}
      <input className={`${fieldBase} ${className}`} {...props} />
    </label>
  );
}

export function Select({ label, options = [], className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-tiny uppercase tracking-[0.08em] text-muted mb-8">{label}</span>}
      <div className="relative">
        <select className={`${fieldBase} appearance-none pr-40 ${className}`} {...props}>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={16} strokeWidth={1.5} className="absolute right-16 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
      </div>
    </label>
  );
}

export function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-12 cursor-pointer group">
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="w-18 h-18 rounded-[5px] border border-border-light peer-checked:bg-charcoal peer-checked:border-charcoal transition-colors flex items-center justify-center shrink-0">
        <svg className="w-10 h-10 text-warm-white opacity-0 peer-checked:opacity-100" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
      <span className="text-body-sm text-charcoal">{label}</span>
    </label>
  );
}

export function Radio({ label, name, ...props }) {
  return (
    <label className="flex items-center gap-12 cursor-pointer">
      <input type="radio" name={name} className="peer sr-only" {...props} />
      <span className="w-18 h-18 rounded-full border border-border-light peer-checked:border-charcoal flex items-center justify-center shrink-0">
        <span className="w-8 h-8 rounded-full bg-charcoal scale-0 peer-checked:scale-100 transition-transform" />
      </span>
      <span className="text-body-sm text-charcoal">{label}</span>
    </label>
  );
}

export function QuantitySelector({ value, onChange }) {
  return (
    <div className="inline-flex items-center border border-border rounded-btn">
      <button
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-40 h-44 flex items-center justify-center text-charcoal hover:bg-beige transition-colors"
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span className="w-40 text-center text-body-sm text-charcoal">{value}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="w-40 h-44 flex items-center justify-center text-charcoal hover:bg-beige transition-colors"
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}
