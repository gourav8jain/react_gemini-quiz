import { geminiService } from './geminiService';
import { openaiService } from './openaiService';
import type { QuizSettings, GeminiResponse } from '../types/quiz';

export class UnifiedAIService {
  async generateQuiz(settings: QuizSettings): Promise<GeminiResponse> {
    // Try Gemini first
    try {
      console.log('Attempting to generate quiz with Gemini...');
      const result = await geminiService.generateQuiz(settings);
      console.log('Successfully generated quiz with Gemini');
      return result;
    } catch (geminiError) {
      console.warn('Gemini API failed, falling back to OpenAI:', geminiError);
      
      // Fallback to OpenAI
      try {
        console.log('Attempting to generate quiz with OpenAI...');
        const result = await openaiService.generateQuiz(settings);
        console.log('Successfully generated quiz with OpenAI');
        return result;
      } catch (openaiError) {
        console.error('Both Gemini and OpenAI APIs failed:', { geminiError, openaiError });
        throw new Error('Failed to generate quiz. Both Gemini and OpenAI APIs are unavailable. Please try again later.');
      }
    }
  }
}

export const unifiedAIService = new UnifiedAIService();
