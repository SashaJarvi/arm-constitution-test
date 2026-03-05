<template>
  <div
    :class="[
      'flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold text-sm md:text-base transition-colors duration-300',
      colorClass
    ]"
  >
    <div class="i-heroicons-clock w-5 h-5" />
    <span>{{ formattedTime }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  remainingSeconds: number
}>()

const formattedTime = computed(() => {
  const minutes = Math.floor(props.remainingSeconds / 60)
  const seconds = props.remainingSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
})

const colorClass = computed(() => {
  if (props.remainingSeconds <= 10)
    return 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400'
  if (props.remainingSeconds <= 30)
    return 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400'
  return 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
})
</script>
