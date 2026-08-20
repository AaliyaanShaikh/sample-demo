"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { CONTACT, whatsappUrl } from "../../constants/contact";
import { getSaleItemById } from "../../data/sale";
import { PLACEHOLDER_PRICE } from "../../constants/pricing";

export default function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    clearCart,
    items,
    removeItem,
    setQuantity,
    itemCount,
  } = useCart();

  const shippingLabel = PLACEHOLDER_PRICE;
  const total = PLACEHOLDER_PRICE;

  function handleCheckoutToWhatsApp() {
    if (items.length === 0) return;

    const lines = items
      .map((line, index) => {
        return `${index + 1}. ${line.name}\n   Qty: ${line.quantity} x ${PLACEHOLDER_PRICE} = ${PLACEHOLDER_PRICE}`;
      })
      .join("\n");

    const message = [
      "Hello, I'd like to place this sample order:",
      "",
      lines,
      "",
      `Subtotal: ${PLACEHOLDER_PRICE}`,
      `Shipping: ${PLACEHOLDER_PRICE}`,
      `Total: ${PLACEHOLDER_PRICE}`,
      "",
      "Customer details:",
      "Name:",
      "Phone:",
      "Address:",
      "Pincode:",
    ].join("\n");

    window.open(whatsappUrl(CONTACT.whatsapp, message), "_blank", "noopener,noreferrer");
    clearCart();
    closeCart();
  }

  useEffect(() => {
    if (!cartOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, closeCart]);

  const node = (
    <AnimatePresence mode="sync">
      {cartOpen ? (
        <>
          <motion.button
            key="cart-backdrop"
            type="button"
            aria-label="Close cart overlay"
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0a] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2
                id="cart-title"
                className="font-serif text-xl tracking-wide text-white"
              >
                Your bag{" "}
                <span className="text-white/50 text-sm font-sans">
                  ({itemCount})
                </span>
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="text-white/70 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <X size={22} strokeWidth={1.25} />
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center px-2 min-h-[min(55vh,420px)]">
                  <p className="font-serif italic text-xl md:text-2xl text-white/50 mb-10">
                    Your bag is empty.
                  </p>
                  <Link
                    href="/collections"
                    onClick={closeCart}
                    className="text-[11px] tracking-[0.35em] uppercase text-white/45 border-b border-white/35 pb-1 hover:text-white/80 hover:border-white/55 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <ul className="space-y-8">
                  {items.map((line) => (
                    <li
                      key={line.id}
                      className="flex gap-4 border-b border-white/5 pb-8 last:border-0"
                    >
                      <Link
                        href={`/product/${line.id}`}
                        onClick={closeCart}
                        className="relative block h-24 w-20 shrink-0 overflow-hidden bg-[#111]"
                      >
                        <Image
                          src={line.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/product/${line.id}`}
                          onClick={closeCart}
                          className="font-serif text-white hover:opacity-90 line-clamp-2"
                        >
                          {line.name}
                        </Link>
                        {(() => {
                          const saleItem = getSaleItemById(line.id);
                          if (!saleItem) {
                            return (
                              <p className="mt-1 text-sm text-white/80">{line.price}</p>
                            );
                          }
                          return (
                            <p className="mt-1 flex items-center gap-2 text-sm">
                              <span className="text-white/45 line-through">
                                {saleItem.originalPrice}
                              </span>
                              <span className="text-white/90">{line.price}</span>
                            </p>
                          );
                        })()}
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex items-center border border-white/15">
                            <button
                              type="button"
                              onClick={() =>
                                setQuantity(line.id, line.quantity - 1)
                              }
                              className="p-2 text-white/80 hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} strokeWidth={1.5} />
                            </button>
                            <span className="min-w-[2rem] text-center text-sm text-white">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setQuantity(line.id, line.quantity + 1)
                              }
                              className="p-2 text-white/80 hover:text-white"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} strokeWidth={1.5} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(line.id)}
                            className="text-white/45 hover:text-white/80 p-2"
                            aria-label="Remove"
                          >
                            <Trash2 size={16} strokeWidth={1.25} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 ? (
              <div className="border-t border-white/10 px-6 py-6">
                <div className="flex justify-between gap-4 text-sm text-white/65">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-white/90">
                    {PLACEHOLDER_PRICE}
                  </span>
                </div>
                <div className="mt-3 flex justify-between gap-4 text-sm text-white/65">
                  <span>Shipping</span>
                  <span className="text-right text-xs uppercase tracking-wide tabular-nums text-white/55">
                    {shippingLabel}
                  </span>
                </div>
                <p className="mt-2 text-xs text-white/55">
                  Sample demo pricing is shown as {PLACEHOLDER_PRICE}.
                </p>
                <div
                  className="my-4 border-t border-dotted border-white/25"
                  aria-hidden
                />
                <div className="flex justify-between gap-4 text-base font-semibold text-white">
                  <span>Total</span>
                  <span className="tabular-nums">{total}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCheckoutToWhatsApp}
                  className="mt-6 flex w-full items-center justify-center gap-2 bg-white py-4 text-sm font-medium uppercase tracking-widest text-black hover:bg-white/90 transition-colors"
                >
                  Checkout
                  <ArrowRight size={18} strokeWidth={1.5} />
                </button>
                <Link
                  href="/collections"
                  onClick={closeCart}
                  className="mt-4 block text-center text-sm text-white/70 hover:text-white"
                >
                  Continue shopping
                </Link>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(node, document.body);
}
