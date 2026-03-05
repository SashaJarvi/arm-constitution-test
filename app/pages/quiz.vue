<template>
  <div class="p-3 md:p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Quiz Info -->
      <div class="mb-4">
        <div class="flex justify-end items-center gap-3 mb-3">
          <QuizQuestionTimer
            v-if="isHardMode"
            :remaining-seconds="remainingSeconds"
          />
          <QuizTimer
            :start-time="quizState.startTime"
            :is-paused="quizState.isPaused"
          />
        </div>

        <QuizProgress
          :current-index="quizState.currentQuestionIndex"
          :total-questions="quizState.questions.length"
          :progress-percentage="progress"
        />

        <QuizControls
          :is-paused="quizState.isPaused"
          :can-submit="canSubmit"
          :is-hard-mode="isHardMode"
          @toggle-pause="quizStore.togglePause"
          @toggle-sidebar="toggleSidebar"
          @submit="handleSubmit"
        />

        <!-- Pause Overlay -->
        <div
          v-if="quizState.isPaused"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
        >
          <div class="bg-white rounded-3xl p-10 text-center max-w-md shadow-2xl mx-4">
            <h2 class="text-3xl font-bold text-dark-900 mb-6">
              {{ t('quiz.pause') }}
            </h2>
            <BaseButton @click="quizStore.togglePause">
              {{ t('quiz.resume') }}
            </BaseButton>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Sidebar -->
          <QuizSidebar
            :is-visible="isSidebarVisible"
            :question-order="quizState.questionOrder"
            :current-question-index="quizState.currentQuestionIndex"
            :user-answers="quizState.userAnswers"
            :visited-questions="quizState.visitedQuestions"
            :timed-out-questions="quizState.timedOutQuestions"
            @navigate="handleGoToQuestion"
          />

          <!-- Quiz Content -->
          <article class="flex-1">
            <div class="flex flex-col card md:h-full">
              <!-- Timed out overlay for current question -->
              <div
                v-if="isCurrentQuestionTimedOut"
                class="text-center py-4 px-3 mb-4 bg-error-50 dark:bg-error-900/20 rounded-xl"
              >
                <p class="text-error-600 dark:text-error-400 font-semibold">
                  {{ t('quiz.timedOut') }}
                </p>
              </div>

              <QuizQuestion
                class="flex-1"
                :question="currentQuestion"
                :selected-answer-id="currentAnswer"
                :answer-order="currentAnswerOrder"
                :disabled="isCurrentQuestionTimedOut"
                @select="handleAnswerSelect"
              />

              <QuizNavigation
                :is-first-question="isFirstQuestion"
                :is-last-question="isLastQuestion"
                :is-answered="!!currentAnswer"
                :is-hard-mode="isHardMode"
                :is-timed-out="isCurrentQuestionTimedOut"
                @previous="handlePrevious"
                @next="handleNext"
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Difficulty } from '~/types/quiz'
import { DIFFICULTY } from '~/types/quiz'

const { t } = useI18n()
const route = useRoute()
const quizStore = useQuizStore()

// Reactive state from Pinia store
const {
  state: quizState,
  currentQuestion,
  progress,
  isFirstQuestion,
  isLastQuestion,
  isHardMode,
  isCurrentQuestionTimedOut,
  canSubmit
} = storeToRefs(quizStore)

// Sidebar visibility
const isSidebarVisible = ref(true)
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}

// Fetch questions
const { data: questionsData } = await useFetch('/api/questions')

if (!questionsData.value?.success) {
  throw createError({
    statusCode: 500,
    message: 'Failed to load questions'
  })
}

// Get difficulty from query param
const selectedDifficulty = (route.query.difficulty as Difficulty) || DIFFICULTY.EASY

// Interval for checking expired deadlines in hard mode
let expiredCheckInterval: ReturnType<typeof setInterval> | null = null

onUnmounted(() => {
  if (expiredCheckInterval) clearInterval(expiredCheckInterval)
})

// Initialize quiz only on client where localStorage is available
onMounted(() => {
  quizStore.initializeQuiz(questionsData.value!.data, selectedDifficulty)

  // Start question timer for hard mode (after store is initialized)
  if (quizState.value.gameDifficulty === DIFFICULTY.HARD) {
    const question = currentQuestion.value
    if (question && !quizState.value.timedOutQuestions.includes(question.id) && !quizState.value.userAnswers[question.id]) {
      const remaining = quizStore.getRemainingSeconds(question.id)
      if (remaining <= 0) {
        handleQuestionTimeout()
      }
      else {
        questionTimer.start(remaining)
      }
    }

    // Periodic check for expired deadlines on other questions
    expiredCheckInterval = setInterval(() => {
      quizStore.checkExpiredDeadlines()
    }, 1000)
  }
})

// Current answer
const currentAnswer = computed(() => {
  if (!currentQuestion.value) return undefined
  return quizState.value.userAnswers[currentQuestion.value.id]
})

// Current answer order for shuffled modes
const currentAnswerOrder = computed(() => {
  if (!currentQuestion.value) return undefined
  return quizState.value.answerOrders[currentQuestion.value.id]
})

// Per-question timer for hard mode
const handleQuestionTimeout = () => {
  if (!currentQuestion.value) return
  const isLast = isLastQuestion.value
  quizStore.timeoutQuestion(currentQuestion.value.id)

  if (isLast) {
    // Last question timed out — auto-submit
    quizStore.submitQuiz()
    navigateTo('/results')
  }
  else {
    // Start timer for the next question (timeoutQuestion already advanced the index)
    const nextQ = currentQuestion.value
    if (nextQ) {
      quizStore.initQuestionDeadline(nextQ.id)
      const remaining = quizStore.getRemainingSeconds(nextQ.id)
      questionTimer.start(remaining)
    }
  }
}

const isPausedRef = computed(() => quizState.value.isPaused)
const questionTimer = useQuestionTimer(isPausedRef, handleQuestionTimeout)
const remainingSeconds = questionTimer.remainingSeconds

// Watch for question changes in hard mode to start/stop timer based on deadlines
watch(
  () => quizState.value.currentQuestionIndex,
  () => {
    if (!isHardMode.value) return
    const question = currentQuestion.value
    if (!question) return

    // Don't start timer for timed-out questions
    if (quizState.value.timedOutQuestions.includes(question.id)) {
      questionTimer.stop()
      return
    }

    // If question already answered, stop timer
    if (quizState.value.userAnswers[question.id]) {
      questionTimer.stop()
      return
    }

    // Initialize deadline for this question (only sets if first visit)
    quizStore.initQuestionDeadline(question.id)

    // Compute remaining from deadline (time spent away still counts)
    const remaining = quizStore.getRemainingSeconds(question.id)
    if (remaining <= 0) {
      handleQuestionTimeout()
    }
    else {
      questionTimer.start(remaining)
    }
  }
)

// Navigation handlers
const handleGoToQuestion = (index: number) => {
  quizStore.goToQuestion(index)
}

const handlePrevious = () => {
  quizStore.previousQuestion()
}

// Handle answer selection
const handleAnswerSelect = (answerId: string) => {
  if (currentQuestion.value && !quizState.value.isPaused) {
    quizStore.selectAnswer(currentQuestion.value.id, answerId)
    // Stop question timer when answer is selected in hard mode
    if (isHardMode.value)
      questionTimer.stop()
  }
}

// Handle next button
const handleNext = () => {
  if (isLastQuestion.value) {
    handleSubmit()
  }
  else {
    quizStore.nextQuestion()
  }
}

// Handle submit
const handleSubmit = () => {
  const confirmed = confirm(t('quiz.confirmSubmit'))
  if (confirmed) {
    questionTimer.stop()
    if (expiredCheckInterval) clearInterval(expiredCheckInterval)
    quizStore.submitQuiz()
    navigateTo('/results')
  }
}

// Navigation guard
onBeforeRouteLeave(to => {
  if (quizState.value.isCompleted || to.path === '/results')
    return true

  return confirm(t('quiz.confirmLeave'))
})
</script>
