import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, total, onChange }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center flex-wrap gap-8 mt-64">
      <button
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="w-40 h-40 flex items-center justify-center rounded-full text-charcoal disabled:opacity-30 hover:bg-beige transition-colors"
      >
        <ChevronLeft size={16} strokeWidth={1.5} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-40 h-40 rounded-full text-caption transition-colors ${
            p === page ? "bg-charcoal text-warm-white" : "text-charcoal hover:bg-beige"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        aria-label="Next page"
        disabled={page === total}
        onClick={() => onChange(page + 1)}
        className="w-40 h-40 flex items-center justify-center rounded-full text-charcoal disabled:opacity-30 hover:bg-beige transition-colors"
      >
        <ChevronRight size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}
