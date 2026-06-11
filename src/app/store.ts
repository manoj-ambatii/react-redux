/**
 * The Redux store — the single source of truth for application state.
 *
 * `configureStore` (from Redux Toolkit) is the modern replacement for the
 * legacy `createStore`. Out of the box it:
 *   - combines our slice reducers into one root reducer,
 *   - wires up the Redux DevTools browser extension,
 *   - adds useful default middleware (e.g. a serializability check that warns
 *     if non-serializable values leak into state).
 */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice';

/**
 * The root reducer, combined from each feature's slice reducer. The keys here
 * ("counter", "todos") define the shape of the root state: state.counter is
 * owned by counterReducer, state.todos by todosReducer.
 *
 * We export it separately (rather than inlining it in `configureStore`) so that
 * tests can build an isolated store with the exact same reducer — see
 * `src/test/test-utils.tsx`.
 */
export const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

/**
 * `RootState` is the type of the entire store state, inferred from the root
 * reducer. Inferring (rather than hand-writing) means the type always stays in
 * sync as slices are added or changed. Selectors use this type.
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * `AppDispatch` is the type of the store's `dispatch` function. It knows about
 * any middleware-enhanced dispatch (e.g. thunks), so typed dispatch calls are
 * fully checked.
 */
export type AppDispatch = typeof store.dispatch;
