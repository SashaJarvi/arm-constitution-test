// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/color-mode'
  ],
  devtools: { enabled: true },

  css: ['@unocss/reset/tailwind.css'],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },
  compatibilityDate: '2025-07-15',

  eslint: {
    config: {
      stylistic: {
        arrowParens: false,
        indent: 2,
        semi: false,
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },

  i18n: {
    defaultLocale: 'ru',
    locales: [
      { code: 'hy', name: 'Հայերեն', file: 'hy.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' }
    ],
    strategy: 'no_prefix'
  }
})
