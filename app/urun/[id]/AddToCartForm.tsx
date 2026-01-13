'use client';

import { useState } from 'react';
import { useCart } from '@/components/cart/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function AddToCartForm({
  product,
}: {
  product: {
    _id: string;
    name: string;
    code: string;
    price: number;
    images: string[];
    sizes?: string[];
    colors?: string[];
    stock?: number;
  };
}) {
  const { add } = useCart();
  const [size, setSize] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [qty, setQty] = useState<number>(1);

  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
  const hasColors = Array.isArray(product.colors) && product.colors.length > 0;

  function onAdd() {
    if (hasSizes && !size) {
      alert('Lütfen beden seçin');
      return;
    }
    if (hasColors && !color) {
      alert('Lütfen renk seçin');
      return;
    }

    add({
      id: product._id,
      name: product.name,
      code: product.code,
      price: product.price,
      image: product.images?.[0],
      size: size || undefined,
      color: color || undefined,
      quantity: qty,
      stock: product.stock,
    });

    alert('Ürün sepete eklendi');
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {hasSizes && (
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Beden</label>
          <div className="flex flex-wrap gap-2">
            {product.sizes!.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`px-2.5 md:px-3 py-1 rounded border text-sm md:text-base ${size === s ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300'} hover:border-red-600`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasColors && (
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Renk</label>
          <div className="flex flex-wrap gap-2">
            {product.colors!.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`px-2.5 md:px-3 py-1 rounded border text-sm md:text-base ${color === c ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300'} hover:border-red-600`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Adet</label>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-2.5 md:px-3 py-1.5 md:py-2 bg-gray-200 rounded text-sm md:text-base">-</button>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || '1')))}
            className="w-16 md:w-20 text-center border border-gray-300 rounded py-1.5 md:py-2 text-sm md:text-base"
          />
          <button type="button" onClick={() => setQty((q) => Math.min(999, q + 1))} className="px-2.5 md:px-3 py-1.5 md:py-2 bg-gray-200 rounded text-sm md:text-base">+</button>
        </div>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors text-sm md:text-base"
      >
        <FaShoppingCart /> Sepete Ekle
      </button>
    </div>
  );
}
