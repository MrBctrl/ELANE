import { createContext, useContext, useState } from "react";
import { useToast } from "./ToastContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);
  const { showToast } = useToast();

  const toggle = (product) => {
    const alreadySaved = ids.includes(product.id);
    setIds((prev) =>
      alreadySaved ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
    showToast(
      alreadySaved ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`,
      "info"
    );
  };

  const isSaved = (id) => ids.includes(id);

  return (
    <WishlistContext.Provider value={{ ids, toggle, isSaved, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
