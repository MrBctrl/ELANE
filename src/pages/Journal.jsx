import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Newsletter from "../components/sections/Newsletter";
import EditorialCard from "../components/cards/EditorialCard";
import { journal } from "../data/editorial";
import usePageTitle from "../hooks/usePageTitle";

/**
 * Ref: §1.11 — "Functions secretly as the SEO engine... Clients see value
 * before they buy." Editorial magazine feel, not a blog template.
 * Category filtering per brief.
 */
const CATEGORIES = ["All", ...new Set(journal.map((j) => j.category))];

export default function Journal() {
  usePageTitle("Journal");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () => (category === "All" ? journal : journal.filter((j) => j.category === category)),
    [category]
  );
  const [featured, ...rest] = filtered.length ? filtered : journal;

  return (
    <div className="bg-ivory">
      <Navigation transparentOnTop={false} />

      <div className="content-container pt-[112px] sm:pt-[152px] pb-48">
        <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">The Journal</p>
        <h1 id="main-heading" tabIndex="-1" className="font-display text-h1 sm:text-display-sm text-heading max-w-[18ch]">
          Stories, styling, and craft
        </h1>
      </div>

      {/* Category filter */}
      <div className="content-container pb-56">
        <div className="flex flex-wrap gap-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-tiny uppercase tracking-[0.08em] px-20 py-10 rounded-full border transition-colors ${
                category === cat
                  ? "bg-charcoal text-warm-white border-charcoal"
                  : "border-border text-muted hover:text-charcoal hover:border-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured article */}
      <div className="content-container pb-80">
        <Link to={`/journal/${featured.slug}`} className="group grid lg:grid-cols-2 gap-48 items-center">
          <div className="rounded-img overflow-hidden aspect-[4/3]">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <p className="text-tiny uppercase tracking-[0.1em] text-gold-text mb-16">{featured.eyebrow}</p>
            <h2 className="font-heading text-h2 text-heading group-hover:text-gold-text transition-colors duration-300 max-w-[16ch]">
              {featured.title}
            </h2>
            <p className="text-body-sm text-muted mt-16 max-w-[48ch]">{featured.excerpt}</p>
            <p className="text-caption text-muted mt-16">{featured.date} · {featured.meta}</p>
          </div>
        </Link>
      </div>

      {/* Article grid */}
      <div className="content-container pb-120">
        {rest.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-48">
            {rest.map((j) => (
              <EditorialCard key={j.slug} {...j} />
            ))}
          </div>
        ) : (
          <p className="text-body-sm text-muted text-center py-48">No other articles in this category yet.</p>
        )}
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
