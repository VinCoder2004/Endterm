const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    team: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
    },
    player: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    img: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    badge: {
      type: String,
      enum: ['New', 'Sale', 'Limited', ''],
      default: '',
    },
    colors: {
      type: [String],
      default: [],
    },
    desc: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Jersey', 'Hoodie', 'Accessories', 'Sale', ''],
      default: '',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

// Index for faster queries by team and badge
productSchema.index({ team: 1 });
productSchema.index({ badge: 1 });

module.exports = mongoose.model('Product', productSchema);

