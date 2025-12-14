<template>
  <div class="min-h-screen p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ t('results.title') }}
        </h1>
        <LanguageSwitcher />
      </header>

      <!-- Results Summary -->
      <ResultsSummary :results="results" />

      <!-- Filter Toggle -->
      <div class="flex justify-center gap-3 mb-6">
        <button
          :class="[
            'px-6 py-2 rounded-lg font-medium transition-colors',
            !showWrongOnly
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="() => (showWrongOnly = false)"
        >
          {{ t('results.showAll') }}
        </button>
        <button
          :class="[
            'px-6 py-2 rounded-lg font-medium transition-colors',
            showWrongOnly
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="() => (showWrongOnly = true)"
        >
          {{ t('results.showWrongOnly') }} ({{ results.wrongAnswers }})
        </button>
      </div>

      <!-- Results List -->
      <ResultsList
        :questions="displayQuestions"
        :get-question-result="getQuestionResult"
      />

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <BaseButton
          variant="primary"
          @click="handleRetakeQuiz"
        >
          {{ t('results.retake') }}
        </BaseButton>
        <BaseButton
          variant="secondary"
          @click="handleGoHome"
        >
          {{ t('results.home') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { restoreSession } = useQuizStorage()
const quizStore = useQuizStore()

// Restore session
const savedState = restoreSession()

if (!savedState || !savedState.isCompleted) {
  navigateTo('/')
  throw createError({
    statusCode: 404,
    message: 'No completed quiz found',
  })
}

// Calculate results
const { results, getQuestionResult } = useQuizResults(savedState)

// Filter state
const showWrongOnly = ref(false)

// Display questions based on filter
const displayQuestions = computed(() => {
  if (!savedState) return []

  if (showWrongOnly.value)
    return savedState.questions.filter(q => results.value.wrongQuestionIds.includes(q.id))

  return savedState.questions
})

// Handle retake
const handleRetakeQuiz = () => {
  quizStore.resetQuiz()
  navigateTo('/quiz')
}

// Handle go home
const handleGoHome = () => {
  quizStore.resetQuiz()
  navigateTo('/')
}

// SEO
useSeoMeta({
  title: 'Quiz Results - Armenian Constitution Test',
  description: `You scored ${Math.round(results.value.percentage)}% on the Armenian Constitution quiz`,
})
</script>
