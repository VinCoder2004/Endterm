# ⚡ NEXUS GEAR — MongoDB Backend Setup Guide

This guide walks you through setting up the MongoDB backend for your MLBB store from zero. Follow each step in order.

---

## 📁 Project Structure

```
nexus-gear-backend/       ← your backend server
  server.js               ← main Express server
  seed.js                 ← script to populate MongoDB with products
  .env                    ← your secret config (never share this)
  package.json
  models/
    Product.js            ← MongoDB product schema
  routes/
    products.js           ← all /api/products endpoints

nexus-gear-frontend/
  mlbb-store.html         ← your updated store (now fetches from API)
```

---

## STEP 1 — Install Node.js

Node.js is the runtime that lets you run JavaScript outside the browser (your server runs on it).

1. Go to https://nodejs.org
2. Download the **LTS** version (the green button)
3. Run the installer — just click Next through everything
4. When done, open a terminal (Command Prompt or PowerShell on Windows, Terminal on Mac) and verify:

```bash
node --version   # should print something like v20.x.x
npm --version    # should print something like 10.x.x
```

If both print version numbers, you're good.

---

## STEP 2 — Install MongoDB

You have two options. Pick one:

### Option A: MongoDB Atlas (Cloud — Recommended for beginners)
No installation needed. Your database lives online.

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** and create an account
3. Create a free **M0 cluster** (free tier, no credit card needed)
4. When asked to create a user:
   - Username: `nexusgear`
   - Password: make something strong, save it somewhere
5. When asked about IP access, click **"Allow access from anywhere"** (0.0.0.0/0) for now
6. Click **"Connect"** → **"Connect your application"**
7. Copy the connection string. It looks like:
   ```
   mongodb+srv://nexusgear:<password>@cluster0.xxxxx.mongodb.net/nexusgear?retryWrites=true&w=majority
   ```
8. Replace `<password>` with the actual password you set

### Option B: Local MongoDB (runs on your own computer)
1. Go to https://www.mongodb.com/try/download/community
2. Download and install **MongoDB Community Server**
3. During install, also install **MongoDB Compass** (the visual GUI)
4. Your connection string will simply be:
   ```
   mongodb://localhost:27017/nexusgear
   ```

---

## STEP 3 — Set Up the Backend

Open your terminal and navigate to the backend folder:

```bash
cd nexus-gear-backend
```

### Install dependencies
```bash
npm install
```
This reads `package.json` and downloads Express, Mongoose, etc. into a `node_modules` folder.

### Configure your environment
Open `.env` and paste in your MongoDB connection string:

```env
# If using Atlas:
MONGODB_URI=mongodb+srv://nexusgear:yourpassword@cluster0.xxxxx.mongodb.net/nexusgear?retryWrites=true&w=majority

# If using local MongoDB:
MONGODB_URI=mongodb://localhost:27017/nexusgear

PORT=3001
FRONTEND_URL=http://localhost:5500
```

---

## STEP 4 — Seed the Database

This inserts your 12 products into MongoDB so the store has data to show.

```bash
npm run seed
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
🌱 Seeded 12 products successfully!
👋 Database connection closed
```

You can run this again any time to reset the products back to the originals.

---

## STEP 5 — Start the Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
⚡ NEXUS GEAR API running at http://localhost:3001
📦 Products API: http://localhost:3001/api/products
❤️  Health check: http://localhost:3001/api/health
```

Test it by opening your browser and going to:
**http://localhost:3001/api/products**

You should see a JSON response with all 12 products.

---

## STEP 6 — Run the Frontend

The updated `mlbb-store.html` fetches products from `http://localhost:3001/api`.

The easiest way to open it correctly (not just double-clicking):

### Using VS Code (recommended)
1. Install the **Live Server** extension in VS Code
2. Right-click `mlbb-store.html` → **"Open with Live Server"**
3. It opens at `http://localhost:5500` — products will load from your API

### Using Python (if you have it)
```bash
cd nexus-gear-frontend
python -m http.server 5500
# Then open http://localhost:5500/mlbb-store.html
```

---

## API Endpoints Reference

Once your server is running, these are all the URLs you can use:

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products?team=ECHO` | Filter by team |
| GET | `/api/products?sort=price-low` | Sort by price ascending |
| GET | `/api/products/search?q=hoodie` | Search by name/team/player |
| GET | `/api/products/:id` | Get one product by ID |
| POST | `/api/products` | Add a new product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/health` | Check if server + DB are alive |

---

## Adding a New Product (Example)

You can add a product by sending a POST request. Use a tool like **Postman** (free app) or just use the terminal:

```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ECHO x Supreme Collab Tee",
    "team": "ECHO",
    "player": "Limited Release",
    "price": 1299,
    "img": "https://your-image-url.com/tee.jpg",
    "badge": "New",
    "colors": ["#00D4FF", "#ffffff"],
    "desc": "Special collab drop. Only 500 pieces worldwide.",
    "category": "Jersey",
    "inStock": true,
    "stock": 50
  }'
```

The product immediately shows up in your store on the next page load.

---

## Common Problems & Fixes

**"MongoServerError: bad auth" or connection fails**
→ Double-check your password in `.env`. Make sure there are no spaces around the `=` sign.

**"CORS error" in browser console**
→ Make sure `FRONTEND_URL` in `.env` matches exactly where you're opening the HTML (e.g., `http://localhost:5500`).

**Products don't load / "API Offline" message**
→ Make sure `npm run dev` is still running in your terminal. The server must be running for the frontend to work.

**"Cannot find module" error**
→ You forgot to run `npm install`. Run it now from the `nexus-gear-backend` folder.

**Atlas connection works locally but not when deployed**
→ Go to Atlas → Network Access → Add your server's IP address (or use 0.0.0.0/0 to allow all).

---

## Optional: Install nodemon for auto-restart

`nodemon` is already included as a dev dependency. When you run `npm run dev`, it watches your files and automatically restarts the server when you save changes — so you don't have to stop and restart manually every time.

---

## What's Next?

Once this is working, here are natural next steps:

- **Admin panel** — Build a simple HTML page to add/edit/delete products without needing curl or Postman
- **Authentication** — Add JWT login so only you can modify products
- **Image uploads** — Use Cloudinary or AWS S3 to store product images instead of Unsplash URLs
- **Orders collection** — Add a second MongoDB collection to store order data when someone checks out
- **Deploy** — Host the backend on Railway, Render, or Fly.io (all free tiers available) so your store works online, not just on your computer
