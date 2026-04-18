# Master Paging in OS

Full-stack educational website for operating systems paging concepts.

## 🚀 Quick Start - Always Working Setup

### For Continuous Operation (Recommended)
1. **Run the auto-restart script**: Double-click `start-server.bat`
2. **Start frontend**: `cd client && npm run dev`
3. **Access**: http://localhost:5177

The paging concepts will work continuously even if MySQL database is not available!

## 📁 Structure

- `client/` — React + Tailwind frontend with routing, animations, simulators, quiz, and leaderboard.
- `server/` — Express backend with MySQL connectivity, authentication, quiz and paging APIs.

## 🛠️ Full Setup (Optional - for database features)

1. Install dependencies:
   - `cd server && npm install`
   - `cd ../client && npm install`
2. Create MySQL database and run migration:
   - `mysql -u root -p < server/migrations/create-schema.sql`
3. Copy `server/.env.example` to `server/.env` and update credentials.
4. Start backend:
   - `cd server && npm start`
5. Start frontend:
   - `cd client && npm run dev`

## ✨ Features

### ✅ Always Available (No Database Required)
- **Address Translation**: Convert logical addresses to physical addresses
- **Page Replacement Algorithms**: FIFO, LRU, Optimal algorithms
- **Page Table Generation**: Create and visualize page tables
- **Interactive Memory Visualization**: Visual representation of paging concepts

### ⚠️ Database-Dependent Features
- User Authentication (Register/Login)
- Quiz System
- Leaderboard

*Note: Database features show error messages if MySQL is unavailable, but don't crash the server.*

## 🛡️ Server Stability

- ✅ Error handling for database connection failures
- ✅ Global error handler prevents crashes
- ✅ Graceful degradation when database unavailable
- ✅ Auto-restart capability with `start-server.bat`

## 🔗 API Endpoints

### ✅ Always Working Endpoints
- `POST /api/paging/addressTranslation` - Convert logical to physical addresses
- `POST /api/paging/pageReplacement` - Simulate page replacement algorithms
- `POST /api/paging/pageTableGenerator` - Generate page tables

### ⚠️ Database-Dependent Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/quiz/getQuestions` - Get quiz questions
- `POST /api/quiz/submitScore` - Submit quiz scores
- `GET /api/leaderboard/getScores` - Get leaderboard scores

## 🎯 Access URLs

- **Frontend Application**: http://localhost:5177
- **Backend API**: http://localhost:4000

**The paging concepts are guaranteed to work continuously!** 🎉
