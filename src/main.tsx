/**
 * Application entry point.
 *
 * The crucial Redux wiring happens here: wrapping the app in react-redux's
 * `<Provider store={store}>` makes the single store available to every
 * component via the `useAppSelector` / `useAppDispatch` hooks. Without this
 * Provider, those hooks would throw.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    {/* Provider exposes the Redux store; BrowserRouter enables URL-based routing. */}
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
