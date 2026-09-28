import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are an experienced IELTS examiner assessing a candidate's writing response. Give honest, specific, constructive feedback. Do not be vague or overly encouraging — be direct about what works and what doesn't.

Your feedback must follow this exact format with these exact headings:

**Task Achievement**
[1-2 sentences: did they address all parts of the task? Did they cover the key points?]

**Coherence & Cohesion**
[1-2 sentences: is the response logically organised? Are linking words used well?]

**Vocabulary**
[1-2 sentences: highlight 1-2 strong word choices if any. Flag any weak or incorrect usage.]

**Grammar**
[1-2 sentences: note any strong structures used. Point out the most significant error if there is one.]

**Estimated Band**
[Single number like: Band 6 — then one sentence explaining why]

**The One Thing to Improve**
[One specific, actionable instruction. Not generic advice like "practise more". Tell them exactly what to change.]

Keep the total response under 250 words. Be direct. Write like an examiner who respects the candidate's time.`

export async function POST(request) {
  try {
    const { userText, taskPrompt, taskType, keyPoints } = await request.json()

    if (!userText || userText.trim().length < 30) {
      return Response.json({ error: 'Please write at least a few sentences before requesting feedback.' }, { status: 400 })
    }

    const wordCount = userText.trim().split(/\s+/).length
    const minWords = taskType === 1 ? 150 : 250

    const userMessage = `IELTS Task ${taskType} prompt:
"${taskPrompt}"

Key points the response should cover:
${keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Candidate's response (${wordCount} words):
---
${userText.trim()}
---

Please assess this response.`

    const stream = await client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text))
            }
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err) {
    console.error('B2 writing feedback error:', err)
    return Response.json({ error: 'Feedback unavailable — please try again.' }, { status: 500 })
  }
}
