// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  // css: ['~/assets/css/main.css'],
  content: {
    highlight: false,
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', files: ['en.json'] },
      { code: 'it', language: 'it-IT', name: 'Italiano', files: ['it.json'] },
      // { code: 'fr', language: 'fr-FR', name: 'Français', files: ['fr.json'] },
    ],
    defaultLocale: 'en',  
    strategy: 'prefix',
    langDir: 'locales/',
    lazy: true,
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})