import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@stylistic/semi': ['warn', 'never'],
    '@stylistic/quotes': ['warn', 'single'],
    '@stylistic/comma-dangle': ['warn', 'never'],
    '@stylistic/arrow-parens': ['warn', 'as-needed'],
    '@stylistic/indent': ['warn', 2],
    '@stylistic/max-len': ['warn', { code: 140 }],
    '@stylistic/eol-last': ['warn', 'always'],
    '@stylistic/linebreak-style': ['warn', 'unix'],
    'vue/comma-dangle': ['warn', 'never']
  }
})
