<template>
  <div class="flex items-center gap-3 flex-wrap">
    <button
      class="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300 md:hidden"
      @click="$emit('toggleSidebar')"
    >
      {{ t('quiz.toggleSidebar') }}
    </button>

    <button
      :class="[
        'px-4 py-2 rounded-lg font-medium transition-colors',
        isPaused
          ? 'bg-success-600 text-white hover:bg-success-700'
          : 'bg-warning-600 text-white hover:bg-warning-700',
      ]"
      @click="$emit('togglePause')"
    >
      {{ isPaused ? t('quiz.resume') : t('quiz.pause') }}
    </button>

    <BaseButton
      variant="primary"
      :disabled="!canSubmit"
      @click="handleSubmit"
    >
      {{ t('quiz.submit') }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isPaused: boolean
  canSubmit: boolean
}>()

const emit = defineEmits<{
  togglePause: []
  toggleSidebar: []
  submit: []
}>()

const { t } = useI18n()

const handleSubmit = () => {
  const confirmed = confirm(t('quiz.confirmSubmit'))
  if (confirmed)
    emit('submit')
}
</script>
