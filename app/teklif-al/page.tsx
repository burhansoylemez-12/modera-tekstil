import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const contactMail = 'bese.burhan201@gmail.com';
const contactPhone = '+905444832718';

export default function QuotePage() {
  return (
    <>
      <Header />

      <main className="py-6 md:py-12 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="grid gap-6 md:gap-10 lg:grid-cols-5">
            {/* Hero + Highlights */}
            <section className="lg:col-span-2 space-y-4 md:space-y-6">
              <div className="space-y-2 md:space-y-3">
                <p className="text-xs md:text-sm font-semibold text-red-600 uppercase tracking-wide">Teklif Al</p>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  İhtiyacınıza uygun tekstil çözümleri için hızlı teklif alın.
                </h1>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Sipariş adedi, ürün tipi, beden/renk ve teslimat beklentilerinizi paylaşın; ekibimiz
                  en kısa sürede size dönüş yapsın.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {[
                  { title: 'Hızlı dönüş', desc: 'Aynı iş günü içerisinde teklif hazırlama.' },
                  { title: 'Esnek üretim', desc: 'Toptan ve perakende sipariş seçenekleri.' },
                  { title: 'Özel etiket', desc: 'Markanıza özel etiket ve paketleme.' },
                  { title: 'Numune desteği', desc: 'Talebe göre numune gönderimi.' },
                ].map((item) => (
                  <div key={item.title} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-sm font-semibold text-red-600">{item.title}</p>
                    <p className="text-gray-700 mt-1 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  href="/urunler"
                  className="px-4 md:px-5 py-2.5 md:py-3 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-colors text-sm md:text-base text-center"
                >
                  Ürünleri İncele
                </Link>
                <a
                  href={`https://wa.me/${contactPhone.replace(/[^\d]/g, '')}`}
                  className="px-4 md:px-5 py-2.5 md:py-3 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition-colors text-sm md:text-base text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp ile Yaz
                </a>
              </div>
            </section>

            {/* Form */}
            <section className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
                <div className="flex flex-col gap-1 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Teklif formu</h2>
                  <p className="text-gray-600">Kısa ve net bilgileri doldurun; satış ekibi size ulaşsın.</p>
                </div>

                <form
                  className="space-y-4"
                  method="POST"
                  action={`mailto:${contactMail}`}
                  encType="text/plain"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Ad Soyad *</label>
                      <input
                        required
                        name="ad_soyad"
                        type="text"
                        className="input-bordered"
                        placeholder="Örn: Ahmet Yılmaz"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Firma Adı</label>
                      <input
                        name="firma"
                        type="text"
                        className="input-bordered"
                        placeholder="Örn: ABC Tekstil"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Telefon *</label>
                      <input
                        required
                        name="telefon"
                        type="tel"
                        className="input-bordered"
                        placeholder="05xx xxx xx xx"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">E-posta</label>
                      <input
                        name="eposta"
                        type="email"
                        className="input-bordered"
                        placeholder="ornek@mail.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Ürün / Kategori *</label>
                      <input
                        required
                        name="urun"
                        type="text"
                        className="input-bordered"
                        placeholder="T-shirt, hoodie, polar vb."
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Adet *</label>
                      <input
                        required
                        name="adet"
                        type="number"
                        min={1}
                        className="input-bordered"
                        placeholder="Örn: 500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Beden / Renk</label>
                      <input
                        name="beden_renk"
                        type="text"
                        className="input-bordered"
                        placeholder="S-XL, lacivert, siyah, beyaz"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Teslimat Şehri</label>
                      <input
                        name="sehir"
                        type="text"
                        className="input-bordered"
                        placeholder="Örn: İstanbul"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Notlar</label>
                    <textarea
                      name="notlar"
                      rows={4}
                      className="input-bordered"
                      placeholder="Termin beklentisi, özel etiket, baskı/nakış, kumaş tercihi vb."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="flex items-start gap-2 text-sm text-gray-600">
                      <input type="checkbox" required className="mt-1" name="kvkk_onay" />
                      <span>
                        Formu göndererek iletişim bilgilerimin teklif ve bilgilendirme amacıyla kullanılmasına onay veriyorum.
                      </span>
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-colors"
                    >
                      Teklif İste
                    </button>
                    <a
                      className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors"
                      href={`tel:${contactPhone}`}
                    >
                      Telefon Et
                    </a>
                  </div>

                  <p className="text-xs text-gray-500">
                    Not: Form e-posta istemciniz üzerinden gönderilir. Dilerseniz doğrudan
                    <a className="text-red-600 font-semibold ml-1" href={`mailto:${contactMail}`}>{contactMail}</a>
                    adresine yazabilirsiniz.
                  </p>
                </form>
              </div>
            </section>
          </div>

          {/* Info banner */}
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">Çalışma Saatleri</p>
              <p className="text-gray-700 mt-2">Hafta içi 09:00 - 18:00, Cumartesi 09:00 - 14:00</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">Toplu sipariş</p>
              <p className="text-gray-700 mt-2">500+ adet siparişlerde ölçeklendirilmiş fiyatlandırma.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">Teknik destek</p>
              <p className="text-gray-700 mt-2">Kumaş, baskı ve kalıp konularında üretim danışmanlığı.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
