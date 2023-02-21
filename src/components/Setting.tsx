import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import SapperStoreInstance from '../store';
import Button from './ui/Button';
import Input from './ui/Input';
import config from '../app.config';
import createClass from '../utils/createClass';
import uuid from '../utils/uuid';
import useDifficulty from '../hooks/useDifficulty';


const Setting: FC = () => {
  const difficulty = useDifficulty();
  const { difficulty: current, nickname, changeDifficulty, changeNickname, } = SapperStoreInstance;
  const [currentDifficulty, setCurrentDifficulty] = useState(config.difficultyRule[current]);
  const [custom, setCustom ] = useState(config.difficultyRule['custom'])
  const { mineCount, size: { x, y } } = currentDifficulty;

  useEffect(() => {
    localStorage.setItem('customDifficulty', JSON.stringify(custom));
  }, [custom]);

  const updateDifficulty = (value: string) => () => {
    changeDifficulty(value);
    setCurrentDifficulty(config.difficultyRule[current]);
  };

  const updateNickname  = (value: string) => {
    changeNickname(value);
  };

  const updateCustomDifficulty = (field: string) => (value: string) => {
    if (field === 'x' || field === 'y') {
      custom.size[field as 'x' | 'y'] = +value > 3 ? +value : 3;
    } else {
      const highBorder = +custom.size.x * +custom.size.x;
      custom[field as 'mineCount'] = +value > 0 ? (+value < highBorder ?  +value : highBorder) : 1;
    };
    custom['slotScale'] = 'w-10 h-10 min-w-[2.5rem] min-h-[2.5rem]';
    setCustom(prev => ({ ...prev }));
    setCurrentDifficulty(custom);
  };

  return (<div className={createClass(['flex', 'flex-col'])}>
    <Input label={<b>Имя игрока:</b>} className="w-56" value={nickname} sound={config.sound['input']} callback={updateNickname} />
    <h2 className={createClass(['text-xl', 'font-bold'])}>Подробности сложнасти</h2>
    <div className={createClass(['flex', 'flex-row', 'justify-between', 'items-center'])}><b>Размер поля: </b>{x} x {x}</div>
    <div className={createClass(['flex', 'flex-row', 'justify-between', 'items-center'])}><b>Число мин: </b>{mineCount}</div>
    <div className={createClass(['flex', 'flex-row', 'justify-between', 'items-center'])}>
      <b>Уровень сложнасти: </b>
      {difficulty.map((name) => <Button
        key={uuid()}
        title={name}
        className={`${current === name && 'border-double'}`}
        sound={config.sound['button']}
        callback={updateDifficulty(name)}
      />)}
    </div>
    <div>{current === 'custom' && (<>
      <b>Размер поля:</b>
      <Input
        type="number"
        label={<b>По X</b>}
        className="w-56"
        value={custom.size.x}
        sound={config.sound['input']}
        callback={updateCustomDifficulty('x')}
      />
      <Input
        type="number"
        label={<b>По Y</b>}
        className="w-56 bg-blue-300"
        placeholder="unsupported"
        sound={config.sound['input']}
        callback={updateCustomDifficulty('y')}
        disabled={true}
      />
      <br />
      <Input
        type="number"
        label={<b>Количество мин</b>}
        className="w-56"
        value={custom.mineCount > 0 ? custom.mineCount : 1}
        sound={config.sound['input']}
        callback={updateCustomDifficulty('mineCount')}
      />
    </>)}</div>
  </div>);
}

export default observer(Setting);
