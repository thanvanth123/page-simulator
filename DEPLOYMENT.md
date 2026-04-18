# OS Paging Educational Website - Deployment Guide

## 🚀 Deploy to Render.com (Recommended - Free & Easy)

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Connect your GitHub repository

### Step 2: Deploy Backend + Frontend
1. Click "New" → "Web Service"
2. Connect your GitHub repo: `your-username/os-paging-project`
3. Configure:
   - **Name**: `os-paging-app`
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`

### Step 3: Add Database
1. Click "New" → "PostgreSQL" (or MySQL if available)
2. Name: `os-paging-db`
3. Copy the database URL

### Step 4: Set Environment Variables
In your Render web service settings, add:
```
NODE_ENV=production
PORT=10000
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=master_paging_os
JWT_SECRET=your-super-secret-key-here
```

### Step 5: Run Database Migration
After deployment, run the SQL script in `server/migrations/create-schema.sql` in your database.

## 🎯 Your Live URL
After deployment: `https://os-paging-app.onrender.com`

## 🔧 Alternative: Deploy to Railway

### Railway Deployment (Also Free)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Railway will auto-detect and deploy both frontend/backend
4. Add MySQL database from Railway dashboard

## 📱 Features That Will Work Online
- ✅ Address Translation
- ✅ Page Replacement Algorithms
- ✅ Page Table Generation
- ✅ Interactive Memory Visualization
- ✅ User Authentication (with database)
- ✅ Quiz System (with database)
- ✅ Leaderboard (with database)

## 🆘 Troubleshooting
- If build fails: Check that all dependencies are in package.json
- If database errors: Ensure environment variables are set correctly
- If 404 errors: Check that React build is working

---
**Your teacher can now view the complete OS paging educational website online! 🎉**