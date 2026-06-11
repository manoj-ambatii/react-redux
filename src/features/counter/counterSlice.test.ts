/**
 * Unit tests for the counter reducer.
 *
 * Reducers are pure functions: given a state and an action, they return the
 * next state. That purity makes them delightful to test — no mocking, no DOM,
 * no store. We import the raw `reducer` plus the generated action creators and
 * assert on the returned state.
 */
import { describe, it, expect } from 'vitest';
import counterReducer, {
  increment,
  decrement,
  incrementByAmount,
  reset,
  type CounterState,
} from './counterSlice';

describe('counterSlice', () => {
  const initialState: CounterState = { value: 0 };

  it('returns the initial state when given an undefined state', () => {
    // Redux calls the reducer with `undefined` on startup to seed initial state.
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({ value: 0 });
  });

  it('increments the value by 1', () => {
    expect(counterReducer(initialState, increment())).toEqual({ value: 1 });
  });

  it('decrements the value by 1', () => {
    expect(counterReducer({ value: 5 }, decrement())).toEqual({ value: 4 });
  });

  it('increments by a specific amount from the action payload', () => {
    expect(counterReducer(initialState, incrementByAmount(10))).toEqual({ value: 10 });
  });

  it('resets the value back to 0', () => {
    expect(counterReducer({ value: 42 }, reset())).toEqual({ value: 0 });
  });

  it('does not mutate the previous state object', () => {
    const previous: CounterState = { value: 1 };
    counterReducer(previous, increment());
    // Immer (inside RTK) produces a new object; the original is untouched.
    expect(previous).toEqual({ value: 1 });
  });
});
