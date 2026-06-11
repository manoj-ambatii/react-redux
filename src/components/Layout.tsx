/**
 * Shared page layout.
 *
 * Renders the app header and an `<Outlet />` where React Router injects the
 * active route's element. On any page other than the home screen it shows a
 * "Back" link, so navigation feels consistent without each page re-implementing
 * its own header.
 */
import { Link, Outlet, useLocation } from 'react-router-dom';

export function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="app">
      <header className="app-header">
        {/* Back link appears on feature pages; a spacer keeps the title centered. */}
        {isHome ? (
          <span className="header-slot" />
        ) : (
          <Link to="/" className="back-link header-slot">
            <span aria-hidden="true">←</span> Back
          </Link>
        )}

        <Link to="/" className="brand">
          <span className="brand-mark">⚛️</span>
          <span>Redux Toolkit Demo</span>
        </Link>

        <span className="header-slot" />
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        Built with React + Redux Toolkit + TypeScript
      </footer>
    </div>
  );
}
