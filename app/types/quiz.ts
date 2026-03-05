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
}

// Per-question time limit in seconds for hard mode
export const QUESTION_TIME_LIMIT = 120

// Quiz state type
export type QuizState = {
  questions: Question[]
  currentQuestionIndex: number
  userAnswers: Record<string, string> // questionId -> answerId
  visitedQuestions: string[] // Question IDs that have been visited
  startTime: number
  timeSpent: number // in seconds
  totalPausedTime: number // in milliseconds
  pauseStartTime: number | null // timestamp when pause started
  isPaused: boolean
  isCompleted: boolean
  questionOrder: string[] // Randomized question IDs
  gameDifficulty: Difficulty // Game difficulty mode
  answerOrders: Record<string, string[]> // questionId -> shuffled answer IDs (empty for easy)
  timedOutQuestions: string[] // Question IDs that timed out (hard mode)
  questionTimers: Record<string, number> // questionId -> deadline timestamp in ms (hard mode)
  questionStartTime: number | null // Timestamp when current question started (hard mode)
}

// Quiz session for localStorage
export type QuizSession = {
  state: QuizState
  lastUpdated: number
  version: number
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
  isHardMode?: boolean
  isTimedOut?: boolean
}
