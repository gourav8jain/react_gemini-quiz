import { geminiService } from './geminiService';
import { openaiService } from './openaiService';
import { mockAIService } from './mockAIService';
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
      
      // Check if it's a rate limit error and wait a bit before trying OpenAI
      if (geminiError instanceof Error && geminiError.message.includes('429')) {
        console.log('Rate limit detected, waiting 2 seconds before trying OpenAI...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // Fallback to OpenAI
      try {
        console.log('Attempting to generate quiz with OpenAI...');
        const result = await openaiService.generateQuiz(settings);
        console.log('Successfully generated quiz with OpenAI');
        return result;
      } catch (openaiError) {
        console.warn('OpenAI API failed, falling back to mock service:', openaiError);
        
        // Check if it's a rate limit/quota error and wait before trying mock
        if (openaiError instanceof Error && openaiError.message.includes('429')) {
          console.log('OpenAI rate limit detected, waiting 3 seconds before using mock service...');
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
        
        // Final fallback to mock service
        try {
          console.log('Using mock service to generate sample quiz...');
          const result = await mockAIService.generateQuiz(settings);
          console.log('Successfully generated quiz with mock service');
          return result;
        } catch (mockError) {
          console.error('All services failed:', { geminiError, openaiError, mockError });
          throw new Error('Failed to generate quiz. All AI services are unavailable. Please try again later.');
        }
      }
    }
  }
}

export const unifiedAIService = new UnifiedAIService();
