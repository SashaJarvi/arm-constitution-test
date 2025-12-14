import type { Question } from '~/types/quiz'
import { DIFFICULTY } from '~/types/quiz'

// Sample questions - these can be replaced with actual Armenian Constitution questions
export const questions: Question[] = [
  {
    id: '1',
    text: 'quiz.questions.q1.text',
    answers: [
      { id: '1a', text: 'quiz.questions.q1.answers.a', isCorrect: false },
      { id: '1b', text: 'quiz.questions.q1.answers.b', isCorrect: true },
      { id: '1c', text: 'quiz.questions.q1.answers.c', isCorrect: false },
      { id: '1d', text: 'quiz.questions.q1.answers.d', isCorrect: false },
    ],
    category: 'constitution',
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: '2',
    text: 'quiz.questions.q2.text',
    answers: [
      { id: '2a', text: 'quiz.questions.q2.answers.a', isCorrect: true },
      { id: '2b', text: 'quiz.questions.q2.answers.b', isCorrect: false },
      { id: '2c', text: 'quiz.questions.q2.answers.c', isCorrect: false },
      { id: '2d', text: 'quiz.questions.q2.answers.d', isCorrect: false },
    ],
    category: 'constitution',
    difficulty: DIFFICULTY.EASY,
  },
  {
    id: '3',
    text: 'quiz.questions.q3.text',
    answers: [
      { id: '3a', text: 'quiz.questions.q3.answers.a', isCorrect: false },
      { id: '3b', text: 'quiz.questions.q3.answers.b', isCorrect: false },
      { id: '3c', text: 'quiz.questions.q3.answers.c', isCorrect: true },
      { id: '3d', text: 'quiz.questions.q3.answers.d', isCorrect: false },
    ],
    category: 'constitution',
    difficulty: DIFFICULTY.HARD,
  },
  {
    id: '4',
    text: 'quiz.questions.q4.text',
    answers: [
      { id: '4a', text: 'quiz.questions.q4.answers.a', isCorrect: false },
      { id: '4b', text: 'quiz.questions.q4.answers.b', isCorrect: true },
      { id: '4c', text: 'quiz.questions.q4.answers.c', isCorrect: false },
      { id: '4d', text: 'quiz.questions.q4.answers.d', isCorrect: false },
    ],
    category: 'constitution',
    difficulty: DIFFICULTY.MEDIUM,
  },
  {
    id: '5',
    text: 'quiz.questions.q5.text',
    answers: [
      { id: '5a', text: 'quiz.questions.q5.answers.a', isCorrect: false },
      { id: '5b', text: 'quiz.questions.q5.answers.b', isCorrect: false },
      { id: '5c', text: 'quiz.questions.q5.answers.c', isCorrect: false },
      { id: '5d', text: 'quiz.questions.q5.answers.d', isCorrect: true },
    ],
    category: 'constitution',
    difficulty: DIFFICULTY.EASY,
  },
]
