<template>
  <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
    <span class="text-sm font-medium text-dark-700">{{ t('quiz.timer') }}:</span>
    <span class="text-lg font-bold text-primary-600 tabular-nums">{{ formattedTime }}</span>
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
