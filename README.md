# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Testing

This project uses [Vitest](https://vitest.dev/) with [@nuxt/test-utils](https://nuxt.com/docs/getting-started/testing) for unit testing.

### Running Tests

```bash
# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### Test Structure

Tests are organized by their runtime requirements and type:

- **`test/nuxt/`** - Tests requiring Nuxt runtime (auto-imports, `~/` aliases, composables)
  - Automatically included in Nuxt app's TypeScript context
  - Organized by type in subdirectories:
    - `components/` - Vue component tests
    - `composables/` - Composable function tests
    - `utils/` - Utility function tests using Nuxt features
- **`test/unit/`** - Pure unit tests running in Node (no Nuxt context needed)
  - Use for testing standalone utilities without Nuxt dependencies
- **`test/e2e/`** - End-to-end tests

All test files follow the naming convention `*.spec.ts` or `*.test.ts`.

### Writing Tests

#### Testing Utility Functions

```typescript
import { describe, it, expect } from 'vitest'
import { yourFunction } from '~/utils/your-file'

describe('your-file', () => {
  it('should do something', () => {
    expect(yourFunction()).toBe(expectedValue)
  })
})
```

#### Testing Components

For components that use Nuxt features, use `mountSuspended` from `@nuxt/test-utils/runtime`:

```typescript
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import YourComponent from '~/components/YourComponent.vue'

describe('YourComponent', () => {
  it('renders correctly', async () => {
    const wrapper = await mountSuspended(YourComponent)
    expect(wrapper.text()).toContain('expected text')
  })
})
```

#### Mocking Nuxt Composables

Use `mockNuxtImport` to mock auto-imported Nuxt composables:

```typescript
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useYourComposable', () => {
  return () => ({
    // your mock implementation
  })
})
```

### Configuration

Tests are configured in `vitest.config.ts` with the Nuxt environment:

```typescript
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        mock: {
          intersectionObserver: true,
          indexedDb: true
        }
      }
    }
  }
})
```

### Resources

- [Nuxt Testing Documentation](https://nuxt.com/docs/getting-started/testing)
- [@nuxt/test-utils Documentation](https://nuxt.com/docs/getting-started/testing#nuxttest-utils)
- [Vitest Documentation](https://vitest.dev/)
- [@vue/test-utils Documentation](https://test-utils.vuejs.org/)
