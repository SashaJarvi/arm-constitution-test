<template>
  <div class="results-list">
    <ResultsQuestion
      v-for="question in displayQuestions"
      :key="question.id"
      v-bind="getQuestionResultProps(question.id)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Question, QuestionResult } from '~/types/quiz'

const props = defineProps<{
  questions: Question[]
  getQuestionResult: (questionId: string) => QuestionResult | null
}>()

const getQuestionResultProps = (questionId: string) => {
  const result = props.getQuestionResult(questionId)
  if (!result) return null

  return {
    question: result.question,
    userAnswer: result.userAnswer,
    correctAnswer: result.correctAnswer,
    isCorrect: result.isCorrect,
  }
}

const displayQuestions = computed(() => props.questions)
</script>
