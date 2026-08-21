/**
 * Tags: New · Limited · Exclusive · Bestseller · Sold Out
 * Badges: Free Shipping · New Arrival · Premium · Handmade · Eco Collection
 * Ref: Design System §3.13–3.14 — minimal, small, elegant.
 */

export function Tag({ children, tone = "default" }) {
  const tones = {
    default: "text-charcoal border-charcoal/30",
    sold: "text-muted border-muted/30",
    exclusive: "text-gold-text border-gold/50",
  };
  return (
    <span
      className={`inline-block text-[10px] font-medium uppercase tracking-[0.12em] border rounded-full px-12 py-4 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-8 text-tiny text-muted">
      <span className="w-4 h-4 rounded-full bg-gold" />
      {children}
    </span>
  );
}
