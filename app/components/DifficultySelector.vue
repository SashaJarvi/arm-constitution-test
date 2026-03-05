<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-lg font-bold text-dark-900 dark:text-gray-100 text-center">
      {{ t('landing.selectDifficulty') }}
    </h3>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <button
        v-for="option in difficultyOptions"
        :key="option.value"
        class="flex flex-col items-center gap-2 p-4 md:p-5 border-2 rounded-2xl transition-all duration-150
          hover:shadow-md hover:border-primary-400 cursor-pointer
          border-gray-light-border dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700"
        @click="emit('select', option.value)"
      >
        <span class="text-2xl">{{ option.icon }}</span>
        <span class="text-base font-bold text-dark-900 dark:text-gray-100">
          {{ t(option.labelKey) }}
        </span>
        <span class="text-sm text-dark-500 dark:text-gray-400 text-center leading-snug">
          {{ t(option.descriptionKey) }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Difficulty } from '~/types/quiz'
import { DIFFICULTY } from '~/types/quiz'

const emit = defineEmits<{
  select: [difficulty: Difficulty]
}>()

const { t } = useI18n()

const difficultyOptions = [
  {
    value: DIFFICULTY.EASY,
    labelKey: 'landing.difficulty.easy',
    descriptionKey: 'landing.difficulty.easyDescription',
    icon: '🟢'
  },
  {
    value: DIFFICULTY.MEDIUM,
    labelKey: 'landing.difficulty.medium',
    descriptionKey: 'landing.difficulty.mediumDescription',
    icon: '🟡'
  },
  {
    value: DIFFICULTY.HARD,
    labelKey: 'landing.difficulty.hard',
    descriptionKey: 'landing.difficulty.hardDescription',
    icon: '🔴'
  }
]
</script>
