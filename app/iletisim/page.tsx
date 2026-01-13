import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <>
      <Header />
      
      <main className="py-6 md:py-12">
        <div className="container-custom">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">İletişim</h1>
            <p className="text-gray-600 text-base md:text-lg">
              Sorularınız için bizimle iletişime geçin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
            {/* İletişim Bilgileri */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">İletişim Bilgilerimiz</h2>
              
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-blue-100 p-2 md:p-3 rounded-full flex-shrink-0">
                    <FaMapMarkerAlt className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm md:text-base">Adres</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Hacı Seyfettin Mahallesi Sağlam Sokak<br />
                      Aykent Apartman No:7 D:9<br />
                      Yıldırım / Bursa
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-green-100 p-2 md:p-3 rounded-full flex-shrink-0">
                    <FaPhone className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm md:text-base">Telefon</h3>
                    <a href="tel:+905444832718" className="text-gray-600 hover:text-blue-600 text-sm md:text-base">
                      0544 483 2718
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-purple-100 p-2 md:p-3 rounded-full flex-shrink-0">
                    <FaEnvelope className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm md:text-base">E-posta</h3>
                    <a href="mailto:bese.burhan201@gmail.com" className="text-gray-600 hover:text-blue-600 text-sm md:text-base">
                      bese.burhan201@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-500 p-3 rounded-full">
                    <FaWhatsapp className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <a 
                      href="https://wa.me/905444832718" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600"
                    >
                      0544 483 2718
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold mb-4">Çalışma Saatleri</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Pazartesi - Cuma:</span>
                    <span className="font-semibold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cumartesi:</span>
                    <span className="font-semibold">09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pazar:</span>
                    <span className="font-semibold text-red-600">Kapalı</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp İletişim */}
            <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Hızlı İletişim</h2>
              
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
                <FaWhatsapp size={48} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2">WhatsApp ile Sipariş</h3>
                <p className="text-green-100 mb-4">
                  Ürünlerimiz hakkında detaylı bilgi almak ve sipariş vermek için 
                  WhatsApp hattımızdan bize ulaşabilirsiniz.
                </p>
              </div>

              <a
                href="https://wa.me/905444832718"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white text-green-600 hover:bg-green-50 text-center px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                WhatsApp ile İletişime Geç
              </a>

              <div className="mt-8 space-y-3 text-green-100 text-sm">
                <p>✓ Hızlı yanıt garantisi</p>
                <p>✓ 7/24 destek hattı</p>
                <p>✓ Toptan fiyat teklifi</p>
                <p>✓ Ürün bilgilendirme</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
