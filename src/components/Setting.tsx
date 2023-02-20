import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import config from '../app.config';
import createClass from '../utils/createClass';
import uuid from '../utils/uuid';
import useDifficulty from '../hooks/useDifficulty';
import Button from './ui/Button';
import SapperStoreInstance from '../store';

const Setting: FC = () => {
  const difficulty = useDifficulty();
  const { changeDifficulty, difficulty: current } = SapperStoreInstance;
  const { mineCount, size: { x, y } } = config.difficultyRule[current];

  const updateDifficulty = (value: string) => () => {
    changeDifficulty(value);
  };

  return (<div className={createClass(['flex', 'flex-col'])}>
    <h2 className={createClass(['text-xl', 'font-bold'])}>Подробности сложнасти</h2>
    <div className={createClass(['flex', 'flex-row', 'justify-between', 'items-center'])}><b>Размер поля: </b>{x} x {y}</div>
    <div className={createClass(['flex', 'flex-row', 'justify-between', 'items-center'])}><b>Число мин: </b>{mineCount}</div>
    <div className={createClass(['flex', 'flex-row', 'justify-between', 'items-center'])}>
      <b>Уровень сложнасти: </b>
      {difficulty.map((name) => <Button key={uuid()} title={name} callback={updateDifficulty(name)} />)}
    </div>
  </div>);
}

export default observer(Setting);
