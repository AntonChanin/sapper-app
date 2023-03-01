import { useEffect } from 'react';

import SapperStoreInstance from '../store';
import { Status } from '../types/field';

const useLeadBoard = (props: { status: Status, scope: string, }) => {
  const { status, scope } = props;
  const { addLeaderToBoard } = SapperStoreInstance;
  useEffect(() =>{
    status === Status.WIN && addLeaderToBoard({ nickname:  localStorage.getItem('nickname') ?? 'incognito',  scope });
  }, [status]);
};

export default useLeadBoard;