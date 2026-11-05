import { defineContentConfig, defineCollection } from '@nuxt/content'
import { activeLocales, operaSchema, teatroSchema } from './content.schema'

export default defineContentConfig({
  collections: Object.fromEntries([
    ...activeLocales.map((locale) => [
      locale,
      defineCollection({
        type: 'page',
        source: { include: `${locale}/**/*.md`, exclude: [`${locale}/teatri/**`] },
        schema: operaSchema,
      }),
    ]),
    ...activeLocales.map((locale) => [
      `teatri_${locale}`,
      defineCollection({ type: 'page', source: `${locale}/teatri/**/*.md`, schema: teatroSchema }),
    ]),
  ]),
})
