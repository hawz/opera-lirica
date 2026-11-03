import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { describe, expect, it } from 'vitest'
import { activeLocales, operaSchema } from './content.schema'

const CONTENT_ROOT = join(dirname(fileURLToPath(import.meta.url)), 'content')

function markdownFilesIn(locale: string) {
  return readdirSync(join(CONTENT_ROOT, locale), { recursive: true })
    .filter((entry): entry is string => typeof entry === 'string' && entry.endsWith('.md'))
    .map((entry) => join(CONTENT_ROOT, locale, entry))
}

describe('content schema conformity', () => {
  for (const locale of activeLocales) {
    describe(locale, () => {
      for (const filePath of markdownFilesIn(locale)) {
        it(`${filePath} conforms to operaSchema`, () => {
          const { data } = matter(readFileSync(filePath, 'utf-8'))
          const result = operaSchema.safeParse(data)
          expect(result.success, result.error?.message).toBe(true)
        })
      }
    })
  }
})
