import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import { QuantitySelector, TextField } from "../components/ui/Input";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import usePageTitle from "../hooks/usePageTitle";

export default function Cart() {
  usePageTitle("Your Bag");
  const { items, updateQty, removeItem, subtotal } = useCart();
  const { showToast } = useToast();
  const [coupon, setCoupon] = useState("");

  const applyCoupon = () => {
    if (!coupon.trim()) {
      showToast("Enter a coupon code first", "warning");
      return;
    }
    showToast(`"${coupon}" isn't a valid code`, "error");
  };

  return (
    <div className="bg-ivory min-h-screen">
      <Navigation transparentOnTop={false} />

      <div className="content-container pt-[112px] sm:pt-[152px] pb-120">
        <h1 id="main-heading" tabIndex="-1" className="font-display text-h1 text-heading mb-64">Your Bag</h1>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-3 gap-64">
            <div className="lg:col-span-2 divide-y divide-border">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-24 py-32 first:pt-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[90px] h-[112px] sm:w-[110px] sm:h-[140px] object-cover rounded-card shrink-0"
            loading="lazy"
            decoding="async"
          />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-tiny uppercase tracking-[0.08em] text-muted">{item.category}</p>
                        <h4 className="font-heading text-body-lg text-heading mt-4">{item.name}</h4>
                        <p className="text-caption text-muted mt-4">Size {item.size}</p>
                      </div>
                      <button
                        aria-label="Remove item"
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-muted hover:text-charcoal"
                      >
                        <X size={18} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-16">
                      <QuantitySelector value={item.qty} onChange={(q) => updateQty(item.id, item.size, q)} />
                      <p className="text-body-sm text-charcoal">{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-beige rounded-card p-32 h-fit">
              <h3 className="font-heading text-h5 text-heading mb-24">Order Summary</h3>

              <div className="flex gap-12 mb-24">
                <TextField
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1"
                />
                <Button variant="secondary" size="small" onClick={applyCoupon}>Apply</Button>
              </div>

              <div className="flex flex-col gap-12 text-body-sm">
                <div className="flex justify-between text-charcoal">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between font-heading text-h5 text-heading mt-24 pt-24 border-t border-charcoal/15">
                <span>Total</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              <Button as={Link} to="/checkout" variant="primary" className="w-full mt-32">Checkout</Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="text-center py-80 max-w-[420px] mx-auto">
      <div className="w-80 h-80 rounded-full bg-beige mx-auto mb-32" />
      <h3 className="font-heading text-h4 text-heading">Your bag is quiet, for now</h3>
      <p className="text-body-sm text-muted mt-16">
        Nothing here yet. Let's find something worth carrying home.
      </p>
      <Button as={Link} to="/collection" variant="primary" className="mt-32">Explore the Collection</Button>
    </div>
  );
}
