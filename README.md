# React + Redux Toolkit — Learning Project

A small, production-grade reference project showing how to set up
[Redux Toolkit](https://redux-toolkit.js.org/) with **React 18** and
**TypeScript** (built with **Vite**). It implements two classic examples behind a simple home screen: pick a demo,
and you navigate to a dedicated page showing only that feature (real URLs via
React Router, with a working back button).

- **Counter** — the minimal slice: state, actions, selectors.
- **Todo list** — a richer slice: list management, a `prepare` callback for id
  generation, a UI filter, and a memoized derived selector.

The UI is responsive (mobile-first) and supports light/dark mode. Every file is
heavily commented to explain *why*, not just *what* — it's meant to be read.

## Tech stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Build tool     | Vite 5                                  |
| UI             | React 18 + TypeScript                   |
| State          | Redux Toolkit + React-Redux             |
| Routing        | React Router 6                          |
| Testing        | Vitest + React Testing Library + jsdom  |

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm test         # run the test suite once
npm run test:watch   # run tests in watch mode
npm run build    # type-check + production build
npm run preview  # preview the production build locally
```

## Project structure

```
src/
  app/
    store.ts            # configureStore + rootReducer; RootState & AppDispatch types
    hooks.ts            # typed useAppSelector / useAppDispatch
  components/
    Layout.tsx          # shared header (brand + contextual back link) + <Outlet/>
  pages/
    Home.tsx            # landing screen: cards linking to each demo
  features/
    counter/
      counterSlice.ts        # slice: state + reducers + actions
      counterSlice.test.ts   # reducer unit tests
      Counter.tsx            # UI bound to the store via hooks
      Counter.test.tsx       # component integration test (real store)
    todos/
      todosSlice.ts          # slice + memoized selectors
      todosSlice.test.ts     # reducer + selector unit tests
      Todos.tsx              # UI
  test/
    setup.ts            # Vitest setup (jest-dom matchers, cleanup)
    test-utils.tsx      # renderWithProviders helper (real store in tests)
  App.tsx               # route table (/, /counter, /todos)
  App.test.tsx          # navigation tests (home -> feature -> back)
  main.tsx              # mounts the app inside <Provider> + <BrowserRouter>
```

This is the **feature-folder** structure recommended by the Redux team: each
feature owns its slice, component, and tests together.

## Key Redux Toolkit concepts demonstrated

1. **`configureStore`** — sets up the store with good defaults (DevTools,
   serializability checks, thunk middleware). See [`src/app/store.ts`](src/app/store.ts).
2. **`createSlice`** — generates action creators and types from reducer
   functions; uses Immer so reducers can write "mutating" code safely.
3. **Typed hooks** — `useAppSelector` / `useAppDispatch` give full type-safety
   without repeating type annotations. See [`src/app/hooks.ts`](src/app/hooks.ts).
4. **`prepare` callbacks** — pre-process payloads (trim text, generate ids with
   `nanoid`) while keeping reducers pure. See [`src/features/todos/todosSlice.ts`](src/features/todos/todosSlice.ts).
5. **`createSelector`** — memoized derived state (the filtered todo list).
6. **Testing** — pure reducer tests plus full-loop component tests using a real
   store via `renderWithProviders`.

## Design document

The design/spec for this project lives in
[`docs/specs/2026-06-11-react-redux-toolkit-design.md`](docs/specs/2026-06-11-react-redux-toolkit-design.md).
