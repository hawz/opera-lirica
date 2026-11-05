import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { describe, expect, it } from 'vitest'
import { activeLocales, operaSchema, teatroSchema, spettacoloSchema } from './content.schema'

const CONTENT_ROOT = join(dirname(fileURLToPath(import.meta.url)), 'content')

const SCHEMAS_BY_SUBDIR = [
  { subdir: 'teatri', schema: teatroSchema },
  { subdir: 'spettacoli', schema: spettacoloSchema },
]

const NON_COMPOSER_SUBDIRS = new Set(SCHEMAS_BY_SUBDIR.map(({ subdir }) => subdir))

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

function frontmatterOf(filePath: string) {
  return matter(readFileSync(filePath, 'utf-8')).data
}

function operaSlugsIn(locale: string) {
  return new Set(
    markdownFilesIn(locale)
      .filter((filePath) => {
        const [firstSegment, ...rest] = relative(join(CONTENT_ROOT, locale), filePath).split('/')
        return !NON_COMPOSER_SUBDIRS.has(firstSegment) && rest.at(-1) !== 'index.md'
      })
      .map((filePath) => filePath.replace(/\.md$/, '').split('/').at(-1)),
  )
}

function teatroSlugsIn(locale: string) {
  return new Set(
    readdirSync(join(CONTENT_ROOT, locale, 'teatri'))
      .filter((entry) => entry.endsWith('.md'))
      .map((entry) => entry.replace(/\.md$/, '')),
  )
}

function spettacoloFilesIn(locale: string) {
  return markdownFilesIn(locale).filter(
    (filePath) => relative(join(CONTENT_ROOT, locale), filePath).split('/')[0] === 'spettacoli',
  )
}

describe('content schema conformity', () => {
  for (const locale of activeLocales) {
    describe(locale, () => {
      for (const filePath of markdownFilesIn(locale)) {
        const relativePath = relative(join(CONTENT_ROOT, locale), filePath)
        const schema = schemaFor(relativePath)
        it(`${filePath} conforms to its schema`, () => {
          const result = schema.safeParse(frontmatterOf(filePath))
          expect(result.success, result.error?.message).toBe(true)
        })
      }
    })
  }
})

describe('spettacolo referential integrity', () => {
  for (const locale of activeLocales) {
    describe(locale, () => {
      const operaSlugs = operaSlugsIn(locale)
      const teatroSlugs = teatroSlugsIn(locale)

      for (const filePath of spettacoloFilesIn(locale)) {
        it(`${filePath} references an existing opera and teatro`, () => {
          const data = frontmatterOf(filePath)
          expect(operaSlugs.has(data.opera), `opera "${data.opera}" not found in ${locale}`).toBe(true)
          expect(teatroSlugs.has(data.teatro), `teatro "${data.teatro}" not found in ${locale}`).toBe(true)
        })
      }
    })
  }
})
