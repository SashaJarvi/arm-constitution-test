import { defineStore } from 'pinia'
import type { Question, QuizState } from '~/types/quiz'
import { shuffleArray } from '~/utils/shuffle'

export const useQuizStore = defineStore('quiz', () => {
  const { saveSession, restoreSession, clearSession } = useQuizStorage()

  // State
  const state = ref<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    startTime: Date.now(),
    isPaused: false,
    isCompleted: false,
    questionOrder: [],
  })

  // Getters
  const currentQuestion = computed(() => {
    const questionId = state.value.questionOrder[state.value.currentQuestionIndex]
    return state.value.questions.find(q => q.id === questionId)
  })

  const progress = computed(() => {
    const answered = Object.keys(state.value.userAnswers).length
    return state.value.questions.length > 0
      ? (answered / state.value.questions.length) * 100
      : 0
  })

  const isFirstQuestion = computed(
    () => state.value.currentQuestionIndex === 0,
  )

  const isLastQuestion = computed(
    () =>
      state.value.currentQuestionIndex === state.value.questions.length - 1,
  )

  const canSubmit = computed(
    () =>
      Object.keys(state.value.userAnswers).length ===
      state.value.questions.length,
  )

  // Actions
  const initializeQuiz = (questions: Question[]) => {
    const restored = restoreSession()

    if (restored) {
      state.value = restored
    }
    else {
      state.value = {
        questions,
        currentQuestionIndex: 0,
        userAnswers: {},
        startTime: Date.now(),
        isPaused: false,
        isCompleted: false,
        questionOrder: shuffleArray(questions.map(q => q.id)),
      }
      saveSession(state.value)
    }
  }

  const selectAnswer = (questionId: string, answerId: string) => {
    state.value.userAnswers[questionId] = answerId
    saveSession(state.value)
  }

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < state.value.questions.length) {
      state.value.currentQuestionIndex = index
      saveSession(state.value)
    }
  }

  const nextQuestion = () => {
    if (state.value.currentQuestionIndex < state.value.questions.length - 1) {
      state.value.currentQuestionIndex++
      saveSession(state.value)
    }
  }

  const previousQuestion = () => {
    if (state.value.currentQuestionIndex > 0) {
      state.value.currentQuestionIndex--
      saveSession(state.value)
    }
  }

  const togglePause = () => {
    state.value.isPaused = !state.value.isPaused
    saveSession(state.value)
  }

  const submitQuiz = () => {
    state.value.isCompleted = true
    saveSession(state.value)
  }

  const resetQuiz = () => {
    clearSession()
    state.value = {
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: {},
      startTime: Date.now(),
      isPaused: false,
      isCompleted: false,
      questionOrder: [],
    }
  }

  return {
    // State
    state: readonly(state),

    // Getters
    currentQuestion,
    progress,
    isFirstQuestion,
    isLastQuestion,
    canSubmit,

    // Actions
    initializeQuiz,
    selectAnswer,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    togglePause,
    submitQuiz,
    resetQuiz,
  }
})
