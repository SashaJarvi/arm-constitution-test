<template>
  <div class="p-3 md:p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Quiz Info -->
      <div class="mb-4">
        <div class="flex justify-end mb-3">
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
            @navigate="quizStore.goToQuestion"
          />

          <!-- Quiz Content -->
          <article class="flex-1">
            <div class="flex flex-col card md:h-full">
              <QuizQuestion
                class="flex-1"
                :question="currentQuestion"
                :selected-answer-id="currentAnswer"
                @select="handleAnswerSelect"
              />

              <QuizNavigation
                :is-first-question="isFirstQuestion"
                :is-last-question="isLastQuestion"
                :is-answered="!!currentAnswer"
                @previous="quizStore.previousQuestion"
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

const { t } = useI18n()
const quizStore = useQuizStore()

// Reactive state from Pinia store
const {
  state: quizState,
  currentQuestion,
  progress,
  isFirstQuestion,
  isLastQuestion,
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

// Initialize quiz
quizStore.initializeQuiz(questionsData.value.data)

// Current answer
const currentAnswer = computed(() => {
  if (!currentQuestion.value) return undefined
  return quizState.value.userAnswers[currentQuestion.value.id]
})

// Handle answer selection
const handleAnswerSelect = (answerId: string) => {
  if (currentQuestion.value && !quizState.value.isPaused)
    quizStore.selectAnswer(currentQuestion.value.id, answerId)
}

// Handle next button
const handleNext = () => {
  if (isLastQuestion.value)
    handleSubmit()
  else
    quizStore.nextQuestion()
}

// Handle submit
const handleSubmit = () => {
  const confirmed = confirm(t('quiz.confirmSubmit'))
  if (confirmed) {
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
