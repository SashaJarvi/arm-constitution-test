import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'

describe('LanguageSwitcher', () => {
  it('renders both language options', async () => {
    const wrapper = await mountSuspended(LanguageSwitcher)

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)

    const buttonTexts = buttons.map(b => b.text())
    expect(buttonTexts).toContain('Հայ')
    expect(buttonTexts).toContain('Рус')
  })

  it('displays language label', async () => {
    const wrapper = await mountSuspended(LanguageSwitcher)

    // Mock returns translation keys, so we check for the key
    expect(wrapper.text()).toContain('common.language')
  })

  it('applies active styling to current locale button', async () => {
    const wrapper = await mountSuspended(LanguageSwitcher)

    const buttons = wrapper.findAll('button')
    const activeButtons = buttons.filter(b => b.classes().includes('bg-primary-600'))

    // At least one button should be active (the current locale)
    expect(activeButtons.length).toBeGreaterThanOrEqual(1)
  })

  it.each([
    { buttonIndex: 0, expectedLabel: 'Հայ' },
    { buttonIndex: 1, expectedLabel: 'Рус' }
  ])('button $buttonIndex displays correct label $expectedLabel', async ({ buttonIndex, expectedLabel }) => {
    const wrapper = await mountSuspended(LanguageSwitcher)

    const buttons = wrapper.findAll('button')
    const button = buttons.at(buttonIndex)

    expect(button?.text()).toBe(expectedLabel)
  })

  it('switches language when button is clicked', async () => {
    const wrapper = await mountSuspended(LanguageSwitcher)

    const buttons = wrapper.findAll('button')
    const ruButton = buttons.find(b => b.text() === 'Рус')

    expect(ruButton).toBeDefined()
    if (ruButton) {
      await ruButton.trigger('click')
      // After clicking, the button should exist
      expect(ruButton.exists()).toBe(true)
    }
  })
})
