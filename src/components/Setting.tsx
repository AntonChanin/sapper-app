import { observer } from 'mobx-react-lite';

import SapperStoreInstance from '../store';
import uuid from '../utils/uuid';
import useDifficulty from '../hooks/useDifficulty';
import Button from './ui/Button';

const Setting = () => {
    const difficulty = useDifficulty();
    const { changeDifficulty } = SapperStoreInstance;

    const updateDifficulty = (value: string) => () => {
        changeDifficulty(value);
    };

    return (<div>{
        difficulty.map((name) => <Button key={uuid()} title={name} callback={updateDifficulty(name)} />)
    }</div>);
}

export default observer(Setting);
