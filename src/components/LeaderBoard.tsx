import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import SapperStoreInstance from '../store';
import createClass from '../utils/createClass';
import uuid from '../utils/uuid';

const LeaderBoard: FC = () => {
  const { leaderBoard } = SapperStoreInstance;

  return (
    <div className={createClass([ 'min-w-[300px]'])}>
      <b>Таблица лидеров:</b>
      {leaderBoard.map(({ nickname, scope }) => (
        <div key={uuid()} className={createClass([ 'flex', 'justify-between', 'border-b-2'])}>
          <b>{nickname}</b>{Math.round(+scope / 60)}m : {+scope % 60}s
        </div>
      ))}
    </div>
  );
};

export default observer(LeaderBoard);
