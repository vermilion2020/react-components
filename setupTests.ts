import { expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node';

expect.extend(matchers);

export const mswServer = setupServer();

beforeAll(() => {
  mswServer.listen();
  vi.mock('next/navigation', () => ({
    useRouter() {
      return {
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: vi.fn(),
        events: {
          on: vi.fn(),
          off: vi.fn(),
        },
        beforePopState: vi.fn(() => null),
        prefetch: vi.fn(() => null),
      };
    },
  }));
});

afterEach(() => {
  mswServer.resetHandlers();
});

afterAll(() => mswServer.close());
