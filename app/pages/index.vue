<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-2xl">
      <div class="flex justify-end mb-6">
        <LanguageSwitcher />
      </div>

      <div class="card text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ t('landing.title') }}
        </h1>
        <p class="text-lg text-gray-600 mb-8">
          {{ t('landing.description') }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton
            v-if="hasExistingSession"
            variant="primary"
            @click="handleContinueQuiz"
          >
            {{ t('landing.continue') }}
          </BaseButton>

          <BaseButton
            :variant="hasExistingSession ? 'secondary' : 'primary'"
            @click="handleStartNewQuiz"
          >
            {{ t('landing.startNew') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { hasSession, clearSession } = useQuizStorage()

const hasExistingSession = computed(() => hasSession.value)

const handleContinueQuiz = () => {
  navigateTo('/quiz')
}

const handleStartNewQuiz = () => {
  clearSession()
  navigateTo('/quiz')
}
</script>
