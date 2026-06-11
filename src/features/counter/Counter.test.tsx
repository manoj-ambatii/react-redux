/**
 * Integration test for the Counter component.
 *
 * Unlike the reducer tests (which test logic in isolation), this renders the
 * real component against a real store and drives it through the UI — clicking
 * buttons and asserting on what the user sees. This proves the whole loop works:
 * click -> dispatch -> reducer -> store update -> re-render.
 */
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import { Counter } from './Counter';

describe('<Counter />', () => {
  it('renders the initial value from the store', () => {
    renderWithProviders(<Counter />, { preloadedState: { counter: { value: 7 } } });
    expect(screen.getByLabelText('counter value')).toHaveTextContent('7');
  });

  it('increments and decrements when the buttons are clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Counter />);

    const value = screen.getByLabelText('counter value');
    expect(value).toHaveTextContent('0');

    await user.click(screen.getByLabelText('increment'));
    await user.click(screen.getByLabelText('increment'));
    expect(value).toHaveTextContent('2');

    await user.click(screen.getByLabelText('decrement'));
    expect(value).toHaveTextContent('1');
  });

  it('adds a custom amount and resets', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Counter />);

    const amountInput = screen.getByLabelText('amount');
    await user.clear(amountInput);
    await user.type(amountInput, '5');
    await user.click(screen.getByText('Add amount'));
    expect(store.getState().counter.value).toBe(5);

    await user.click(screen.getByLabelText('reset'));
    expect(store.getState().counter.value).toBe(0);
  });
});
