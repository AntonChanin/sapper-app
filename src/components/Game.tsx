import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import SapperStoreInstance from '../store';
import Field from './ui/Field';
import Title from './ui/Title';
import Button from './ui/Button';
import TimerView from '../view/TimerView';
import FillModel from '../model/fill';
import FlagModel from '../model/flag';
import MineModel from '../model/mine';
import QuestionModel from '../model/question';
import SlotModel from '../model/slot';
import config from '../app.config';
import createClass from '../utils/createClass';
import getBigger from '../utils/getBigger';
import getRandomInRange from '../utils/getRandomInRange';
import useCanWin from '../hooks/useCanWin';
import useSoundConfig from '../hooks/useSoundConfig';
import { Coord } from '../types/common';
import { Status, Mask } from '../types/field';
import { HandleClick, HandleMouseDown } from '../types/handlers';


const createMines = (field: number[], mineCount: number, size: Coord) => {
  const bigger = getBigger(size.x, size.y);
  const incrementBorder = (x: number, y: number) => {
    if (x >=0 && x < bigger && y >= 0 && y < bigger) {
      if (field[y * bigger + x] === MineModel.value) return;
      field[y * bigger  + x] += 1;
    };
  };
  
  for (let i = 0; i < mineCount;) {
    const x = getRandomInRange(size.x);
    const y = getRandomInRange(size.y);

    if (field[y * bigger + x] === MineModel.value) continue;
    field[y * bigger + x] = MineModel.value;
    i += 1;
    config.incrementRule
      .forEach(
        ({x: xConfig, y: yConfig }) => incrementBorder(x + xConfig, y + yConfig)
      );
  }
};

const createField = (size: Coord, mineCount: number): number[] => {
  const field: number[] = new Array(size.x * size.y).fill(0);
  createMines(field, mineCount, size);
  return field;
};

const Game: FC = () => {
  const {
    difficulty = 'low',
    flagAmmo,
    changeFlagAmmo,
    refreshFlagAmmo,
    addLeaderToBoard,
    saveTimer,
    getTimer,
  } = SapperStoreInstance;
  const { size: { x = 3, y = 3 }, mineCount } = config.difficultyRule[difficulty];
  const bigger = getBigger(x, y);
  const dimension = new Array(y).fill(new Array(x).fill(null));
  const [status, setStatus] = useState<Status>(Status.NONE);
  const [field, setField] = useState(() => createField({ x, y }, mineCount));
  const [mask, setMask] = useState<Mask[]>(() => new Array(x * y).fill(FillModel.mask));
  const sounds = useSoundConfig(Object.keys(config.sound));

  const reftesh = () => {
    location.reload();
  };

  useEffect(() => {
    refreshFlagAmmo();
    localStorage.setItem('difficulty', difficulty);
  }, [difficulty]);
  useCanWin({ field, target: MineModel.value, mask, callback: () => setStatus(Status.WIN) });

  const TimerCallback = (props?: Record<string, string | number>) => {
    addLeaderToBoard({
      nickname: localStorage.getItem('nickname')
        ?? 'incognito',  scope: `${props?.time}`
    });
  };

  const handleClick: HandleClick =
    ({ x, y }) => (e) => {
      e.preventDefault();
      sounds['button']();
      if (status !== Status.NONE || mask[y * bigger + x] === FlagModel.mask) return;
      if (mask[y * bigger + x] === SlotModel.mask) return;
      const clearing: Coord[] = [];

      const clear = (x: number, y: number) => {
        if (x >=0 && x < bigger && y >= 0 && y < bigger) {
          if (mask[y * bigger + x] === SlotModel.mask) return;
          clearing.push({ x, y });
        };
      };

      clear(x, y);
      while(clearing.length) {
        const { x, y } = clearing.pop()!!;
        mask[y * bigger + x] = SlotModel.mask;

        if (field[y * bigger + x] !== 0) continue;
        config.clearRule.map(({ x: xConfig, y: yConfig }) => clear(x + xConfig, y + yConfig));
      };
      if (field[y * bigger + x] === MineModel.value) {
        mask.forEach((_,i) => mask[i] = SlotModel.mask);
        setStatus(Status.LOSE);
        sounds['lose']();
      }
      setMask((prev) => [...prev]);
    };

  const handleMouseDown: HandleMouseDown =
    ({ x, y }) => (e) => {
      e.preventDefault();
      if (e.button === 1) {
        e.stopPropagation();
        if (status !== Status.NONE) return;
        if (mask[y * bigger + x] === SlotModel.mask) return;
        if (mask[y * bigger + x] === FillModel.mask && flagAmmo > 0) {
          mask[y * bigger + x] = FlagModel.mask;
          changeFlagAmmo(-1);
        } else if (mask[y * bigger + x] === FlagModel.mask) {
          mask[y * bigger + x] = QuestionModel.mask;
        } else if (mask[y * bigger + x] === QuestionModel.mask) {
          mask[y * bigger + x] = FillModel.mask;
          changeFlagAmmo(+1);
        };
      };
      setMask((prev) => [...prev]);
    };

  const slotProps = {
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    fillField: config.fillFunc,
    status,
  };

  const context = { mask, field, size: bigger, target: MineModel.value };

  return (
    <div className={createClass(['min-w-[300px]', 'w-[300px]'])}>
      <Field dimension={dimension} slotProps={slotProps} ctx={context} />
      <div className={createClass(['flex', 'justify-around'])}>
        <TimerView
          model={getTimer()}
          options={{ callback: TimerCallback, isStop: !!String(status) }}
          saveToStore={(model) => saveTimer(model)}
        />
        <div className={createClass(['flex', 'items-center'])}>Запас флагов: {flagAmmo}</div>
          <Button
            title="↻"
            className={
              createClass([
                'w-12',
                'h-12',
                'text-indigo-600',
                'hover:text-indigo-300',
                'active:animate-bounce',
                `${!!status && 'animate-spin rounded-full'}`,
                `${!!status ? 'rounded-full' : 'rounded-lg'}`,
              ])
            }
            sound={config.sound['button']}
            callback={reftesh}
            placeholder="refresh game"
          />      
      </div>
      <Title value={status} />
    </div>
  );
};

export default observer(Game);
