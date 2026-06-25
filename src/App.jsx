import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('Strength')
  const [level, setLevel] = useState('Beginner')
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      name: 'Full Body Starter',
      goal: 'Strength',
      level: 'Beginner',
      exercises: 'Push-ups, Squats, Plank',
    },
  ])

  const handleLogin = (event) => {
    event.preventDefault()
    setUser(name || 'Fitness User')
  }

  const handleAddWorkout = (event) => {
    event.preventDefault()

    const newWorkout = {
      id: Date.now(),
      name: `${goal} ${level} Plan`,
      goal,
      level,
      exercises:
        goal === 'Cardio'
          ? 'Jumping Jacks, High Knees, Mountain Climbers'
          : goal === 'Flexibility'
            ? 'Hamstring Stretch, Cobra Stretch, Child Pose'
            : 'Push-ups, Squats, Plank',
    }

    setWorkouts([newWorkout, ...workouts])
  }

  const handleDeleteWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id))
  }

  if (!user) {
    return (
      <main className="app auth-page">
        <section className="auth-card">
          <p className="label">Workout Whisperer</p>
          <h1>Login</h1>
          <p>Enter your name to access your workout dashboard.</p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
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
          <p>Welcome, {user}. Create and manage your workout plans.</p>
        </div>
        <button className="secondary" onClick={() => setUser('')}>
          Logout
        </button>
      </header>

      <section className="panel">
        <h2>Create Workout Plan</h2>

        <form className="form-grid" onSubmit={handleAddWorkout}>
          <label>
            Goal
            <select value={goal} onChange={(event) => setGoal(event.target.value)}>
              <option>Strength</option>
              <option>Cardio</option>
              <option>Flexibility</option>
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

          <button type="submit">Add Plan</button>
        </form>
      </section>

      <section className="panel">
        <h2>Workout Plans</h2>

        {workouts.map((workout) => (
          <article className="workout-card" key={workout.id}>
            <div>
              <h3>{workout.name}</h3>
              <p>{workout.goal} • {workout.level}</p>
              <p>{workout.exercises}</p>
            </div>

            <button className="danger" onClick={() => handleDeleteWorkout(workout.id)}>
              Delete
            </button>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
