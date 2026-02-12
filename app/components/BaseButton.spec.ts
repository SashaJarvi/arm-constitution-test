import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import BaseButton from './BaseButton.vue'

describe('BaseButton', () => {
  it('renders with default props', async () => {
    const wrapper = await mountSuspended(BaseButton, {
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.find('button').classes()).toContain('btn-primary')
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  it.each([
    { variant: 'primary', expectedClass: 'btn-primary' },
    { variant: 'secondary', expectedClass: 'btn-secondary' }
  ] as const)('renders with variant="$variant" and applies $expectedClass class', async ({ variant, expectedClass }) => {
    const wrapper = await mountSuspended(BaseButton, {
      props: { variant }
    })

    expect(wrapper.find('button').classes()).toContain(expectedClass)
  })

  it.each([
    { disabled: true, expectedAttribute: '' },
    { disabled: false, expectedAttribute: undefined }
  ])('renders with disabled=$disabled', async ({ disabled, expectedAttribute }) => {
    const wrapper = await mountSuspended(BaseButton, {
      props: { disabled }
    })

    const disabledAttr = wrapper.find('button').attributes('disabled')
    expect(disabledAttr).toBe(expectedAttribute)
  })

  it('emits click event when clicked', async () => {
    const wrapper = await mountSuspended(BaseButton)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = await mountSuspended(BaseButton, {
      props: { disabled: true }
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('renders slot content correctly', async () => {
    const wrapper = await mountSuspended(BaseButton, {
      slots: {
        default: '<span class="icon">🚀</span> Launch'
      }
    })

    expect(wrapper.html()).toContain('<span class="icon">🚀</span> Launch')
  })
})
