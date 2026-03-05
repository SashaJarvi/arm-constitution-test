<template>
  <div
    v-if="question"
    class="quiz-question"
  >
    <h2 class="text-lg md:text-2xl font-bold text-dark-900 dark:text-gray-100 mb-4 md:mb-5 leading-snug">
      {{ getTranslatedText(question.text) }}
    </h2>
    <QuizAnswers
      :answers="orderedAnswers"
      :selected-answer-id="selectedAnswerId"
      :disabled="disabled"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import type { Answer, Question } from '~/types/quiz'

const props = defineProps<{
  question: Question | undefined
  selectedAnswerId?: string
  answerOrder?: readonly string[]
  disabled?: boolean
}>()

const orderedAnswers = computed<Answer[]>(() => {
  if (!props.question) return []
  if (!props.answerOrder?.length) return props.question.answers
  return props.answerOrder
    .map(id => props.question!.answers.find(a => a.id === id))
    .filter((a): a is Answer => !!a)
})

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
