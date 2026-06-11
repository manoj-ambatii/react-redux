/**
 * Root application component.
 *
 * It simply composes the two feature components. Each feature is fully
 * self-contained — it talks to the store through hooks, so `App` doesn't need
 * to pass any props down or know anything about Redux.
 */
import { Counter } from './features/counter/Counter';
import { Todos } from './features/todos/Todos';
import './App.css';

export default function App() {
  return (
    <main className="app">
      <header>
        <h1>React + Redux Toolkit</h1>
        <p className="subtitle">A small learning project: a counter and a todo list.</p>
      </header>

      <div className="features">
        <Counter />
        <Todos />
      </div>
    </main>
  );
}
