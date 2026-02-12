<template>
  <div class="results-list">
    <ResultsQuestion
      v-for="question in questionsWithResults"
      :key="question.id"
      v-bind="question.result"
    />
  </div>
</template>

<script setup lang="ts">
import type { Question, QuestionResult } from '~/types/quiz'

type ReadonlyDeep<T> = T extends object
  ? { readonly [K in keyof T]: ReadonlyDeep<T[K]> }
  : T

const props = defineProps<{
  questions: readonly Question[] | ReadonlyDeep<Question[]>
  getQuestionResult: (questionId: string) => QuestionResult | null
}>()

const questionsWithResults = computed(() => {
  return props.questions
    .map(question => {
      const result = props.getQuestionResult(question.id)
      return result ? { id: question.id, result } : null
    })
    .filter((item): item is { id: string, result: QuestionResult } => item !== null)
})
</script>
