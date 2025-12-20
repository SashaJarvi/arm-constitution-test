<template>
  <div class="card mb-8">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
      {{ t('results.title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="text-center p-6 rounded-lg bg-gray-50 dark:bg-dark-700">
        <div
          :class="[
            'text-5xl font-bold mb-2',
            `text-${resultColor}-600`
          ]"
        >
          {{ Math.round(results.percentage) }}%
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-300">
          {{ t('results.percentage') }}
        </div>
      </div>

      <div class="text-center p-6 rounded-lg bg-gray-50 dark:bg-dark-700">
        <div class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {{ results.correctAnswers }} / {{ results.totalQuestions }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-300">
          {{ t('results.correct') }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <div class="flex items-center justify-between p-3 rounded bg-success-50 dark:bg-success-900/20">
        <span class="text-gray-700 dark:text-gray-200">{{ t('results.correct') }}</span>
        <span class="font-semibold text-success-700 dark:text-success-300">{{ results.correctAnswers }}</span>
      </div>
      <div class="flex items-center justify-between p-3 rounded bg-error-50 dark:bg-error-900/20">
        <span class="text-gray-700 dark:text-gray-200">{{ t('results.wrong') }}</span>
        <span class="font-semibold text-error-700 dark:text-error-300">{{ results.wrongAnswers }}</span>
      </div>
      <div class="flex items-center justify-between p-3 rounded bg-warning-50 dark:bg-warning-600/30">
        <span class="text-gray-700 dark:text-gray-100">{{ t('results.timeSpent') }}</span>
        <span class="font-semibold text-warning-700 dark:text-warning-100">{{ formattedTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizResult } from '~/types/quiz'
import { formatTime, getResultColor } from '~/utils/quiz-helpers'

const props = defineProps<{
  results: QuizResult
}>()

const { t } = useI18n()

const resultColor = computed(() => getResultColor(props.results.percentage))
const formattedTime = computed(() => formatTime(props.results.timeSpent))
</script>
