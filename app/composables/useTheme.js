export function useTheme() {
  const theme = useState('theme', () => DEFAULT_THEME)

  if (import.meta.client) {
    onMounted(() => {
      theme.value = resolveTheme(localStorage.getItem(THEME_STORAGE_KEY))
      document.documentElement.setAttribute('data-theme', theme.value)
    })

    watch(theme, (value) => {
      document.documentElement.setAttribute('data-theme', value)
      localStorage.setItem(THEME_STORAGE_KEY, value)
    })
  }

  function toggleTheme() {
    theme.value = nextTheme(theme.value)
  }

  return { theme, toggleTheme }
}
