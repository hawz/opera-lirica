export const THEMES = ['sipario', 'palco-chiaro']
export const DEFAULT_THEME = 'sipario'
export const THEME_STORAGE_KEY = 'opera-lirica-theme'

export function resolveTheme(stored) {
  return THEMES.includes(stored) ? stored : DEFAULT_THEME
}

export function nextTheme(current) {
  return current === 'sipario' ? 'palco-chiaro' : 'sipario'
}
