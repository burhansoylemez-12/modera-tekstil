# E-Ticaret Sistemi - Kullanım Kılavuzu

## ✅ Eklenen Özellikler

### 1. Kullanıcı Yönetimi
- **Kayıt Ol**: `/kayit` - Yeni kullanıcı kaydı
- **Giriş Yap**: `/giris` - Kullanıcı girişi
- **Profil**: `/profil` - Kullanıcı bilgileri
- **Çıkış**: Header'dan çıkış yapabilir

### 2. Sipariş Sistemi
- **Sepet**: Ürünleri sepete ekleme
- **Ödeme**: `/odeme` - Teslimat adresi ve ödeme yöntemi seçimi
- **Sipariş Geçmişi**: `/profil/siparisler` - Verilen siparişleri görüntüleme
- **Adresler**: `/profil/adresler` - Kayıtlı adresleri görüntüleme

### 3. Ödeme Yöntemleri
- ✅ Havale / EFT
- ✅ Kapıda Ödeme
- ⏳ Kredi Kartı (Entegrasyon hazır, iyzico eklenecek)

## 📋 Kullanım Adımları

### Müşteri Olarak Sipariş Verme:

1. **Kayıt Ol**: 
   - Ana sayfadan "Giriş" veya "Kayıt Ol" tıklayın
   - Formu doldurun

2. **Ürün Seç**:
   - Ürünler sayfasından istediğiniz ürünü seçin
   - Beden/renk seçin
   - "Sepete Ekle" tıklayın

3. **Sepete Git**:
   - Header'daki sepet ikonuna tıklayın
   - Ürünlerinizi kontrol edin

4. **Sipariş Ver**:
   - "Sipariş Ver" butonuna tıklayın
   - Teslimat adresinizi girin
   - Ödeme yöntemini seçin
   - "Siparişi Tamamla" tıklayın

5. **Sipariş Takibi**:
   - Profil > Siparişlerim'den siparişlerinizi görün
   - Sipariş durumunu takip edin

## 🔐 Güvenlik

- Şifreler bcrypt ile hash'leniyor
- JWT token ile oturum yönetimi
- HttpOnly cookie'ler kullanılıyor
- Email validasyonu yapılıyor

## 📊 Veritabanı Modelleri

### User (Kullanıcı)
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  addresses: [{
    title, fullName, phone, address, 
    city, district, zipCode, isDefault
  }]
}
```

### Order (Sipariş)
```javascript
{
  orderNumber: String (auto-generated),
  user: ObjectId,
  items: [{product, name, code, price, quantity, size, color, image}],
  shippingAddress: {...},
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  totalAmount: Number,
  cargoTracking: String,
  notes: String
}
```

## 🎨 Sayfalar

### Kullanıcı Sayfaları:
- `/kayit` - Kayıt ol
- `/giris` - Giriş yap
- `/profil` - Hesap bilgilerim
- `/profil/siparisler` - Siparişlerim
- `/profil/adresler` - Adreslerim
- `/odeme` - Ödeme/Checkout
- `/sepet` - Sepet (güncellendi)

### API Endpoints:
- `POST /api/auth/register` - Kayıt
- `POST /api/auth/login` - Giriş
- `POST /api/auth/logout` - Çıkış
- `GET /api/auth/me` - Kullanıcı bilgisi
- `POST /api/orders` - Sipariş oluştur
- `GET /api/orders` - Kullanıcının siparişleri

## 🔄 Sipariş Durumları

- `pending` - Beklemede
- `confirmed` - Onaylandı
- `preparing` - Hazırlanıyor
- `shipped` - Kargoda
- `delivered` - Teslim Edildi
- `cancelled` - İptal Edildi

## 💳 Ödeme Entegrasyonu (Sonraki Adım)

Kredi kartı ödemesi için iyzico entegrasyonu eklenebilir:

1. iyzico'ya kayıt olun
2. API key'leri alın
3. `.env.local` dosyasına ekleyin:
```env
IYZICO_API_KEY=your-api-key
IYZICO_SECRET_KEY=your-secret-key
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
```

4. `/app/api/payment/route.ts` dosyası oluşturun
5. Ödeme sayfasında iyzico checkout'u entegre edin

## 🚀 Test Etme

1. Tarayıcıda `/kayit` sayfasına gidin
2. Yeni kullanıcı oluşturun
3. Ürün ekleyin ve sipariş verin
4. Profil sayfasında siparişlerinizi görün

## 📝 Notlar

- Şu anda kredi kartı ödemesi devre dışı (entegrasyon bekleniyor)
- Havale/EFT ve Kapıda Ödeme çalışıyor
- Admin panelinden sipariş durumları güncellenebilir (admin/orders sayfası eklenebilir)
- Email bildirimleri eklenebilir (sipariş onayı, kargo takip vb.)
