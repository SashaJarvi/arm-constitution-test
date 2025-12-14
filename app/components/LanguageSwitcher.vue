<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-gray-600">{{ t('common.language') }}:</span>
    <button
      :class="[
        'px-3 py-1 rounded transition-colors text-sm font-medium',
        currentLocale === 'hy'
          ? 'bg-primary-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      ]"
      @click="() => switchLanguage('hy')"
    >
      Հայ
    </button>
    <button
      :class="[
        'px-3 py-1 rounded transition-colors text-sm font-medium',
        currentLocale === 'ru'
          ? 'bg-primary-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
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
