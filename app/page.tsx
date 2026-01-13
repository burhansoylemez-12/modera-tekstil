import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FaWhatsapp, FaCheckCircle, FaTruck, FaHeadset } from 'react-icons/fa';

async function getProducts() {
  // API'den ürünleri çek - şimdilik boş array
  return [];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12 md:py-16 lg:py-20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Kaliteli Tekstil Ürünleri
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-red-100">
                Toptan ve perakende tekstil ürünlerinde en uygun fiyatlar
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                <Link href="/urunler" className="bg-white text-red-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-all text-center">
                  Ürünleri İncele
                </Link>
                <a 
                  href="https://wa.me/905444832718" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <FaWhatsapp size={20} className="md:w-[24px] md:h-[24px]" />
                  WhatsApp İletişim
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Özellikler */}
        <section className="py-10 md:py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-red-600" size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Kaliteli Ürünler</h3>
                <p className="text-gray-600">Yüksek kalite standartlarında tekstil ürünleri</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTruck className="text-green-600" size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Hızlı Teslimat</h3>
                <p className="text-gray-600">Siparişleriniz güvenli ve hızlı şekilde kargoda</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeadset className="text-purple-600" size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">7/24 Destek</h3>
                <p className="text-gray-600">Müşteri memnuniyeti odaklı destek hizmeti</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popüler Ürünler */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popüler Ürünler</h2>
              <p className="text-gray-600 text-lg">En çok tercih edilen tekstil ürünlerimiz</p>
            </div>
            
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-6">
                  Ürünler yükleniyor veya henüz ürün eklenmemiş.
                </p>
                <Link href="/urunler" className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 rounded-lg font-semibold transition-all text-center">
                  Tüm Ürünleri Görüntüle
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Ürün kartları buraya gelecek */}
              </div>
            )}
          </div>
        </section>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/905444832718"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 animate-bounce"
          aria-label="WhatsApp ile iletişime geç"
        >
          <FaWhatsapp size={32} />
        </a>
      </main>

      <Footer />
    </>
  );
}
