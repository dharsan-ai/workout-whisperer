import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { goal, level } = request.body

    const result = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: `Create a short beginner-friendly workout plan for a user with goal: ${goal} and fitness level: ${level}. Give 4 exercises with sets/reps.`,
    })

    return response.status(200).json({
      plan: result.output_text,
    })
  } catch (error) {
    return response.status(500).json({
      error: 'Failed to generate workout plan',
    })
  }
}
