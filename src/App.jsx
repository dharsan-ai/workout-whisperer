import { useState } from 'react'

function App() {
  const [goal, setGoal] = useState('strength')
  const [level, setLevel] = useState('beginner')

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

  return (
    <main className="app">
      <section className="hero">
        <p className="label">AI fitness planner</p>
        <h1>Workout Whisperer</h1>
        <p>
          Choose your fitness goal and level. Workout Whisperer suggests a simple
          workout plan based on your input.
        </p>
      </section>

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
      </section>

      <section className="workouts">
        <h2>Recommended Plan</h2>

        {suggestions.map((workout) => (
          <article className="workout-card" key={workout}>
            <span>{workout}</span>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
