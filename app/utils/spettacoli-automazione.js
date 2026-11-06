function operaSlug(opera) {
  return opera.path.split('/').pop()
}

function matchingSpettacolo(evento, spettacoli) {
  return spettacoli.find(
    (spettacolo) =>
      spettacolo.teatro === evento.teatro &&
      spettacolo.opera === evento.opera &&
      spettacolo.data === evento.data,
  )
}

export function decideSpettacoloAction(evento, catalogo) {
  const operaSlugs = new Set(catalogo.opere.map(operaSlug))

  if (!operaSlugs.has(evento.opera)) {
    return 'salta-opera-non-catalogata'
  }

  const esistente = matchingSpettacolo(evento, catalogo.spettacoli)

  if (!esistente) {
    return 'crea'
  }

  const oraDiversa = (evento.ora ?? null) !== (esistente.ora ?? null)
  const linkDiverso = (evento.link_biglietti ?? null) !== (esistente.link_biglietti ?? null)

  return oraDiversa || linkDiverso ? 'aggiorna' : null
}

function describeEvento(evento) {
  return `- ${evento.teatro} — ${evento.opera} — ${evento.data}`
}

function renderSezione(titolo, decisioni, describe) {
  if (decisioni.length === 0) return null
  return [titolo, '', ...decisioni.map(describe)].join('\n')
}

export function generatePrBody(decisioni) {
  const creazioni = decisioni.filter((decisione) => decisione.azione === 'crea')
  const aggiornamenti = decisioni.filter((decisione) => decisione.azione === 'aggiorna')
  const saltati = decisioni.filter(
    (decisione) => decisione.azione === 'salta-opera-non-catalogata',
  )

  const sezioni = [
    renderSezione('## Nuovi Spettacoli', creazioni, (decisione) => describeEvento(decisione.evento)),
    renderSezione('## Spettacoli aggiornati', aggiornamenti, (decisione) => describeEvento(decisione.evento)),
    renderSezione(
      '## Opere non catalogate (saltate)',
      saltati,
      (decisione) =>
        `- ${decisione.evento.teatro} — "${decisione.evento.opera}" il ${decisione.evento.data}: Opera non catalogata, Spettacolo non creato`,
    ),
  ].filter(Boolean)

  return sezioni.join('\n\n')
}
