import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

/* Lucide dropped brand logos — thin custom outline glyphs keep the same
   "thin line icon, no colour" rule from Design System §3.20/§2.10. */
function InstagramGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18" {...props}>
      <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2H15l-.4 3h-2.1v7" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

/**
 * Ref: Part 4 §4.13 — Brand · Collections · Company · Support · Journal ·
 * Newsletter · Social Media · Payment Methods · Legal.
 * Everything a customer expects, without feeling crowded.
 */

const columns = [
  {
    title: "Collections",
    links: [
      { label: "New Arrivals", to: "/collection" },
      { label: "Women", to: "/collection?gender=Women" },
      { label: "Men", to: "/collection?gender=Men" },
      { label: "Beauty", to: "/collection?gender=Unisex" },
      { label: "Lookbook", to: "/journal" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Craftsmanship", to: "/about" },
      { label: "Journal", to: "/journal" },
      { label: "Portfolio Case Study", to: "/portfolio" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", to: "/support" },
      { label: "Shipping", to: "/support?tab=Shipping" },
      { label: "Returns", to: "/support?tab=Returns" },
      { label: "FAQ", to: "/support?tab=FAQ" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
    showToast("You're on the list — welcome to ÉLANE.", "success");
  };

  return (
    <footer className="bg-charcoal text-warm-white">
      <div className="content-container pt-80 pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-48 lg:gap-24">
          <div className="sm:col-span-2 lg:col-span-4">
            <span className="font-display text-h4 tracking-[0.2em]">ÉLANE</span>
            <p className="text-caption text-warm-white/60 mt-16 max-w-[38ch]">
              Quiet luxury, worn with intention. Crafted for those who choose
              confidence over noise.
            </p>
            <div className="flex items-center gap-16 mt-24">
              <a href="#" aria-label="Instagram" className="text-warm-white/70 hover:text-gold transition-colors">
                <InstagramGlyph />
              </a>
              <a href="#" aria-label="Facebook" className="text-warm-white/70 hover:text-gold transition-colors">
                <FacebookGlyph />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h6 className="text-tiny uppercase tracking-[0.12em] text-warm-white/50 mb-24">
                {col.title}
              </h6>
              <ul className="flex flex-col gap-16">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-caption text-warm-white/85 hover:text-gold transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h6 className="text-tiny uppercase tracking-[0.12em] text-warm-white/50 mb-24">
              Newsletter
            </h6>
            <p className="text-caption text-warm-white/70 mb-16">
              First access to new arrivals.
            </p>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-transparent border-b border-warm-white/30 pb-8 text-caption placeholder:text-warm-white/40 focus:outline-none focus:border-gold"
              />
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-16 mt-80 pt-24 border-t border-warm-white/10">
          <p className="text-tiny text-warm-white/50">
            © {new Date().getFullYear()} ÉLANE. All rights reserved.
          </p>
          <div className="flex gap-24">
            <a href="#" className="text-tiny text-warm-white/50 hover:text-gold">Privacy</a>
            <a href="#" className="text-tiny text-warm-white/50 hover:text-gold">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
