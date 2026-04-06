const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a deal title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    discount: {
      type: String,
      required: [true, 'Please add a discount value'],
    },
    link: {
      type: String,
      required: [true, 'Please add a deal link'],
    },
    image: {
      type: String,
      default: 'no-photo.jpg',
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    expiryDate: {
      type: Date,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    businessName: {
      type: String,
      required: [true, 'Please add a business name'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Deal', dealSchema);
