import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('Strength')
  const [level, setLevel] = useState('Beginner')
  const [aiPlan, setAiPlan] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedPlans, setSavedPlans] = useState([])

  const handleLogin = (event) => {
    event.preventDefault()
    setUser(name || 'Fitness User')
  }

  const generateWorkout = async () => {
    setLoading(true)
    setAiPlan('')

    try {
      const response = await fetch('/api/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, level }),
      })

      const data = await response.json()
      setAiPlan(data.plan || data.error || 'No AI plan returned.')
    } catch {
      setAiPlan('Unable to connect to the AI workout endpoint.')
    } finally {
      setLoading(false)
    }
  }

  const savePlan = () => {
    if (!aiPlan) return

    const plan = {
      id: Date.now(),
      goal,
      level,
      content: aiPlan,
    }

    setSavedPlans([plan, ...savedPlans])
  }

  const deletePlan = (id) => {
    setSavedPlans(savedPlans.filter((plan) => plan.id !== id))
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
          <p>Welcome, {user}. Generate workout plans with an LLM.</p>
        </div>

        <button className="secondary" onClick={() => setUser('')}>
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

          <button type="button" onClick={generateWorkout}>
            {loading ? 'Asking AI...' : 'Ask AI'}
          </button>
        </div>

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
        <h2>Saved Plans</h2>

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
