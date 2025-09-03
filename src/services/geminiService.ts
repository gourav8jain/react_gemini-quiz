import { GoogleGenerativeAI } from '@google/generative-ai';
import type { QuizSettings, GeminiResponse } from '../types/quiz';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async generateQuiz(settings: QuizSettings): Promise<GeminiResponse> {
    try {
      // Check if API key is available
      if (!process.env.REACT_APP_GEMINI_API_KEY) {
        throw new Error('Gemini API key not configured');
      }

      const prompt = this.buildPrompt(settings);
      console.log('Making Gemini API request...');
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }
      const quizData = JSON.parse(jsonMatch[1]);
      return quizData;
    } catch (error) {
      console.error('Error generating quiz:', error);
      
      // Check if it's a rate limit error
      if (error instanceof Error && error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      
      throw new Error('Failed to generate quiz. Please try again.');
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

export const geminiService = new GeminiService(); 