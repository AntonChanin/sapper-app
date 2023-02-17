import { useState } from 'react'

import config from './app.config';
import useCanWin from './hooks/useCanWin';
import { Mask, Status } from './types/field';
import { HandleClick, HandleMouseDown } from './types/handlers';
import { Coord } from './types/common';
import './App.css'

const Mine = -1;

const getRandomInRange = (border: number) => Math.floor(Math.random() * border);

const createMines = (field: number[], mineCount: number, size: number) => {
  const incrementBorder = (x: number, y: number) => {
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

const createField = (size: number): number[] => {
  const field: number[] = new Array(size * size).fill(0);
  createMines(field, 10, 10);
  return field;
}

const App = () => {
  const size = 10;
  const dimension = new Array(size).fill(null);
  const [status, setStatus] = useState(Status.NONE);
  const [field, setField] = useState(() => createField(size));
  const [mask, setMask] = useState<Mask[]>(() => new Array(size * size).fill(Mask.FILL));

  useCanWin({ field, target: Mine, mask, callback: () => setStatus(Status.WIN) });

  const handleClick: HandleClick =
    ({ x, y }) => (e) => {
      e.preventDefault();
      if (status !== Status.NONE) return;
      if (mask[y * size + x] === Mask.TRANSPARENT) return;
      const clearing:Coord[] = [];

      const clear = (x: number, y: number) => {
        if (x >=0 && x < size && y >= 0 && y < size) {
          if (mask[y * size + x] === Mask.TRANSPARENT) return;
          clearing.push({ x, y });
        };
      };

      clear(x, y);
      while(clearing.length) {
        const { x, y } = clearing.pop()!!;
        mask[y * size + x] = Mask.TRANSPARENT;

        if (field[y * size + x] !== 0) continue;
        config.clearRule.map(({ x: xConfig, y: yConfig }) => clear(x + xConfig, y + yConfig));
      };
      if (field[y * size + x] === Mine) {
        mask.forEach((_,i) => mask[i] = Mask.TRANSPARENT);
        setStatus(Status.LOSE);
      }
      setMask((prev) => [...prev]);
    };

  const handleMouseDown: HandleMouseDown =
    ({ x, y }) => (e) => {
      e.preventDefault();
      if (e.button === 1) {
        e.stopPropagation();
        if (status !== Status.NONE) return;
        if (mask[y * size + x] === Mask.TRANSPARENT) return;
        if (mask[y * size + x] === Mask.FILL) {
          mask[y * size + x] = Mask.FLAG;
        } else if (mask[y * size + x] === Mask.FLAG) {
          mask[y * size + x] = Mask.QUESTION;
        } else if (mask[y * size + x] === Mask.QUESTION) {
          mask[y * size + x] = Mask.FILL;
        };
      }
      setMask((prev) => [...prev]);
    };

    const fillField = (coord: Coord) => () => {
      const { x, y } = coord;
      return (
        mask[y * size + x] !== Mask.TRANSPARENT
          ? config.view[mask[y * size + x]]
          : field[y * size + x] === Mine
            ? '💣'
            : field[y * size + x]
      );
    };
  
  return (
    <div className="App">
      <div className='max-w-xs m-auto'>
        {dimension.map((_, y) => (
          <div key={y} className="flex">{dimension.map((_, x) => (
            <button
              key={x}
              className={
                `flex justify-center items-center text-white w-8 h-8
                ${(status === Status.LOSE
                  ? 'bg-red-500'
                  : status === Status.WIN
                    ? 'bg-amber-500'
                    : 'bg-green-500'
                ) + ' '}
                p-0 m-0.5`
              }
              onClick={handleClick({ x, y })}
              onMouseDown={handleMouseDown({ x, y })}
            >{fillField({ x, y })()}</button>
          ))}</div>
        ))}
      </div>
      <div>{status}</div>
    </div>
  )
}

export default App
