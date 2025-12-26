import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'

// Mock useI18n to use Nuxt's i18n instance
// This is the proper way to handle @nuxtjs/i18n in tests
// See: https://github.com/nuxt-modules/i18n/issues/3291
mockNuxtImport('useI18n', () => {
  return () => ({
    t: (key: string) => key,
    locale: ref('hy'),
    setLocale: () => {},
    locales: ref([{ code: 'hy' }, { code: 'ru' }])
  })
})
