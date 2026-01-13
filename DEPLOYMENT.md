# Ürünstok - Tekstil E-Ticaret Platformu

Next.js, MongoDB ve Cloudinary tabanlı modern e-ticaret sitesi.

## 🚀 Vercel'e Deploy Etme Adımları

### 1. MongoDB Atlas Kurulumu

1. [MongoDB Atlas](https://cloud.mongodb.com) hesabı oluşturun
2. Yeni bir cluster oluşturun (Free tier yeterli)
3. Database Access → Add New Database User
   - Username ve password oluşturun
   - Built-in Role: Read and write to any database
4. Network Access → Add IP Address
   - 0.0.0.0/0 ekleyin (tüm IP'lere izin ver)
5. Cluster → Connect → Connect your application
   - Connection string'i kopyalayın
   - Format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/urunstok?retryWrites=true&w=majority`

### 2. Cloudinary Kurulumu

1. [Cloudinary](https://cloudinary.com) hesabınıza giriş yapın
2. Dashboard'dan şu bilgileri kopyalayın:
   - Cloud Name
   - API Key
   - API Secret

### 3. GitHub'a Push

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
git push -u origin main
```

### 4. Vercel Deploy

1. [Vercel](https://vercel.com) hesabı oluşturun (GitHub ile giriş yapın)
2. "New Project" → GitHub repository'nizi seçin
3. "Import" butonuna tıklayın
4. **Environment Variables** ekleyin:

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=super-gizli-random-string-12345
CLOUDINARY_CLOUD_NAME=sizin-cloud-name
CLOUDINARY_API_KEY=sizin-api-key
CLOUDINARY_API_SECRET=sizin-api-secret
IYZIPAY_API_KEY=sizin-iyzipay-key
IYZIPAY_SECRET_KEY=sizin-iyzipay-secret
IYZIPAY_BASE_URL=https://sandbox-api.iyzipay.com
NEXT_PUBLIC_BASE_URL=https://sizin-site.vercel.app
```

5. "Deploy" butonuna tıklayın
6. Deploy tamamlandığında siteniz yayında! 🎉

## 📝 Environment Variables Açıklamaları

| Değişken | Açıklama | Nereden Alınır |
|----------|----------|----------------|
| `MONGODB_URI` | MongoDB connection string | MongoDB Atlas |
| `JWT_SECRET` | Güvenli random string (min 32 karakter) | Kendiniz oluşturun |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Cloudinary Dashboard |
| `IYZIPAY_API_KEY` | Iyzipay API key | Iyzipay Panel |
| `IYZIPAY_SECRET_KEY` | Iyzipay secret key | Iyzipay Panel |
| `NEXT_PUBLIC_BASE_URL` | Sitenizin URL'i | Vercel deployment URL |

## 🛠️ Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# .env.local dosyası oluştur
cp .env.example .env.local
# .env.local dosyasını doldurun

# Development server'ı başlat
npm run dev
```

Tarayıcıda http://localhost:3000 adresini açın.

## 📦 Proje Yapısı

```
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes (serverless functions)
│   ├── admin/             # Admin paneli
│   └── ...                # Diğer sayfalar
├── components/            # React bileşenleri
├── lib/                   # Yardımcı fonksiyonlar
│   ├── cloudinary.ts      # Cloudinary entegrasyonu
│   ├── mongodb.ts         # MongoDB bağlantısı
│   └── auth.ts            # JWT authentication
├── models/                # MongoDB Mongoose modelleri
└── public/                # Statik dosyalar
```

## 🎯 Özellikler

✅ Ürün yönetimi (CRUD)
✅ Kategori yönetimi
✅ Resim yükleme (Cloudinary)
✅ Sepet sistemi
✅ Kullanıcı girişi/kaydı
✅ Admin paneli
✅ Sipariş takibi
✅ Ödeme entegrasyonu (Iyzipay)
✅ Responsive tasarım

## 📱 Admin Paneli

Admin paneline erişim: `https://siteniz.com/admin`

İlk admin kullanıcısı oluşturmak için MongoDB'de manuel olarak bir kullanıcı ekleyin:

```javascript
{
  name: "Admin",
  email: "admin@example.com",
  password: "$2a$10$...", // bcrypt ile hashlenmiş şifre
  role: "admin",
  phone: "05xxxxxxxxx"
}
```

## 🔒 Güvenlik

- ✅ JWT ile authentication
- ✅ Bcrypt ile şifre hashleme
- ✅ API route koruması
- ✅ Environment variables ile hassas bilgiler

## 📞 Destek

Sorularınız için: [GitHub Issues](https://github.com/KULLANICI_ADI/REPO_ADI/issues)
