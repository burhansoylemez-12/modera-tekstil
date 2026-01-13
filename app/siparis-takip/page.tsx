'use client';

import { useState, FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaSearch, FaWhatsapp } from 'react-icons/fa';
import { formatDate } from '@/lib/utils';

export default function OrderTrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/order-tracking?code=${trackingCode}`);
      const data = await response.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.error || 'Sipariş bulunamadı');
      }
    } catch (err) {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sipariş Alındı': return 'bg-blue-100 text-blue-800';
      case 'Hazırlanıyor': return 'bg-yellow-100 text-yellow-800';
      case 'Kargoya Verildi': return 'bg-purple-100 text-purple-800';
      case 'Teslim Edildi': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Header />
      
      <main className="py-6 md:py-12 min-h-screen">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Sipariş Takip</h1>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg">
              Takip kodunuz ile siparişinizin durumunu sorgulayabilirsiniz
            </p>
          </div>

          {/* Arama Formu */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  placeholder="Takip kodunuzu girin (örn: TK123ABC)"
                  className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg flex items-center gap-2 font-semibold transition-colors disabled:bg-gray-400"
              >
                <FaSearch />
                {loading ? 'Aranıyor...' : 'Sorgula'}
              </button>
            </form>
          </div>

          {/* Hata Mesajı */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">
              {error}
            </div>
          )}

          {/* Sipariş Detayları */}
          {order && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white px-8 py-6">
                <h2 className="text-2xl font-bold mb-2">Sipariş Detayları</h2>
                <p className="text-blue-100">Takip Kodu: {order.trackingCode}</p>
              </div>

              <div className="p-8">
                {/* Durum */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Sipariş Durumu</h3>
                  <div className="flex items-center gap-4">
                    <span className={`px-6 py-3 rounded-full text-lg font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-gray-600">
                      {formatDate(order.updatedAt)}
                    </span>
                  </div>
                </div>

                {/* Müşteri Bilgileri */}
                <div className="mb-8 pb-8 border-b">
                  <h3 className="text-lg font-semibold mb-4">Müşteri Bilgileri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Ad Soyad</p>
                      <p className="font-semibold">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Telefon</p>
                      <p className="font-semibold">{order.customerPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Ürünler */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Sipariş Edilen Ürünler</h3>
                  <div className="space-y-4">
                    {order.products.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{item.productName}</p>
                          <p className="text-sm text-gray-600">
                            Kod: {item.productCode} | Adet: {item.quantity}
                            {item.size && ` | Beden: ${item.size}`}
                            {item.color && ` | Renk: ${item.color}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notlar */}
                {order.notes && (
                  <div className="mb-8 pb-8 border-b">
                    <h3 className="text-lg font-semibold mb-4">Notlar</h3>
                    <p className="text-gray-700">{order.notes}</p>
                  </div>
                )}

                {/* İletişim */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    Siparişiniz hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz:
                  </p>
                  <a
                    href={`https://wa.me/905444832718?text=Merhaba, ${order.trackingCode} takip kodlu siparişim hakkında bilgi almak istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors max-w-xs mx-auto"
                  >
                    <FaWhatsapp size={20} />
                    WhatsApp ile İletişim
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Bilgilendirme */}
          {!order && !error && (
            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <p className="text-gray-700 mb-2">
                💡 Sipariş verdiğinizde size SMS ile gönderilen takip kodunu yukarıdaki alana girerek
                siparişinizin durumunu öğrenebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
