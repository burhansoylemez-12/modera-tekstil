import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

async function getCategories() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/categories`, {
      cache: 'no-store',
    });

    if (!response.ok) return [] as Category[];

    const data = await response.json();
    return (data.categories as Category[]) || [];
  } catch (error) {
    return [] as Category[];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <Header />

      <main className="py-6 md:py-12">
        <div className="container-custom">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
            <div>
              <p className="text-xs md:text-sm uppercase tracking-wide text-red-600 font-semibold">Kategoriler</p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Ürün Kategorileri</h1>
              <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Toplam {categories.length} kategori listeleniyor.</p>
            </div>
            <Link
              href="/urunler"
              className="inline-flex items-center justify-center px-4 md:px-5 py-2.5 md:py-3 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-colors text-sm md:text-base"
            >
              Tüm Ürünleri Gör
            </Link>
          </div>

          {categories.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 md:p-10 text-center">
              <p className="text-base md:text-lg text-gray-500 mb-2 md:mb-3">Henüz aktif kategori bulunmuyor.</p>
              <p className="text-sm md:text-base text-gray-400">Admin panelinden kategori ekleyerek burada listeleyebilirsiniz.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {categories.map((category) => (
                <div key={category._id} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-4 md:p-6 flex flex-col gap-3 md:gap-4">
                  <div>
                    <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Kategori</p>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mt-1">{category.name}</h2>
                    <p className="text-gray-600 mt-2 line-clamp-3 text-sm md:text-base">
                      {category.description && category.description.trim().length > 0
                        ? category.description
                        : 'Bu kategoriye ait ürünleri keşfedin.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href={`/urunler?category=${category.slug}`}
                      className="text-red-600 font-semibold hover:text-red-700 text-sm md:text-base"
                    >
                      Ürünleri Gör
                    </Link>
                    <span className="text-xs px-2 md:px-3 py-1 rounded-full bg-red-50 text-red-700 font-semibold">
                      {category.slug}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
