/**
 * Unit tests for the todos reducer and its selectors.
 *
 * The todos slice is richer than the counter: it manages a list plus a filter,
 * and exposes a memoized selector that derives the visible list. We test the
 * reducer transitions and the selector logic independently.
 */
import { describe, it, expect } from 'vitest';
import todosReducer, {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  selectVisibleTodos,
  type TodosState,
} from './todosSlice';
import type { RootState } from '../../app/store';

describe('todosSlice', () => {
  const empty: TodosState = { items: [], filter: 'all' };

  it('returns the initial state', () => {
    expect(todosReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      filter: 'all',
    });
  });

  it('adds a todo with trimmed text, an id, and completed=false', () => {
    const next = todosReducer(empty, addTodo('  Buy milk  '));
    expect(next.items).toHaveLength(1);
    expect(next.items[0]).toMatchObject({ text: 'Buy milk', completed: false });
    expect(typeof next.items[0].id).toBe('string');
    expect(next.items[0].id).not.toBe('');
  });

  it('ignores blank todo text', () => {
    const next = todosReducer(empty, addTodo('    '));
    expect(next.items).toHaveLength(0);
  });

  it('toggles a todo by id', () => {
    const added = todosReducer(empty, addTodo('Task'));
    const id = added.items[0].id;
    const toggled = todosReducer(added, toggleTodo(id));
    expect(toggled.items[0].completed).toBe(true);
    // Toggling again flips it back.
    expect(todosReducer(toggled, toggleTodo(id)).items[0].completed).toBe(false);
  });

  it('deletes a todo by id', () => {
    const added = todosReducer(empty, addTodo('Task'));
    const id = added.items[0].id;
    const deleted = todosReducer(added, deleteTodo(id));
    expect(deleted.items).toHaveLength(0);
  });

  it('sets the active filter', () => {
    expect(todosReducer(empty, setFilter('completed')).filter).toBe('completed');
  });

  describe('selectVisibleTodos', () => {
    // Build a minimal RootState containing only the todos slice for selector tests.
    const stateWith = (items: TodosState['items'], filter: TodosState['filter']): RootState =>
      ({ todos: { items, filter } } as RootState);

    const items = [
      { id: '1', text: 'Active task', completed: false },
      { id: '2', text: 'Done task', completed: true },
    ];

    it('returns all todos when filter is "all"', () => {
      expect(selectVisibleTodos(stateWith(items, 'all'))).toHaveLength(2);
    });

    it('returns only incomplete todos when filter is "active"', () => {
      const visible = selectVisibleTodos(stateWith(items, 'active'));
      expect(visible).toEqual([items[0]]);
    });

    it('returns only completed todos when filter is "completed"', () => {
      const visible = selectVisibleTodos(stateWith(items, 'completed'));
      expect(visible).toEqual([items[1]]);
    });
  });
});
