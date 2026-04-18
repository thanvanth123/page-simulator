import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/getScores', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT l.userId, u.username, l.score, l.timestamp
       FROM Leaderboard l
       JOIN Users u ON l.userId = u.id
       ORDER BY l.score DESC, l.timestamp ASC
       LIMIT 20`
    )
    res.json(rows)
  } catch (error) {
    console.error('Database error in getScores:', error)
    res.status(500).json({ message: 'Database connection error. Please try again later.' })
  }
})

export default router
