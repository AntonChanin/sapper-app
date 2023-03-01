import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import SapperStoreInstance from '../store';
import config from '../app.config';
import createClass from '../utils/createClass';
import uuid from '../utils/uuid';

const LeaderBoard: FC = () => {
  const { leaderBoard } = SapperStoreInstance;

  return (
    <div className={createClass([ 'min-w-[300px]', 'w-[300px]', 'm-auto'])}>
      <b>Таблица лидеров:</b>
      {leaderBoard.map(({ nickname, scope }) => (
        <div key={uuid()} className={createClass([ 'flex', 'justify-between', 'border-b-2'])}>
          <b>{nickname}</b>{
            typeof config.leadBoard.scopeView === 'function'
              ? config.leadBoard.scopeView(scope)
              : config.leadBoard.scopeView
          }
        </div>
      ))}
    </div>
  );
};

export default observer(LeaderBoard);
