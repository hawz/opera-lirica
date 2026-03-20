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
  aria: z.object({
    nome: z.string().optional(),
    descrizione: z.string().optional(),
  }).optional(),
  personaggi: z.array(z.object({
    nome: z.string().optional(),
    voce: z.string().optional(),
    descrizione: z.string().optional(),
  })).optional(),
  atti: z.array(z.object({
    titolo: z.string().optional(),
    testo: z.string().optional(),
  })).optional(),
  opere: z.array(z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
  })).optional(),
})

export default defineContentConfig({
  collections: {
    en: defineCollection({ type: 'page', source: 'en/**/*.md', schema: operaSchema }),
    it: defineCollection({ type: 'page', source: 'it/**/*.md', schema: operaSchema }),
  },
})
