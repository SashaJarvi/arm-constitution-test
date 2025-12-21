<template>
  <div class="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white dark:bg-dark-800 rounded-full shadow-sm">
    <span class="text-xs md:text-sm font-medium text-dark-700 dark:text-gray-100">{{ t('quiz.timer') }}:</span>
    <span class="text-base md:text-lg font-bold text-primary-600 dark:text-primary-300 tabular-nums">{{ formattedTime }}</span>
  </div>
</template>

<script setup lang="ts">
import { useQuizTimer } from '~/composables/useQuizTimer'

const props = defineProps<{
  startTime: number
  isPaused: boolean
}>()

const { t } = useI18n()
const { elapsedTime, formatTime } = useQuizTimer(props.startTime, toRef(props, 'isPaused'))

const formattedTime = computed(() => formatTime(elapsedTime.value))
</script>
