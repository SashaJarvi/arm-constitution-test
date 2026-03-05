import { QUESTION_TIME_LIMIT } from '~/types/quiz'

export const useQuestionTimer = (
  isPaused: Ref<boolean>,
  onTimeout: () => void
) => {
  const remainingSeconds = ref(QUESTION_TIME_LIMIT)
  let intervalId: ReturnType<typeof setInterval> | null = null

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const start = (initialRemaining: number = QUESTION_TIME_LIMIT) => {
    stop()
    remainingSeconds.value = initialRemaining

    intervalId = setInterval(() => {
      if (isPaused.value) return

      remainingSeconds.value--
      if (remainingSeconds.value <= 0) {
        remainingSeconds.value = 0
        stop()
        onTimeout()
      }
    }, 1000)
  }

  const restart = () => {
    start(QUESTION_TIME_LIMIT)
  }

  onUnmounted(() => stop())

  return {
    remainingSeconds: readonly(remainingSeconds),
    start,
    stop,
    restart
  }
}
