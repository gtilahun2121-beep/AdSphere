const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store for mocking
const dataStoreFile = path.join(__dirname, 'data.json');
let db = {
  users: [],
  ads: [],
  categories: ['Websites', 'Mobile Apps', 'Desktop Software', 'SaaS', 'Plugins']
};

// Load data if exists
if (fs.existsSync(dataStoreFile)) {
  try {
    const rawData = fs.readFileSync(dataStoreFile, 'utf8');
    db = JSON.parse(rawData);
  } catch (error) {
    console.error("Could not read data file, using empty db.");
  }
}

function saveData() {
  fs.writeFileSync(dataStoreFile, JSON.stringify(db, null, 2));
}

// --- API ROUTES ---

// 1. Get Categories
app.get('/api/categories', (req, res) => {
  res.json(db.categories);
});

// 2. Get Ads (with optional category filter)
app.get('/api/ads', (req, res) => {
  const { category, search } = req.query;
  let result = db.ads;
  
  if (category) {
    result = result.filter(ad => ad.category === category);
  }
  if (search) {
    const lowerSearch = search.toLowerCase();
    result = result.filter(ad => 
      ad.title.toLowerCase().includes(lowerSearch) || 
      ad.description.toLowerCase().includes(lowerSearch)
    );
  }
  
  res.json(result);
});

// 3. Submit Ad (Mock)
app.post('/api/ads', (req, res) => {
  const { title, description, category, price, link, imageUrl } = req.body;
  
  if (!title || !description || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newAd = {
    id: Date.now().toString(),
    title,
    description,
    category,
    price: price || 0,
    link,
    imageUrl: imageUrl || 'https://via.placeholder.com/400x250',
    status: 'pending', // Requires admin approval
    createdAt: new Date().toISOString()
  };

  db.ads.push(newAd);
  saveData();

  res.status(201).json({ message: 'Ad submitted successfully', ad: newAd });
});

// 4. Mock Payment endpoint
app.post('/api/payment', (req, res) => {
  const { amount, method } = req.body;
  // In a real scenario, this would contact Stripe/PayPal
  // For now, we just simulate a successful payment after 1 second delay
  setTimeout(() => {
    res.json({ success: true, transactionId: 'txn_' + Date.now() });
  }, 1000);
});

// 5. User Authentication (Mock)
app.post('/api/register', (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    role: role || 'Advertiser'
  };

  db.users.push(newUser);
  saveData();

  res.status(201).json({ message: 'User registered', user: newUser });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate a mock token
  const token = 'mock_jwt_token_' + user.id;
  res.json({ message: 'Login successful', token, user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
