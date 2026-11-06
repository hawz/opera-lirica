import { describe, it, expect } from 'vitest'
import { decideSpettacoloAction, generatePrBody } from './spettacoli-automazione'

const opere = [{ path: '/it/puccini/turandot' }, { path: '/it/verdi/aida' }]

const spettacoli = [
  { opera: 'turandot', teatro: 'scala', data: '2026-11-28', ora: '20:00', link_biglietti: 'https://esempio.it/a' },
]

const catalogo = { opere, spettacoli }

describe('decideSpettacoloAction', () => {
  it('ritorna "crea" per un evento mai visto', () => {
    const evento = { opera: 'aida', teatro: 'arena-verona', data: '2027-01-10' }
    expect(decideSpettacoloAction(evento, catalogo)).toBe('crea')
  })

  it('ritorna null quando l\'evento esistente è identico', () => {
    const evento = {
      opera: 'turandot',
      teatro: 'scala',
      data: '2026-11-28',
      ora: '20:00',
      link_biglietti: 'https://esempio.it/a',
    }
    expect(decideSpettacoloAction(evento, catalogo)).toBe(null)
  })

  it('ritorna "aggiorna" quando l\'ora è diversa', () => {
    const evento = {
      opera: 'turandot',
      teatro: 'scala',
      data: '2026-11-28',
      ora: '21:00',
      link_biglietti: 'https://esempio.it/a',
    }
    expect(decideSpettacoloAction(evento, catalogo)).toBe('aggiorna')
  })

  it('ritorna "aggiorna" quando il link_biglietti è diverso', () => {
    const evento = {
      opera: 'turandot',
      teatro: 'scala',
      data: '2026-11-28',
      ora: '20:00',
      link_biglietti: 'https://esempio.it/nuovo',
    }
    expect(decideSpettacoloAction(evento, catalogo)).toBe('aggiorna')
  })

  it('ritorna "salta-opera-non-catalogata" quando l\'Opera non è nel catalogo', () => {
    const evento = { opera: 'nabucco', teatro: 'scala', data: '2027-02-01' }
    expect(decideSpettacoloAction(evento, catalogo)).toBe('salta-opera-non-catalogata')
  })

  it('tratta ora/link_biglietti assenti come equivalenti a non definiti', () => {
    const catalogoSenzaOra = {
      opere,
      spettacoli: [{ opera: 'turandot', teatro: 'scala', data: '2026-11-28' }],
    }
    const evento = { opera: 'turandot', teatro: 'scala', data: '2026-11-28' }
    expect(decideSpettacoloAction(evento, catalogoSenzaOra)).toBe(null)
  })
})

describe('generatePrBody', () => {
  it('ritorna una stringa vuota quando non ci sono decisioni', () => {
    expect(generatePrBody([])).toBe('')
  })

  it('elenca le creazioni', () => {
    const decisioni = [{ evento: { teatro: 'scala', opera: 'turandot', data: '2026-11-28' }, azione: 'crea' }]
    const testo = generatePrBody(decisioni)
    expect(testo).toContain('## Nuovi Spettacoli')
    expect(testo).toContain('scala — turandot — 2026-11-28')
    expect(testo).not.toContain('## Spettacoli aggiornati')
    expect(testo).not.toContain('## Opere non catalogate')
  })

  it('elenca gli aggiornamenti separatamente dalle creazioni', () => {
    const decisioni = [
      { evento: { teatro: 'scala', opera: 'turandot', data: '2026-11-28' }, azione: 'crea' },
      { evento: { teatro: 'arena-verona', opera: 'aida', data: '2027-01-10' }, azione: 'aggiorna' },
    ]
    const testo = generatePrBody(decisioni)
    expect(testo).toContain('## Nuovi Spettacoli')
    expect(testo).toContain('## Spettacoli aggiornati')
    expect(testo).toContain('arena-verona — aida — 2027-01-10')
  })

  it('segnala in modo visibile le Opere non catalogate', () => {
    const decisioni = [
      {
        evento: { teatro: 'scala', opera: 'nabucco', data: '2027-02-01' },
        azione: 'salta-opera-non-catalogata',
      },
    ]
    const testo = generatePrBody(decisioni)
    expect(testo).toContain('## Opere non catalogate (saltate)')
    expect(testo).toContain('nabucco')
    expect(testo).toContain('non catalogata')
  })

  it('ignora le decisioni senza azione (nessun cambiamento)', () => {
    const decisioni = [{ evento: { teatro: 'scala', opera: 'turandot', data: '2026-11-28' }, azione: null }]
    expect(generatePrBody(decisioni)).toBe('')
  })
})
