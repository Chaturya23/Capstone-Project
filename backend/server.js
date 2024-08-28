const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/capstone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define schemas and models for Users
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Define schemas and models for Products
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String
});
const Product = mongoose.model('Product', productSchema);

// Define schemas and models for Updated Products
const updatedProductSchema = new mongoose.Schema({
  originalProductId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  updatedAt: { type: Date, default: Date.now }
});
const UpdatedProduct = mongoose.model('UpdatedProduct', updatedProductSchema);

// Define schemas and models for Deleted Products
const deletedProductSchema = new mongoose.Schema({
  originalProductId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  deletedAt: { type: Date, default: Date.now }
});
const DeletedProduct = mongoose.model('DeletedProduct', deletedProductSchema);

// Routes for User registration
app.post('/api/register', async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  const newUser = new User({ fullName, email, phone, password });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Routes for User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Routes for adding a new product
app.post('/api/products', async (req, res) => {
  const { name, description, price, category, image } = req.body;

  const newProduct = new Product({ name, description, price, category, image });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

// Routes for updating a product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image } = req.body;

  try {
    // Find the existing product
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Save the current product data to the UpdatedProduct collection
    const updatedProduct = new UpdatedProduct({
      originalProductId: id,
      name: existingProduct.name,
      description: existingProduct.description,
      price: existingProduct.price,
      category: existingProduct.category,
      image: existingProduct.image
    });
    await updatedProduct.save();

    // Update the product with new data
    const updated = await Product.findByIdAndUpdate(id, { name, description, price, category, image }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
});

// Routes for deleting a product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product to be deleted
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Save the product data to the DeletedProduct collection
    const deletedProduct = new DeletedProduct({
      originalProductId: id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image
    });
    await deletedProduct.save();

    // Delete the product
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
