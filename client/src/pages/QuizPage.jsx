import { useEffect, useMemo, useState } from 'react'
import Confetti from 'react-confetti'

export default function QuizPage({ user }) {
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/quiz/getQuestions')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => setQuestions(data))
      .catch((error) => {
        console.error('Error fetching quiz questions:', error)
        setQuestions([])
      })
      .finally(() => setLoading(false))
  }, [])

  const isComplete = questions.length > 0 ? index >= questions.length : false
  const current = questions[index] || {}

  const progress = useMemo(() => {
    if (!questions.length) return 0
    return Math.round((index / questions.length) * 100)
  }, [index, questions.length])
  const scorePercent = useMemo(() => {
    if (!questions.length) return 0
    return Math.round((score / questions.length) * 100)
  }, [score, questions.length])

  useEffect(() => {
    if (submitted && isComplete && user) {
      fetch('/api/quiz/submitScore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('mpio_token')}` },
        body: JSON.stringify({ score: scorePercent })
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .catch((error) => {
        console.error('Error submitting quiz score:', error)
      })
    }
  }, [submitted, isComplete, user, scorePercent])

  const handleNext = () => {
    if (!selected) return
    if (selected === current.correctAnswer) {
      setScore((count) => count + 1)
    }
    setSelected(null)
    setIndex((step) => step + 1)
    if (index + 1 >= questions.length) {
      setSubmitted(true)
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16 text-center text-slate-300">
        Loading quiz questions...
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {scorePercent > 70 && submitted ? <Confetti numberOfPieces={200} /> : null}
      <div className="mb-10 space-y-3 text-center">
        <p className="text-cyan-300 uppercase tracking-[0.3em]">Quiz Challenge</p>
        <h1 className="text-4xl font-bold text-white">Test your paging expertise</h1>
      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-cyan-500/10">
        <div className="mb-6 rounded-3xl bg-slate-950 p-4 text-slate-200">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-cyan-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
        {isComplete ? (
          <div className="space-y-6 text-center text-slate-200">
            <p className="text-xl">Quiz complete!</p>
            <p className="text-5xl font-bold text-white">{scorePercent}%</p>
            <p className="text-slate-400">{score} of {questions.length} correct</p>
            <p className="text-slate-300">{scorePercent > 70 ? 'Great job! Your score has been submitted.' : 'Keep learning and try again to reach the leaderboard.'}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-950 p-6 text-slate-200">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Question {index + 1}</p>
              <p className="mt-4 text-2xl font-semibold text-white">{current.question}</p>
            </div>
            <div className="grid gap-4">
              {current.options?.map((option) => {
                const selectedClass = selected === option ? 'border-cyan-400 bg-cyan-500/10 text-white' : 'border-slate-700 bg-slate-950 text-slate-200'
                return (
                  <button key={option} onClick={() => setSelected(option)} className={`rounded-3xl border p-4 text-left transition ${selectedClass}`}>{option}</button>
                )
              })}
            </div>
            <button onClick={handleNext} className="glow-button" disabled={!selected}>Next Question</button>
          </div>
        )}
      </div>
    </main>
  )
}
