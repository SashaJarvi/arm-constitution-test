export default {
  '*.{js,jsx,ts,tsx,vue}': [
    () => 'pnpm run typecheck',
    'pnpm run lint:fix'
  ]
}
