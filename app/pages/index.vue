<template>
  <div class="min-h-screen flex items-center justify-center p-4 md:p-8">
    <div class="w-full max-w-3xl">
      <div class="flex justify-end mb-8">
        <LanguageSwitcher />
      </div>

      <div class="card text-center shadow-lg">
        <h1 class="text-4xl md:text-5xl font-bold text-dark-900 mb-6 leading-tight">
          {{ t('landing.title') }}
        </h1>
        <p class="text-xl text-dark-600 mb-10 font-medium">
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
