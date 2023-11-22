const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  rating: Number,
  images: [{
    type: String,
    required: true
  }],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

// Define a static method to initialize default products
productSchema.statics.initDefaultProducts = async function() {
  const products = [
    {
      title: 'Apple m1 macbook air',
      price: 800,
      description: 'Apple M1 MacBook Air: Powerful performance in an ultra-portable design.Experience blazing-fast speed and exceptional battery life with the Apple M1 MacBook Air.',
      rating: 4.5,
      images: [
        'images/product1_image1.jpg',
        'images/product1_image2.jpg',
        'images/product1_image3.jpg',
      ],
    },
    {
      title: 'Apple iphone 11',
      price: 500,
      description: 'Apple iPhone 11: A powerful smartphone with a dual-camera system and all-day battery life.Experience stunning visuals on the 6.1-inch Liquid Retina display and enjoy the performance of the A13 Bionic chip. ',
      rating: 3.8,
      images: [
        'images/product2_image1.jpg',
        'images/product2_image2.jpg',
        'images/product2_image3.jpg',
      ],
    },
    {
      title: 'Apple airpod',
      price: 150,
      description: 'Apple AirPods: Wireless earbuds with seamless connectivity and impressive sound quality.Enjoy the convenience of hands-free listening and easy access to Siri with these sleek and compact earbuds',
      rating: 4.2,
      images: [
        'images/product3_image1.jpg',
        'images/product3_image2.jpg',
        'images/product3_image3.jpg',
      ],
    },
  ];

  try {
    // Check if there are already existing products
    const existingProducts = await this.find();
    if (existingProducts.length === 0) {
      // Insert the default products if no products exist
      await this.insertMany(products);
      console.log('Default products inserted successfully.');
    }
  } catch (error) {
    console.log('error inserting default products'+error.message);
  }
};

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
