/**
 * Routing / navigation tests for the whole app.
 *
 * These prove the UX requested: the home screen offers both demos, clicking one
 * navigates to a page showing ONLY that feature, and "Back" returns home. We
 * render `<App>` inside a `MemoryRouter` (an in-memory history, ideal for tests)
 * and a real Redux `<Provider>`.
 */
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './app/store';
import App from './App';

function renderApp(initialPath = '/') {
  const store = configureStore({ reducer: rootReducer });
  return render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[initialPath]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    </Provider>,
  );
}

describe('App navigation', () => {
  it('shows both demo options on the home screen', () => {
    renderApp('/');
    // Both feature cards are presented as links.
    expect(screen.getByRole('link', { name: /Counter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Todo List/i })).toBeInTheDocument();
  });

  it('navigates to the Counter page and shows only the counter', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('link', { name: /Counter/i }));

    // Counter is now visible...
    expect(screen.getByLabelText('counter value')).toBeInTheDocument();
    // ...and the Todos feature is not on screen.
    expect(screen.queryByLabelText('new todo')).not.toBeInTheDocument();
  });

  it('navigates to the Todos page and shows only the todo list', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('link', { name: /Todo List/i }));

    expect(screen.getByLabelText('new todo')).toBeInTheDocument();
    expect(screen.queryByLabelText('counter value')).not.toBeInTheDocument();
  });

  it('returns home via the Back link', async () => {
    const user = userEvent.setup();
    renderApp('/counter');

    // On a feature page the Back link is shown.
    const back = screen.getByRole('link', { name: /Back/i });
    await user.click(back);

    // Home is shown again with both options.
    expect(screen.getByRole('link', { name: /Counter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Todo List/i })).toBeInTheDocument();
    // Sanity: the home intro heading is present.
    expect(within(screen.getByRole('main')).getByText(/Choose a demo/i)).toBeInTheDocument();
  });
});
