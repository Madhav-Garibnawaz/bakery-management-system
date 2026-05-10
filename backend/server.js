const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
  res.send('Bakery Backend Running');
});

// ===== MongoDB =====
// mongoose.connect('mongodb://127.0.0.1:27017/bakery')
// .then(() => console.log('MongoDB Connected'));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

// ===== Category Schema =====
const CategorySchema = new mongoose.Schema({
  categoryId: String,
  categoryName: String,
  photo: String
});

const Category = mongoose.model('Category', CategorySchema);

// ===== Product Schema =====
const Product = mongoose.model('Product', {
  category: String,
  pname: String,
  pdesc: String,
  price: Number,
  qty: Number,
  date: String,
  photo: String
});

// ===== Multer =====
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


// ========== APIs ==========
// ➕ Add Category
app.post('/api/category', upload.single('photo'), async (req, res) => {
  await Category.create({
    categoryId: req.body.categoryId,
    categoryName: req.body.categoryName,
    photo: req.file ? req.file.filename : ''
  });
  res.json({ message: 'Category Added' });
});

// 📋 View Categories (USED BY DROPDOWN)
app.get('/api/category', async (req, res) => {
  const data = await Category.find();
  res.json(data);
});

// DELETE category
app.delete('/api/category/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// UPDATE category
// app.put('/api/category/:id', async (req, res) => {
//   await Category.findByIdAndUpdate(req.params.id, {
//     categoryId: req.body.categoryId,
//     categoryName: req.body.categoryName
//   });
//   res.json({ message: 'Category Updated' });
// });
// CHANGE THIS IN server.js
app.put('/api/category/:id', upload.single('photo'), async (req, res) => {
  const updateData = {
    categoryId: req.body.categoryId,
    categoryName: req.body.categoryName
  };

  // If the admin uploaded a new photo, add it to the update
  if (req.file) {
    updateData.photo = req.file.filename;
  }

  await Category.findByIdAndUpdate(req.params.id, updateData);
  res.json({ message: 'Category Updated' });
});


// ➕ Add Product
app.post('/api/product', upload.single('photo'), async (req, res) => {
  await Product.create({
    category: req.body.category,
    pname: req.body.pname,
    pdesc: req.body.pdesc,
    price: req.body.price,
    qty: req.body.qty,
    date: req.body.date,
    photo: req.file ? req.file.filename : ''
  });
  res.json({ message: 'Product Added' });
});

// 📋 View Products (optional)
app.get('/api/product', async (req, res) => {
  res.json(await Product.find());
});

// Delete Product
app.delete('/api/product/:id', async(req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
})

// UPDATE Product (Supports Photo Update)
app.put('/api/product/:id', upload.single('photo'), async (req, res) => {
  const updateData = {
    category: req.body.category,
    pname: req.body.pname,
    pdesc: req.body.pdesc,
    price: req.body.price,
    qty: req.body.qty,
    date: req.body.date
  };

  if (req.file) {
    updateData.photo = req.file.filename;
  }

  await Product.findByIdAndUpdate(req.params.id, updateData);
  res.json({ message: 'Product Updated' });
});





// ===== Order Schema =====
const Order = mongoose.model('Order', new mongoose.Schema({

  items: [
    {
      pname: String,
      price: Number,
      qty: Number
    }
  ],

  customer: {
    name: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
    paymentMethod: String
  },

  total: Number,

  date: {
    type: Date,
    default: Date.now
  }

}));

// ===== Place Order API =====
app.post('/api/order', async (req, res) => {
  try {

    const newOrder = new Order(req.body);
    await newOrder.save();

    res.json({
      message: "Order Saved Successfully",
      order: newOrder
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ===== Get All Orders (For Admin) =====
app.get('/api/order', async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });
  res.json(orders);
});

// DELETE an order by ID
app.delete('/api/order/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// ================User Schema=======================
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  role: { type: String, default: 'user' }
}));


// 2. GET all users API
app.get('/api/users', async (req, res) => {
  try{
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message})
  }
});

// ================= ➕ Registration API ================= 
app.post('/api/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: 'Registration Successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= ➕ Login API ================= 
// Add this to server.js if not already there
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // We search for a user where BOTH email and password match
    const user = await User.findOne({ email: email, password: password });

    if (user) {
      // Send back user data (excluding password for security)
      res.json({ 
        message: "Login Successful", 
        user: { name: user.name, email: user.email, role: user.role } 
      });
    } else {
      // If no user found, send 401 Unauthorized
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ===== Server =====
// app.listen(3000, () => console.log('Server started on port 3000'));

app.listen(process.env.PORT || 3000, () => 
  console.log('Server started')
);