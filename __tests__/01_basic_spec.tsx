/* eslint quotes: off */

import { fireEvent, render } from '@testing-library/react';
import React, { useReducer } from 'react';
import { atom } from 'jotai';
import { useTransientAtom } from '../src/index';

describe('useTransientAtom spec', () => {
  it('default value', async () => {
    const countAtom = atom(1);
    const Counter = () => {
      const [getCount] = useTransientAtom(countAtom);
      return <div>count: {getCount()}</div>;
    };

    const { findByText } = render(
      <div>
        <Counter />
      </div>,
    );

    await findByText('count: 1');
  });

  it('increment count', async () => {
    const countAtom = atom(1);
    const Counter = () => {
      const [getCount, setCount] = useTransientAtom(countAtom);
      return (
        <div>
          count: {getCount()}
          <button type="button" onClick={() => setCount((c) => c + 1)}>
            increment
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
            update
          </button>
        </div>
      );
    };

    const { getByText, findByText } = render(
      <div>
        <App />
      </div>,
    );

    await findByText('count: 1');

    fireEvent.click(getByText('increment'));
    await new Promise((r) => {
      setTimeout(r, 100);
    });
    await findByText('count: 1');

    fireEvent.click(getByText('update'));
    await findByText('count: 2');
  });
});
