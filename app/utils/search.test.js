import { describe, it, expect } from 'vitest'
import { searchOperas, shouldSearch } from './search'

const aida = { path: '/en/verdi/aida', title: 'Aida', compositore: 'Verdi', tagline: 'Love and war in ancient Egypt' }
const tosca = { path: '/en/puccini/tosca', title: 'Tosca', compositore: 'Puccini', tagline: 'Jealousy and betrayal in Rome' }

describe('searchOperas', () => {
  it('matches a document by title', () => {
    expect(searchOperas([aida, tosca], 'aid')).toEqual([aida])
  })

  it('matches a document by composer', () => {
    expect(searchOperas([aida, tosca], 'verdi')).toEqual([aida])
  })

  it('matches a document by tagline', () => {
    expect(searchOperas([aida, tosca], 'betrayal')).toEqual([tosca])
  })

  it('returns a document once even when it matches on more than one field', () => {
    const doc = { path: '/en/verdi/aida', title: 'Aida', compositore: 'Aida Ensemble', tagline: 'Ancient Egypt' }

    expect(searchOperas([doc], 'aida')).toEqual([doc])
  })

  it('deduplicates by path when two distinct document objects share the same path', () => {
    const first = { path: '/en/verdi/aida', title: 'Aida', compositore: 'Verdi', tagline: 'Ancient Egypt' }
    const stale = { path: '/en/verdi/aida', title: 'Aida (stale copy)', compositore: 'Verdi', tagline: 'Ancient Egypt' }

    expect(searchOperas([first, stale], 'aida')).toEqual([first])
  })

  it('orders results by field priority: title matches, then composer matches, then tagline matches', () => {
    const titleMatch = { path: '/en/a', title: 'Opera', compositore: 'X', tagline: 'Z' }
    const composerMatch = { path: '/en/b', title: 'B', compositore: 'Opera', tagline: 'Z' }
    const taglineMatch = { path: '/en/c', title: 'C', compositore: 'X', tagline: 'Opera' }

    expect(searchOperas([taglineMatch, composerMatch, titleMatch], 'opera')).toEqual([
      titleMatch,
      composerMatch,
      taglineMatch,
    ])
  })

  it('matches a document by a character name', () => {
    const donGiovanni = {
      path: '/en/mozart/don-giovanni',
      title: 'Don Giovanni',
      compositore: 'Mozart',
      tagline: 'The unrepentant seducer',
      personaggi: [{ nome: 'Leporello', voce: 'Bass' }],
    }

    expect(searchOperas([aida, tosca, donGiovanni], 'leporello')).toEqual([donGiovanni])
  })

  it('deduplicates when a document matches both a top-level field and a character name', () => {
    const doc = {
      path: '/en/mozart/don-giovanni',
      title: 'Don Giovanni',
      compositore: 'Mozart',
      tagline: 'Don Giovanni meets his fate',
      personaggi: [{ nome: 'Don Giovanni', voce: 'Baritone' }],
    }

    expect(searchOperas([doc], 'don giovanni')).toEqual([doc])
  })

  it('ranks character-name matches after title, composer and tagline matches', () => {
    const titleMatch = { path: '/en/a', title: 'Opera', compositore: 'X', tagline: 'Z' }
    const personaggioMatch = { path: '/en/b', title: 'B', compositore: 'X', tagline: 'Z', personaggi: [{ nome: 'Opera' }] }

    expect(searchOperas([personaggioMatch, titleMatch], 'opera')).toEqual([titleMatch, personaggioMatch])
  })

  it('does not match a document whose personaggi array has no matching nome', () => {
    const doc = { path: '/en/a', title: 'A', compositore: 'X', tagline: 'Z', personaggi: [{ nome: 'Leporello' }] }

    expect(searchOperas([doc], 'zerlina')).toEqual([])
  })
})

describe('shouldSearch', () => {
  it('is false for an empty query', () => {
    expect(shouldSearch('')).toBe(false)
  })

  it('is false for a single trimmed character', () => {
    expect(shouldSearch('a')).toBe(false)
  })

  it('is true for two trimmed characters', () => {
    expect(shouldSearch('ab')).toBe(true)
  })

  it('is false when a trailing space pads a single character to length two', () => {
    expect(shouldSearch('a ')).toBe(false)
  })

  it('is false when a leading space pads a single character to length two', () => {
    expect(shouldSearch(' a')).toBe(false)
  })

  it('is true for two characters surrounded by whitespace', () => {
    expect(shouldSearch('  ab  ')).toBe(true)
  })
})
