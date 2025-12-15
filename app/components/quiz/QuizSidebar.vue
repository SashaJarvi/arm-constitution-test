<template>
  <aside
    v-if="isVisible"
    class="quiz-sidebar w-full md:w-64 bg-white rounded-2xl shadow-md p-5 mb-6 md:mb-0"
  >
    <h3 class="text-lg font-bold text-dark-900 mb-4">
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
            : isAnswered(questionId)
              ? 'bg-primary-200 text-primary-700 hover:bg-primary-400 hover:shadow-sm cursor-pointer'
              : 'bg-gray-light text-dark-700 hover:bg-gray-200 hover:shadow-sm cursor-not-allowed opacity-50'
        ]"
        @click="() => handleNavigate(index)"
      >
        {{ index + 1 }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  isVisible: boolean
  questionOrder: string[]
  currentQuestionIndex: number
  userAnswers: Record<string, string>
}>()

const emit = defineEmits<{
  navigate: [index: number]
}>()

const { t } = useI18n()

const isAnswered = (questionId: string): boolean => {
  return !!props.userAnswers[questionId]
}

const canNavigateTo = (index: number): boolean => {
  // Can always navigate to current question
  if (index === props.currentQuestionIndex) return true

  // Can navigate to already answered questions
  const questionId = props.questionOrder[index]
  if (!questionId) return false
  return isAnswered(questionId)
}

const handleNavigate = (index: number) => {
  if (!canNavigateTo(index)) return
  emit('navigate', index)
}
</script>
