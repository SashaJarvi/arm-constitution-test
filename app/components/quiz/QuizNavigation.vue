<template>
  <div class="flex justify-between items-center mt-8 gap-4">
    <BaseButton
      variant="secondary"
      :disabled="isFirstQuestion"
      @click="$emit('previous')"
    >
      {{ t('quiz.previous') }}
    </BaseButton>

    <BaseButton
      variant="primary"
      @click="$emit('next')"
    >
      {{ isLastQuestion ? t('quiz.submit') : t('quiz.next') }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isFirstQuestion: boolean
  isLastQuestion: boolean
}>()

defineEmits<{
  previous: []
  next: []
}>()

const { t } = useI18n()
</script>
