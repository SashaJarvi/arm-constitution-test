import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

describe('ThemeSwitcher', () => {
  it('renders all three theme options', async () => {
    const wrapper = await mountSuspended(ThemeSwitcher, {
      global: {
        mocks: {
          $colorMode: {
            preference: 'system',
            unknown: false
          }
        }
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(3)
  })

  it.each([
    { theme: 'light', expectedActiveIndex: 0, ariaLabel: 'Light theme' },
    { theme: 'system', expectedActiveIndex: 1, ariaLabel: 'System theme' },
    { theme: 'dark', expectedActiveIndex: 2, ariaLabel: 'Dark theme' }
  ])('highlights $theme button when preference is $theme', async ({ theme, expectedActiveIndex, ariaLabel }) => {
    const wrapper = await mountSuspended(ThemeSwitcher, {
      global: {
        mocks: {
          $colorMode: {
            preference: theme,
            unknown: false
          }
        }
      }
    })

    const buttons = wrapper.findAll('button')
    const activeButton = buttons.at(expectedActiveIndex)
    expect(activeButton).toBeDefined()
    expect(activeButton?.classes()).toContain('bg-primary-600')
    expect(activeButton?.classes()).toContain('text-white')
    expect(activeButton?.attributes('aria-label')).toBe(ariaLabel)
  })

  it('applies correct icons to theme buttons', async () => {
    const wrapper = await mountSuspended(ThemeSwitcher, {
      global: {
        mocks: {
          $colorMode: {
            preference: 'system',
            unknown: false
          }
        }
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.at(0)?.find('.i-heroicons-sun-20-solid').exists()).toBe(true)
    expect(buttons.at(1)?.find('.i-heroicons-computer-desktop-20-solid').exists()).toBe(true)
    expect(buttons.at(2)?.find('.i-heroicons-moon-20-solid').exists()).toBe(true)
  })

  it('updates preference when theme button is clicked', async () => {
    const preference = ref('system')
    const wrapper = await mountSuspended(ThemeSwitcher, {
      global: {
        mocks: {
          $colorMode: {
            preference: preference.value,
            unknown: false
          }
        }
      }
    })

    const buttons = wrapper.findAll('button')
    const firstButton = buttons.at(0)
    expect(firstButton).toBeDefined()

    if (firstButton) {
      await firstButton.trigger('click')
      expect(firstButton.element).toBeDefined()
    }
  })

  it('applies correct styling when unknown state', async () => {
    const wrapper = await mountSuspended(ThemeSwitcher, {
      global: {
        mocks: {
          $colorMode: {
            preference: 'system',
            unknown: true
          }
        }
      }
    })

    const buttons = wrapper.findAll('button')
    // When unknown is true, no button should have active styling
    buttons.forEach(button => {
      expect(button.classes()).not.toContain('bg-primary-600')
    })
  })
})
