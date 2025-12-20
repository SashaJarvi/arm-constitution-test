<template>
  <div class="quiz-answers flex flex-col gap-3">
    <label
      v-for="answer in answers"
      :key="answer.id"
      :class="[
        'flex items-center gap-3 p-3 md:p-4 border-2 rounded-2xl cursor-pointer transition-all duration-150',
        selectedAnswerId === answer.id
          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-md'
          : 'border-gray-light-border dark:border-dark-600 hover:border-primary-400 '
            + 'hover:bg-gray-50 dark:hover:bg-dark-700 hover:shadow-sm'
      ]"
    >
      <input
        type="radio"
        :name="radioName"
        :value="answer.id"
        :checked="selectedAnswerId === answer.id"
        class="input-radio"
        @change="handleSelect(answer.id)"
      >
      <span class="text-dark-900 dark:text-gray-100 font-medium text-base md:text-lg">{{ getTranslatedText(answer.text) }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import type { Answer } from '~/types/quiz'

defineProps<{
  answers: Answer[]
  selectedAnswerId?: string
}>()

const emit = defineEmits<{
  select: [answerId: string]
}>()

const { t } = useI18n()
const radioName = `question-${Math.random()}`

const getTranslatedText = (text: string): string => {
  if (text.startsWith('quiz.'))
    return t(text)

  return text
}

const handleSelect = (answerId: string) => {
  emit('select', answerId)
}
</script>
