import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// "Home" is the only crumb that reliably maps to a real route across every
// page that uses this component (the rest — "Women", a product's own
// category — aren't pages of their own) so it's the one crumb that should
// actually navigate; the others render as plain (non-broken) text.
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-8 text-tiny text-muted flex-wrap">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-8">
          {i > 0 && <ChevronRight size={12} strokeWidth={1.5} />}
          {i === items.length - 1 ? (
            <span className="text-charcoal">{item}</span>
          ) : item === "Home" ? (
            <Link to="/" className="hover:text-charcoal transition-colors">{item}</Link>
          ) : (
            <span>{item}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
