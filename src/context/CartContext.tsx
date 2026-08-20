"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getSaleItemById } from "../data/sale";

export type CartLine = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  clearCart: () => void;
  addItem: (product: Omit<CartLine, "quantity">) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
};

const STORAGE_KEY = "sample-atelier-cart";

const CartContext = createContext<CartContextValue | null>(null);

function loadItems(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is CartLine =>
        typeof x === "object" &&
        x !== null &&
        typeof (x as CartLine).id === "string" &&
        typeof (x as CartLine).quantity === "number",
    );
  } catch {
    return [];
  }
}

function saveItems(items: CartLine[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveItems(items);
  }, [items, hydrated]);

  const itemCount = useMemo(
    () => items.reduce((n, i) => n + i.quantity, 0),
    [items],
  );

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const toggleCart = useCallback(() => setCartOpen((o) => !o), []);
  const clearCart = useCallback(() => setItems([]), []);

  const addItem = useCallback((product: Omit<CartLine, "quantity">) => {
    const saleItem = getSaleItemById(product.id);
    const canonicalProduct = saleItem
      ? {
          id: saleItem.id,
          name: saleItem.name,
          price: saleItem.price,
          image: saleItem.image,
        }
      : product;

    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === canonicalProduct.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + 1,
        };
        return next;
      }
      return [...prev, { ...canonicalProduct, quantity: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((p) => p.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity } : p)),
    );
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      cartOpen,
      openCart,
      closeCart,
      toggleCart,
      clearCart,
      addItem,
      removeItem,
      setQuantity,
    }),
    [
      items,
      itemCount,
      cartOpen,
      openCart,
      closeCart,
      toggleCart,
      clearCart,
      addItem,
      removeItem,
      setQuantity,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
