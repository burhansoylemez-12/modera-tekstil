const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/urunstok-tekstil';

function slugify(text) {
  const trMap = { 'ç':'c','ğ':'g','ı':'i','ö':'o','ş':'s','ü':'u','Ç':'c','Ğ':'g','İ':'i','Ö':'o','Ş':'s','Ü':'u' };
  return text
    .split('')
    .map(c => trMap[c] || c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
}, { collection: 'categories' });

const categories = [
  { name: 'Tişört', description: 'Erkek, kadın ve çocuk tişörtleri. Pamuklu, polyester ve karışım kumaşlar.' },
  { name: 'Çorap', description: 'Spor çorap, günlük çorap, soket çorap çeşitleri.' },
  { name: 'Boxer', description: 'Erkek boxer ve iç çamaşırları. Pamuklu ve elastan karışımlı.' },
  { name: 'Eşofman', description: 'Erkek, kadın ve çocuk eşofman takımları. Spor ve günlük kullanım.' },
  { name: 'Sweatshirt', description: 'Kapüşonlu ve kapüşonsuz sweatshirt modelleri.' },
  { name: 'Pantolon', description: 'Kumaş pantolon, kot pantolon ve spor pantolon çeşitleri.' },
  { name: 'Gömlek', description: 'Erkek klasik ve spor gömlek modelleri.' },
  { name: 'Şort', description: 'Spor şort, deniz şortu ve günlük şort çeşitleri.' },
  { name: 'Atlet', description: 'Erkek ve çocuk atlet modelleri. Pamuklu kumaş.' },
  { name: 'Pijama', description: 'Erkek, kadın ve çocuk pijama takımları.' },
  { name: 'Hoodie', description: 'Kapüşonlu sweatshirt ve fermuarlı hoodie modelleri.' },
  { name: 'Mont', description: 'Kışlık mont, yağmurluk ve rüzgarlık çeşitleri.' },
  { name: 'Yelek', description: 'İç yelek, dış yelek ve süveter modelleri.' },
  { name: 'Termal İç Giyim', description: 'Kışlık termal iç çamaşırı ve tayt modelleri.' },
  { name: 'Tayt', description: 'Spor tayt, termal tayt ve günlük tayt çeşitleri.' },
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    const Category = mongoose.model('Category', CategorySchema);

    let addedCount = 0;
    let skippedCount = 0;

    for (const cat of categories) {
      const slug = slugify(cat.name);
      const exists = await Category.findOne({ slug });
      if (exists) {
        console.log(`⏭️  Atlandı: ${cat.name} (zaten mevcut)`);
        skippedCount++;
        continue;
      }
      await Category.create({ name: cat.name, slug, description: cat.description || '' });
      console.log(`✅ Eklendi: ${cat.name}`);
      addedCount++;
    }

    console.log(`\n📊 Özet:`);
    console.log(`   Eklenen: ${addedCount}`);
    console.log(`   Atlanan: ${skippedCount}`);
    console.log(`   Toplam: ${await Category.countDocuments()}`);

    await mongoose.disconnect();
    console.log('\n✨ Kategori seed işlemi tamamlandı!');
  } catch (err) {
    console.error('❌ Hata:', err.message);
    process.exitCode = 1;
  }
}

run();
