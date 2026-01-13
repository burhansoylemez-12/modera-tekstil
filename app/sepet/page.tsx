"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/components/cart/CartContext';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { items, total, updateQty, remove, clear } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Sepetiniz boş');
      return;
    }
    router.push('/odeme');
  };

  return (
    <>
      <Header />
      <main className="py-6 md:py-10">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Sepetiniz</h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center text-gray-600">
              Sepetiniz boş.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md divide-y">
                {items.map((it) => {
                  const key = `${it.id}::${it.size || '-'}::${it.color || '-'}`;
                  return (
                    <div key={key} className="p-3 md:p-4">
                      <div className="flex gap-3 md:gap-4 mb-3 md:mb-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={it.image || '/placeholder-product.jpg'} alt={it.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-800 text-sm md:text-base">{it.name}</div>
                          <div className="text-xs md:text-sm text-gray-500">Kod: {it.code}</div>
                          <div className="text-xs md:text-sm text-gray-600">
                            {it.size && <span className="mr-2 md:mr-3">Beden: {it.size}</span>}
                            {it.color && <span>Renk: {it.color}</span>}
                          </div>
                          <div className="md:hidden mt-2 font-semibold text-sm">{formatPrice(it.price)}</div>
                        </div>
                        <div className="hidden md:block w-28 text-right font-semibold">{formatPrice(it.price)}</div>
                      </div>
                      <div className="flex items-center justify-between md:justify-start gap-3 md:gap-4 mt-3 md:mt-0">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(it.id, key, Math.max(1, it.quantity - 1))} className="px-2 py-1 bg-gray-200 rounded text-sm">-</button>
                          <input
                            type="number"
                            className="w-12 md:w-16 text-center border border-gray-300 rounded py-1 text-sm"
                            value={it.quantity}
                            min={1}
                            onChange={(e) => updateQty(it.id, key, Math.max(1, parseInt(e.target.value || '1')))}
                          />
                          <button onClick={() => updateQty(it.id, key, Math.min(999, it.quantity + 1))} className="px-2 py-1 bg-gray-200 rounded text-sm">+</button>
                        </div>
                        <div className="font-bold text-red-600 text-sm md:text-base md:w-28 md:text-right">{formatPrice(it.price * it.quantity)}</div>
                        <button onClick={() => remove(it.id, key)} className="text-red-600 hover:text-red-800 font-medium text-xs md:text-sm">Kaldır</button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <aside className="bg-white rounded-lg shadow-md p-4 md:p-6 h-fit">
                <div className="flex justify-between text-base md:text-lg font-semibold mb-3 md:mb-4">
                  <span>Toplam</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <button onClick={clear} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 md:py-3 rounded-lg font-semibold mb-3 text-sm md:text-base">
                  Sepeti Temizle
                </button>
                <button onClick={handleCheckout} className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base mb-2">
                  Sipariş Ver
                </button>
                <a href="/teklif-al" className="block text-center w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base">
                  Teklif Al
                </a>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
