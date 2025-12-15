<template>
  <div class="quiz-progress mb-6">
    <div class="flex justify-between items-center mb-3 text-sm text-dark-600">
      <span class="font-semibold">{{ t('quiz.questionCounter', { current: currentIndex + 1, total: totalQuestions }) }}</span>
      <span class="font-bold text-primary-600">{{ Math.round(progressPercentage) }}%</span>
    </div>
    <div class="w-full bg-gray-light rounded-full h-3">
      <div
        class="bg-primary-600 h-3 rounded-full transition-all duration-300 shadow-sm"
        :style="{ width: `${progressPercentage}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentIndex: number
  totalQuestions: number
  progressPercentage: number
}>()

const { t } = useI18n()
</script>
