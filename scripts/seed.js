const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/urunstok-tekstil';

const productSchema = new mongoose.Schema({
  name: String,
  code: { type: String, unique: true },
  category: String,
  sizes: [String],
  colors: [String],
  images: [String],
  video: String,
  description: String,
  stock: Number,
  price: Number,
  whatsappNumber: String,
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { collection: 'products' });

async function run() {
  try {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });

    const Product = mongoose.model('Product', productSchema);

    const existing = await Product.findOne({ code: 'TS-001' });
    if (existing) {
      console.log('Seed: Ürün zaten mevcut, atlandı.');
      await mongoose.disconnect();
      return;
    }

    const doc = await Product.create({
      name: 'Deneme T-Shirt',
      code: 'TS-001',
      category: 'Tişört',
      sizes: ['S','M','L'],
      colors: ['Siyah','Beyaz'],
      images: ['https://picsum.photos/seed/ts001/800/1000'],
      video: '',
      description: 'Yüksek kaliteli pamuk T-Shirt.',
      stock: 25,
      price: 149.90,
      whatsappNumber: '905555555555',
      isActive: true,
    });

    console.log('Seed: Ürün eklendi:', doc._id.toString());
    await mongoose.disconnect();
  } catch (err) {
    console.error('Seed hatası:', err.message);
    process.exitCode = 1;
  }
}

run();
