import type { QuizSettings, GeminiResponse } from '../types/quiz';

export class MockAIService {
  async generateQuiz(settings: QuizSettings): Promise<GeminiResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { topic, difficulty, numQuestions, questionType } = settings;
    
    // Generate mock questions based on the topic
    const questions = [];
    for (let i = 0; i < numQuestions; i++) {
      const question = this.generateMockQuestion(topic, difficulty, questionType, i + 1);
      questions.push(question);
    }
    
    return { questions };
  }
  
  private generateMockQuestion(topic: string, difficulty: string, questionType: string, questionNumber: number) {
    const isMultipleChoice = questionType === 'multiple-choice';
    
    if (isMultipleChoice) {
      return {
        question: `Sample question ${questionNumber} about ${topic} (${difficulty} level)?`,
        options: [
          `Option A for question ${questionNumber}`,
          `Option B for question ${questionNumber}`,
          `Option C for question ${questionNumber}`,
          `Option D for question ${questionNumber}`
        ],
        correctAnswer: 0,
        explanation: `This is a sample explanation for question ${questionNumber}. In a real scenario, this would explain why the correct answer is right.`
      };
    } else {
      return {
        question: `Sample true/false question ${questionNumber} about ${topic} (${difficulty} level)?`,
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: `This is a sample explanation for the true/false question ${questionNumber}.`
      };
    }
  }
}

export const mockAIService = new MockAIService();
