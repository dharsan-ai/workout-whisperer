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

    const prompt = `
You are Workout Whisperer, an AI fitness assistant.
Create a safe workout plan for this user.

Goal: ${goal}
Fitness level: ${level}

Return:
- 4 exercises
- sets and reps
- one short safety tip
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful fitness assistant that creates simple workout plans.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    return res.status(200).json({
      plan: completion.choices[0].message.content,
    })
  } catch (error) {
    return res.status(500).json({
      error: 'AI workout generation failed',
    })
  }
}
