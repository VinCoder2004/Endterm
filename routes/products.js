const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ─────────────────────────────────────────
// GET /api/products
// Fetch all products. Supports optional query params:
//   ?team=ECHO      → filter by team (CASE-INSENSITIVE)
//   ?category=Hoodie → filter by category (CASE-INSENSITIVE)
//   ?badge=Sale     → filter by badge (New, Sale, Limited) (CASE-INSENSITIVE)
//   ?sort=price-low | price-high | newest | featured
// ─────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { team, badge, sort, category } = req.query;
    const filter = {};

    // Filter by team (case-insensitive)
    if (team && team !== 'All') {
      filter.team = { $regex: new RegExp(`^${team}$`, 'i') };
    }

    // Filter by category e.g. Hoodie (case-insensitive)
    if (category) {
      filter.category = { $regex: new RegExp(category, 'i') };
    }

    // Filter by badge e.g. Sale (case-insensitive)
    if (badge) {
      filter.badge = { $regex: new RegExp(`^${badge}$`, 'i') };
    }

    let query = Product.find(filter);

    // Sorting
    if (sort === 'price-low') query = query.sort({ price: 1 });
    else if (sort === 'price-high') query = query.sort({ price: -1 });
    else if (sort === 'newest') query = query.sort({ createdAt: -1 });
    else query = query.sort({ createdAt: 1 }); // default: featured

    const products = await query.exec();
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ─────────────────────────────────────────
// GET /api/products/search?q=echo
// Search products by name, team, or player
// ─────────────────────────────────────────
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ success: true, count: 0, data: [] });

    const regex = new RegExp(q, 'i'); // case-insensitive
    const products = await Product.find({
      $or: [{ name: regex }, { team: regex }, { player: regex }, { category: regex }],
    });

    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────
// GET /api/products/:id
// Fetch a single product by its MongoDB _id
// ─────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────
// POST /api/products
// Add a new product
// Body (JSON): { name, team, player, price, img, badge, colors, desc, category }
// ─────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────
// PUT /api/products/:id
// Update an existing product by _id
// ─────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────
// DELETE /api/products/:id
// Delete a product by _id
// ─────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;