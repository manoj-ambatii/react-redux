/**
 * Counter UI component.
 *
 * This is the bridge between React and Redux for the counter feature:
 *   - `useAppSelector` reads the current value from the store and subscribes
 *     the component to changes (it re-renders only when `value` changes).
 *   - `useAppDispatch` gives us the typed `dispatch` to send actions.
 */
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { increment, decrement, incrementByAmount, reset } from './counterSlice';

export function Counter() {
  // Select just the slice of state this component needs.
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  // Local component state for the "increment by amount" input. Not everything
  // belongs in Redux — transient form input stays in local React state.
  const [amount, setAmount] = useState('2');
  const parsedAmount = Number(amount) || 0;

  return (
    <section className="card">
      <h2>Counter</h2>

      <p className="counter-value" aria-label="counter value">
        {value}
      </p>

      <div className="row counter-buttons">
        <button onClick={() => dispatch(decrement())} aria-label="decrement">
          −1
        </button>
        <button onClick={() => dispatch(increment())} aria-label="increment">
          +1
        </button>
        <button onClick={() => dispatch(reset())} aria-label="reset">
          Reset
        </button>
      </div>

      <div className="row">
        <input
          type="number"
          aria-label="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={() => dispatch(incrementByAmount(parsedAmount))}>
          Add amount
        </button>
      </div>
    </section>
  );
}
