<template>
  <div
    v-if="question"
    class="quiz-question"
  >
    <h2 class="text-xl md:text-2xl font-bold text-dark-900 mb-8 leading-snug">
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

defineProps<{
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
