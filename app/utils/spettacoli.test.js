import { describe, it, expect } from 'vitest'
import {
  isUpcoming,
  upcomingSpettacoli,
  spettacoliForTeatro,
  spettacoliForOpera,
  stripLocalePrefix,
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
