import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import quizRoutes from './routes/quiz.js'
import leaderboardRoutes from './routes/leaderboard.js'
import pagingRoutes from './routes/paging.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/paging', pagingRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
