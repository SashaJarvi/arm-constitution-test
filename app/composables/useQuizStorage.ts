import { StorageSerializers, useLocalStorage } from '@vueuse/core'
import type { QuizSession, QuizState } from '~/types/quiz'

const STORAGE_KEY = 'quiz-session'
const STORAGE_VERSION = 1

const migrations: Record<number, (state: QuizState) => QuizState> = {
  // Example for future use:
  // 1: (state) => ({ ...state, newField: defaultValue }),
}

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

    let { version, state } = savedSession.value

    // Run migrations sequentially from stored version to current
    while (version < STORAGE_VERSION) {
      const migrate = migrations[version]
      if (!migrate) {
        // No migration path — discard session
        clearSession()
        return null
      }
      state = migrate(state)
      version++
    }

    // If stored version is ahead of current (downgrade), discard
    if (version !== STORAGE_VERSION) {
      clearSession()
      return null
    }

    // Save migrated state
    if (savedSession.value.version !== STORAGE_VERSION) {
      saveSession(state)
    }

    return state
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
