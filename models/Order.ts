import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    name: String,
    code: String,
    price: Number,
    quantity: Number,
    size: String,
    color: String,
    image: String,
  }],
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    district: String,
    zipCode: String,
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'bank_transfer', 'cash_on_delivery'],
    default: 'credit_card',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  cargoTracking: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Sipariş numarası otomatik oluştur
OrderSchema.pre('save', function(next: any) {
  try {
    if (!this.orderNumber) {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 11).toUpperCase();
      this.orderNumber = `SIP-${timestamp}-${random}`;
    }
    this.updatedAt = new Date();
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
