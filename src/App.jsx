import { useState } from 'react'

function App() {
  const [userName, setUserName] = useState('')
  const [loginName, setLoginName] = useState('')
  const [goal, setGoal] = useState('strength')
  const [level, setLevel] = useState('beginner')
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Push-ups', reps: '3 sets x 10 reps', type: 'Strength' },
    { id: 2, name: 'Jumping Jacks', reps: '3 sets x 30 seconds', type: 'Cardio' },
    { id: 3, name: 'Squats', reps: '3 sets x 12 reps', type: 'Legs' },
  ])

  const [form, setForm] = useState({
    name: '',
    reps: '',
    type: '',
  })

  const [editingId, setEditingId] = useState(null)

  const workoutSuggestions = {
    strength: {
      beginner: [
        'Push-ups - 3 sets x 8 reps',
        'Bodyweight squats - 3 sets x 10 reps',
        'Plank - 3 sets x 20 seconds',
      ],
      intermediate: [
        'Push-ups - 4 sets x 15 reps',
        'Lunges - 4 sets x 12 reps',
        'Plank shoulder taps - 3 sets x 20 reps',
      ],
    },
    cardio: {
      beginner: [
        'Jumping jacks - 3 sets x 30 seconds',
        'Marching in place - 3 sets x 45 seconds',
        'Step-ups - 3 sets x 10 reps',
      ],
      intermediate: [
        'High knees - 4 sets x 30 seconds',
        'Burpees - 3 sets x 8 reps',
        'Mountain climbers - 4 sets x 20 reps',
      ],
    },
    flexibility: {
      beginner: [
        'Neck stretches - 2 minutes',
        'Hamstring stretch - 3 sets x 20 seconds',
        'Child pose - 2 minutes',
      ],
      intermediate: [
        'Deep lunges - 3 sets x 30 seconds',
        'Seated forward fold - 3 sets x 30 seconds',
        'Cobra stretch - 3 sets x 20 seconds',
      ],
    },
  }

  const suggestions = workoutSuggestions[goal][level]

  function handleLogin(event) {
    event.preventDefault()

    if (!loginName.trim()) {
      return
    }

    setUserName(loginName.trim())
    setLoginName('')
  }

  function handleLogout() {
    setUserName('')
  }

  function handleFormChange(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.name.trim() || !form.reps.trim() || !form.type.trim()) {
      return
    }

    if (editingId) {
      setWorkouts(
        workouts.map((workout) =>
          workout.id === editingId ? { ...workout, ...form } : workout,
        ),
      )
      setEditingId(null)
    } else {
      setWorkouts([
        ...workouts,
        {
          id: Date.now(),
          ...form,
        },
      ])
    }

    setForm({ name: '', reps: '', type: '' })
  }

  function handleEdit(workout) {
    setEditingId(workout.id)
    setForm({
      name: workout.name,
      reps: workout.reps,
      type: workout.type,
    })
  }

  function handleDelete(id) {
    setWorkouts(workouts.filter((workout) => workout.id !== id))
  }

  if (!userName) {
    return (
      <main className="app auth-page">
        <section className="auth-card">
          <p className="label">Workout Whisperer</p>
          <h1>Login</h1>
          <p>Enter your name to open your workout dashboard.</p>

          <form onSubmit={handleLogin} className="auth-form">
            <input
              type="text"
              value={loginName}
              onChange={(event) => setLoginName(event.target.value)}
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
          <p>Welcome, {userName}. Manage workouts and get smart suggestions.</p>
        </div>

        <button type="button" className="secondary-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="recommender">
        <h2>AI Workout Suggestion</h2>

        <div className="controls">
          <label>
            Fitness Goal
            <select value={goal} onChange={(event) => setGoal(event.target.value)}>
              <option value="strength">Build Strength</option>
              <option value="cardio">Improve Cardio</option>
              <option value="flexibility">Improve Flexibility</option>
            </select>
          </label>

          <label>
            Fitness Level
            <select value={level} onChange={(event) => setLevel(event.target.value)}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </label>
        </div>

        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <article className="suggestion-card" key={suggestion}>
              {suggestion}
            </article>
          ))}
        </div>
      </section>

      <section className="manager">
        <h2>Workout Manager</h2>

        <form onSubmit={handleSubmit} className="workout-form">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            placeholder="Workout name"
          />

          <input
            type="text"
            name="reps"
           
