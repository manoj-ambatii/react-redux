/**
 * Route configuration.
 *
 * All routes render inside the shared `<Layout>` (which provides the header,
 * back link, and footer). Each feature lives at its own URL so navigation is
 * real — the browser back button works and pages are linkable:
 *   /         -> Home (choose a demo)
 *   /counter  -> Counter feature only
 *   /todos    -> Todos feature only
 *   *         -> redirect unknown paths back home
 */
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Counter } from './features/counter/Counter';
import { Todos } from './features/todos/Todos';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="todos" element={<Todos />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
