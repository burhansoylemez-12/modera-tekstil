# Kurulum Adımları

## 1. Bağımlılıkları Yükleyin

```bash
npm install
```

## 2. MongoDB Kurulumu

### Seçenek A: MongoDB Atlas (Kolay - Önerilen)

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) ücretsiz hesap oluşturun
2. "Create a New Cluster" ile ücretsiz cluster oluşturun
3. Database Access bölümünden kullanıcı oluşturun
4. Network Access bölümünden IP adresinizi ekleyin (veya 0.0.0.0/0 tüm IP'ler)
5. "Connect" butonuna tıklayıp connection string'i kopyalayın
6. `.env.local` dosyasına ekleyin:

```env
MONGODB_URI=mongodb+srv://kullaniciadi:sifre@cluster.mongodb.net/urunstok-tekstil
```

### Seçenek B: Yerel MongoDB

1. [MongoDB Community Server](https://www.mongodb.com/try/download/community) indirin ve kurun
2. MongoDB servisini başlatın:

```bash
# Windows
net start MongoDB

# veya MongoDB Compass kullanarak başlatın
```

3. `.env.local` dosyasında:

```env
MONGODB_URI=mongodb://localhost:27017/urunstok-tekstil
```

## 3. Ortam Değişkenlerini Ayarlayın

`.env.local` dosyasını düzenleyin ve kendi bilgilerinizi girin:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/urunstok-tekstil

# Admin Girişi (değiştirin!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YeniGucluSifre123!

# JWT Secret (rastgele uzun string)
JWT_SECRET=7h8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8d9e0f

# WhatsApp (başında 90 ile)
WHATSAPP_NUMBER=905xxxxxxxxx

# Site Ayarları
NEXT_PUBLIC_SITE_NAME=Tekstil Ürünleri
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

## 5. Tarayıcıda Açın

- Ana Site: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

**Admin Girişi:**
- Kullanıcı adı: `.env.local` dosyasındaki ADMIN_USERNAME
- Şifre: `.env.local` dosyasındaki ADMIN_PASSWORD

## 6. İlk Ürünü Ekleyin

1. Admin paneline giriş yapın
2. Sol menüden "Ürünler" → "Yeni Ürün Ekle"
3. Formu doldurun
4. "Ürünü Kaydet" butonuna tıklayın
5. Ana sayfada ürünü görebilirsiniz

## Sorun Giderme

### MongoDB bağlantı hatası

- MongoDB servisinin çalıştığından emin olun
- `.env.local` dosyasındaki MONGODB_URI doğru mu kontrol edin
- Atlas kullanıyorsanız IP adresinizi whitelist'e ekleyin

### "Module not found" hatası

```bash
# node_modules'ü silin ve yeniden yükleyin
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 kullanımda hatası

```bash
# Farklı port kullanın
npm run dev -- -p 3001
```

## SMS Entegrasyonu (Opsiyonel)

SMS servisi kullanacaksanız `.env.local` dosyasına ekleyin:

```env
SMS_API_URL=https://api.netgsm.com.tr/sms/send/get
SMS_API_KEY=your-api-key
SMS_USERNAME=your-username
SMS_PASSWORD=your-password
```

Desteklenen servisler:
- Netgsm
- İleti Merkezi
- Twilio
- Vatansoft

Kod: `lib/sms.ts` dosyasında özelleştirilebilir.

## Canlıya Alma

### Vercel (Önerilen)

1. GitHub'a projeyi yükleyin
2. [Vercel](https://vercel.com)'e giriş yapın
3. "New Project" → GitHub repo seçin
4. Environment Variables kısmına `.env.local` değerlerini ekleyin
5. Deploy edin

### Diğer Hosting

- Railway
- DigitalOcean App Platform
- AWS Amplify
- Heroku

## Destek

Sorun yaşarsanız:
1. README.md dosyasını okuyun
2. Console loglarını kontrol edin
3. MongoDB bağlantısını test edin
