import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import config from '../app.config';
import useCanWin from '../hooks/useCanWin';
import SapperStoreInstance from '../store';
import { Coord } from '../types/common';
import { Status, Mask } from '../types/field';
import { HandleClick, HandleMouseDown } from '../types/handlers';
import getRandomInRange from '../utils/getRandomInRange';
import Setting from './Setting';
import Field from './ui/Field';
import Title from './ui/Title';
import Button from './ui/Button';
import createClass from '../utils/createClass';

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

const createField = (size: number, mineCount: number): number[] => {
  const field: number[] = new Array(size * size).fill(0);
  createMines(field, mineCount, size);
  return field;
}

const Game: FC = () => {
  const { difficulty } = SapperStoreInstance;
  const { size: { x: size }, mineCount } = config.difficultyRule[difficulty];
  const dimension = new Array(size).fill(null);
  const [status, setStatus] = useState(Status.NONE);
  const [field, setField] = useState(() => createField(size, mineCount));
  const [mask, setMask] = useState<Mask[]>(() => new Array(size * size).fill(Mask.FILL));

  const reftesh = () => {
    setField(() => createField(size, mineCount));
    setMask(() => new Array(size * size).fill(Mask.FILL));
    setStatus(Status.NONE);
  };

  useEffect(() => {
    reftesh()
    localStorage.setItem('difficulty', difficulty);
  }, [difficulty]);

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
    <div>
      <Title value={status} />
      <Field dimension={dimension} difficulty={difficulty} slotProps={slotProps} ctx={context} />
      <div className={createClass(['flex', 'justify-around'])}>
        {config.timerRender({ initialMinute: 0, initialSeconds: 0, isStop: status !== Status.NONE })}
        <Button title={'🔄'} className={`${status !== Status.NONE && 'bg-sky-300'}`} callback={reftesh} />
      </div>
    </div>
  );
};

export default observer(Game);
