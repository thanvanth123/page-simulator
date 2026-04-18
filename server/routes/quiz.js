import express from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/getQuestions', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, question, options FROM QuizQuestions ORDER BY id LIMIT 10')
    res.json(rows.map((row) => ({ ...row, options: JSON.parse(row.options) })))
  } catch (error) {
    console.error('Database error in getQuestions:', error)
    res.status(500).json({ message: 'Database connection error. Please try again later.' })
  }
})

router.post('/submitScore', requireAuth, async (req, res) => {
  try {
    const { score } = req.body
    const userId = req.user.id
    if (typeof score !== 'number') {
      return res.status(400).json({ message: 'Score must be a number' })
    }
    await db.query('INSERT INTO Leaderboard (userId, score, timestamp) VALUES (?, ?, NOW())', [userId, score])
    await db.query('UPDATE Users SET score = ? WHERE id = ?', [score, userId])
    res.json({ message: 'Score submitted' })
  } catch (error) {
    console.error('Database error in submitScore:', error)
    res.status(500).json({ message: 'Database connection error. Please try again later.' })
  }
})

export default router
