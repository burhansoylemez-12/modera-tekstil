import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaCheckCircle, FaTruck, FaHeadset, FaAward } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main className="py-12">
        <div className="container-custom">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hakkımızda</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tekstil sektöründe yılların deneyimi ve güvenilirliği ile hizmetinizdeyiz
            </p>
          </div>

          {/* Hikaye */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">Hikayemiz</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Modera Tekstil, 2010 yılında Burhan ve Ceren Söylemez tarafından tekstil sektörüne 
                  olan tutkuları ve kaliteli ürün sunma vizyonuyla kuruldu. Küçük bir aile işletmesi 
                  olarak başladığımız bu yolculukta, müşterilerimize değer katmak ve güven vermek 
                  en büyük önceliğimiz oldu.
                </p>
                <p>
                  Yıllar içinde edindiğimiz deneyim ve sektöre olan bağlılığımız sayesinde, Türkiye'nin 
                  dört bir yanındaki bireysel ve kurumsal müşterilerimize hizmet veren güvenilir bir 
                  marka haline geldik. Her bir ürünümüzü özenle seçiyor, kalite kontrolden geçiriyor 
                  ve müşteri memnuniyetini ön planda tutuyoruz.
                </p>
                <p>
                  Bugün, modern altyapımız, deneyimli ekibimiz ve geniş ürün yelpazemizle sizlere 
                  en iyi hizmeti sunmanın gururunu yaşıyoruz. Modera Tekstil olarak, tekstil dünyasında 
                  kalite, güven ve yenilikçiliğin simgesi olmaya devam ediyoruz.
                </p>
              </div>
            </div>
          </div>

          {/* Değerlerimiz */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Neden Bizi Seçmelisiniz?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Kalite Garantisi</h3>
                <p className="text-gray-600">
                  Tüm ürünlerimiz kalite kontrol süreçlerinden geçer
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTruck className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Hızlı Teslimat</h3>
                <p className="text-gray-600">
                  Siparişleriniz en kısa sürede kapınızda
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeadset className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Müşteri Desteği</h3>
                <p className="text-gray-600">
                  7/24 aktif destek ekibimiz yanınızda
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaAward className="text-orange-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Uzman Kadro</h3>
                <p className="text-gray-600">
                  Deneyimli ve profesyonel ekibimiz
                </p>
              </div>
            </div>
          </div>

          {/* İstatistikler */}
          <div className="bg-blue-600 text-white rounded-lg p-12 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">14+</div>
                <div className="text-blue-200">Yıllık Deneyim</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">5000+</div>
                <div className="text-blue-200">Mutlu Müşteri</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-blue-200">Ürün Çeşidi</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-blue-200">İl'e Teslimat</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Siz de Aramıza Katılın</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Kaliteli tekstil ürünleri için doğru adrestesiniz. 
              Ürünlerimizi incelemek ve sipariş vermek için bizimle iletişime geçin.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/urunler" className="btn-primary">
                Ürünleri İncele
              </a>
              <a href="/iletisim" className="btn-secondary">
                İletişime Geç
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
