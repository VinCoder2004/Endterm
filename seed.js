// ============================================
// NEXUS GEAR — Database Seeder
// Run: npm run seed
// This will clear existing products and insert fresh data.
// ============================================
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');


const products = [
  {
    name: 'Echo Away Jersey',
    team: 'ECHO',
    player: 'Ft. RENEJAY · EDWARD · ANTIMAGE',
    price: 1890,
    img: 'https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?w=600&q=80&fit=crop&crop=top',
    badge: 'New',
    colors: ['#00D4FF', '#0A0A0F', '#ffffff'],
    desc: 'Official ECHO away kit for M6 World Championship. Sublimation print, moisture-wicking polyester. Team name & number printing available.',
    category: 'Jersey',
    inStock: true,
    stock: 50,
  },
  {
    name: 'ONIC Home Jersey',
    team: 'ONIC',
    player: 'Ft. KAIRI · SANFORD · SANZ',
    price: 1750,
    img: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=600&q=80&fit=crop&crop=top',
    badge: 'New',
    colors: ['#FF3B5C', '#0A0A0F', '#ffffff'],
    desc: 'ONIC PH home jersey. Iconic red and black colorway. Lightweight esports-grade fabric with full back print.',
    category: 'Jersey',
    inStock: true,
    stock: 40,
  },
  {
    name: 'Blacklist Classic Jersey',
    team: 'Blacklist',
    player: 'Ft. WISE · OhMyV33NUS · HADJI',
    price: 1680,
    originalPrice: 2100,
    img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80&fit=crop&crop=top',
    badge: 'Sale',
    colors: ['#FFB800', '#1A1A1A', '#ffffff'],
    desc: 'Classic Blacklist International jersey in gold and black. Collectible piece from the 4-peat era. Limited stock remaining.',
    category: 'Sale',
    inStock: true,
    stock: 15,
  },
  {
    name: 'RRQ Hoshi Home Kit',
    team: 'RRQ',
    player: 'Ft. ALBERTTT · LEMON · SKYLAR',
    price: 1820,
    img: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&q=80&fit=crop&crop=top',
    badge: '',
    colors: ['#8B5CF6', '#0A0A0F', '#FFB800'],
    desc: 'RRQ Hoshi official home jersey. Purple and gold colorway representing the King of Kings. MPL-ID authentic design.',
    category: 'Jersey',
    inStock: true,
    stock: 30,
  },
  {
    name: 'ECHO Gaming Hoodie',
    team: 'ECHO',
    player: 'Team Collection',
    price: 2490,
    img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80&fit=crop&crop=top',
    badge: 'New',
    colors: ['#00D4FF', '#0A0A0F'],
    desc: 'ECHO premium team hoodie. Heavyweight 380gsm fleece. Embroidered team crest. Zip pockets, drawstring hood. Unisex sizing.',
    category: 'Hoodie',
    inStock: true,
    stock: 25,
  },
  {
    name: 'ONIC Training Jersey',
    team: 'ONIC',
    player: 'Training Series',
    price: 1450,
    img: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80&fit=crop&crop=top',
    badge: '',
    colors: ['#FF3B5C', '#1A1A1A'],
    desc: 'ONIC training jersey used during practice sessions. Lighter fabric, relaxed fit. Perfect for everyday gaming wear.',
    category: 'Jersey',
    inStock: true,
    stock: 60,
  },
  {
    name: 'Blacklist Legacy Tee',
    team: 'Blacklist',
    player: 'Ulti-Man Legacy',
    price: 890,
    originalPrice: 1200,
    img: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80&fit=crop&crop=top',
    badge: 'Sale',
    colors: ['#FFB800', '#1A1A1A', '#ffffff'],
    desc: 'Blacklist Ulti-Man strategy tribute tee. Cotton-poly blend. Artwork celebrating their legendary USAP formation.',
    category: 'Sale',
    inStock: true,
    stock: 20,
  },
  {
    name: 'M6 Event Jacket',
    team: 'ALL',
    player: 'M6 World Championship',
    price: 3200,
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80&fit=crop',
    badge: 'Limited',
    colors: ['#00D4FF', '#FFB800', '#1A1A1A'],
    desc: 'Official M6 World Championship event jacket. Embroidered M6 logo, all-team patches included. Numbered limited edition — only 1000 made.',
    category: '',
    inStock: true,
    stock: 8,
  },
  {
    name: 'Echo Home Jersey',
    team: 'ECHO',
    player: 'Ft. RENEJAY · EDWARD',
    price: 1890,
    img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80&fit=crop&crop=top',
    badge: '',
    colors: ['#00D4FF', '#ffffff', '#0A0A0F'],
    desc: 'ECHO home jersey, electric blue colorway. Fly cut design, breathable mesh side panels. Official team font throughout.',
    category: 'Jersey',
    inStock: true,
    stock: 35,
  },
  {
    name: 'RRQ King Hoodie',
    team: 'RRQ',
    player: 'King of Kings Collection',
    price: 2650,
    img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80&fit=crop&crop=top',
    badge: 'New',
    colors: ['#8B5CF6', '#FFB800'],
    desc: 'RRQ King of Kings oversized hoodie. Premium embroidered crown logo. Heavyweight cotton, drop-shoulder fit. Fan favorite every season.',
    category: 'Hoodie',
    inStock: true,
    stock: 18,
  },
  {
    name: 'ONIC x Limited Cap',
    team: 'ONIC',
    player: 'Accessories',
    price: 750,
    img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80&fit=crop',
    badge: 'New',
    colors: ['#FF3B5C', '#1A1A1A'],
    desc: 'ONIC PH snapback cap. Embroidered logo. One-size adjustable. Structured six-panel design in team colors.',
    category: 'Accessories',
    inStock: true,
    stock: 45,
  },
  {
    name: 'Blacklist Away Jersey',
    team: 'Blacklist',
    player: 'Ft. WISE · OhMyV33NUS',
    price: 1750,
    originalPrice: 2000,
    img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80&fit=crop&crop=top',
    badge: 'Sale',
    colors: ['#ffffff', '#FFB800', '#1A1A1A'],
    desc: 'Blacklist International away jersey in white and gold. Sublimation dye print, anti-odor treatment. Tournament spec fabric.',
    category: 'Sale',
    inStock: true,
    stock: 12,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert all products
    const inserted = await Product.insertMany(products);
    console.log(`🌱 Seeded ${inserted.length} products successfully!`);

    mongoose.connection.close();
    console.log('👋 Database connection closed');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
