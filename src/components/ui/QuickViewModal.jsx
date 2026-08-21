import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Button from "./Button";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

export default function QuickViewModal({ product, open, onClose }) {
  const [size, setSize] = useState(null);
  const { addItem } = useCart();
  const { showToast } = useToast();
  if (!product) return null;

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-[720px]">
      <div className="grid sm:grid-cols-2">
        <div className="aspect-[4/5] sm:aspect-auto bg-beige">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        </div>
        <div className="p-40">
          <p className="text-tiny uppercase tracking-[0.08em] text-muted">{product.category}</p>
          <h3 className="font-heading text-h4 text-heading mt-8">{product.name}</h3>
          <p className="text-body-md text-charcoal mt-16">{product.price}</p>

          <div className="mt-32">
            <p className="text-tiny uppercase tracking-[0.08em] text-muted mb-12">Size</p>
            <div className="flex gap-8 flex-wrap">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-40 h-40 rounded-btn border text-tiny transition-colors ${
                    size === s
                      ? "bg-charcoal text-warm-white border-charcoal"
                      : "border-border text-charcoal hover:border-charcoal"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full mt-32"
            onClick={() => {
              if (!size) {
                showToast("Please select a size first", "warning");
                return;
              }
              addItem(product, 1, size);
              onClose();
            }}
          >
            Add to Bag
          </Button>

          <Link
            to={`/product/${product.id}`}
            onClick={onClose}
            className="block text-center text-tiny text-muted hover:text-charcoal underline underline-offset-4 mt-20"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </Modal>
  );
}
