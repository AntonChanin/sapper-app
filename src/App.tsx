import { ReactNode, useState } from 'react'

import reactLogo from './assets/react.svg'
import './App.css'

const config = {
  incrementRule: [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
  ],
}

const Mine = -1;

function getRandomInRange(border: number) {
  return Math.floor(Math.random() * border)
}

function createMines(field: number[], mineCount: number, size: number) {
  function incrementBorder(x: number, y: number) {
    if (x >=0 && x < size && y >= 0 && y < size) {
      if (field[y * size + x] === Mine) return;
      field[y * size  + x] += 1;
    }
  }
  

  for (let i = 0; i < mineCount;) {
    const x = getRandomInRange(size);
    const y = getRandomInRange(size);

    if (field[y * size + x] === Mine) continue;
    field[y * size + x] = Mine;
    i += 1;
    config.incrementRule
      .forEach(
        ({x: xConfig, y: yConfig }) => incrementBorder(x + xConfig, y + yConfig)
      );
  }
}

function createField(size: number): number[] {
  const field: number[] = new Array(size * size).fill(0);
  createMines(field, 10, 10);
  return field;
}

enum Mask {
  Transparent,
  Fill,
  Flag,
  Question,
};

const viewOfMask: Record<Mask, ReactNode> = {
  [Mask.Transparent]: null,
  [Mask.Fill]: '🌿',
  [Mask.Flag]: '🚩',
  [Mask.Question]: '❓',
};

function App() {
  const size = 10;
  const dimension = new Array(size).fill(null);
  const [field, setField] = useState(() => createField(size));
  const [mask, setMask] = useState<Mask[]>(() => new Array(size * size).fill(Mask.Fill));

  return (
    <div className="App">
      <div>
        {dimension.map((_, y) => (
          <div key={y} style={{ display: 'flex' }}>{dimension.map((_, x) => (
            <div
              key={x}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 24,
                height: 24,
                backgroundColor: '#beb'
              }}
            >{mask[y * size + x] !== Mask.Transparent
              ? viewOfMask[mask[y * size + x]]
              : field[y * size + x] === Mine
                ? '💣'
                : field[y * size + x]
            }</div>
          ))}</div>
        ))}
      </div>
    </div>
  )
}

export default App
