import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are an experienced IELTS speaking examiner assessing a candidate's spoken response (provided as a transcript). Give honest, specific, constructive feedback. Be direct — not vague or overly encouraging.

Note: you are assessing a transcript of speech, so you cannot evaluate pronunciation directly. Acknowledge this briefly in your feedback.

Your feedback must follow this exact format with these exact headings:

**Fluency & Coherence**
[1-2 sentences: did they speak at length without hesitation? Was the response logically organised and easy to follow?]

**Lexical Resource**
[1-2 sentences: highlight 1-2 strong vocabulary choices if any. Flag any weak or repetitive word choices.]

**Grammatical Range & Accuracy**
[1-2 sentences: note any strong structures. Point out the most significant error if there is one.]

**Pronunciation**
[1 sentence: note that pronunciation cannot be assessed from transcript. Give one specific tip for this question type instead.]

**Estimated Band**
[Single number like: Band 6 — then one sentence explaining why]

**B2 Verdict**
[Write exactly one of these two lines:
PASS — Band 5.5 or above meets the B2 requirement for UK settlement.
FAIL — Band [X] is below the 5.5 threshold required for UK settlement.]

**The One Thing to Improve**
[One specific, actionable instruction. Not generic advice. Tell them exactly what to change.]

Keep the total response under 280 words. Be direct. Write like an examiner who respects the candidate's time.`

export async function POST(request) {
  try {
    const { transcript, question, part, promptPoints } = await request.json()

    if (!transcript || transcript.trim().length < 20) {
      return Response.json({ error: 'Transcript too short to assess.' }, { status: 400 })
    }

    const pointsText = promptPoints && promptPoints.length > 0
      ? `\nCue card points to cover:\n${promptPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}`
      : ''

    const userMessage = `IELTS Speaking Part ${part} question:
"${question}"${pointsText}

Candidate's response transcript:
---
${transcript.trim()}
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
    console.error('Speaking feedback error:', err)
    return Response.json({ error: 'Feedback unavailable — please try again.' }, { status: 500 })
  }
}
