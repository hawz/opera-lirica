import { describe, expect, it } from 'vitest'
import { DEFAULT_THEME, nextTheme, resolveTheme } from './theme'

describe('resolveTheme', () => {
  it('keeps a stored value that is a known theme', () => {
    expect(resolveTheme('sipario')).toBe('sipario')
    expect(resolveTheme('palco-chiaro')).toBe('palco-chiaro')
  })

  it('falls back to the default theme when nothing is stored', () => {
    expect(resolveTheme(null)).toBe(DEFAULT_THEME)
    expect(resolveTheme(undefined)).toBe(DEFAULT_THEME)
  })

  it('falls back to the default theme when the stored value is unknown', () => {
    expect(resolveTheme('not-a-theme')).toBe(DEFAULT_THEME)
  })
})

describe('nextTheme', () => {
  it('toggles sipario to palco-chiaro', () => {
    expect(nextTheme('sipario')).toBe('palco-chiaro')
  })

  it('toggles palco-chiaro to sipario', () => {
    expect(nextTheme('palco-chiaro')).toBe('sipario')
  })
})
