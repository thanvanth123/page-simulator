import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    const [existing] = await db.query('SELECT id FROM Users WHERE email = ? OR username = ?', [email, username])
    if (existing.length) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const [result] = await db.query('INSERT INTO Users (username, email, passwordHash, score) VALUES (?, ?, ?, 0)', [username, email, passwordHash])
    const user = { id: result.insertId, username, email, score: 0 }
    const token = jwt.sign(user, process.env.JWT_SECRET || 'secret-key', { expiresIn: '12h' })
    res.json({ user, token })
  } catch (error) {
    console.error('Database error in register:', error)
    res.status(500).json({ message: 'Database connection error. Please try again later.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' })
    }
    const [rows] = await db.query('SELECT id, username, email, passwordHash, score FROM Users WHERE email = ?', [email])
    const user = rows[0]
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const payload = { id: user.id, username: user.username, email: user.email, score: user.score }
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret-key', { expiresIn: '12h' })
    res.json({ user: payload, token })
  } catch (error) {
    console.error('Database error in login:', error)
    res.status(500).json({ message: 'Database connection error. Please try again later.' })
  }
})

export default router
