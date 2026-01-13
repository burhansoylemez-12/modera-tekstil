import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 md:mt-20">
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Hakkımızda */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">TEKSTİL ÜRÜN</h3>
            <p className="text-sm mb-4">
              Toptan ve perakende kaliteli tekstil ürünlerinde güvenilir adresiniz.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-blue-400 transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-pink-400 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-blue-300 transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-red-400 transition-colors"><FaYoutube size={20} /></a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Ana Sayfa</a></li>
              <li><a href="/urunler" className="hover:text-white transition-colors">Ürünler</a></li>
              <li><a href="/kategoriler" className="hover:text-white transition-colors">Kategoriler</a></li>
              <li><a href="/teklif-al" className="hover:text-white transition-colors">Teklif Al</a></li>
              <li><a href="/siparis-takip" className="hover:text-white transition-colors">Sipariş Takip</a></li>
              <li><a href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</a></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">İletişim</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1" />
                <span>Hacı Seyfettin Mahallesi Sağlam Sokak<br />Aykent Apartman No:7 D:9<br />Yıldırım / Bursa</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone />
                <a href="tel:+905444832718" className="hover:text-white">0544 483 2718</a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope />
                <a href="mailto:bese.burhan201@gmail.com" className="hover:text-white">bese.burhan201@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Çalışma Saatleri */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Çalışma Saatleri</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Pazartesi - Cuma:</span>
                <span className="text-white">09:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Cumartesi:</span>
                <span className="text-white">09:00 - 14:00</span>
              </li>
              <li className="flex justify-between">
                <span>Pazar:</span>
                <span className="text-red-400">Kapalı</span>
              </li>
            </ul>
            <a 
              href="https://wa.me/905444832718" 
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
            >
              <FaWhatsapp size={18} />
              WhatsApp ile İletişim
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-4 text-center text-sm">
          <p>&copy; {currentYear} Tekstil Ürün. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
