/**
 * Counter feature slice.
 *
 * A "slice" bundles together the reducer logic and actions for a single feature
 * of the app. `createSlice` (the heart of Redux Toolkit) generates the action
 * creators and action types for us from the `reducers` object below, so we
 * never hand-write action constants or switch statements.
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/** Shape of this slice's state. Exported so tests/selectors can reference it. */
export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter', // Used as the prefix for generated action types, e.g. "counter/increment".
  initialState,
  reducers: {
    // NOTE: these reducers appear to "mutate" state, but Redux Toolkit uses
    // Immer under the hood. Immer tracks the mutations and produces a brand-new,
    // immutable state object — so the rules of Redux are still respected.
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // When a reducer needs data, it receives an action with a typed `payload`.
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// `createSlice` auto-generates an action creator for each reducer above.
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// The reducer is the default export — registered under `counter` in the store.
export default counterSlice.reducer;
