<template>
  <div class="flex items-center justify-center p-4 md:p-8">
    <div class="w-full max-w-3xl">
      <div class="card text-center shadow-lg">
        <p class="text-xl text-dark-700 dark:text-gray-300 mb-10 font-medium">
          {{ t('landing.description') }}
        </p>

        <!-- Difficulty selection (shown when starting a new quiz) -->
        <div v-if="isSelectingDifficulty">
          <DifficultySelector @select="handleDifficultySelect" />
        </div>

        <!-- Default buttons -->
        <div
          v-else
          class="flex flex-col sm:flex-row gap-4 justify-center"
        >
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
import type { Difficulty } from '~/types/quiz'

const { t } = useI18n()
const { hasSession, clearSession } = useQuizStorage()

const hasExistingSession = computed(() => hasSession.value)
const isSelectingDifficulty = ref(false)

const handleContinueQuiz = () => {
  navigateTo('/quiz')
}

const handleStartNewQuiz = () => {
  isSelectingDifficulty.value = true
}

const handleDifficultySelect = (difficulty: Difficulty) => {
  clearSession()
  navigateTo(`/quiz?difficulty=${difficulty}`)
}
</script>
