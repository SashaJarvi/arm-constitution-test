<template>
  <div class="quiz-progress mb-6">
    <div class="flex justify-between items-center mb-2 text-sm text-gray-600">
      <span>{{ t('quiz.questionCounter', { current: currentIndex + 1, total: totalQuestions }) }}</span>
      <span class="font-medium">{{ Math.round(progressPercentage) }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div
        class="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
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
