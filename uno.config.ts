import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true
    })
  ],

  theme: {
    colors: {
      'primary': {
        50: '#f0f2ff',
        100: '#e0e4ff',
        200: '#c7ceff',
        300: '#a5aeff',
        400: '#7d8bff',
        500: '#5d6fff',
        600: '#4255ff',
        700: '#3644eb',
        800: '#2d38c7',
        900: '#2a32a0'
      },
      'dark': {
        DEFAULT: '#303545',
        50: '#f5f6f7',
        100: '#e9eaed',
        200: '#d3d5db',
        300: '#b0b3bd',
        400: '#868a99',
        500: '#6a6e7e',
        600: '#575a68',
        700: '#484b56',
        800: '#3e4049',
        900: '#303545'
      },
      'success': {
        50: '#f0fdf4',
        100: '#dcfce7',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d'
      },
      'error': {
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c'
      },
      'warning': {
        50: '#fffbeb',
        100: '#fef3c7',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309'
      },
      'gray-light': {
        'DEFAULT': '#f5f7fa',
        'border': '#f0f0f0',
        'border-dark': '#e5e5e5'
      }
    }
  },

  shortcuts: {
    'btn': 'px-6 py-3 rounded-full font-semibold transition-all duration-100 ease-out '
      + 'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-100',
    'btn-primary': 'btn bg-primary-600 text-white hover:bg-primary-700 '
      + 'border border-primary-600 hover:border-primary-700',
    'btn-secondary': 'btn bg-gray-light text-dark-900 hover:bg-gray-200 '
      + 'border border-gray-light-border hover:border-gray-light-border-dark',
    'card': 'bg-white rounded-2xl p-6',
    'input-radio': 'w-5 h-5 text-primary-600 focus:ring-primary-500 focus:ring-2 cursor-pointer'
  }
})
