/**
 * Test helper: render a component wrapped in a real Redux `<Provider>`.
 *
 * Testing components against a real (freshly-created) store — rather than
 * mocking the hooks — is the approach the Redux docs recommend. Each call gets
 * its own store so tests stay isolated, and you can optionally seed
 * `preloadedState` to start a test from a specific scenario.
 */
import type { ReactElement, PropsWithChildren } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from '../app/store';
import type { RootState } from '../app/store';

// Build a store identical to the real one, optionally with seeded state.
function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
}

/**
 * Drop-in replacement for RTL's `render` that supplies the Provider. Returns
 * the created `store` alongside the usual render result so tests can assert on
 * final state or dispatch directly.
 */
export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, ...renderOptions }: ExtendedRenderOptions = {},
) {
  const store = makeStore(preloadedState);

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
