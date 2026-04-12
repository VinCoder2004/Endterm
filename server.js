// ============================================
// NEXUS GEAR — Express + MongoDB Server
// ============================================
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// ─────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────
app.use(cors()); 

app.use(express.json());
// ─────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '⚡ NEXUS GEAR API is running',
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─────────────────────────────────────────
// CONNECT TO MONGODB THEN START SERVER
// ─────────────────────────────────────────
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`⚡ NEXUS GEAR API running at http://localhost:${PORT}`);
      console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
      console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
