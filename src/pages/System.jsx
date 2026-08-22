import Button, { IconButton } from "../components/ui/Button";
import { Tag, Badge } from "../components/ui/Tag";
import ProductCard from "../components/cards/ProductCard";
import EditorialCard from "../components/cards/EditorialCard";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { products } from "../data/products";
import { journal } from "../data/editorial";
import { Heart } from "lucide-react";
import usePageTitle from "../hooks/usePageTitle";

const swatches = [
  ["Ivory (bg)", "bg-ivory", "border"],
  ["Warm White", "bg-warm-white", "border"],
  ["Soft Beige", "bg-beige", ""],
  ["Deep Charcoal", "bg-charcoal", ""],
  ["Champagne Gold", "bg-gold", ""],
  ["Muted Gray (text)", "bg-muted", ""],
  ["Border", "bg-border-light", "border"],
  ["Muted Emerald", "bg-emerald", ""],
  ["Muted Burgundy", "bg-burgundy", ""],
  ["Muted Olive", "bg-olive", ""],
];

function Section({ title, children }) {
  return (
    <section className="py-64 border-b border-border">
      <div className="content-container">
        <h2 className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-32">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function System() {
  usePageTitle("Design System");
  return (
    <div className="bg-ivory min-h-screen">
      <Navigation transparentOnTop={false} />
      <div className="content-container pt-[112px] sm:pt-[152px] pb-64">
        <p className="text-tiny uppercase tracking-[0.14em] text-muted mb-16">Design System Reference</p>
        <h1 id="main-heading" tabIndex="-1" className="font-display text-h1 sm:text-display-sm text-heading">ÉLANE Design System</h1>
        <p className="text-body-md text-muted mt-16 max-w-[60ch]">
          Living reference, every token and component this site is built from.
          Nothing on any real page should exist outside this library.
        </p>
      </div>

      <Section title="Colour Tokens">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-24">
          {swatches.map(([label, cls, extra]) => (
            <div key={label}>
              <div className={`h-64 rounded-card ${cls} ${extra}`} />
              <p className="text-caption text-charcoal mt-8">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className="flex flex-col gap-24">
          <p className="font-display text-display-xl text-heading">Display XL — 72</p>
          <p className="font-display text-display-md text-heading">Display MD — 56</p>
          <h1 className="text-h1">Heading H1 — 56</h1>
          <h2 className="text-h2">Heading H2 — 48</h2>
          <h3 className="text-h3">Heading H3 — 36</h3>
          <h4 className="text-h4">Heading H4 — 28</h4>
          <h5 className="text-h5">Heading H5 — 22</h5>
          <p className="text-body-lg">Body Large — 20. The quiet confidence of restraint.</p>
          <p className="text-body-md">Body Regular — 18. The quiet confidence of restraint.</p>
          <p className="text-body-sm">Body Small — 16. The quiet confidence of restraint.</p>
          <p className="text-caption text-muted">Caption — 14, muted text.</p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-24">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost / Text Button</Button>
          <IconButton icon={Heart} label="Wishlist" className="border border-border" />
        </div>
      </Section>

      <Section title="Tags & Badges">
        <div className="flex flex-wrap items-center gap-16">
          <Tag>New</Tag>
          <Tag>Limited</Tag>
          <Tag tone="exclusive">Exclusive</Tag>
          <Tag>Bestseller</Tag>
          <Tag tone="sold">Sold Out</Tag>
          <Badge>Free Shipping</Badge>
          <Badge>Handmade</Badge>
        </div>
      </Section>

      <Section title="Product Card">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-32">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <Section title="Editorial Card">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-32">
          {journal.slice(0, 3).map((j) => (
            <EditorialCard key={j.title} {...j} />
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
}
