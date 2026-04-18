import { useState, useEffect } from 'react'

const modules = [
  { id: 'learn', title: 'Learn Basics', path: '/learn', completed: false },
  { id: 'address-translation', title: 'Address Translation', path: '/address-translation', completed: false },
  { id: 'page-replacement', title: 'Page Replacement', path: '/page-replacement', completed: false },
  { id: 'page-table', title: 'Page Table Generator', path: '/page-table-generator', completed: false },
  { id: 'quiz', title: 'Take Quiz', path: '/quiz', completed: false }
]

export default function ProgressTracker({ currentPath }) {
  const [progress, setProgress] = useState(modules)

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('progress') || '[]')
    const updatedProgress = modules.map(module => ({
      ...module,
      completed: savedProgress.includes(module.id)
    }))
    setProgress(updatedProgress)
  }, [])

  const markCompleted = (moduleId) => {
    const updatedProgress = progress.map(module =>
      module.id === moduleId ? { ...module, completed: true } : module
    )
    setProgress(updatedProgress)

    const completedIds = updatedProgress
      .filter(module => module.completed)
      .map(module => module.id)

    localStorage.setItem('progress', JSON.stringify(completedIds))
  }

  useEffect(() => {
    const currentModule = progress.find(module => module.path === currentPath)
    if (currentModule && !currentModule.completed) {
      // Auto-mark as completed after 30 seconds on the page
      const timer = setTimeout(() => {
        markCompleted(currentModule.id)
      }, 30000)
      return () => clearTimeout(timer)
    }
  }, [currentPath, progress])

  const completedCount = progress.filter(module => module.completed).length
  const progressPercentage = (completedCount / modules.length) * 100

  return (
    <div className="fixed top-20 right-6 z-40 w-64">
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Learning Progress</h3>

        <div className="progress-bar mb-4">
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <p className="text-sm text-slate-300 mb-4">
          {completedCount} of {modules.length} modules completed
        </p>

        <div className="space-y-2">
          {progress.map((module, index) => (
            <div
              key={module.id}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                module.completed
                  ? 'bg-green-500/10 border border-green-500/20'
                  : currentPath === module.path
                  ? 'bg-cyan-500/10 border border-cyan-500/20'
                  : 'bg-slate-800/50'
              }`}
            >
              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                module.completed
                  ? 'bg-green-500 text-white'
                  : currentPath === module.path
                  ? 'bg-cyan-500 text-white animate-pulse-gentle'
                  : 'bg-slate-600 text-slate-400'
              }`}>
                {module.completed ? '✓' : index + 1}
              </div>
              <span className={`text-sm ${module.completed ? 'text-green-300' : 'text-slate-300'}`}>
                {module.title}
              </span>
            </div>
          ))}
        </div>

        {completedCount === modules.length && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-300 text-sm font-medium">🎉 Congratulations!</p>
            <p className="text-yellow-200 text-xs">You've completed all modules!</p>
          </div>
        )}
      </div>
    </div>
  )
}