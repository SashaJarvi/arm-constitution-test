import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import type { QuizSession, QuizState } from '~/types/quiz'

const mockStorage = ref<QuizSession | null>(null)

vi.mock('@vueuse/core', () => ({
  StorageSerializers: { object: {} },
  useLocalStorage: () => mockStorage
}))

const createMockState = (overrides: Partial<QuizState> = {}): QuizState => ({
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  visitedQuestions: [],
  startTime: Date.now(),
  timeSpent: 0,
  totalPausedTime: 0,
  pauseStartTime: null,
  isPaused: false,
  isCompleted: false,
  questionOrder: [],
  ...overrides
})

describe('useQuizStorage', () => {
  let storage: ReturnType<typeof import('./useQuizStorage').useQuizStorage>

  beforeEach(async () => {
    mockStorage.value = null
    const mod = await import('./useQuizStorage')
    storage = mod.useQuizStorage()
  })

  describe('saveSession', () => {
    it('saves quiz state with current version', () => {
      const state = createMockState({ currentQuestionIndex: 3 })

      storage.saveSession(state)

      expect(mockStorage.value).not.toBeNull()
      expect(mockStorage.value!.state).toEqual(state)
      expect(mockStorage.value!.version).toBe(1)
      expect(mockStorage.value!.lastUpdated).toBeTypeOf('number')
    })

    it('updates lastUpdated timestamp on subsequent saves', async () => {
      const state = createMockState()

      storage.saveSession(state)
      const first = mockStorage.value!.lastUpdated

      await new Promise(resolve => setTimeout(resolve, 10))

      storage.saveSession(state)
      const second = mockStorage.value!.lastUpdated

      expect(second).toBeGreaterThan(first)
    })
  })

  describe('restoreSession', () => {
    it('returns null when no session exists', () => {
      expect(storage.restoreSession()).toBeNull()
    })

    it('restores session with matching version', () => {
      const state = createMockState({ currentQuestionIndex: 5 })
      mockStorage.value = { state, lastUpdated: Date.now(), version: 1 }

      const restored = storage.restoreSession()

      expect(restored).toEqual(state)
      expect(restored!.currentQuestionIndex).toBe(5)
    })

    it('discards session with future/unknown version', () => {
      const state = createMockState()
      mockStorage.value = { state, lastUpdated: Date.now(), version: 999 }

      const restored = storage.restoreSession()

      expect(restored).toBeNull()
      expect(mockStorage.value).toBeNull()
    })

    it('discards session with old version and no migration path', () => {
      const state = createMockState()
      mockStorage.value = { state, lastUpdated: Date.now(), version: 0 }

      const restored = storage.restoreSession()

      expect(restored).toBeNull()
      expect(mockStorage.value).toBeNull()
    })

    it('discards session with non-numeric version (legacy string format)', () => {
      const state = createMockState()
      // Simulate old string-versioned session from localStorage
      mockStorage.value = { state, lastUpdated: Date.now(), version: '1.0.0' as unknown as number }

      const restored = storage.restoreSession()

      expect(restored).toBeNull()
      expect(mockStorage.value).toBeNull()
    })
  })

  describe('clearSession', () => {
    it('clears stored session', () => {
      const state = createMockState()
      mockStorage.value = { state, lastUpdated: Date.now(), version: 1 }

      storage.clearSession()

      expect(mockStorage.value).toBeNull()
    })
  })

  describe('hasSession', () => {
    it('returns false when no session exists', () => {
      expect(storage.hasSession.value).toBe(false)
    })

    it('returns true when session exists', () => {
      mockStorage.value = { state: createMockState(), lastUpdated: Date.now(), version: 1 }

      expect(storage.hasSession.value).toBe(true)
    })
  })
})
