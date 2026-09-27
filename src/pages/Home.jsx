import { Link } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import Newsletter from "../components/sections/Newsletter";
import ProductCard from "../components/cards/ProductCard";
import EditorialCard from "../components/cards/EditorialCard";
import Button from "../components/ui/Button";
import { products } from "../data/products";
import { journal } from "../data/editorial";
import usePageTitle from "../hooks/usePageTitle";

const categories = [
  { name: "Women", to: "/collection?gender=Women", image: "/image/home/category-women.jpg" },
  { name: "Men", to: "/collection?gender=Men", image: "/image/home/category-men.jpg" },
  { name: "Beauty", to: "/collection?gender=Beauty", image: "/image/home/category-beauty.jpg" },
];

export default function Home() {
  usePageTitle("Home");
  return (
    <div className="bg-ivory">
      <Navigation />

      {/* Full Screen Hero */}
      <Hero
        image="/image/home/Hero2.png"
        eyebrow="The New Collection"
        title="Quiet luxury, worn with intention."
        subtitle="Tailoring rooted in African craftsmanship, made for those who choose confidence over noise."
      />

      {/* Featured Collection */}
      <section className="section-padding">
        <div className="content-container">
          <div className="flex items-end justify-between mb-64">
            <div>
              <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">
                Featured Collection
              </p>
              <h2 className="font-heading text-h2 text-heading max-w-[14ch]">
                Pieces worth returning to
              </h2>
            </div>
            <Button as={Link} to="/collection" variant="ghost" className="hidden sm:inline-flex">View All</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-32">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="section-padding bg-beige">
        <div className="content-container grid lg:grid-cols-2 gap-64 items-center">
          <img
            src="/image/home/philosophy-craftsmanship.png"
            alt="ÉLANE craftsmanship"
            className="rounded-img w-full aspect-[4/5] object-cover"
              loading="lazy"
              decoding="async"
            />
          <div>
            <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">
              Our Philosophy
            </p>
            <h2 className="font-heading text-h2 text-heading max-w-[16ch]">
              Confidence is the only accessory that matters.
            </h2>
            <p className="text-body-md text-muted mt-24 max-w-[52ch]">
              Every ÉLANE piece begins as a question: what does someone reach
              for when they've stopped trying to impress anyone but
              themselves? The answer is never loud. It's tailored, considered,
              and built to last far longer than a season.
            </p>
            <div className="mt-32">
              <Button as={Link} to="/about" variant="secondary">Our Story</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="content-container">
          <h2 className="font-heading text-h2 text-heading mb-64 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-32">
            {categories.map((c) => (
              <Link key={c.name} to={c.to} className="group relative block rounded-img overflow-hidden aspect-[3/4]">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                <span className="absolute bottom-32 left-32 font-heading text-h4 text-warm-white">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section-padding bg-beige">
        <div className="content-container">
          <div className="flex items-end justify-between mb-64">
            <div>
              <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">
                Most Loved
              </p>
              <h2 className="font-heading text-h2 text-heading max-w-[14ch]">
                Best Sellers
              </h2>
            </div>
            <Button as={Link} to="/collection" variant="ghost" className="hidden sm:inline-flex">View All</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-32">
            {products.slice(4, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Gallery */}
      <section className="section-padding">
        <div className="content-container grid grid-cols-2 lg:grid-cols-3 gap-16">
          {[
            { file: "lifestyle-everyday.jpg", alt: "ÉLANE piece styled for everyday wear" },
            { file: "lifestyle-evening.jpg", alt: "ÉLANE piece styled for an evening out" },
            { file: "lifestyle-accessories.jpg", alt: "ÉLANE accessories styled together" },
          ].map((item, i) => (
            <img
              key={item.file}
              src={`/image/home/${item.file}`}
              alt={item.alt}
              className={`rounded-img object-cover w-full aspect-[4/5] ${i === 1 ? "lg:mt-64" : ""}`}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-charcoal">
        <div className="content-container text-center max-w-[720px] mx-auto">
          <p className="font-display text-h4 sm:text-h3 lg:text-h2 text-warm-white leading-snug">
            &ldquo;ÉLANE doesn&rsquo;t just dress you, it changes how you
            carry yourself into a room.&rdquo;
          </p>
          <p className="text-caption text-warm-white/60 mt-32 uppercase tracking-[0.1em]">
            ROSELINE O., Lagos
          </p>
        </div>
      </section>

      {/* Journal Preview */}
      <section className="section-padding">
        <div className="content-container">
          <div className="flex items-end justify-between mb-64">
            <div>
              <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">
                From the Journal
              </p>
              <h2 className="font-heading text-h2 text-heading max-w-[16ch]">
                Stories, styling, and craft
              </h2>
            </div>
            <Button as={Link} to="/journal" variant="ghost" className="hidden sm:inline-flex">Read the Journal</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-32">
            {journal.slice(0, 3).map((j) => (
              <EditorialCard key={j.title} {...j} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
