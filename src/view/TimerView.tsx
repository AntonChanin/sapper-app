import { FC } from 'react';

import Timer from '../components/Timer';
import createClass from '../utils/createClass';
import hourglass from '../assets/hourglass.svg';
import { TimerSetting } from '../types/common';

type Props = Partial<TimerSetting>;

const TimerView: FC<Props> = (props) => (
    <div className={createClass(['flex', 'justify-center', 'text-red-400', 'font-bold'])}>
        <Timer
            options={props}
            view={(minutes: number, seconds: number) => (
                <div className={createClass(['flex', 'place-items-center'])}>
                    <h1>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1>
                    <img className="w-8 h-8" alt="" src={hourglass} />
                </div>
            )}
        />
    </div>
);

export default TimerView;
