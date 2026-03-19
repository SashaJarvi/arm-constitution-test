import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import QuizNavigation from './QuizNavigation.vue'

const defaultProps = {
  isFirstQuestion: false,
  isLastQuestion: false,
  isAnswered: false
}

describe('QuizNavigation', () => {
  describe('Previous button', () => {
    it('renders with translated text', async () => {
      const wrapper = await mountSuspended(QuizNavigation, {
        props: defaultProps
      })

      const prevButton = wrapper.findAll('button').at(0)!
      expect(prevButton.text()).toBe('quiz.previous')
    })

    it('is disabled when isFirstQuestion is true', async () => {
      const wrapper = await mountSuspended(QuizNavigation, {
        props: { ...defaultProps, isFirstQuestion: true }
      })

      const prevButton = wrapper.findAll('button').at(0)!
      expect(prevButton.attributes('disabled')).toBe('')
    })

    it('is enabled when isFirstQuestion is false', async () => {
      const wrapper = await mountSuspended(QuizNavigation, {
        props: { ...defaultProps, isFirstQuestion: false }
      })

      const prevButton = wrapper.findAll('button').at(0)!
      expect(prevButton.attributes('disabled')).toBeUndefined()
    })

    it('emits previous event when clicked', async () => {
      const wrapper = await mountSuspended(QuizNavigation, {
        props: defaultProps
      })

      await wrapper.findAll('button').at(0)!.trigger('click')

      expect(wrapper.emitted('previous')).toHaveLength(1)
    })
  })

  describe('Next button', () => {
    it('shows "quiz.next" text when not last question', async () => {
      const wrapper = await mountSuspended(QuizNavigation, {
        props: { ...defaultProps, isLastQuestion: false }
      })

      const nextButton = wrapper.findAll('button').at(1)!
      expect(nextButton.text()).toBe('quiz.next')
    })

    it('shows "quiz.submit" text when last question', async () => {
      const wrapper = await mountSuspended(QuizNavigation, {
        props: { ...defaultProps, isLastQuestion: true }
      })

      const nextButton = wrapper.findAll('button').at(1)!
      expect(nextButton.text()).toBe('quiz.submit')
    })

    it('emits next event when clicked', async () => {
      const wrapper = await mountSuspended(QuizNavigation, {
        props: { ...defaultProps, isAnswered: true }
      })

      await wrapper.findAll('button').at(1)!.trigger('click')

      expect(wrapper.emitted('next')).toHaveLength(1)
    })
  })

  describe('Next button disabled state', () => {
    it('is disabled when not answered, not last question, and not timed out', async () => {
      const wrapper = await mountSuspended(QuizNavigation, {
        props: { isFirstQuestion: false, isLastQuestion: false, isAnswered: false }
      })

      const nextButton = wrapper.findAll('button').at(1)!
      expect(nextButton.attributes('disabled')).toBe('')
    })

    it('is enabled when answered', async () => {
      const wrapper = await mountSuspended(QuizNavigation, {
        props: { ...defaultProps, isAnswered: true }
      })

      const nextButton = wrapper.findAll('button').at(1)!
      expect(nextButton.attributes('disabled')).toBeUndefined()
    })

    it('is enabled when last question (even if not answered)', async () => {
      const wrapper = await mountSuspended(QuizNavigation, {
        props: { ...defaultProps, isLastQuestion: true, isAnswered: false }
      })

      const nextButton = wrapper.findAll('button').at(1)!
      expect(nextButton.attributes('disabled')).toBeUndefined()
    })

    it('is enabled when timed out (even if not answered)', async () => {
      const wrapper = await mountSuspended(QuizNavigation, {
        props: { ...defaultProps, isAnswered: false, isTimedOut: true }
      })

      const nextButton = wrapper.findAll('button').at(1)!
      expect(nextButton.attributes('disabled')).toBeUndefined()
    })

    it('is disabled when isTimedOut is false and not answered', async () => {
      const wrapper = await mountSuspended(QuizNavigation, {
        props: { ...defaultProps, isAnswered: false, isTimedOut: false }
      })

      const nextButton = wrapper.findAll('button').at(1)!
      expect(nextButton.attributes('disabled')).toBe('')
    })
  })
})
