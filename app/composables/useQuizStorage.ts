import { StorageSerializers, useLocalStorage } from '@vueuse/core'
import type { QuizSession, QuizState } from '~/types/quiz'

const STORAGE_KEY = 'quiz-session'
const STORAGE_VERSION = '1.0.0'

export const useQuizStorage = () => {
  const savedSession = useLocalStorage<QuizSession | null>(STORAGE_KEY, null, { serializer: StorageSerializers.object })

  const saveSession = (state: QuizState) => {
    savedSession.value = {
      state,
      lastUpdated: Date.now(),
      version: STORAGE_VERSION
    }
  }

  const restoreSession = (): QuizState | null => {
    if (!savedSession.value) return null

    // Version check and migration logic
    if (savedSession.value.version !== STORAGE_VERSION) {
      clearSession()
      return null
    }

    return savedSession.value.state
  }

  const clearSession = () => {
    savedSession.value = null
  }

  const hasSession = computed(() => !!savedSession.value)

  return {
    saveSession,
    restoreSession,
    clearSession,
    hasSession
  }
}
