import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import SapperStoreInstance from '../store';
import createClass from '../utils/createClass';
import uuid from '../utils/uuid';

const LeaderBoard: FC = () => {
  const { leaderBoard } = SapperStoreInstance;

  console.log(leaderBoard);

  return (
    <div>
      <b>Таблица лидеров:</b>
      {leaderBoard.map((time, index) => (
        <div key={uuid()} className={createClass([ 'flex', 'justify-between', 'border-b-2'])}>
          <b>{index}</b>{Math.round(+time / 60)}m : {+time % 60}s
        </div>
      ))}
    </div>
  );
};

export default observer(LeaderBoard);
