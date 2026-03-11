import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const operaSchema = z.object({
  order: z.number().optional(),
  slug: z.string().optional(),
  years: z.string().optional(),
  bio: z.string().optional(),
  compositore: z.string().optional(),
  anno: z.string().optional(),
  tagline: z.string().optional(),
  finale: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    en: defineCollection({ type: 'page', source: 'en/**/*.md', schema: operaSchema }),
    it: defineCollection({ type: 'page', source: 'it/**/*.md', schema: operaSchema }),
    // fr: defineCollection({ type: 'page', source: 'fr/**/*.md', schema: operaSchema }),
  },
})