import { useEffect, useState } from 'react'
import './App.css'

const defaultPlans = [
  {
    id: 1,
    goal: 'Strength',
    level: 'Beginner',
    content:
      'Push-ups - 3 sets x 8 reps\nBodyweight squats - 3 sets x 10 reps\nPlank - 3 sets x 20 seconds\nGlute bridges - 3 sets x 12 reps',
  },
]

function App() {
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('Strength')
  const [level, setLevel] = useState('Beginner')
  const [aiPlan, setAiPlan] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedPlans, setSavedPlans] = useState(defaultPlans)

  useEffect(() => {
    const storedUser = localStorage.getItem('workoutUser')
    const storedPlans = localStorage.getItem('workoutPlans')

    if (storedUser) {
      setUser(storedUser)
    }

    if (storedPlans) {
      setSavedPlans(JSON.parse(storedPlans))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('workoutPlans', JSON.stringify(savedPlans))
  }, [savedPlans])

  const handleLogin = (event) => {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) {
      setError('Please enter your name to continue.')
      return
    }

    setError('')
    setUser(trimmedName)
    localStorage.setItem('workoutUser', trimmedName)
  }

  const handleLogout = () => {
    setUser('')
    setName('')
    localStorage.removeItem('workoutUser')
  }

  const generateWorkout = async () => {
    if (!goal || !level) {
      setError('Please choose a goal and fitness level.')
      return
    }

    setLoading(true)
    setError('')
    setAiPlan('')

    try {
      const response = await fetch('/api/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, level }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'AI request failed.')
      }

      setAiPlan(data.plan || 'No workout plan returned.')
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the AI workout endpoint.')
    } finally {
      setLoading(false)
    }
  }

  const savePlan = () => {
    if (!aiPlan) {
      setError('Generate an AI workout before saving.')
      return
    }

    const plan = {
      id: Date.now(),
      goal,
      level,
      content: aiPlan,
    }

    setSavedPlans([plan, ...savedPlans])
    setError('')
  }

  const deletePlan = (id) => {
    setSavedPlans(savedPlans.filter((plan) => plan.id !== id))
  }

  const clearPlans = () => {
    setSavedPlans([])
  }

  if (!user) {
    return (
      <main className="app auth-page">
        <section className="auth-card">
          <p className="label">Workout Whisperer</p>
          <h1>Login</h1>
          <p>Enter your name to open your AI workout dashboard.</p>

          <form onSubmit={handleLogin}>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </section>
      </main>
    )
  }

  return (
    <main className="app">
      <header className="topbar">
        <div>
          <p className="label">AI fitness planner</p>
          <h1>Workout Whisperer</h1>
          <p>Welcome, {user}. Generate, save, and manage workout plans.</p>
        </div>

        <button className="secondary" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="panel">
        <h2>Generate AI Workout</h2>

        <div className="form-grid">
          <label>
            Goal
            <select value={goal} onChange={(event) => setGoal(event.target.value)}>
              <option>Strength</option>
              <option>Cardio</option>
              <option>Flexibility</option>
              <option>Weight Loss</option>
            </select>
          </label>

          <label>
            Level
            <select value={level} onChange={(event) => setLevel(event.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </label>

          <button type="button" onClick={generateWorkout} disabled={loading}>
            {loading ? 'Asking AI...' : 'Ask AI'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {aiPlan && (
          <div className="ai-result">
            <h3>AI Suggested Plan</h3>
            <p>{aiPlan}</p>
            <button type="button" onClick={savePlan}>
              Save Plan
            </button>
          </div>
        )}
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Saved Plans</h2>
            <p>{savedPlans.length} workout plan(s) saved locally.</p>
          </div>

          <button className="secondary" onClick={clearPlans}>
            Clear All
          </button>
        </div>

        {savedPlans.length === 0 && <p>No saved plans yet.</p>}

        {savedPlans.map((plan) => (
          <article className="workout-card" key={plan.id}>
            <div>
              <h3>{plan.goal} - {plan.level}</h3>
              <p>{plan.content}</p>
            </div>

            <button className="danger" onClick={() => deletePlan(plan.id)}>
              Delete
            </button>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
