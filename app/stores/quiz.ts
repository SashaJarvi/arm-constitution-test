import { defineStore } from 'pinia'
import type { Difficulty, Question, QuizState } from '~/types/quiz'
import { DIFFICULTY, QUESTION_TIME_LIMIT } from '~/types/quiz'
import { shuffleArray } from '~/utils/shuffle'

const DEFAULT_STATE: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  visitedQuestions: [],
  startTime: Date.now(),
  timeSpent: 0,
  totalPausedTime: 0,
  pauseStartTime: null,
  isPaused: false,
  isCompleted: false,
  questionOrder: [],
  gameDifficulty: DIFFICULTY.EASY,
  answerOrders: {},
  timedOutQuestions: [],
  questionTimers: {},
  questionStartTime: null
}

export const useQuizStore = defineStore('quiz', () => {
  const { saveSession, restoreSession, clearSession } = useQuizStorage()

  // State
  const state = ref<QuizState>({ ...DEFAULT_STATE })

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
    () => state.value.currentQuestionIndex === 0
  )

  const isLastQuestion = computed(
    () =>
      state.value.currentQuestionIndex === state.value.questions.length - 1
  )

  const isHardMode = computed(
    () => state.value.gameDifficulty === DIFFICULTY.HARD
  )

  const isCurrentQuestionTimedOut = computed(() => {
    if (!currentQuestion.value) return false
    return state.value.timedOutQuestions.includes(currentQuestion.value.id)
  })

  const canSubmit = computed(() => {
    const answered = new Set(Object.keys(state.value.userAnswers))
    const timedOut = new Set(state.value.timedOutQuestions)
    const resolved = new Set([...answered, ...timedOut])
    return resolved.size >= state.value.questions.length
  })

  // Helpers
  const generateAnswerOrders = (questions: Question[]): Record<string, string[]> => {
    const orders: Record<string, string[]> = {}
    questions.forEach(q => {
      orders[q.id] = shuffleArray(q.answers.map(a => a.id))
    })
    return orders
  }

  const updateQuestionStartTime = () => {
    if (isHardMode.value)
      state.value.questionStartTime = Date.now()
  }

  // Actions
  const initializeQuiz = (questions: Question[], gameDifficulty: Difficulty = DIFFICULTY.EASY) => {
    const restored = restoreSession()

    if (restored) {
      state.value = restored
    }
    else {
      const questionOrder = shuffleArray(questions.map(q => q.id))
      const shouldShuffleAnswers = gameDifficulty !== DIFFICULTY.EASY
      const answerOrders = shouldShuffleAnswers ? generateAnswerOrders(questions) : {}

      state.value = {
        questions,
        currentQuestionIndex: 0,
        userAnswers: {},
        visitedQuestions: [questionOrder[0] as string],
        startTime: Date.now(),
        timeSpent: 0,
        totalPausedTime: 0,
        pauseStartTime: null,
        isPaused: false,
        isCompleted: false,
        questionOrder,
        gameDifficulty,
        answerOrders,
        timedOutQuestions: [],
        questionTimers: gameDifficulty === DIFFICULTY.HARD
          ? { [questionOrder[0] as string]: Date.now() + QUESTION_TIME_LIMIT * 1000 }
          : {},
        questionStartTime: gameDifficulty === DIFFICULTY.HARD ? Date.now() : null
      }
      saveSession(state.value)
    }
  }

  const selectAnswer = (questionId: string, answerId: string) => {
    state.value.userAnswers[questionId] = answerId
    saveSession(state.value)
  }

  const markQuestionAsVisited = (index: number) => {
    const questionId = state.value.questionOrder[index]
    if (questionId && !state.value.visitedQuestions.includes(questionId)) {
      state.value.visitedQuestions.push(questionId)
    }
  }

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < state.value.questions.length) {
      state.value.currentQuestionIndex = index
      markQuestionAsVisited(index)
      updateQuestionStartTime()
      saveSession(state.value)
    }
  }

  const nextQuestion = () => {
    if (state.value.currentQuestionIndex < state.value.questions.length - 1) {
      state.value.currentQuestionIndex++
      markQuestionAsVisited(state.value.currentQuestionIndex)
      updateQuestionStartTime()
      saveSession(state.value)
    }
  }

  const previousQuestion = () => {
    if (state.value.currentQuestionIndex > 0) {
      state.value.currentQuestionIndex--
      markQuestionAsVisited(state.value.currentQuestionIndex)
      updateQuestionStartTime()
      saveSession(state.value)
    }
  }

  const initQuestionDeadline = (questionId: string) => {
    if (state.value.questionTimers[questionId] === undefined) {
      state.value.questionTimers[questionId] = Date.now() + QUESTION_TIME_LIMIT * 1000
      saveSession(state.value)
    }
  }

  const getQuestionDeadline = (questionId: string): number | undefined => {
    return state.value.questionTimers[questionId]
  }

  const getRemainingSeconds = (questionId: string): number => {
    const deadline = state.value.questionTimers[questionId]
    if (deadline === undefined) return QUESTION_TIME_LIMIT
    return Math.max(0, Math.floor((deadline - Date.now()) / 1000))
  }

  const checkExpiredDeadlines = () => {
    let changed = false
    for (const [questionId, deadline] of Object.entries(state.value.questionTimers)) {
      if (
        deadline <= Date.now()
        && !state.value.timedOutQuestions.includes(questionId)
        && !state.value.userAnswers[questionId]
      ) {
        state.value.timedOutQuestions.push(questionId)
        changed = true
      }
    }
    if (changed) saveSession(state.value)
    return changed
  }

  const timeoutQuestion = (questionId: string) => {
    if (!state.value.timedOutQuestions.includes(questionId))
      state.value.timedOutQuestions.push(questionId)

    // Auto-advance to next question if not on the last one
    if (state.value.currentQuestionIndex < state.value.questions.length - 1) {
      state.value.currentQuestionIndex++
      markQuestionAsVisited(state.value.currentQuestionIndex)
      updateQuestionStartTime()
    }

    saveSession(state.value)
  }

  const togglePause = () => {
    if (state.value.gameDifficulty === DIFFICULTY.HARD) return

    if (!state.value.isPaused) {
      // Pausing
      state.value.pauseStartTime = Date.now()
    }
    else {
      // Resuming
      if (state.value.pauseStartTime !== null) {
        state.value.totalPausedTime += Date.now() - state.value.pauseStartTime
        state.value.pauseStartTime = null
      }
    }
    state.value.isPaused = !state.value.isPaused
    saveSession(state.value)
  }

  const submitQuiz = () => {
    // If currently paused, add current pause duration
    let totalPaused = state.value.totalPausedTime
    if (state.value.isPaused && state.value.pauseStartTime !== null) {
      totalPaused += Date.now() - state.value.pauseStartTime
    }
    state.value.timeSpent = Math.floor((Date.now() - state.value.startTime - totalPaused) / 1000)
    state.value.isCompleted = true
    saveSession(state.value)
  }

  const resetQuiz = () => {
    clearSession()
    state.value = { ...DEFAULT_STATE, startTime: Date.now() }
  }

  return {
    // State
    state: readonly(state),

    // Getters
    currentQuestion,
    progress,
    isFirstQuestion,
    isLastQuestion,
    isHardMode,
    isCurrentQuestionTimedOut,
    canSubmit,

    // Actions
    initializeQuiz,
    selectAnswer,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    initQuestionDeadline,
    getQuestionDeadline,
    getRemainingSeconds,
    checkExpiredDeadlines,
    timeoutQuestion,
    togglePause,
    submitQuiz,
    resetQuiz
  }
})
