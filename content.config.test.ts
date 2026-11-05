import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { describe, expect, it } from 'vitest'
import { activeLocales, operaSchema, teatroSchema } from './content.schema'

const CONTENT_ROOT = join(dirname(fileURLToPath(import.meta.url)), 'content')

const SCHEMAS_BY_SUBDIR = [
  { subdir: 'teatri', schema: teatroSchema },
]

function schemaFor(relativePath: string) {
  const [firstSegment] = relativePath.split('/')
  const match = SCHEMAS_BY_SUBDIR.find(({ subdir }) => subdir === firstSegment)
  return match ? match.schema : operaSchema
}

function markdownFilesIn(locale: string) {
  return readdirSync(join(CONTENT_ROOT, locale), { recursive: true })
    .filter((entry): entry is string => typeof entry === 'string' && entry.endsWith('.md'))
    .map((entry) => join(CONTENT_ROOT, locale, entry))
}

describe('content schema conformity', () => {
  for (const locale of activeLocales) {
    describe(locale, () => {
      for (const filePath of markdownFilesIn(locale)) {
        const relativePath = relative(join(CONTENT_ROOT, locale), filePath)
        const schema = schemaFor(relativePath)
        it(`${filePath} conforms to its schema`, () => {
          const { data } = matter(readFileSync(filePath, 'utf-8'))
          const result = schema.safeParse(data)
          expect(result.success, result.error?.message).toBe(true)
        })
      }
    })
  }
})
