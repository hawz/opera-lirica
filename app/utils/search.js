const SEARCHABLE_FIELDS = ['title', 'compositore', 'tagline']

function fieldMatches(doc, field, needle) {
  return typeof doc[field] === 'string' && doc[field].toLowerCase().includes(needle)
}

export function dedupeByPath(docs) {
  const seen = new Set()
  return docs.filter((doc) => {
    if (seen.has(doc.path)) return false
    seen.add(doc.path)
    return true
  })
}

export function searchOperas(docs, query) {
  const needle = query.toLowerCase()
  const byFieldPriority = SEARCHABLE_FIELDS.flatMap((field) =>
    docs.filter((doc) => fieldMatches(doc, field, needle)),
  )
  return dedupeByPath(byFieldPriority)
}

export function shouldSearch(query) {
  return query.trim().length >= 2
}
