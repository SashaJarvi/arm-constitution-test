import { questions } from '../data/questions'

export default defineEventHandler(() => {
  return {
    success: true,
    data: questions,
    count: questions.length,
  }
})
