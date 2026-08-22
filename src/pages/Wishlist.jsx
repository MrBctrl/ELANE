import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import ProductCard from "../components/cards/ProductCard";
import { products } from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

export default function Wishlist() {
  usePageTitle("Wishlist");
  const { ids } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <div className="bg-ivory min-h-screen">
      <Navigation transparentOnTop={false} />

      <div className="content-container pt-[112px] sm:pt-[152px] pb-120">
        <h1 id="main-heading" tabIndex="-1" className="font-display text-h1 text-heading mb-64">Your Wishlist</h1>

        {saved.length === 0 ? (
          <div className="text-center py-80 max-w-[420px] mx-auto">
            <div className="w-80 h-80 rounded-full bg-beige mx-auto mb-32" />
            <h3 className="font-heading text-h4 text-heading">Nothing saved yet</h3>
            <p className="text-body-sm text-muted mt-16">
              Tap the heart on anything that catches your eye. We'll keep it here.
            </p>
            <Button as={Link} to="/collection" variant="primary" className="mt-32">
              Explore the Collection
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-32">
            {saved.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
