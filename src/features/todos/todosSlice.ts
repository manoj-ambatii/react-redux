/**
 * Todos feature slice.
 *
 * Demonstrates a few patterns beyond the counter:
 *   - managing an array of entities plus a UI `filter`,
 *   - a `prepare` callback to pre-process an action's payload (generate an id
 *     and trim the text) before it reaches the reducer,
 *   - a memoized selector (`createSelector`) that derives the visible list.
 */
import { createSlice, createSelector, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

/** A single todo item. */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

/** The three filter modes the UI can be in. */
export type TodoFilter = 'all' | 'active' | 'completed';

/** Shape of this slice's state. */
export interface TodosState {
  items: Todo[];
  filter: TodoFilter;
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /**
     * `addTodo` uses the reducer + `prepare` form. The `prepare` callback runs
     * first to build the action payload — here it trims the text and generates
     * a unique id with RTK's `nanoid`. Keeping id generation in `prepare` (not
     * the reducer) keeps the reducer a pure function of its inputs.
     */
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        // Guard against blank entries reaching state.
        if (action.payload.text.length === 0) return;
        state.items.push(action.payload);
      },
      prepare: (text: string) => ({
        payload: { id: nanoid(), text: text.trim(), completed: false } satisfies Todo,
      }),
    },

    /** Flip the completed flag of the todo whose id matches the payload. */
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },

    /** Remove the todo whose id matches the payload. */
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    /** Change which todos are shown. */
    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todosSlice.actions;

/* ------------------------------------------------------------------ *
 * Selectors — functions that read (and derive) data from the store.
 * Co-locating them with the slice means components depend on the
 * selector's contract, not on the exact shape of the state.
 * ------------------------------------------------------------------ */

/** Raw selectors for the two pieces of todos state. */
export const selectTodoItems = (state: RootState) => state.todos.items;
export const selectFilter = (state: RootState) => state.todos.filter;

/**
 * `selectVisibleTodos` derives the list to render from the items + filter.
 * `createSelector` memoizes the result, so the filtered array is only
 * recomputed when `items` or `filter` actually change — avoiding needless
 * work and re-renders.
 */
export const selectVisibleTodos = createSelector(
  [selectTodoItems, selectFilter],
  (items, filter) => {
    switch (filter) {
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      case 'all':
      default:
        return items;
    }
  },
);

export default todosSlice.reducer;
