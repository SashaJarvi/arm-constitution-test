<template>
  <header
    class="sticky top-0 z-50 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 transition-colors duration-200"
  >
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-4">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4">
        <h1 class="text-lg md:text-2xl font-bold text-dark-900 dark:text-gray-100 flex-shrink min-w-0">
          {{ pageTitle }}
        </h1>
        <div class="flex items-center gap-3 flex-shrink-0">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const titleKeys: Record<string, string> = {
  results: 'results.title'
}

const pageTitle = computed(() => {
  const routeName = route.name as string
  return t(titleKeys[routeName] || 'landing.title')
})
</script>
