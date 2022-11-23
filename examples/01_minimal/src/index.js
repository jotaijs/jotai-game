import React, { useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import { atom } from 'jotai';
import { useTransientAtom } from 'jotai-game';

const countAtom = atom(0);

const Counter = () => {
  const [getCount, setCount] = useTransientAtom(countAtom);
  return (
    <div>
      <span>Count: {getCount()}</span>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
};

const App = () => {
  const [, forceUpdate] = useReducer((c) => c + 1, 0);
  return (
    <div>
      <Counter />
      <button type="button" onClick={forceUpdate}>
        re-render
      </button>
    </div>
  );
};

createRoot(document.getElementById('app')).render(<App />);
