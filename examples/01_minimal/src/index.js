import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(<App />, document.getElementById('app'));
