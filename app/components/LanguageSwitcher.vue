<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-dark-600 dark:text-gray-300 font-medium">{{ t('common.language') }}:</span>
    <button
      v-for="option in languageOptions"
      :key="option.code"
      :class="[
        'px-4 py-2 rounded-full transition-all text-sm font-semibold duration-150',
        currentLocale === option.code
          ? 'bg-primary-600 text-white shadow-md'
          : 'bg-gray-light dark:bg-dark-700 text-dark-700 dark:text-gray-100 '
            + 'hover:bg-gray-200 dark:hover:bg-dark-600 hover:shadow-sm'
      ]"
      @click="switchLanguage(option.code)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale, t } = useI18n()

const currentLocale = computed(() => locale.value)

interface LanguageOption {
  code: 'hy' | 'ru'
  label: string
}

const languageOptions: LanguageOption[] = [
  { code: 'hy' as const, label: 'Հայ' },
  { code: 'ru' as const, label: 'Рус' }
]

const switchLanguage = (newLocale: 'hy' | 'ru') => {
  setLocale(newLocale)
}
</script>
