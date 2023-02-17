import { useMemo, useState } from 'react'

import config from './app.config';
import { Mask } from './types/field';
import { HandleClick, HandleMouseDown } from './types/handlers';
import './App.css'

const Mine = -1;

const getRandomInRange = (border: number) => {
  return Math.floor(Math.random() * border)
}

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
  const [lose, setLose] = useState(false);
  const [field, setField] = useState(() => createField(size));
  const [mask, setMask] = useState<Mask[]>(() => new Array(size * size).fill(Mask.FILL));
  const win = useMemo(() =>
    !field.some(
      (f, i) => f === Mine
        && mask[i] !== Mask.FLAG
        || mask[i] !== Mask.TRANSPARENT
    ), [field, mask]);

  const handleClick: HandleClick =
    ({ x, y }) => (e) => {
      e.preventDefault();
      if (win || lose) return;
      if (mask[y * size + x] === Mask.TRANSPARENT) return;
      const clearing: [number, number][] = [];

      const clear = (x: number, y: number) => {
        if (x >=0 && x < size && y >= 0 && y < size) {
          if (mask[y * size + x] === Mask.TRANSPARENT) return;
          clearing.push([x, y]);
        };
      };

      clear(x, y);
      while(clearing.length) {
        const [x, y] = clearing.pop()!!;
        mask[y * size + x] = Mask.TRANSPARENT;

        if (field[y * size + x] !== 0) continue;
        config.clearRule.map(({ x: xConfig, y: yConfig }) => clear(x + xConfig, y + yConfig));
      };
      if (field[y * size + x] === Mine) {
        mask.forEach((_,i) => mask[i] = Mask.TRANSPARENT);
        setLose(true);
      }
      setMask((prev) => [...prev]);
    }

  const handleMouseDown: HandleMouseDown =
    ({ x, y }) => (e) => {
      e.preventDefault();
      if (e.button === 1) {
        e.stopPropagation();
        if (win || lose) return;
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
    }
  
  return (
    <div className="App">
      <div className='max-w-xs m-auto'>
        {dimension.map((_, y) => (
          <div key={y} className="flex">{dimension.map((_, x) => (
            <button
              key={x}
              className={
                `flex justify-center items-center text-white w-8 h-8
                ${(lose ? 'bg-red-500' : win ? 'bg-amber-500' : 'bg-green-500') + ' '}
                p-0 m-0.5`
              }
              onClick={handleClick({ x, y })}
              onMouseDown={handleMouseDown({ x, y })}
            >{mask[y * size + x] !== Mask.TRANSPARENT
              ? config.view[mask[y * size + x]]
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
