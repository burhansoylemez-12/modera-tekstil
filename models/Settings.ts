import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Tekstil Ürünleri',
  },
  siteDescription: {
    type: String,
    default: 'Toptan ve Perakende Tekstil Ürünleri',
  },
  logo: {
    type: String,
    default: '',
  },
  whatsappNumber: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  socialMedia: {
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    youtube: { type: String, default: '' },
  },
  aboutUs: {
    type: String,
    default: '',
  },
  heroSlides: [{
    image: String,
    title: String,
    subtitle: String,
  }],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
