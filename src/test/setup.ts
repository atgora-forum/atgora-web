import { expect, afterAll, afterEach, beforeAll } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import * as axeMatchers from 'vitest-axe/matchers'
import { server } from '@/mocks/server'

expect.extend(matchers)
expect.extend(axeMatchers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
