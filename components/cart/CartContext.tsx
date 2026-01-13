"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string; // productId
  name: string;
  code: string;
  price: number;
  image?: string;
  size?: string;
  color?: string;
  quantity: number;
  stock?: number;
};

export type CartState = {
  items: CartItem[];
};

const STORAGE_KEY = "urunstok_cart_v1";

const CartContext = createContext<{
  items: CartItem[];
  count: number;
  total: number;
  add: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateQty: (id: string, key: string | undefined, quantity: number) => void;
  remove: (id: string, key?: string) => void;
  clear: () => void;
} | null>(null);

function itemKey(item: Pick<CartItem, "id" | "size" | "color">) {
  return `${item.id}::${item.size || "-"}::${item.color || "-"}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartState = JSON.parse(raw);
        if (Array.isArray(parsed.items)) setItems(parsed.items);
      }
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    const state: CartState = { items };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [items]);

  const value = useMemo(() => {
    const count = items.reduce((acc, it) => acc + it.quantity, 0);
    const total = items.reduce((acc, it) => acc + it.quantity * (it.price || 0), 0);

    function add(newItem: Omit<CartItem, "quantity"> & { quantity?: number }) {
      const qty = Math.max(1, newItem.quantity ?? 1);
      const key = itemKey(newItem);
      setItems((prev) => {
        const idx = prev.findIndex((p) => itemKey(p) === key);
        if (idx >= 0) {
          const copy = [...prev];
          const nextQty = Math.min(999, (copy[idx].quantity || 0) + qty);
          copy[idx] = { ...copy[idx], quantity: nextQty };
          return copy;
        }
        return [
          ...prev,
          {
            id: newItem.id,
            name: newItem.name,
            code: newItem.code,
            price: newItem.price,
            image: newItem.image,
            size: newItem.size,
            color: newItem.color,
            quantity: qty,
            stock: newItem.stock,
          },
        ];
      });
    }

    function updateQty(id: string, key: string | undefined, quantity: number) {
      setItems((prev) => {
        const copy = prev.map((it) => ({ ...it }));
        const idx = copy.findIndex((it) => (key ? itemKey(it) === key : it.id === id));
        if (idx >= 0) {
          copy[idx].quantity = Math.max(1, Math.min(999, quantity));
        }
        return copy;
      });
    }

    function remove(id: string, key?: string) {
      setItems((prev) => prev.filter((it) => (key ? itemKey(it) !== key : it.id !== id)));
    }

    function clear() {
      setItems([]);
    }

    return { items, count, total, add, updateQty, remove, clear };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
