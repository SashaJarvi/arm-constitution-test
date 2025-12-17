/**
 * Format time in seconds to MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Calculate percentage with precision
 */
export const calculatePercentage = (
  correct: number,
  total: number,
  decimals = 1
): number => {
  if (total === 0) return 0
  return Number(((correct / total) * 100).toFixed(decimals))
}

/**
 * Get result color based on percentage
 */
export const getResultColor = (percentage: number): string => {
  if (percentage >= 80) return 'success'
  if (percentage >= 60) return 'warning'
  return 'error'
}
