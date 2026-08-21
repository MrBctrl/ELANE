import { Star } from "lucide-react";

export default function ReviewCard({ name, rating, date, text }) {
  return (
    <div className="border-b border-border pb-32">
      <div className="flex items-center gap-4 mb-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            strokeWidth={1.5}
            className={i < rating ? "fill-gold text-gold" : "text-border-light"}
          />
        ))}
      </div>
      <p className="text-body-sm text-charcoal max-w-[65ch]">{text}</p>
      <p className="text-tiny text-muted mt-16">
        {name} <span className="mx-8">·</span> {date}
      </p>
    </div>
  );
}
