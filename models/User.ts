import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'İsim gerekli'],
  },
  email: {
    type: String,
    required: [true, 'Email gerekli'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Şifre gerekli'],
    select: false, // Varsayılan sorgularda şifre döndürülmez
  },
  phone: {
    type: String,
  },
  addresses: [{
    title: String, // Ev, İş vb.
    fullName: String,
    phone: String,
    address: String,
    city: String,
    district: String,
    zipCode: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Email güncellendiğinde lowercase yap
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
