import mongoose from 'mongoose';

const OrderTrackingSchema = new mongoose.Schema({
  trackingCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true,
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    productName: String,
    productCode: String,
    quantity: Number,
    size: String,
    color: String,
  }],
  status: {
    type: String,
    enum: ['Sipariş Alındı', 'Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi'],
    default: 'Sipariş Alındı',
  },
  notes: {
    type: String,
    default: '',
  },
  smsSent: {
    type: Boolean,
    default: false,
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

OrderTrackingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.OrderTracking || mongoose.model('OrderTracking', OrderTrackingSchema);
