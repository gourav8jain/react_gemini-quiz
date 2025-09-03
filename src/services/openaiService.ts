import OpenAI from 'openai';
import type { QuizSettings, GeminiResponse } from '../types/quiz';

// Get API key from environment variable
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
if (!apiKey) {
  console.warn('OpenAI API key not found in environment variables');
}

const openai = new OpenAI({
  apiKey: apiKey || '',
  dangerouslyAllowBrowser: true // Required for client-side usage
});

export class OpenAIService {
  private model = 'gpt-3.5-turbo';

  async generateQuiz(settings: QuizSettings): Promise<GeminiResponse> {
    try {
      // Check if API key is available
      if (!process.env.REACT_APP_OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }

      const prompt = this.buildPrompt(settings);
      console.log('Making OpenAI API request...');
      
      const completion = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates educational quizzes. Always respond with valid JSON in the exact format requested.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const responseText = completion.choices[0]?.message?.content;
      if (!responseText) {
        throw new Error('No response from OpenAI API');
      }

      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
      const jsonText = jsonMatch ? jsonMatch[1] : responseText;
      
      // Clean up the JSON text
      const cleanedJson = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const quizData = JSON.parse(cleanedJson);
      return quizData;
    } catch (error) {
      console.error('Error generating quiz with OpenAI:', error);
      
      // Check if it's a quota/rate limit error
      if (error instanceof Error && error.message.includes('429')) {
        throw new Error('OpenAI quota exceeded. Please try again later.');
      }
      
      throw new Error('Failed to generate quiz with OpenAI. Please try again.');
    }
  }

  private buildPrompt(settings: QuizSettings): string {
    const { topic, difficulty, numQuestions, questionType } = settings;
    return `Generate a ${difficulty} level quiz about "${topic}" with ${numQuestions} ${questionType} questions.

Please provide the response in the following JSON format:

\`\`\`json
{
  "questions": [
    {
      "question": "Your question here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Brief explanation of why this is the correct answer"
    }
  ]
}
\`\`\`

Requirements:
- Make questions engaging and educational
- Ensure all options are plausible but only one is correct
- Provide clear explanations for correct answers
- Use 0-based indexing for correctAnswer (0 = first option, 1 = second option, etc.)
- For true-false questions, use ["True", "False"] as options
- Make sure the difficulty level matches the specified level
- Focus on the topic: ${topic}

Generate exactly ${numQuestions} questions.`;
  }
}

export const openaiService = new OpenAIService();
