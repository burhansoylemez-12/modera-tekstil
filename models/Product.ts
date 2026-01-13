import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ürün adı gereklidir'],
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'Ürün kodu gereklidir'],
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Kategori gereklidir'],
    trim: true,
  },
  sizes: [{
    type: String,
    trim: true,
  }],
  colors: [{
    type: String,
    trim: true,
  }],
  images: [{
    type: String,
  }],
  video: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: [true, 'Açıklama gereklidir'],
  },
  stock: {
    type: Number,
    required: [true, 'Stok durumu gereklidir'],
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Fiyat gereklidir'],
  },
  whatsappNumber: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
