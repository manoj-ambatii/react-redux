/**
 * Pre-typed versions of the react-redux hooks.
 *
 * Instead of importing the plain `useDispatch` / `useSelector` everywhere (and
 * annotating types by hand each time), the Redux docs recommend creating typed
 * wrappers once and using them throughout the app. This gives you:
 *   - `useAppDispatch()`   -> dispatch that knows about our middleware,
 *   - `useAppSelector(fn)` -> selector where `state` is already `RootState`.
 */
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout the app instead of plain `useDispatch`.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Use throughout the app instead of plain `useSelector`.
export const useAppSelector = useSelector.withTypes<RootState>();
