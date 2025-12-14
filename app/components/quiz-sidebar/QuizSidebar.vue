<template>
  <aside
    v-if="isVisible"
    class="quiz-sidebar w-full md:w-64 bg-white rounded-lg shadow-md p-4 mb-6 md:mb-0"
  >
    <h3 class="text-lg font-semibold text-gray-900 mb-4">
      {{ t('quiz.questionList') }}
    </h3>
    <div class="flex flex-wrap gap-1.5">
      <button
        v-for="(questionId, index) in questionOrder"
        :key="questionId"
        :class="[
          'w-10 h-10 rounded-lg font-medium transition-all',
          index === currentQuestionIndex
            ? 'bg-primary-600 text-white ring-2 ring-primary-300'
            : isAnswered(questionId)
              ? 'bg-success-100 text-success-700 hover:bg-success-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
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

const handleNavigate = (index: number) => {
  emit('navigate', index)
}
</script>
