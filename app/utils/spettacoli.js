function toISODate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function isUpcoming(spettacolo, referenceDate) {
  return spettacolo.data >= toISODate(referenceDate)
}

export function upcomingSpettacoli(list, referenceDate) {
  return list
    .filter((spettacolo) => isUpcoming(spettacolo, referenceDate))
    .sort((a, b) => a.data.localeCompare(b.data))
}

export function spettacoliForTeatro(list, teatroSlug) {
  return list.filter((spettacolo) => spettacolo.teatro === teatroSlug)
}

export function spettacoliForOpera(list, operaSlug) {
  return list.filter((spettacolo) => spettacolo.opera === operaSlug)
}
