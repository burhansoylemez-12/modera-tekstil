const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/urunstok-tekstil';

const ProductSchema = new mongoose.Schema({
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

const products = [
  {
    name: 'Basic Pamuk Tişört', code: 'TS-100', category: 'Tişört',
    sizes: ['S','M','L','XL'], colors: ['Siyah','Beyaz','Mavi'],
    images: ['https://picsum.photos/seed/ts100/800/1000'], video: '',
    description: '%100 pamuk basic tişört', stock: 50, price: 129.90,
  },
  {
    name: 'Oversize Tişört', code: 'TS-101', category: 'Tişört',
    sizes: ['S','M','L','XL'], colors: ['Siyah','Bej'],
    images: ['https://picsum.photos/seed/ts101/800/1000'], video: '',
    description: 'Oversize kesim rahat tişört', stock: 40, price: 159.90,
  },
  {
    name: 'Kanguru Cepli Sweatshirt', code: 'SW-200', category: 'Sweatshirt',
    sizes: ['S','M','L','XL'], colors: ['Gri','Siyah','Lacivert'],
    images: ['https://picsum.photos/seed/sw200/800/1000'], video: '',
    description: 'Kapüşonlu kanguru cepli sweatshirt', stock: 35, price: 249.90,
  },
  {
    name: 'Fermuarlı Sweatshirt', code: 'SW-201', category: 'Sweatshirt',
    sizes: ['S','M','L','XL'], colors: ['Haki','Siyah'],
    images: ['https://picsum.photos/seed/sw201/800/1000'], video: '',
    description: 'Rahat fermuarlı sweatshirt', stock: 30, price: 269.90,
  },
  {
    name: 'Slim Fit Pantolon', code: 'PN-300', category: 'Pantolon',
    sizes: ['S','M','L','XL'], colors: ['Siyah','Lacivert'],
    images: ['https://picsum.photos/seed/pn300/800/1000'], video: '',
    description: 'Slim fit rahat pantolon', stock: 28, price: 299.90,
  },
  {
    name: 'Kumaş Pantolon', code: 'PN-301', category: 'Pantolon',
    sizes: ['S','M','L','XL'], colors: ['Gri','Siyah'],
    images: ['https://picsum.photos/seed/pn301/800/1000'], video: '',
    description: 'Ofis için şık kumaş pantolon', stock: 22, price: 349.90,
  },
  {
    name: 'Basic Gömlek', code: 'GM-400', category: 'Gömlek',
    sizes: ['S','M','L','XL'], colors: ['Beyaz','Mavi'],
    images: ['https://picsum.photos/seed/gm400/800/1000'], video: '',
    description: 'Klasik kesim gömlek', stock: 45, price: 239.90,
  },
  {
    name: 'Flanel Gömlek', code: 'GM-401', category: 'Gömlek',
    sizes: ['S','M','L','XL'], colors: ['Kırmızı','Lacivert'],
    images: ['https://picsum.photos/seed/gm401/800/1000'], video: '',
    description: 'Sıcak tutan flanel gömlek', stock: 20, price: 279.90,
  },
  {
    name: 'Kışlık Mont', code: 'MN-500', category: 'Mont',
    sizes: ['S','M','L','XL'], colors: ['Siyah','Haki'],
    images: ['https://picsum.photos/seed/mn500/800/1000'], video: '',
    description: 'Su geçirmez kışlık mont', stock: 18, price: 899.90,
  },
  {
    name: 'Elbise Basic', code: 'EL-600', category: 'Elbise',
    sizes: ['S','M','L','XL'], colors: ['Siyah','Bordo'],
    images: ['https://picsum.photos/seed/el600/800/1000'], video: '',
    description: 'Günlük kullanıma uygun elbise', stock: 32, price: 399.90,
  },
  {
    name: 'Eşofman Takım', code: 'ES-700', category: 'Eşofman',
    sizes: ['S','M','L','XL'], colors: ['Gri','Siyah'],
    images: ['https://picsum.photos/seed/es700/800/1000'], video: '',
    description: 'Rahat eşofman takım', stock: 26, price: 329.90,
  },
  {
    name: 'İç Giyim Paket (3lü)', code: 'IC-800', category: 'İç Giyim',
    sizes: ['S','M','L','XL'], colors: ['Beyaz','Siyah'],
    images: ['https://picsum.photos/seed/ic800/800/1000'], video: '',
    description: '3 adet iç giyim seti', stock: 60, price: 189.90,
  },
  {
    name: 'Spor Çorap (5li)', code: 'CR-900', category: 'Çorap',
    sizes: ['Standart'], colors: ['Beyaz','Siyah'],
    images: ['https://picsum.photos/seed/cr900/800/1000'], video: '',
    description: 'Nefes alan spor çorap', stock: 100, price: 129.90,
  },
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    const Product = mongoose.model('Product', ProductSchema);

    for (const p of products) {
      const exists = await Product.findOne({ code: p.code });
      if (exists) { console.log(`Ürün mevcut: ${p.code}`); continue; }
      const doc = await Product.create({ ...p, whatsappNumber: '905555555555', isActive: true });
      console.log(`Ürün eklendi: ${p.code} -> ${doc._id.toString()}`);
    }

    await mongoose.disconnect();
    console.log('Ürün seed tamamlandı');
  } catch (err) {
    console.error('Ürün seed hatası:', err.message);
    process.exitCode = 1;
  }
}

run();
