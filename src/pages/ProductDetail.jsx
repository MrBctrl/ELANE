import { useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/ui/Breadcrumb";
import ProductGallery from "../components/sections/ProductGallery";
import Button from "../components/ui/Button";
import { QuantitySelector } from "../components/ui/Input";
import Accordion from "../components/ui/Accordion";
import ProductCard from "../components/cards/ProductCard";
import ReviewCard from "../components/cards/ReviewCard";
import { Heart, Star } from "lucide-react";
import { productDetail, reviews } from "../data/productDetail";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import SizeGuideModal from "../components/ui/SizeGuideModal";
import usePageTitle from "../hooks/usePageTitle";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { id } = useParams();
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addItem } = useCart();
  const { toggle, isSaved } = useWishlist();
  const { showToast } = useToast();

  // An unknown :id (dead link, old bookmark, typo) must 404 — silently
  // substituting a different real product would make a broken link look
  // like it worked, just pointing at the wrong item.
  const match = products.find((prod) => prod.id === id);
  usePageTitle(match ? match.name : "Page Not Found");
  if (!match) return <NotFound />;

  // Every product now carries its own 3-shot gallery (see `gallery` field in
  // products.js) so detail/texture/on-model images are unique per product —
  // they no longer fall back to one shared set unless a product hasn't had
  // its gallery filled in yet, in which case the generic template is used.
  const p = {
    ...productDetail,
    name: match.name,
    category: match.category,
    price: match.price,
    images: [match.image, ...(match.gallery && match.gallery.length ? match.gallery : productDetail.images.slice(1))],
  };

  const productForState = { id: match.id, name: p.name, price: p.price, image: p.images[0], category: p.category };
  const saved = isSaved(productForState.id);

  // Recommendations must never include the product you're already looking
  // at, and should have some relationship to it (same gender first) rather
  // than always showing the same fixed slice of the catalogue.
  const others = products.filter((prod) => prod.id !== match.id);
  const sameGenderFirst = [...others].sort((a, b) => {
    const aMatch = a.gender === match.gender ? 0 : 1;
    const bMatch = b.gender === match.gender ? 0 : 1;
    return aMatch - bMatch;
  });
  const frequentlyBoughtTogether = sameGenderFirst.slice(0, 3);
  const completeTheLook = sameGenderFirst.slice(0, 4);
  const relatedProducts = [...sameGenderFirst].reverse().slice(0, 4);

  return (
    <div className="bg-ivory">
      <Navigation transparentOnTop={false} />

      {/* Hero Images + purchase panel */}
      <div className="content-container pt-[112px] sm:pt-[152px] pb-80">
        <Breadcrumb items={["Home", match.gender || "Collection", p.category, p.name]} />

        <div className="grid lg:grid-cols-2 gap-64 mt-32">
          <ProductGallery images={p.images} fallback={match.image} />

          <div>
            <p className="text-tiny uppercase tracking-[0.1em] text-muted">{p.category}</p>
            <h1 id="main-heading" tabIndex="-1" className="font-display text-h1 text-heading mt-8 max-w-[18ch]">{p.name}</h1>

            <div className="flex items-center gap-8 mt-16">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} strokeWidth={1.5} className={i < p.rating ? "fill-gold text-gold" : "text-border-light"} />
              ))}
              <span className="text-caption text-muted ml-8">{p.reviewCount} reviews</span>
            </div>

            <p className="font-heading text-h3 text-heading mt-24">{p.price}</p>

            <p className="text-body-sm text-muted mt-24 max-w-[52ch]">{p.story}</p>

            <div className="mt-40">
              <p className="text-tiny uppercase tracking-[0.08em] text-muted mb-16">Size</p>
              <div className="flex flex-wrap gap-12">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-48 h-48 rounded-btn border text-caption transition-colors ${
                      size === s
                        ? "bg-charcoal text-warm-white border-charcoal"
                        : "border-border text-charcoal hover:border-charcoal"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-tiny text-muted underline underline-offset-4 mt-16 hover:text-charcoal"
              >
                Size Guide
              </button>
            </div>

            <div className="flex items-center gap-16 mt-40">
              <QuantitySelector value={qty} onChange={setQty} />
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  if (!size) {
                    showToast("Please select a size first", "warning");
                    return;
                  }
                  addItem(productForState, qty, size);
                }}
              >
                Add to Bag
              </Button>
              <button
                aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => toggle(productForState)}
                className="w-56 h-56 rounded-btn border border-border flex items-center justify-center shrink-0 hover:border-charcoal transition-colors"
              >
                <Heart size={18} strokeWidth={1.5} className={saved ? "fill-charcoal text-charcoal" : "text-charcoal"} />
              </button>
            </div>

            <div className="mt-64">
              <Accordion items={p.details} />
            </div>
          </div>
        </div>
      </div>

      {/* Lifestyle Images */}
      <div className="content-container grid grid-cols-1 sm:grid-cols-2 gap-16 pb-120">
        {p.images.slice(0, 2).map((img, i) => (
          <img
            key={img + i}
            src={img}
            alt=""
            loading="lazy"
            decoding="async"
            className="rounded-img w-full h-auto"
            onError={(e) => {
              if (e.target.src !== match.image) e.target.src = match.image;
            }}
          />
        ))}
      </div>

      {/* Recommendations */}
      <section className="section-padding bg-beige">
        <div className="content-container">
          <h2 className="font-heading text-h2 text-heading mb-64 text-center">Complete the Look</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-32">
            {completeTheLook.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding">
        <div className="content-container max-w-[760px]">
          <h2 className="font-heading text-h2 text-heading mb-48">Customer Reviews</h2>
          <div className="flex flex-col gap-32">
            {reviews.map((r) => (
              <ReviewCard key={r.name} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Bought Together */}
      <section className="section-padding bg-beige">
        <div className="content-container">
          <h2 className="font-heading text-h2 text-heading mb-16 text-center">Frequently Bought Together</h2>
          <p className="text-body-sm text-muted text-center mb-64">Often paired with {p.name}</p>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-24 lg:gap-16 max-w-[900px] mx-auto">
            {[match, ...frequentlyBoughtTogether].map((prod, i) => (
              <div key={prod.id} className="flex items-center gap-16 lg:gap-24 w-full lg:w-auto">
                {i > 0 && <span className="hidden lg:block text-h4 text-muted shrink-0">+</span>}
                <div className="flex-1 lg:flex-initial lg:w-[180px]">
                  <ProductCard product={prod} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-8 mt-48">
            <p className="text-body-sm text-muted">
              Bundle total:{" "}
              <span className="text-charcoal font-medium">
                ₦{[match, ...frequentlyBoughtTogether]
                  .reduce((sum, prod) => sum + Number(String(prod.price).replace(/[^\d]/g, "")), 0)
                  .toLocaleString()}
              </span>
            </p>
            <Button
              variant="primary"
              onClick={() => {
                frequentlyBoughtTogether.forEach((prod) =>
                  addItem({ id: prod.id, name: prod.name, price: prod.price, image: prod.image, category: prod.category }, 1, prod.sizes?.[0])
                );
                showToast("Bundle items added to your bag", "success");
              }}
            >
              Add Bundle to Bag
            </Button>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section-padding">
        <div className="content-container">
          <h2 className="font-heading text-h2 text-heading mb-64 text-center">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-32">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
