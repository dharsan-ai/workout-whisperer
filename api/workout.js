import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' })
  }

  try {
    const { goal, level } = req.body

    if (!goal || !level) {
      return res.status(400).json({ error: 'Goal and level are required.' })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are Workout Whisperer, a helpful fitness assistant. Create safe, simple workout plans.',
        },
        {
          role: 'user',
          content: `Create a ${level} workout plan for ${goal}. Include 4 exercises, sets, reps, and one safety tip.`,
        },
      ],
    })

    return res.status(200).json({
      plan: completion.choices[0].message.content,
    })
  } catch (error) {
    return res.status(500).json({
      error: 'AI workout generation failed. Check OPENAI_API_KEY environment variable.',
    })
  }
}
