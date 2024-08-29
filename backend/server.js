// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // For generating tokens

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

// Middleware to authenticate user
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Define User model
const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', UserSchema);

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cartItems: [{
    name: String,
    price: Number,
    quantity: Number,
    description: String,
    image: String
  }],
  totalPrice: Number,
  shippingDetails: {
    name: String,
    address: String,
    phone: String,
    email: String // Added email field
  },
  paymentDetails: {
    cardNumber: String,
    expiryDate: String,
    cvv: String,
    upiId: String
  },
  selectedPaymentMethod: String,
  date: { type: Date, default: Date.now }
});


const Order = mongoose.model('Order', OrderSchema);

// Route to handle user registration
app.post('/api/users/signup', async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const user = new User({ fullName, email, phone, password });
    await user.save();
    res.json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Route to handle user sign-in
app.post('/api/users/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct (without hashing)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a token (optional)
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Sign in successful', user, token });
  } catch (err) {
    console.error('Error signing in user:', err);
    res.status(500).json({ error: 'Failed to sign in user' });
  }
});

// Route to add a new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const product = new Product({ name, price, description, category, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Route to get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Route to update a product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, image } = req.body;
    
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name, price, description, category, image
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Route to delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Route to get product categories
app.get('/api/products/categories', (req, res) => {
  try {
    // Assuming categories are predefined and not stored in the database
    const categories = ['Chairs', 'Sofas', 'Table', 'Home Decor'];
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Route to create a new order
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Validate required fields
    if (!orderData.shippingDetails.email) {
      return res.status(400).json({ error: 'Email is required in shipping details' });
    }
    
    const order = new Order(orderData);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Route to get orders for the logged-in user
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Route to get a specific order by ID for the logged-in user
app.get('/api/orders/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
    if (!order) {
      return res.status(404).json({ error: 'Order not found or access denied' });
    }
    res.json(order);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});
// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
