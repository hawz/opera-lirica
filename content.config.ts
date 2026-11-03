import { defineContentConfig, defineCollection } from '@nuxt/content'
import { activeLocales, operaSchema } from './content.schema'

export default defineContentConfig({
  collections: Object.fromEntries(
    activeLocales.map((locale) => [
      locale,
      defineCollection({ type: 'page', source: `${locale}/**/*.md`, schema: operaSchema }),
    ]),
  ),
})
