# 🧵 Tekstil Ürün Kataloğu Web Sitesi

Toptan ve perakende tekstil ürünlerini sergilemek için geliştirilmiş, modern ve dinamik web sitesi.

## ✨ Özellikler

### 🛍️ Ürün Yönetimi
- ✅ Ürün adı, kodu, kategorisi
- ✅ Beden ve renk seçenekleri
- ✅ Çoklu resim ve video desteği
- ✅ Detaylı ürün açıklaması
- ✅ Stok takibi
- ✅ Fiyat bilgisi
- ✅ Ürüne özel WhatsApp numarası

### 📦 Sipariş Takip Sistemi
- ✅ SMS ile takip kodu gönderimi
- ✅ Otomatik takip kodu oluşturma
- ✅ Sipariş durumu güncelleme
- ✅ Müşteri bilgileri yönetimi

### 🎨 Admin Paneli
- ✅ Ürün ekleme, düzenleme, silme
- ✅ Kategori yönetimi
- ✅ Sipariş yönetimi
- ✅ Site ayarları
- ✅ Dashboard istatistikleri

### 📱 Diğer Özellikler
- ✅ Responsive (mobil uyumlu) tasarım
- ✅ WhatsApp entegrasyonu
- ✅ Hızlı ve modern arayüz
- ✅ SEO dostu yapı

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- MongoDB veritabanı

### Adım 1: Bağımlılıkları Yükleyin
```bash
npm install
```

### Adım 2: MongoDB'yi Çalıştırın

**Yerel MongoDB:**
```bash
# MongoDB servisini başlatın (Windows)
net start MongoDB

# Veya MongoDB Compass kullanabilirsiniz
```

**MongoDB Atlas (Cloud):**
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) ücretsiz hesap oluşturun
2. Yeni cluster oluşturun
3. Connection string'i kopyalayın
4. `.env.local` dosyasına ekleyin

### Adım 3: Ortam Değişkenlerini Ayarlayın
`.env.local` dosyasını düzenleyin:

```env
# MongoDB (Yerel)
MONGODB_URI=mongodb://localhost:27017/urunstok-tekstil

# VEYA MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://kullanici:sifre@cluster.mongodb.net/urunstok-tekstil

# Admin Girişi
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin123!

# JWT Secret (Rastgele uzun bir string)
JWT_SECRET=buraya-uzun-rastgele-bir-string-yazin

# WhatsApp
WHATSAPP_NUMBER=905xxxxxxxxx

# Site
NEXT_PUBLIC_SITE_NAME=Tekstil Ürünleri
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Adım 4: Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Web sitesi: http://localhost:3000
Admin paneli: http://localhost:3000/admin

## 🔐 Admin Paneli Girişi

**Varsayılan Bilgiler:**
- Kullanıcı adı: `admin`
- Şifre: `Admin123!`

⚠️ **Önemli:** Canlıya almadan önce `.env.local` dosyasındaki şifreyi değiştirin!

## 📂 Proje Yapısı

```
urunstok-tekstil/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin paneli sayfaları
│   ├── api/               # API route'ları
│   ├── urunler/           # Ürün listeleme
│   ├── siparis-takip/     # Sipariş takip
│   └── page.tsx           # Ana sayfa
├── components/            # Yeniden kullanılabilir bileşenler
├── lib/                   # Yardımcı fonksiyonlar
│   ├── mongodb.ts         # Veritabanı bağlantısı
│   ├── auth.ts            # Kimlik doğrulama
│   ├── sms.ts             # SMS servisi
│   └── utils.ts           # Genel yardımcılar
├── models/                # MongoDB modelleri
│   ├── Product.ts         # Ürün modeli
│   ├── Category.ts        # Kategori modeli
│   ├── OrderTracking.ts   # Sipariş takip modeli
│   └── Settings.ts        # Site ayarları modeli
└── public/                # Statik dosyalar
```

## 🎯 Kullanım Kılavuzu

### Ürün Ekleme
1. Admin paneline giriş yapın
2. "Ürünler" menüsüne tıklayın
3. "Yeni Ürün Ekle" butonuna tıklayın
4. Ürün bilgilerini doldurun
5. "Ürünü Kaydet" ile kaydedin

### Kategori Ekleme
1. Admin panelinde "Kategoriler" menüsüne gidin
2. Kategori ekleyin
3. Ürün eklerken bu kategorileri kullanın

### Sipariş Takip
1. Admin panelinde yeni sipariş oluşturun
2. Sistem otomatik takip kodu oluşturur
3. Müşteriye SMS ile takip kodu gönderilir
4. Müşteri web sitesinden takip edebilir

## 📱 SMS Entegrasyonu

Proje şu SMS servislerini destekler:
- Netgsm
- İleti Merkezi
- Twilio
- Vatansoft

`.env.local` dosyasına SMS API bilgilerinizi ekleyin:

```env
SMS_API_URL=https://api.sms-provider.com
SMS_API_KEY=your-api-key
SMS_USERNAME=your-username
SMS_PASSWORD=your-password
```

## 🌐 Canlıya Alma

### Vercel ile (Önerilen)
1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub'a projeyi yükleyin
3. Vercel'de "Import Project" ile projeyi ekleyin
4. Environment Variables kısmına `.env.local` değerlerini girin
5. Deploy edin

### Diğer Hosting Seçenekleri
- AWS
- DigitalOcean
- Heroku
- Railway

## 🔧 Özelleştirme

### Renkleri Değiştirme
`tailwind.config.js` dosyasını düzenleyin:

```js
theme: {
  extend: {
    colors: {
      primary: '#2563eb',  // Mavi
      secondary: '#64748b', // Gri
    },
  },
}
```

### Logo Değiştirme
`components/Header.tsx` dosyasındaki logo kısmını düzenleyin.

### İletişim Bilgileri
`components/Footer.tsx` ve `components/Header.tsx` dosyalarındaki iletişim bilgilerini güncelleyin.

## 📞 Destek

Sorularınız için:
- 📧 E-posta: destek@ornek.com
- 💬 WhatsApp: 0555 555 55 55

## 📄 Lisans

Bu proje özel kullanım için geliştirilmiştir.

## 🙏 Teşekkürler

- Next.js
- MongoDB
- TailwindCSS
- React Icons

---

**Geliştirici Notu:** Bu proje, e-ticaret özelliği olmadan sadece ürün sergileme ve WhatsApp üzerinden iletişim için tasarlanmıştır. Kredi kartı ödemesi ve üyelik sistemi bulunmamaktadır.
