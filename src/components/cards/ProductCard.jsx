import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import QuickViewModal from "../ui/QuickViewModal";

/**
 * Ref: Design System §3.10 — large image, name, category, price,
 * favourite, hover interaction, quick add. No unnecessary badges.
 */
export default function ProductCard({ product }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addItem } = useCart();
  const { toggle, isSaved } = useWishlist();
  const { image, name, category, price, tag } = product;
  const saved = isSaved(product.id);

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-product bg-beige aspect-[4/5]">
        <Link to={`/product/${product.id}`} className="absolute inset-0 block">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
        </Link>

        <button
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggle(product)}
          className="absolute top-16 right-16 w-40 h-40 rounded-full bg-warm-white/90 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 hover:scale-105"
        >
          <Heart
            size={17}
            strokeWidth={1.5}
            className={saved ? "fill-charcoal text-charcoal" : "text-charcoal"}
          />
        </button>

        <button
          aria-label="Quick view"
          onClick={() => setQuickViewOpen(true)}
          className="absolute top-16 left-16 w-40 h-40 rounded-full bg-warm-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105"
        >
          <Eye size={16} strokeWidth={1.5} className="text-charcoal" />
        </button>

        {tag && (
          <span className="absolute top-16 left-16 text-[10px] uppercase tracking-[0.1em] bg-warm-white/90 backdrop-blur-sm text-charcoal px-12 py-4 rounded-full pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
            {tag}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-16 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <button
            onClick={() => addItem(product, 1, "M")}
            className="w-full bg-charcoal/95 backdrop-blur-sm text-warm-white text-tiny uppercase tracking-[0.12em] py-14 rounded-btn hover:bg-charcoal"
          >
            Quick Add
          </button>
        </div>
      </div>

      <Link to={`/product/${product.id}`} className="block mt-16">
        <p className="text-tiny uppercase tracking-[0.08em] text-muted">{category}</p>
        <h4 className="font-heading text-body-md text-heading mt-4">{name}</h4>
        <p className="text-body-sm text-charcoal mt-4">{price}</p>
      </Link>

      <QuickViewModal product={product} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </div>
  );
}
