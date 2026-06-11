/**
 * Todos UI component.
 *
 * Reads the derived visible list and the active filter from the store, and
 * dispatches add/toggle/delete/setFilter actions. Note how the component never
 * filters the list itself — it asks the `selectVisibleTodos` selector for the
 * already-filtered result, keeping derivation logic in one place.
 */
import { useState, type FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  selectVisibleTodos,
  selectFilter,
  type TodoFilter,
} from './todosSlice';

const FILTERS: TodoFilter[] = ['all', 'active', 'completed'];

export function Todos() {
  const visibleTodos = useAppSelector(selectVisibleTodos);
  const activeFilter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  // Transient input text lives in local React state until submitted.
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addTodo(text));
    setText(''); // Clear the input after dispatching.
  };

  return (
    <section className="card">
      <h2>Todos</h2>

      <form onSubmit={handleSubmit} className="row">
        <input
          type="text"
          aria-label="new todo"
          placeholder="What needs doing?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="row" role="group" aria-label="filter">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => dispatch(setFilter(filter))}
            aria-pressed={activeFilter === filter}
            className={activeFilter === filter ? 'active' : ''}
          >
            {filter}
          </button>
        ))}
      </div>

      {visibleTodos.length === 0 ? (
        <p className="empty">Nothing here yet.</p>
      ) : (
        <ul className="todo-list">
          {visibleTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <label className={todo.completed ? 'completed' : ''}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                />
                <span>{todo.text}</span>
              </label>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                aria-label={`delete ${todo.text}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
