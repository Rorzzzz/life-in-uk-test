# New Question Command
# Usage: /new-question

Ask me for the following details one at a time:
1. Chapter number (1-5)
2. Question text
3. Four options labelled A, B, C, D
4. Which option is correct (A/B/C/D)
5. Explanation (1-3 sentences, friendly tone, explains WHY it's correct)
6. Difficulty (easy / medium / hard)

Then add the question to src/data/questions.js using the exact schema:
{
  id: [next sequential id],
  chapter: [1-5],
  q: '[question text]',
  options: ['[A]', '[B]', '[C]', '[D]'],
  answer: [0-3],
  explanation: '[explanation]',
  difficulty: 'easy|medium|hard',
  tags: [],
}

After adding, report: questions in this chapter, total question count.
