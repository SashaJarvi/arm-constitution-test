<template>
  <aside
    v-if="isVisible || screenWidth >= 768"
    class="quiz-sidebar w-full md:w-72 bg-white dark:bg-dark-800 rounded-2xl shadow-md p-4 mb-4 md:mb-0
    transition-colors duration-200"
  >
    <h3 class="text-lg font-bold text-dark-900 dark:text-gray-100 mb-3">
      {{ t('quiz.questionList') }}
    </h3>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="(questionId, index) in questionOrder"
        :key="questionId"
        :disabled="!canNavigateTo(index)"
        :class="[
          'w-11 h-11 rounded-xl font-semibold transition-all duration-150',
          index === currentQuestionIndex
            ? 'bg-primary-600 text-white ring-2 ring-primary-300 shadow-md'
            : isTimedOut(questionId)
              ? 'bg-error-200 text-error-700 dark:bg-error-900/30 dark:text-error-400 cursor-pointer'
              : isAnswered(questionId)
                ? 'bg-primary-200 text-primary-700 hover:bg-primary-400 hover:shadow-sm cursor-pointer'
                : canNavigateTo(index)
                  ? 'bg-gray-light text-dark-700 hover:bg-gray-200 hover:shadow-sm cursor-pointer'
                  : 'bg-gray-light text-dark-700 cursor-not-allowed opacity-50'
        ]"
        @click="handleNavigate(index)"
      >
        {{ index + 1 }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  isVisible: boolean
  questionOrder: readonly string[]
  currentQuestionIndex: number
  userAnswers: Record<string, string>
  visitedQuestions: readonly string[]
  timedOutQuestions?: readonly string[]
}>()

const emit = defineEmits<{
  navigate: [index: number]
}>()

const { t } = useI18n()
const { width: screenWidth } = useWindowSize()

const isAnswered = (questionId: string): boolean => {
  return !!props.userAnswers[questionId]
}

const isTimedOut = (questionId: string): boolean => {
  return props.timedOutQuestions?.includes(questionId) ?? false
}

const isVisited = (questionId: string): boolean => {
  return props.visitedQuestions.includes(questionId)
}

const canNavigateTo = (index: number): boolean => {
  const questionId = props.questionOrder[index]
  if (!questionId) return false

  // Can navigate to any visited question
  return isVisited(questionId)
}

const handleNavigate = (index: number) => {
  if (!canNavigateTo(index)) return
  emit('navigate', index)
}
</script>
