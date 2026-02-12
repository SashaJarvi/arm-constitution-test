import { describe, it, expect } from 'vitest'
import { formatTime, calculatePercentage, getResultColor } from './quiz-helpers'

describe('quiz-helpers', () => {
  describe('formatTime', () => {
    it.each([
      { seconds: 0, expected: '00:00', description: 'zero seconds' },
      { seconds: 30, expected: '00:30', description: '30 seconds' },
      { seconds: 90, expected: '01:30', description: '90 seconds' },
      { seconds: 599, expected: '09:59', description: '599 seconds' },
      { seconds: 5, expected: '00:05', description: '5 seconds with padding' },
      { seconds: 65, expected: '01:05', description: '65 seconds with padding' }
    ])('formats $seconds seconds to $expected ($description)', ({ seconds, expected }) => {
      expect(formatTime(seconds)).toBe(expected)
    })

    it.each([
      { seconds: 3600, expected: '1:00:00', description: 'exactly 1 hour' },
      { seconds: 3661, expected: '1:01:01', description: '1 hour, 1 minute, 1 second' },
      { seconds: 7384, expected: '2:03:04', description: '2 hours, 3 minutes, 4 seconds' },
      { seconds: 3605, expected: '1:00:05', description: '1 hour with padded seconds' }
    ])('formats $seconds seconds to HH:MM:SS as $expected ($description)', ({ seconds, expected }) => {
      expect(formatTime(seconds)).toBe(expected)
    })
  })

  describe('calculatePercentage', () => {
    it.each([
      { correct: 5, total: 10, decimals: undefined, expected: 50.0 },
      { correct: 8, total: 10, decimals: undefined, expected: 80.0 },
      { correct: 3, total: 10, decimals: undefined, expected: 30.0 },
      { correct: 10, total: 10, decimals: undefined, expected: 100.0 },
      { correct: 33, total: 33, decimals: undefined, expected: 100.0 }
    ])('calculates $correct/$total as $expected%', ({ correct, total, decimals, expected }) => {
      expect(calculatePercentage(correct, total, decimals)).toBe(expected)
    })

    it('returns 0 when total is 0', () => {
      expect(calculatePercentage(5, 0)).toBe(0)
    })

    it.each([
      { correct: 1, total: 3, decimals: 1, expected: 33.3 },
      { correct: 1, total: 3, decimals: 2, expected: 33.33 },
      { correct: 2, total: 3, decimals: 0, expected: 67 }
    ])('formats $correct/$total with $decimals decimals as $expected', ({ correct, total, decimals, expected }) => {
      expect(calculatePercentage(correct, total, decimals)).toBe(expected)
    })
  })

  describe('getResultColor', () => {
    it.each([
      { percentage: 80, expected: 'success' },
      { percentage: 90, expected: 'success' },
      { percentage: 100, expected: 'success' },
      { percentage: 80.0, expected: 'success' }
    ])('returns "$expected" for $percentage%', ({ percentage, expected }) => {
      expect(getResultColor(percentage)).toBe(expected)
    })

    it.each([
      { percentage: 60, expected: 'warning' },
      { percentage: 70, expected: 'warning' },
      { percentage: 79, expected: 'warning' },
      { percentage: 79.9, expected: 'warning' },
      { percentage: 60.0, expected: 'warning' }
    ])('returns "$expected" for $percentage%', ({ percentage, expected }) => {
      expect(getResultColor(percentage)).toBe(expected)
    })

    it.each([
      { percentage: 0, expected: 'error' },
      { percentage: 30, expected: 'error' },
      { percentage: 59, expected: 'error' },
      { percentage: 59.9, expected: 'error' }
    ])('returns "$expected" for $percentage%', ({ percentage, expected }) => {
      expect(getResultColor(percentage)).toBe(expected)
    })
  })
})
