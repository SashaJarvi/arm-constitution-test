<template>
  <div v-if="question" class="quiz-question">
    <h2 class="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
      {{ getTranslatedText(question.text) }}
    </h2>
    <QuizAnswers
      :answers="question.answers"
      :selected-answer-id="selectedAnswerId"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import type { Question } from '~/types/quiz'

const props = defineProps<{
  question: Question | undefined
  selectedAnswerId?: string
}>()

const emit = defineEmits<{
  select: [answerId: string]
}>()

const { t } = useI18n()

const getTranslatedText = (text: string): string => {
  if (text.startsWith('quiz.'))
    return t(text)

  return text
}

const handleSelect = (answerId: string) => {
  emit('select', answerId)
}
</script>
