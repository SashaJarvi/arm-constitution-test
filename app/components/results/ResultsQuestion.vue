<template>
  <div class="card mb-4">
    <div class="flex items-start gap-3 mb-4">
      <div
        :class="[
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold',
          isCorrect ? 'bg-success-600' : 'bg-error-600'
        ]"
      >
        {{ isCorrect ? '✓' : '✗' }}
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {{ getTranslatedText(question.text) }}
        </h3>
      </div>
    </div>

    <div class="space-y-3 ml-11">
      <!-- Timed out indicator -->
      <div
        v-if="isTimedOut"
        class="p-3 rounded-lg border-2 border-warning-300 dark:border-warning-700 bg-warning-50 dark:bg-warning-900/20"
      >
        <div class="text-warning-700 dark:text-warning-400 font-medium">
          {{ t('results.timedOut') }}
        </div>
      </div>

      <div
        v-else-if="userAnswer"
        :class="[
          'p-3 rounded-lg border-2',
          isCorrect
            ? 'border-success-300 dark:border-success-700 bg-success-50 dark:bg-success-900/20'
            : 'border-error-300 dark:border-error-700 bg-error-50 dark:bg-error-900/20'
        ]"
      >
        <div class="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
          {{ t('results.yourAnswer') }}
        </div>
        <div :class="isCorrect ? 'text-success-900 dark:text-success-300' : 'text-error-900 dark:text-error-300'">
          {{ getTranslatedText(userAnswer.text) }}
        </div>
      </div>

      <div
        v-if="!isCorrect"
        class="p-3 rounded-lg border-2 border-success-300 dark:border-success-700 bg-success-50 dark:bg-success-900/20"
      >
        <div class="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
          {{ t('results.correctAnswer') }}
        </div>
        <div class="text-success-900 dark:text-success-300">
          {{ getTranslatedText(correctAnswer.text) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question, Answer } from '~/types/quiz'

defineProps<{
  question: Question
  userAnswer: Answer | undefined
  correctAnswer: Answer
  isCorrect: boolean
  isTimedOut?: boolean
}>()

const { t } = useI18n()

const getTranslatedText = (text: string): string => {
  if (text.startsWith('quiz.'))
    return t(text)

  return text
}
</script>
