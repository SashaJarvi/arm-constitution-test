import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],

  theme: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        500: '#22c55e',
        700: '#15803d',
        900: '#14532d',
      },
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#ef4444',
        700: '#b91c1c',
        900: '#7f1d1d',
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        500: '#f59e0b',
        700: '#b45309',
        900: '#78350f',
      },
    },
  },

  shortcuts: {
    'btn': 'px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    'btn-primary': 'btn bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    'btn-secondary': 'btn bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
    'card': 'bg-white rounded-lg shadow-md p-6',
    'input-radio': 'w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-2',
  },
})
