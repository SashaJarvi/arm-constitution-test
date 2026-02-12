import type { QuizState, QuizResult, QuestionResult, Question, Answer } from '~/types/quiz'

type ReadonlyDeep<T> = T extends object
  ? { readonly [K in keyof T]: ReadonlyDeep<T[K]> }
  : T

export const useQuizResults = (state: QuizState | ReadonlyDeep<QuizState>) => {
  const calculateResults = (): QuizResult => {
    const totalQuestions = state.questions.length
    let correctAnswers = 0
    const wrongQuestionIds: string[] = []

    state.questions.forEach(question => {
      const userAnswerId = state.userAnswers[question.id]

      if (userAnswerId) {
        const selectedAnswer = question.answers.find(a => a.id === userAnswerId)
        if (selectedAnswer?.isCorrect) {
          correctAnswers++
        }
        else {
          wrongQuestionIds.push(question.id)
        }
      }
      else {
        wrongQuestionIds.push(question.id)
      }
    })

    const wrongAnswers = wrongQuestionIds.length
    const unansweredQuestions = totalQuestions - Object.keys(state.userAnswers).length
    const percentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0
    const timeSpent = state.timeSpent || Math.floor((Date.now() - state.startTime) / 1000)

    return {
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      unansweredQuestions,
      percentage,
      timeSpent,
      wrongQuestionIds
    }
  }

  const getQuestionResult = (questionId: string): QuestionResult | null => {
    const question = state.questions.find(q => q.id === questionId)
    if (!question) return null

    const userAnswerId = state.userAnswers[questionId]
    const userAnswer = question.answers.find(a => a.id === userAnswerId)
    const correctAnswer = question.answers.find(a => a.isCorrect)!

    return {
      question: question as Question,
      userAnswer: userAnswer as Answer | undefined,
      correctAnswer: correctAnswer as Answer,
      isCorrect: userAnswer?.isCorrect || false,
      isAnswered: !!userAnswerId
    }
  }

  const results = computed(() => calculateResults())

  return {
    results,
    getQuestionResult
  }
}
