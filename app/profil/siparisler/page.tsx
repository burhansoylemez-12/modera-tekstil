'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { FaBox, FaCalendar, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        router.push('/giris');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: any = {
      pending: 'Beklemede',
      confirmed: 'Onaylandı',
      preparing: 'Hazırlanıyor',
      shipped: 'Kargoda',
      delivered: 'Teslim Edildi',
      cancelled: 'İptal Edildi',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: any = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="py-12 min-h-screen">
          <div className="container-custom text-center">
            <p>Yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="py-12 bg-gray-50 min-h-screen">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Profilim</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <aside className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
                <Link 
                  href="/profil"
                  className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Hesap Bilgilerim
                </Link>
                <Link 
                  href="/profil/siparisler"
                  className="block px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold"
                >
                  Siparişlerim
                </Link>
                <Link 
                  href="/profil/adresler"
                  className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Adreslerim
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-red-600"
                >
                  Çıkış Yap
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Siparişlerim</h2>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Henüz siparişiniz bulunmuyor</p>
                    <Link href="/urunler" className="text-red-600 font-semibold hover:text-red-700">
                      Alışverişe Başla
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order._id} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-red-300 transition-colors">
                        {/* Sipariş Başlığı */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">Sipariş #{order.orderNumber}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                <FaCalendar size={14} />
                                <span>
                                  {new Date(order.createdAt).toLocaleDateString('tr-TR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.orderStatus)}`}>
                              {getStatusText(order.orderStatus)}
                            </span>
                          </div>
                        </div>

                        {/* Ürünler */}
                        <div className="px-6 py-4 border-b border-gray-200">
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FaBox size={18} className="text-red-600" />
                            Sipariş Detayları
                          </h4>
                          <div className="space-y-3">
                            {order.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex gap-4 pb-3 border-b last:border-b-0 last:pb-0">
                                <div className="flex-shrink-0">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-20 h-20 object-cover rounded-lg shadow-sm" 
                                  />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-900">{item.name}</h5>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Kod: {item.code}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {item.size && <span className="mr-3">Beden: <span className="font-medium">{item.size}</span></span>}
                                    {item.color && <span>Renk: <span className="font-medium">{item.color}</span></span>}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm text-gray-600 mb-1">
                                    <span className="bg-gray-100 px-2 py-1 rounded font-medium">{item.quantity} adet</span>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    <p className="text-xs text-gray-500">{formatPrice(item.price)} × {item.quantity}</p>
                                    <p className="text-lg font-bold text-red-600 mt-1">
                                      {formatPrice(item.price * item.quantity)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Teslimat Adresi */}
                        <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
                          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <FaMapMarkerAlt size={18} className="text-blue-600" />
                            Teslimat Adresi
                          </h4>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p className="font-semibold">{order.shippingAddress.fullName}</p>
                            <p className="flex items-center gap-2">
                              <FaPhone size={12} />
                              {order.shippingAddress.phone}
                            </p>
                            <p>{order.shippingAddress.address}</p>
                            <p>
                              {order.shippingAddress.district && `${order.shippingAddress.district}, `}
                              {order.shippingAddress.city}
                              {order.shippingAddress.zipCode && ` ${order.shippingAddress.zipCode}`}
                            </p>
                          </div>
                        </div>

                        {/* Özet ve Ödeme */}
                        <div className="px-6 py-4">
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Ara Toplam</span>
                              <span className="font-medium">{formatPrice(order.totalAmount)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Kargo</span>
                              <span className="font-medium text-green-600">Ücretsiz</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between items-center">
                              <span className="font-bold text-gray-900">TOPLAM</span>
                              <span className="text-2xl font-bold text-red-600">{formatPrice(order.totalAmount)}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                            <div className="text-center">
                              <p className="text-xs text-gray-600 uppercase mb-1">Ödeme Yöntemi</p>
                              <p className="font-semibold text-sm">
                                {order.paymentMethod === 'credit_card' && 'Kredi Kartı'}
                                {order.paymentMethod === 'bank_transfer' && 'Havale/EFT'}
                                {order.paymentMethod === 'cash_on_delivery' && 'Kapıda Ödeme'}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-600 uppercase mb-1">Ödeme Durumu</p>
                              <p className="font-semibold text-sm">
                                {order.paymentStatus === 'pending' && <span className="text-yellow-600">Beklemede</span>}
                                {order.paymentStatus === 'paid' && <span className="text-green-600">Ödendi</span>}
                                {order.paymentStatus === 'failed' && <span className="text-red-600">Başarısız</span>}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
