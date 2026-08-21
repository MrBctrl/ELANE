import { Link } from "react-router-dom";

/**
 * Ref: Design System §3.12 — Editorial Card / Journal Card / Story Card
 * Magazine feel: large image, minimal text, one visual language across variants.
 */
export default function EditorialCard({ image, eyebrow, title, meta, slug, aspect = "aspect-[3/4]" }) {
  return (
    <Link to={slug ? `/journal/${slug}` : "/journal"} className="group block">
      <div className={`relative overflow-hidden rounded-img bg-beige ${aspect}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
      </div>
      <div className="mt-20">
        {eyebrow && (
          <p className="text-tiny uppercase tracking-[0.1em] text-gold-text mb-8">{eyebrow}</p>
        )}
        <h3 className="font-heading text-h5 text-heading group-hover:text-gold-text transition-colors duration-300">
          {title}
        </h3>
        {meta && <p className="text-caption text-muted mt-8">{meta}</p>}
      </div>
    </Link>
  );
}
