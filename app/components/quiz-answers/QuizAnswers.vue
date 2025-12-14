<template>
  <div class="quiz-answers space-y-3">
    <label
      v-for="answer in answers"
      :key="answer.id"
      :class="[
        'block p-4 border-2 rounded-lg cursor-pointer transition-all',
        selectedAnswerId === answer.id
          ? 'border-primary-600 bg-primary-50'
          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50',
      ]"
    >
      <div class="flex items-center gap-3">
        <input
          type="radio"
          :name="radioName"
          :value="answer.id"
          :checked="selectedAnswerId === answer.id"
          class="input-radio"
          @change="() => handleSelect(answer.id)"
        >
        <span class="text-gray-800">{{ getTranslatedText(answer.text) }}</span>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import type { Answer } from '~/types/quiz'

const props = defineProps<{
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
