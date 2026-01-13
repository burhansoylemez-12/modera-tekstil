'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    zipCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [notes, setNotes] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutFormHtml, setCheckoutFormHtml] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        // Eğer varsayılan adres varsa doldur
        const defaultAddr = data.user.addresses?.find((a: any) => a.isDefault);
        if (defaultAddr) {
          setAddress({
            fullName: defaultAddr.fullName || data.user.name,
            phone: defaultAddr.phone || data.user.phone || '',
            address: defaultAddr.address || '',
            city: defaultAddr.city || '',
            district: defaultAddr.district || '',
            zipCode: defaultAddr.zipCode || '',
          });
        } else {
          setAddress({
            ...address,
            fullName: data.user.name,
            phone: data.user.phone || '',
          });
        }
        setCheckingAuth(false);
      } else {
        // Giriş yapılmamışsa giriş sayfasına yönlendir
        router.push('/giris?redirect=/odeme');
      }
    } catch (err) {
      router.push('/giris?redirect=/odeme');
    }
  };

  const handleCreditCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.fullName || !address.phone || !address.address || !address.city) {
      alert('Lütfen teslimat adresi bilgilerini doldurun');
      return;
    }

    setLoading(true);

    try {
      // İlk olarak siparişi oluştur
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            product: item.id,
            name: item.name,
            code: item.code,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.image,
          })),
          shippingAddress: address,
          paymentMethod: 'credit_card',
          notes,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        alert('Sipariş oluşturulamadı');
        setLoading(false);
        return;
      }

      // iyzico checkout form oluştur
      const paymentRes = await fetch('/api/payments/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.order.orderNumber,
          totalAmount: total,
          buyerName: address.fullName,
          buyerEmail: user?.email || 'info@modera.com.tr',
          buyerPhone: address.phone,
          items: items.map(item => ({
            product: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          shippingAddress: address,
        }),
      });

      const paymentData = await paymentRes.json();

      if (paymentData.success) {
        // Checkout form'u göster
        setCheckoutFormHtml(paymentData.checkoutFormContent);
        setShowCheckoutForm(true);
      } else {
        alert('Ödeme formu oluşturulamadı');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.fullName || !address.phone || !address.address || !address.city) {
      alert('Lütfen zorunlu alanları doldurun');
      return;
    }

    if (paymentMethod === 'credit_card') {
      handleCreditCardPayment(e);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            product: item.id,
            name: item.name,
            code: item.code,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.image,
          })),
          shippingAddress: address,
          paymentMethod,
          notes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        clear();
        alert(`Siparişiniz alındı! Sipariş No: ${data.order.orderNumber}`);
        router.push('/profil/siparisler');
      } else {
        alert(data.message || 'Sipariş oluşturulamadı');
      }
    } catch (err) {
      alert('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="py-12 bg-gray-50 min-h-screen">
        <div className="container-custom max-w-5xl">
          {checkingAuth ? (
            <div className="text-center py-12">
              <p className="text-lg">Yükleniyor...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <h1 className="text-2xl font-bold mb-4">Sepetiniz Boş</h1>
              <p className="text-gray-600 mb-6">Sipariş vermek için önce sepetinize ürün ekleyin.</p>
              <a href="/urunler" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
                Alışverişe Başla
              </a>
            </div>
          ) : showCheckoutForm ? (
            // iyzico Checkout Form
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold mb-6">Kredi Kartı ile Öde</h1>
              <div dangerouslySetInnerHTML={{ __html: checkoutFormHtml }} />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-8">Sipariş Özeti</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left - Address & Payment */}
              <div className="lg:col-span-2 space-y-6">
                {/* Teslimat Adresi */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Teslimat Adresi</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        required
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        required
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Adres *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={address.address}
                        onChange={(e) => setAddress({ ...address, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        İl *
                      </label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        İlçe
                      </label>
                      <input
                        type="text"
                        value={address.district}
                        onChange={(e) => setAddress({ ...address, district: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Posta Kodu
                      </label>
                      <input
                        type="text"
                        value={address.zipCode}
                        onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Ödeme Yöntemi */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Ödeme Yöntemi</h2>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="credit_card"
                        checked={paymentMethod === 'credit_card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5"
                      />
                      <span className="font-semibold">Kredi Kartı / Banka Kartı</span>
                    </label>

                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="bank_transfer"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5"
                      />
                      <span className="font-semibold">Havale / EFT</span>
                    </label>

                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="cash_on_delivery"
                        checked={paymentMethod === 'cash_on_delivery'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5"
                      />
                      <span className="font-semibold">Kapıda Ödeme</span>
                    </label>
                  </div>

                  {paymentMethod === 'credit_card' && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 font-semibold">
                        ✓ Kredi kartı ödeme entegrasyonu aktif. İyzico üzerinden güvenli ödeme yapabilirsiniz.
                      </p>
                    </div>
                  )}
                </div>

                {/* Sipariş Notu */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Sipariş Notu (Opsiyonel)</h2>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Siparişiniz ile ilgili özel notlarınız varsa buraya yazabilirsiniz..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              {/* Right - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>
                  
                  <div className="space-y-3 mb-4">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex gap-3 pb-3 border-b">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">
                            {item.size && `${item.size}`} {item.color && `• ${item.color}`}
                          </p>
                          <p className="text-sm font-semibold">{item.quantity} x {formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Ara Toplam</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Kargo</span>
                      <span className="text-green-600">Ücretsiz</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-2 border-t">
                      <span>Toplam</span>
                      <span className="text-red-600">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'İşleniyor...' : 'Siparışı Tamamla'}
                  </button>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Siparişinizi tamamlayarak{' '}
                    <a href="#" className="text-red-600">gizlilik politikasını</a> kabul etmiş olursunuz.
                  </p>
                </div>
              </div>
            </div>
          </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
