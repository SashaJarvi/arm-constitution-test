// Difficulty levels - using const object instead of enum
export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
} as const

export type Difficulty = typeof DIFFICULTY[keyof typeof DIFFICULTY]

// Answer type
export type Answer = {
  id: string
  text: string
  isCorrect: boolean
}

// Question type
export type Question = {
  id: string
  text: string
  answers: Answer[]
  category?: string
  difficulty?: Difficulty
}

// Quiz state type
export type QuizState = {
  questions: Question[]
  currentQuestionIndex: number
  userAnswers: Record<string, string> // questionId -> answerId
  visitedQuestions: string[] // Question IDs that have been visited
  startTime: number
  isPaused: boolean
  isCompleted: boolean
  questionOrder: string[] // Randomized question IDs
}

// Quiz session for localStorage
export type QuizSession = {
  state: QuizState
  lastUpdated: number
  version: string
}

// Quiz result type
export type QuizResult = {
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  unansweredQuestions: number
  percentage: number
  timeSpent: number // in seconds
  wrongQuestionIds: string[]
}

// Individual question result
export type QuestionResult = {
  question: Question
  userAnswer: Answer | undefined
  correctAnswer: Answer
  isCorrect: boolean
  isAnswered: boolean
}
