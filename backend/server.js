const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const atlasConnectionString = 'mongodb+srv://chaturyanaidu:helloworld@cluster1.pdo4o.mongodb.net/mydatabase?retryWrites=true&w=majority'; // Replace with your MongoDB Atlas connection string
mongoose.connect(atlasConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Define Product model
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  image: String
});

const Product = mongoose.model('Product', ProductSchema);

// Routes for CRUD operations
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

app.put('/api/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

app.delete('/api/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
