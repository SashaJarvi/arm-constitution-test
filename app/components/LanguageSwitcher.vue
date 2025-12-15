<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-dark-600 font-medium">{{ t('common.language') }}:</span>
    <button
      :class="[
        'px-4 py-2 rounded-full transition-all text-sm font-semibold duration-150',
        currentLocale === 'hy'
          ? 'bg-primary-600 text-white shadow-md'
          : 'bg-gray-light text-dark-700 hover:bg-gray-200 hover:shadow-sm',
      ]"
      @click="() => switchLanguage('hy')"
    >
      Հայ
    </button>
    <button
      :class="[
        'px-4 py-2 rounded-full transition-all text-sm font-semibold duration-150',
        currentLocale === 'ru'
          ? 'bg-primary-600 text-white shadow-md'
          : 'bg-gray-light text-dark-700 hover:bg-gray-200 hover:shadow-sm',
      ]"
      @click="() => switchLanguage('ru')"
    >
      Рус
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale, t } = useI18n()

const currentLocale = computed(() => locale.value)

const switchLanguage = (newLocale: 'hy' | 'ru') => {
  setLocale(newLocale)
}
</script>
