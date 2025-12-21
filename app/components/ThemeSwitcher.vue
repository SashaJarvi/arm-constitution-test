<template>
  <div class="flex items-center gap-1 bg-white dark:bg-dark-800 rounded-full p-1 shadow-sm">
    <button
      v-for="option in themeOptions"
      :key="option.value"
      :aria-label="option.ariaLabelText"
      :class="[
        'grid place-items-center px-3 py-2 rounded-full transition-all duration-150 text-sm font-semibold',
        !$colorMode.unknown && $colorMode.preference === option.value
          ? 'bg-primary-600 text-white shadow-md'
          : 'text-dark-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
      ]"
      @click="$colorMode.preference = option.value"
    >
      <span :class="[option.icon, 'w-5 h-5 inline-block']" />
    </button>
  </div>
</template>

<script setup lang="ts">
type Theme = 'light' | 'dark' | 'system'

interface ThemeOption {
  value: Theme
  icon: string
  ariaLabelText: string
}

const themeOptions: ThemeOption[] = [
  { value: 'light' as Theme, icon: 'i-heroicons-sun-20-solid', ariaLabelText: 'Light theme' },
  { value: 'system' as Theme, icon: 'i-heroicons-computer-desktop-20-solid', ariaLabelText: 'System theme' },
  { value: 'dark' as Theme, icon: 'i-heroicons-moon-20-solid', ariaLabelText: 'Dark theme' }
]
</script>
