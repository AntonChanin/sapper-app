import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import SapperStoreInstance from '../store';
import Title from './ui/Title';
import Button from './ui/Button';
import FieldView from '../view/FieldView';
import TimerView from '../view/TimerView';
import FieldModel from '../model/field';
import config from '../app.config';
import createClass from '../utils/createClass';
import useCanWin from '../hooks/useCanWin';
import useSoundConfig from '../hooks/useSoundConfig';
import { Status, Mask } from '../types/field';
import { Coord } from '../types/common';

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
  const { size, mineCount } = config.difficultyRule[difficulty];
  const sounds = useSoundConfig(Object.keys(config.sound));
  const [status, setStatus] = useState<Status>(Status.NONE);
  const [model, setModel] = useState<FieldModel>(
    new FieldModel(
      size,
      mineCount,
      (name) => sounds[name](),
      (status) => setStatus(status),
      (mask) => setMask(mask),
      (count) => changeFlagAmmo(count),
    )
  );
  const dimension = model.getDimension();
  const [mask, setMask] = useState<Mask[]>(model.mask);
  const [context, setContext] = useState(model.getCtx());

  const refresh = () => {
    location.reload();
  };

  useEffect(() => {
    refreshFlagAmmo();
    localStorage.setItem('difficulty', difficulty);
  }, [difficulty]);
  useCanWin({
    field: context.field,
    target: model.mineCount,
    mask: [...context.mask],
    callback: () => setStatus(Status.WIN),
  });

  const TimerCallback = (props?: Record<string, string | number>) => {
    addLeaderToBoard({
      nickname: localStorage.getItem('nickname')
        ?? 'incognito',  scope: `${props?.time}`
    });
  };

  const handleClick: (param: Coord) => () => void =
    ({ x, y }) => () => {
      sounds['button']();
      model.actionStart({x, y}, status);
      setContext({ ...model.getCtx(), mask });
    };
    
  const handleMouseDown: (param: Coord) => () => void =
    ({ x, y }) => () => {
      model.actionEnd({ x, y }, status, flagAmmo);
    };

  const slotProps = {
    clickCallback: handleClick,
    mouseDownCallback: handleMouseDown,
    fillField: config.fillFunc,
    status,
  };

  return (
    <div className={createClass(['min-w-[300px]', 'w-[300px]', 'm-2'])}>
      <FieldView dimension={dimension} slotProps={slotProps} ctx={context} />
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
            callback={refresh}
            placeholder="refresh game"
          />      
      </div>
      <Title value={status} />
    </div>
  );
};

export default observer(Game);
