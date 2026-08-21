import { createContext, useContext, useMemo, useState } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const { showToast } = useToast();

  const addItem = (product, qty = 1, size = "M") => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty, size }];
    });
    showToast(`${product.name} added to your bag`, "success");
  };

  const updateQty = (id, size, qty) =>
    setItems((prev) => prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i)));

  const removeItem = (id, size) =>
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));

  const clearCart = () => setItems([]);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + Number(String(i.price).replace(/[^\d]/g, "")) * i.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
