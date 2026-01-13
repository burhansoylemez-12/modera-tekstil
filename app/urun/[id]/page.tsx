import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatPrice } from '@/lib/utils';

async function getProduct(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.success) return null;
    return data.product;
  } catch {
    return null;
  }
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <>
      <Header />
      <main className="py-4 md:py-8">
        <div className="container-custom">
          {!product ? (
            <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center">
              <h1 className="text-xl md:text-2xl font-bold mb-2">Ürün bulunamadı</h1>
              <p className="text-gray-500 text-sm md:text-base">Aradığınız ürün silinmiş veya mevcut değil.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 bg-white rounded-lg shadow-md p-4 md:p-6">
              <div>
                {/* Görsel */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.images?.[0] || '/placeholder-product.jpg'} alt={product.name} className="w-full rounded-lg object-cover" />
                <div className="mt-2 md:mt-3 grid grid-cols-5 gap-1 md:gap-2">
                  {(product.images || []).slice(0, 5).map((img: string, idx: number) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={idx} src={img} alt={`${product.name}-${idx}`} className="w-full h-16 md:h-20 object-cover rounded" />
                  ))}
                </div>
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">Kod: {product.code} • Kategori: {product.category}</p>
                <div className="text-2xl md:text-3xl font-bold text-red-600 mb-4 md:mb-6">{formatPrice(product.price)}</div>

                {/* Sepete ekle formu */}
                {/* @ts-expect-error Server/Client boundary */}
                <AddToCartForm product={product} />

                <div className="mt-4 md:mt-6 text-xs md:text-sm text-gray-600 whitespace-pre-line">
                  {product.description}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

import AddToCartForm from './AddToCartForm';
