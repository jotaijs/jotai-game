/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import type { Mesh } from 'three';
import { useAtom, useSetAtom } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { useTransientAtom } from 'jotai-game';

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

type Box = {
  id: number;
  position: [number, number];
};

const mainBoxes: Box[] = Array.from(Array(1800).keys()).map((i) => ({
  id: i,
  position: [8 * Math.random() - 4, 8 * Math.random() - 4],
}));

const offsetAtom = atom<readonly [number, number]>([0, 0]);

const NormalBox = ({ box }: { box: Box }) => {
  const { position } = box;
  const [offset] = useAtom(offsetAtom);
  const mesh = useRef<Mesh>(null!);
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh
      position={[position[0] + offset[0], position[1] + offset[1], 0]}
      ref={mesh}
    >
      <boxGeometry attach="geometry" args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial attach="material" color="darkblue" />
    </mesh>
  );
};

const TransientBox = ({ box }: { box: Box }) => {
  const { position } = box;
  const [getOffset] = useTransientAtom(offsetAtom);
  const mesh = useRef<Mesh>(null!);
  useFrame(() => {
    const offset = getOffset();
    mesh.current.position.x = position[0] + offset[0];
    mesh.current.position.y = position[1] + offset[1];
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh position={[position[0], position[1], 0]} ref={mesh}>
      <boxGeometry attach="geometry" args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial attach="material" color="darkblue" />
    </mesh>
  );
};

const Main = ({
  mode,
  boxes,
}: {
  mode: 'normal' | 'transient';
  boxes: Box[];
}) => {
  const setOffset = useSetAtom(offsetAtom);
  useFrame(({ mouse }) => {
    setOffset([mouse.x * 6, mouse.y * 2]);
  });
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[100, 100, 100]} intensity={0.7} />
      {boxes.map((box) =>
        mode === 'normal' ? (
          <NormalBox key={box.id} box={box} />
        ) : (
          <TransientBox key={box.id} box={box} />
        ),
      )}
    </>
  );
};

const App = () => {
  const [mode, setMode] = useState<'normal' | 'transient'>('normal');
  return (
    <div>
      <div style={{ marginLeft: 90 }}>
        <label htmlFor="radio-normal">
          <input
            id="radio-normal"
            type="radio"
            value="normal"
            checked={mode === 'normal'}
            onChange={() => setMode('normal')}
          />
          Normal Mode
        </label>
        <label htmlFor="radio-transient">
          <input
            id="radio-transient"
            type="radio"
            value="transient"
            checked={mode === 'transient'}
            onChange={() => setMode('transient')}
          />
          Transient Mode
        </label>
      </div>
      <Canvas>
        <Main mode={mode} boxes={mainBoxes} />
      </Canvas>
    </div>
  );
};

export default App;
