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

export type WishlistItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
};

type WishlistContextValue = {
  items: WishlistItem[];
  itemCount: number;
  wishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;
  addItem: (product: WishlistItem) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  toggleItem: (product: WishlistItem) => void;
};

const STORAGE_KEY = "sample-atelier-wishlist";
const WishlistContext = createContext<WishlistContextValue | null>(null);

function loadItems(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is WishlistItem =>
        typeof x === "object" &&
        x !== null &&
        typeof (x as WishlistItem).id === "string" &&
        typeof (x as WishlistItem).name === "string" &&
        typeof (x as WishlistItem).image === "string",
    );
  } catch {
    return [];
  }
}

function saveItems(items: WishlistItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveItems(items);
  }, [hydrated, items]);

  const itemCount = items.length;

  const openWishlist = useCallback(() => setWishlistOpen(true), []);
  const closeWishlist = useCallback(() => setWishlistOpen(false), []);
  const toggleWishlist = useCallback(() => setWishlistOpen((o) => !o), []);

  const hasItem = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items],
  );

  const addItem = useCallback((product: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [product, ...prev];
    });
    setWishlistOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const toggleItem = useCallback((product: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [product, ...prev];
    });
    setWishlistOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      wishlistOpen,
      openWishlist,
      closeWishlist,
      toggleWishlist,
      addItem,
      removeItem,
      hasItem,
      toggleItem,
    }),
    [
      items,
      itemCount,
      wishlistOpen,
      openWishlist,
      closeWishlist,
      toggleWishlist,
      addItem,
      removeItem,
      hasItem,
      toggleItem,
    ],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
