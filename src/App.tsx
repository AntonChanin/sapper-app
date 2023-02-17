import { MouseEventHandler, ReactNode, useMemo, useState } from 'react'

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
  clearRule: [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
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
    };
  };
  
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
  const [lose, setLose] = useState(false);
  const [field, setField] = useState(() => createField(size));
  const [mask, setMask] = useState<Mask[]>(() => new Array(size * size).fill(Mask.Fill));
  const win = useMemo(() =>
    !field.some(
      (f, i) => f === Mine
        && mask[i] !== Mask.Flag
        || mask[i] !== Mask.Transparent
    ), [field, mask]);

  const handleClick: (coord: { x: number, y: number }) => MouseEventHandler<HTMLButtonElement> =
    ({ x, y }) => (e) => {
      e.preventDefault();
      if (win || lose) return;
      if (mask[y * size + x] === Mask.Transparent) return;
      const clearing: [number, number][] = [];
      function clear(x: number, y: number) {
        if (x >=0 && x < size && y >= 0 && y < size) {
          if (mask[y * size + x] === Mask.Transparent) return;
          clearing.push([x, y]);
        };
      };

      clear(x, y);
      while(clearing.length) {
        const [x, y] = clearing.pop()!!;
        mask[y * size + x] = Mask.Transparent;

        if (field[y * size + x] !== 0) continue;
        config.clearRule.map(({ x: xConfig, y: yConfig }) => clear(x + xConfig, y + yConfig));
      };
      if (field[y * size + x] === Mine) {
        mask.forEach((_,i) => mask[i] = Mask.Transparent);
        setLose(true);
      }
      setMask((prev) => [...prev]);
    }

  const handleMouseDown: (coord: { x: number, y: number }) => MouseEventHandler<HTMLButtonElement> =
    ({ x, y }) => (e) => {
      e.preventDefault();
      if (e.button === 1) {
        e.stopPropagation();
        if (win || lose) return;
        if (mask[y * size + x] === Mask.Transparent) return;
        if (mask[y * size + x] === Mask.Fill) {
          mask[y * size + x] = Mask.Flag;
        } else if (mask[y * size + x] === Mask.Flag) {
          mask[y * size + x] = Mask.Question;
        } else if (mask[y * size + x] === Mask.Question) {
          mask[y * size + x] = Mask.Fill;
        };
      }
      setMask((prev) => [...prev]);
    }
  
  return (
    <div className="App">
      <div className='max-w-xs m-auto'>
        {dimension.map((_, y) => (
          <div key={y} className="flex" >{dimension.map((_, x) => (
            <button
              key={x}
              className={
                `flex justify-center items-center text-white w-8 h-8
                ${(lose ? 'bg-red-500' : win ? 'bg-amber-500' : 'bg-green-500') + ' '}
                p-0 m-0.5`
              }
              onClick={handleClick({ x, y })}
              onMouseDown={handleMouseDown({ x, y })}
            >{mask[y * size + x] !== Mask.Transparent
              ? viewOfMask[mask[y * size + x]]
              : field[y * size + x] === Mine
                ? '💣'
                : field[y * size + x]
            }</button>
          ))}</div>
        ))}
      </div>
    </div>
  )
}

export default App
