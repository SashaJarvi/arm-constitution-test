export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const theme = useLocalStorage<Theme>('theme', 'system')
  const isDark = ref(false)

  const updateTheme = () => {
    if (theme.value === 'system') {
      isDark.value = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
    }
    else {
      isDark.value = theme.value === 'dark'
    }

    // Update document class
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    updateTheme()
  }

  // Watch for system theme changes
  onMounted(() => {
    updateTheme()

    const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme.value === 'system') {
        updateTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleChange)
    })
  })

  // Watch for theme changes
  watch(theme, updateTheme)

  return {
    theme: readonly(theme),
    isDark: readonly(isDark),
    setTheme
  }
}
