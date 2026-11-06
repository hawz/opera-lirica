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

export function generatePrBody(decisioni) {
  const creazioni = decisioni.filter((decisione) => decisione.azione === 'crea')
  const aggiornamenti = decisioni.filter((decisione) => decisione.azione === 'aggiorna')
  const saltati = decisioni.filter(
    (decisione) => decisione.azione === 'salta-opera-non-catalogata',
  )

  if (creazioni.length === 0 && aggiornamenti.length === 0 && saltati.length === 0) {
    return ''
  }

  const sezioni = []

  if (creazioni.length > 0) {
    sezioni.push(
      ['## Nuovi Spettacoli', '', ...creazioni.map((decisione) => describeEvento(decisione.evento))].join('\n'),
    )
  }

  if (aggiornamenti.length > 0) {
    sezioni.push(
      ['## Spettacoli aggiornati', '', ...aggiornamenti.map((decisione) => describeEvento(decisione.evento))].join(
        '\n',
      ),
    )
  }

  if (saltati.length > 0) {
    sezioni.push(
      [
        '## Opere non catalogate (saltate)',
        '',
        ...saltati.map(
          (decisione) =>
            `- ${decisione.evento.teatro} — "${decisione.evento.opera}" il ${decisione.evento.data}: Opera non catalogata, Spettacolo non creato`,
        ),
      ].join('\n'),
    )
  }

  return sezioni.join('\n\n')
}
