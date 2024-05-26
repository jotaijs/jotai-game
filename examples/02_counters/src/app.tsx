import { useAtom } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { useTransientAtom } from 'jotai-game';

const countAtom = atom(0);
const text1Atom = atom('first');
const text2Atom = atom('second');

const Component1 = () => {
  const [getCount, setCount] = useTransientAtom(countAtom);
  const [text, setText] = useAtom(text1Atom);
  return (
    <div>
      <div>
        <span>Count: {getCount()}</span>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          +1
        </button>
        <button type="button" onClick={() => setCount((c) => c - 1)}>
          -1
        </button>
      </div>
      <input value={text} onChange={(event) => setText(event.target.value)} />
    </div>
  );
};

const Component2 = () => {
  const [getCount, setCount] = useTransientAtom(countAtom);
  const [text, setText] = useAtom(text2Atom);
  return (
    <div>
      <div>
        <span>Count: {getCount()}</span>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          +1
        </button>
        <button type="button" onClick={() => setCount((c) => c - 1)}>
          -1
        </button>
      </div>
      <input value={text} onChange={(event) => setText(event.target.value)} />
    </div>
  );
};

const App = () => (
  <div>
    <Component1 />
    <Component2 />
  </div>
);

export default App;
