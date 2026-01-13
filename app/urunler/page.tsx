import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

async function getProducts(category?: string) {
  try {
    const url = category 
      ? `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/products?category=${encodeURIComponent(category)}`
      : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/products`;
    
    const response = await fetch(url, {
      cache: 'no-store',
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    return [];
  }
}

async function getCategories() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/categories`, {
      cache: 'no-store',
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const selectedCategory = searchParams.category;
  const products = await getProducts(selectedCategory);
  const categories = await getCategories();

  return (
    <>
      <Header />
      
      <main className="py-6 md:py-12">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-8">Ürünlerimiz</h1>

          {/* Filtreler */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
            {/* Sol Sidebar - Kategoriler */}
            <aside className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6 md:sticky md:top-24">
                <h2 className="text-xl font-bold mb-4">Kategoriler</h2>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/urunler"
                      className={`block py-2 px-3 rounded transition-colors ${
                        !selectedCategory 
                          ? 'bg-red-600 text-white font-semibold' 
                          : 'hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      Tümü
                    </Link>
                  </li>
                  {categories.map((category: any) => (
                    <li key={category._id}>
                      <Link 
                        href={`/urunler?category=${category.slug}`}
                        className={`block py-2 px-3 rounded transition-colors ${
                          selectedCategory === category.slug 
                            ? 'bg-red-600 text-white font-semibold' 
                            : 'hover:bg-red-50 hover:text-red-600'
                        }`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Ürünler Grid */}
            <div className="md:col-span-3">
              {selectedCategory && (
                <div className="mb-4 text-sm text-gray-600">
                  <span className="font-semibold">
                    {categories.find((c: any) => c.slug === selectedCategory)?.name}
                  </span> kategorisinde <span className="font-semibold">{products.length}</span> ürün bulundu
                </div>
              )}
              {products.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-500 text-lg mb-4">
                    Henüz ürün bulunmamaktadır.
                  </p>
                  <p className="text-gray-400">
                    Admin panelinden ürün ekleyebilirsiniz.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
