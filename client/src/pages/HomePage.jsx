import Typewriter from 'typewriter-effect'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function HomePage({ user }) {
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      title: 'Interactive Simulators',
      description: 'Step through page replacement algorithms and address translation with real-time visualization.',
      icon: '🎮',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      title: 'Smart Learning Path',
      description: 'Follow a structured learning journey with progress tracking and achievements.',
      icon: '🎯',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      title: 'Quiz & Leaderboard',
      description: 'Test your OS knowledge and compare scores with fellow learners worldwide.',
      icon: '🏆',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      title: 'Visual Generators',
      description: 'Create page tables and export CSV for practice and documentation.',
      icon: '📊',
      color: 'from-orange-500/20 to-red-500/20'
    }
  ]

  const stats = [
    { label: 'Active Learners', value: '2.5K+', icon: '👥' },
    { label: 'Pages Translated', value: '50K+', icon: '🔄' },
    { label: 'Quizzes Completed', value: '10K+', icon: '✅' },
    { label: 'Algorithms Simulated', value: '25K+', icon: '⚡' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-slate-950/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]" />

      <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-6 py-24 text-center">
        <div className="animate-fadeIn">
          <span className="mb-4 inline-flex animate-pulse-gentle rounded-full bg-cyan-500/20 px-4 py-1 text-sm uppercase tracking-[0.35em] text-cyan-200">
            🚀 Operating Systems Learning Lab
          </span>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Master <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Paging</span> in OS
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            <Typewriter
              options={{
                strings: [
                  'Visualize memory division like never before.',
                  'Translate logical to physical addresses instantly.',
                  'Crush page faults with confidence and clarity.',
                  'Master FIFO, LRU, and Optimal algorithms.',
                  'Build intuition through interactive simulations.'
                ],
                autoStart: true,
                loop: true,
                delay: 70,
                deleteSpeed: 30
              }}
            />
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link className="glow-button group" to="/learn">
              <span className="mr-2">🚀</span>
              Start Learning Journey
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link className="rounded-full border border-white/10 bg-white/10 px-6 py-3 text-white transition hover:border-cyan-300 hover:bg-cyan-500/15 hover:scale-105" to="/page-replacement">
              <span className="mr-2">🎮</span>
              Try Simulator
            </Link>
          </div>
        </div>

        {/* Floating Achievement Badges */}
        <div className="absolute top-20 left-10 animate-bounce-subtle hidden lg:block">
          <div className="rounded-full bg-yellow-500/20 border border-yellow-400/30 p-3">
            <span className="text-2xl">🏆</span>
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-bounce-subtle animation-delay-1000 hidden lg:block">
          <div className="rounded-full bg-green-500/20 border border-green-400/30 p-3">
            <span className="text-2xl">🎯</span>
          </div>
        </div>
        <div className="absolute bottom-32 left-16 animate-bounce-subtle animation-delay-2000 hidden lg:block">
          <div className="rounded-full bg-purple-500/20 border border-purple-400/30 p-3">
            <span className="text-2xl">⚡</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-fadeIn glass-card p-4 text-center"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-cyan-300">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Platform?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Experience paging concepts through interactive visualizations, gamified learning, and comprehensive tools designed for modern OS education.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`animate-fadeIn glass-card p-6 bg-gradient-to-br ${feature.color} border-0 relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">{feature.icon}</span>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center text-cyan-300 text-sm font-medium">
                  <span>Learn more</span>
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="glass-card p-8 text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Master Memory Management?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have transformed their understanding of operating systems through our interactive learning platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link className="glow-button" to="/learn">
                Continue Learning
              </Link>
            ) : (
              <>
                <Link className="glow-button" to="/auth">
                  Get Started Free
                </Link>
                <Link className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 text-cyan-300 transition hover:bg-cyan-500/20" to="/learn">
                  Explore as Guest
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
