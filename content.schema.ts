import { z } from '@nuxt/content'

export const activeLocales = ['en', 'it', 'fr']

export const operaSchema = z.object({
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

export const teatroSchema = z.object({
  nome: z.string(),
  città: z.string(),
  indirizzo: z.string(),
  descrizione: z.string(),
  sito_web: z.string().optional(),
})

export const spettacoloSchema = z.object({
  opera: z.string(),
  teatro: z.string(),
  data: z.string(),
  ora: z.string().optional(),
  link_biglietti: z.string().optional(),
})
