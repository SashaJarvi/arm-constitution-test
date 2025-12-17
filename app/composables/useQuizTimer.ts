export function useQuizTimer(startTime: number, isPaused: Ref<boolean>) {
  const elapsedTime = ref(0)
  let intervalId: ReturnType<typeof setInterval> | null = null
  let pauseStartTime: number | null = null
  let totalPausedTime = 0

  const updateElapsedTime = () => {
    if (!isPaused.value) {
      elapsedTime.value = Math.floor((Date.now() - startTime - totalPausedTime) / 1000)
    }
  }

  const startTimer = () => {
    updateElapsedTime()
    intervalId = setInterval(updateElapsedTime, 1000)
  }

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  // Watch for pause state changes
  watch(isPaused, (newValue, oldValue) => {
    if (newValue && !oldValue) {
      // Just paused
      pauseStartTime = Date.now()
    }
    else if (!newValue && oldValue) {
      // Just resumed
      if (pauseStartTime !== null) {
        totalPausedTime += Date.now() - pauseStartTime
        pauseStartTime = null
      }
    }
  }, { immediate: true })

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`
  }

  onMounted(() => {
    startTimer()
  })

  onUnmounted(() => {
    stopTimer()
  })

  return {
    elapsedTime: readonly(elapsedTime),
    formatTime
  }
}
