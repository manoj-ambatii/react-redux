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
import { store } from './app/store';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
