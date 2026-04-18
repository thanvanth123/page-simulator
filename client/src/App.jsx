import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ThemeToggle from './components/ThemeToggle'
import ProgressTracker from './components/ProgressTracker'
import HomePage from './pages/HomePage'
import LearnPage from './pages/LearnPage'
import AddressTranslationPage from './pages/AddressTranslationPage'
import PageReplacementPage from './pages/PageReplacementPage'
import PageTableGeneratorPage from './pages/PageTableGeneratorPage'
import LogicalPhysicalPage from './pages/LogicalPhysicalPage'
import QuizPage from './pages/QuizPage'
import LeaderboardPage from './pages/LeaderboardPage'
import AuthPage from './pages/AuthPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('mpio_token')
    const userData = localStorage.getItem('mpio_user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('mpio_token')
    localStorage.removeItem('mpio_user')
    setUser(null)
    navigate('/')
  }

  const showProgressTracker = !['/', '/auth'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar user={user} onLogout={handleLogout} />
      <ThemeToggle />
      {showProgressTracker && <ProgressTracker currentPath={location.pathname} />}
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/address-translation" element={<AddressTranslationPage />} />
        <Route path="/page-replacement" element={<PageReplacementPage />} />
        <Route path="/page-table-generator" element={<PageTableGeneratorPage />} />
        <Route path="/logical-physical" element={<LogicalPhysicalPage />} />
        <Route path="/quiz" element={<QuizPage user={user} />} />
        <Route path="/leaderboard" element={<LeaderboardPage user={user} />} />
        <Route path="/auth" element={<AuthPage setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
