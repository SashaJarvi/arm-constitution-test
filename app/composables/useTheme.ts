export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const colorMode = useColorMode()

  const setTheme = (newTheme: Theme) => {
    colorMode.preference = newTheme
  }

  return {
    theme: computed(() => colorMode.preference as Theme),
    setTheme
  }
}
