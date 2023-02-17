import { useState } from 'react'

import config from './app.config';
import useCanWin from './hooks/useCanWin';
import getRandomInRange from './utils/getRandomInRange';
import Field from './components/ui/Field';
import { Mask, Status } from './types/field';
import { HandleClick, HandleMouseDown } from './types/handlers';
import { Coord } from './types/common';
import './App.css';

const Mine = -1;

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

  const slotProps = {
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    fillField: config.fillFunc,
    status,
  };

  const context = { mask, field, size, target: Mine };
  
  return (
    <div className="App">
      <Field dimension={dimension} slotProps={slotProps} ctx={context} />
      <h3 className="text-xl uppercase">{status}</h3>
    </div>
  )
}

export default App
