import { describe, it, expect } from 'vitest'
import {
  isUpcoming,
  upcomingSpettacoli,
  spettacoliForTeatro,
  spettacoliForOpera,
  stripLocalePrefix,
  groupSpettacoliByTarget,
} from './spettacoli'

const today = new Date(2026, 10, 5)

const past = { opera: 'aida', teatro: 'scala', data: '2026-09-10' }
const todaySpettacolo = { opera: 'tosca', teatro: 'scala', data: '2026-11-05' }
const soon = { opera: 'turandot', teatro: 'scala', data: '2026-11-20' }
const later = { opera: 'rigoletto', teatro: 'regio-torino', data: '2027-01-10' }

describe('isUpcoming', () => {
  it('is true for a date in the future', () => {
    expect(isUpcoming(soon, today)).toBe(true)
  })

  it('is true for a date equal to the reference date', () => {
    expect(isUpcoming(todaySpettacolo, today)).toBe(true)
  })

  it('is false for a date in the past', () => {
    expect(isUpcoming(past, today)).toBe(false)
  })
})

describe('upcomingSpettacoli', () => {
  it('filters out past spettacoli', () => {
    expect(upcomingSpettacoli([past, soon, later], today)).toEqual([soon, later])
  })

  it('sorts the remaining spettacoli ascending by date', () => {
    expect(upcomingSpettacoli([later, soon, todaySpettacolo], today)).toEqual([
      todaySpettacolo,
      soon,
      later,
    ])
  })

  it('returns an empty list when every spettacolo is in the past', () => {
    expect(upcomingSpettacoli([past], today)).toEqual([])
  })

  it('returns an empty list for an empty input', () => {
    expect(upcomingSpettacoli([], today)).toEqual([])
  })
})

describe('spettacoliForTeatro', () => {
  it('filters to spettacoli at the given teatro', () => {
    expect(spettacoliForTeatro([soon, later, past], 'scala')).toEqual([soon, past])
  })

  it('returns an empty list when no spettacolo matches the teatro', () => {
    expect(spettacoliForTeatro([soon, later], 'la-fenice')).toEqual([])
  })
})

describe('spettacoliForOpera', () => {
  it('filters to spettacoli of the given opera', () => {
    expect(spettacoliForOpera([soon, later, past], 'turandot')).toEqual([soon])
  })

  it('returns an empty list when no spettacolo matches the opera', () => {
    expect(spettacoliForOpera([soon, later], 'la-boheme')).toEqual([])
  })
})

describe('stripLocalePrefix', () => {
  it('removes the locale segment from a Nuxt Content path', () => {
    expect(stripLocalePrefix('/it/puccini/turandot')).toBe('/puccini/turandot')
  })

  it('works for a single-segment path, such as a teatro', () => {
    expect(stripLocalePrefix('/it/teatri/scala')).toBe('/teatri/scala')
  })
})

describe('groupSpettacoliByTarget', () => {
  it('groups multiple occorrenze sharing the same targetPath into one group', () => {
    const occorrenza1 = { data: '2026-12-07', targetPath: '/puccini/otello', targetLabel: 'Otello' }
    const occorrenza2 = { data: '2026-12-10', targetPath: '/puccini/otello', targetLabel: 'Otello' }

    expect(groupSpettacoliByTarget([occorrenza1, occorrenza2])).toEqual([
      {
        targetPath: '/puccini/otello',
        targetLabel: 'Otello',
        occorrenze: [{ data: '2026-12-07' }, { data: '2026-12-10' }],
      },
    ])
  })

  it('keeps spettacoli with different targetPath as distinct groups', () => {
    const otello = { data: '2026-12-07', targetPath: '/verdi/otello', targetLabel: 'Otello' }
    const boheme = { data: '2027-02-16', targetPath: '/puccini/la-boheme', targetLabel: 'La Bohème' }

    expect(groupSpettacoliByTarget([otello, boheme])).toEqual([
      { targetPath: '/verdi/otello', targetLabel: 'Otello', occorrenze: [{ data: '2026-12-07' }] },
      { targetPath: '/puccini/la-boheme', targetLabel: 'La Bohème', occorrenze: [{ data: '2027-02-16' }] },
    ])
  })

  it('returns a single-occorrenza group for a target with only one spettacolo', () => {
    const turandot = { data: '2026-11-28', targetPath: '/puccini/turandot', targetLabel: 'Turandot' }

    expect(groupSpettacoliByTarget([turandot])).toEqual([
      { targetPath: '/puccini/turandot', targetLabel: 'Turandot', occorrenze: [{ data: '2026-11-28' }] },
    ])
  })

  it('returns an empty list for an empty input', () => {
    expect(groupSpettacoliByTarget([])).toEqual([])
  })

  it('preserves input order, both across groups and within a group', () => {
    const otelloPrima = { data: '2026-12-07', targetPath: '/verdi/otello', targetLabel: 'Otello' }
    const boheme = { data: '2027-02-16', targetPath: '/puccini/la-boheme', targetLabel: 'La Bohème' }
    const otelloSeconda = { data: '2026-12-10', targetPath: '/verdi/otello', targetLabel: 'Otello' }

    const gruppi = groupSpettacoliByTarget([otelloPrima, boheme, otelloSeconda])

    expect(gruppi.map((gruppo) => gruppo.targetPath)).toEqual(['/verdi/otello', '/puccini/la-boheme'])
    expect(gruppi[0].occorrenze.map((occorrenza) => occorrenza.data)).toEqual(['2026-12-07', '2026-12-10'])
  })
})
