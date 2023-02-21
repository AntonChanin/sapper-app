import { FC } from 'react';
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
  const { mineCount, size: { x, y } } = config.difficultyRule[current];

  const updateDifficulty = (value: string) => () => {
    changeDifficulty(value);
  };

  const updateNickname  = (value: string) => {
    changeNickname(value);
  };

  return (<div className={createClass(['flex', 'flex-col'])}>
    <h2 className={createClass(['text-xl', 'font-bold'])}>Подробности сложнасти</h2>
    <div className={createClass(['flex', 'flex-row', 'justify-between', 'items-center'])}><b>Размер поля: </b>{x} x {x}</div>
    <div className={createClass(['flex', 'flex-row', 'justify-between', 'items-center'])}><b>Число мин: </b>{mineCount}</div>
    <div className={createClass(['flex', 'flex-row', 'justify-between', 'items-center'])}>
      <b>Уровень сложнасти: </b>
      {difficulty.map((name) => <Button key={uuid()} title={name} className={`${current === name && 'border-double'}`} callback={updateDifficulty(name)} />)}
    </div>
    <Input label={<b>Имя игрока:</b>} className="w-56" value={nickname} callback={updateNickname} />
  </div>);
}

export default observer(Setting);
