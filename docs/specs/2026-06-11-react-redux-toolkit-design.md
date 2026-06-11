# Design: React Redux Toolkit Learning Project

**Date:** 2026-06-11
**Status:** Implemented

## Purpose

A small, production-grade learning project that demonstrates a correct Redux
Toolkit setup with React + TypeScript. It exists to be read and run — every file
is commented to explain the reasoning behind the patterns.

## Scope

Two features, both with in-memory state (no API, no persistence) to keep the
focus on Redux mechanics:

1. **Counter** — the minimal slice.
2. **Todo list** — a richer slice with list management, a filter, and a derived
   selector.

Explicitly out of scope (YAGNI): routing, persistence, RTK Query / async
thunks, authentication, a backend.

## Stack

- **Vite 5** — build tool / dev server.
- **React 18 + TypeScript** — UI, strict mode on.
- **Redux Toolkit + React-Redux** — state management.
- **Vitest + React Testing Library + jsdom** — testing.

## Architecture

Feature-folder structure (the Redux team's recommendation): each feature owns
its slice, component, and tests.

```
src/
  app/        store.ts (configureStore + rootReducer + types), hooks.ts (typed hooks)
  features/
    counter/  counterSlice.ts, counterSlice.test.ts, Counter.tsx, Counter.test.tsx
    todos/    todosSlice.ts, todosSlice.test.ts, Todos.tsx
  test/       setup.ts, test-utils.tsx
  App.tsx, main.tsx
```

### State shape

```ts
RootState = {
  counter: { value: number }
  todos:   { items: { id: string; text: string; completed: boolean }[]
             filter: 'all' | 'active' | 'completed' }
}
```

### Counter slice

- Actions: `increment`, `decrement`, `incrementByAmount(n)`, `reset`.

### Todos slice

- Actions: `addTodo(text)` (uses a `prepare` callback to trim text and generate
  an id via `nanoid`; blank text is ignored), `toggleTodo(id)`, `deleteTodo(id)`,
  `setFilter(filter)`.
- Selectors: `selectTodoItems`, `selectFilter`, and `selectVisibleTodos` — a
  memoized `createSelector` that derives the filtered list.

## Data flow

`main.tsx` wraps `<App>` in `<Provider store={store}>`. Components read state via
`useAppSelector` and dispatch via `useAppDispatch`. Components never derive the
filtered list themselves — they ask `selectVisibleTodos`, keeping derivation in
one place.

## Testing strategy

1. **Reducer unit tests** — dispatch actions against a known state and assert the
   result. Pure, fast, no DOM. Covers both slices and the selector.
2. **Component integration test** — render against a real store using a
   `renderWithProviders` helper and drive the UI with `userEvent`, proving the
   full click → dispatch → reducer → re-render loop. Demonstrated on `Counter`.

TDD flow: each slice's test was written before its implementation.

## Verification

- `npm test` → 18 tests passing across 3 files.
- `npm run build` → type-check (`tsc -b`) + Vite production build succeed.
