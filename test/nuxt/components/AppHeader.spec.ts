import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppHeader from '~/components/AppHeader.vue'

describe('AppHeader', () => {
  const mountOptions = {
    global: {
      stubs: {
        ThemeSwitcher: true,
        LanguageSwitcher: true
      }
    }
  }

  it('renders the header with correct structure', async () => {
    const wrapper = await mountSuspended(AppHeader, mountOptions)

    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('displays page title from i18n', async () => {
    const wrapper = await mountSuspended(AppHeader, mountOptions)

    const title = wrapper.find('h1')
    expect(title.text().length).toBeGreaterThan(0)
    // Mock i18n returns the translation key
    expect(['landing.title', 'results.title'].some(key =>
      title.text().includes(key)
    )).toBe(true)
  })

  it('applies sticky header positioning', async () => {
    const wrapper = await mountSuspended(AppHeader, mountOptions)

    const header = wrapper.find('header')
    expect(header.classes()).toContain('sticky')
    expect(header.classes()).toContain('top-0')
    expect(header.classes()).toContain('z-50')
  })

  it('has responsive layout classes', async () => {
    const wrapper = await mountSuspended(AppHeader, mountOptions)

    const flexContainer = wrapper.find('.flex.flex-col')
    expect(flexContainer.exists()).toBe(true)
    expect(flexContainer.classes()).toContain('md:flex-row')
    expect(flexContainer.classes()).toContain('md:justify-between')
  })

  it('has controls area in layout', async () => {
    const wrapper = await mountSuspended(AppHeader, mountOptions)

    // Should have the controls container div
    const controlsArea = wrapper.find('.flex.items-center.gap-3')
    expect(controlsArea.exists()).toBe(true)
  })

  it('applies dark mode classes', async () => {
    const wrapper = await mountSuspended(AppHeader, mountOptions)

    const header = wrapper.find('header')
    const classString = header.classes().join(' ')
    // Should have dark mode transition classes
    expect(classString.includes('dark') || header.attributes('class')?.includes('dark:')).toBe(true)
  })
})
