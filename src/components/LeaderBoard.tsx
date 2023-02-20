import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import createClass from '../utils/createClass';
import SapperStoreInstance from '../store';

const LeaderBoard: FC = () => {
  const { leaderBoard } = SapperStoreInstance;

  return (
    <div>
      <b>Таблица лидеров:</b>
      {leaderBoard.map((time, index) => (
        <div className={createClass([ 'flex', 'justify-between', 'border-b-2'])}>
          <b>{index}</b>{Math.round(+time / 60)}m : {+time % 60}s
        </div>
      ))}
    </div>
  );
};

export default observer(LeaderBoard);
