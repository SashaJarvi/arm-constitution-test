import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['app/**/*.spec.ts'],
    setupFiles: ['./test/setup.ts'],
    environmentOptions: {
      nuxt: {
        mock: {
          intersectionObserver: true,
          indexedDb: true
        }
      }
    }
  }
})
