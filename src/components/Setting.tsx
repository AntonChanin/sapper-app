import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import SapperStoreInstance from '../store';
import Button from './ui/Button';
import Input from './ui/Input';
import config from '../app.config';
import createClass from '../utils/createClass';
import uuid from '../utils/uuid';
import useDifficulty from '../hooks/useDifficulty';
import clamp from '../utils/clamp';
import getLower from '../utils/getLower';
import getRandomInRange from '../utils/getRandomInRange';


const Setting: FC = () => {
  const difficulty = useDifficulty();
  const { difficulty: current, nickname, changeDifficulty, changeNickname, } = SapperStoreInstance;
  const [currentDifficulty, setCurrentDifficulty] = useState(config.difficultyRule[current]);
  const [custom, setCustom ] = useState(config.difficultyRule['custom'])
  const { mineCount, size: { x = 3, y = 3 } } = currentDifficulty;
  const icon = ['♿', '🗡️', '⚔️', '✨'];

  useEffect(() => {
    localStorage.setItem('customDifficulty', JSON.stringify(custom));
  }, [custom]);

  const makeRandomParam = () => {
    const x = clamp(getRandomInRange(64), 3, 64);
    const y = clamp(getRandomInRange(64), 3, x);
    custom.size = { x, y, };
    custom.mineCount = clamp(getRandomInRange(custom.size.x * 4), 3, 255);
    setCustom(prev => ({ ...prev }));
    config.difficultyRule['custom'] = custom;
    setCurrentDifficulty(custom);
  };

  const updateDifficulty = (value: string) => () => {
    changeDifficulty(value);
    setCurrentDifficulty(config.difficultyRule[current]);
  };

  const rollRandom = (value: string) => () => {
    makeRandomParam();
    changeDifficulty('custom');
  }

  const updateNickname  = (value: string) => {
    changeNickname(value);
  };

  const resetStore = () => {
    localStorage.clear();
    location.reload();
  };

  const updateCustomDifficulty = (field: string) => (value: string) => {
    if (field === 'x' || field === 'y') {
      custom.size[field as 'x' | 'y'] = +value;
      custom.size.x = clamp(custom.size.x, 3, 64);
      custom.size.y = clamp(custom.size.y, 3, custom.size.x);
    } else {
      const { x, y } = custom.size;
      const highBorder = Math.pow(getLower(x, y), 2);
      custom[field as 'mineCount'] = clamp(+value, 3, highBorder);
    };
    setCustom(prev => ({ ...prev }));
    setCurrentDifficulty(custom);
  };

  return (<div className={createClass(['flex', 'flex-col', 'm-2', 'max-w-xs', 'min-w-[300px]', 'w-[300px]', 'h-fit'])}>
    <Input
      label={<b>Имя игрока 🤪:</b>}
      className={createClass(['w-40', 'mb-2'])}
      value={nickname}
      sound={config.sound['input']}
      callback={updateNickname}
    />
    <div  className={createClass(['flex', 'flex-col'])}>
      <b>Звуки 🎶:</b>
      {Object.keys(config.sound).map((name) => (
        <Input
          key={uuid()}
          type="text"
          label={<b>Звук '{name}'</b>}
          className={createClass(['w-40', 'mb-2'])}
          placeholder={config.sound[name]}
          sound={config.sound['input']}
          callback={(value) => config.sound[name] = value}
        />
      ))}
    </div>
    <h2 className={createClass(['text-xl', 'font-bold'])}>Подробности сложнасти 😱</h2>
    <div className={createClass(['flex', 'flex-row', 'justify-between', 'items-center', 'mb-2'])}>
      <b>Размер поля: </b>{x} x {y}
    </div>
    <div className={createClass(['flex', 'flex-row', 'justify-between', 'items-center','mb-2'])}>
      <b>Число мин: </b>{mineCount}
    </div>
    <b className={createClass(['flex'])}>Уровень сложнасти: </b>
    <div className={createClass(['flex', 'flex-row', 'justify-between', 'items-center', 'flex-col'])}>  
      {difficulty.map((name, index) => <Button
        key={uuid()}
        title={`${name}  ${icon[index]}`}
        className={createClass([`${current === name && 'border-double'}`, 'w-52', 'active:animate-bounce'])}
        sound={config.sound['button']}
        callback={updateDifficulty(name)}
      />)}
      <Button
        key={uuid()}
        title="random 🎲"
        className={createClass([`${current === 'random' && 'border-double'}`, 'w-52', 'active:animate-bounce'])}
        sound={config.sound['button']}
        callback={rollRandom('random')}
      />
       <Button
        key={uuid()}
        title="reset 🔄"
        className={createClass([`${current === 'random' && 'border-double'}`, 'w-52', 'active:animate-bounce'])}
        sound={config.sound['button']}
        callback={resetStore}
      />
    </div>
    <div className={createClass(['flex', 'flex-col'])}>{current === 'custom' && (<>
      <b>Размер поля:</b>
      <Input
        type="number"
        label={<b>По X</b>}
        className="w-40 mb-2"
        value={custom.size.x}
        sound={config.sound['input']}
        callback={updateCustomDifficulty('x')}
      />
      <Input
        type="number"
        label={<b>По Y</b>}
        className="w-40"
        value={custom.size.y}
        sound={config.sound['input']}
        callback={updateCustomDifficulty('y')}
      />
      <br />
      <Input
        type="number"
        label={<b>Количество мин</b>}
        className="w-40"
        value={custom.mineCount > 0 ? custom.mineCount : 1}
        sound={config.sound['input']}
        callback={updateCustomDifficulty('mineCount')}
      />
    </>)}</div>
  </div>);
};

export default observer(Setting);
