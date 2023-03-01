import { FC, useEffect, useState } from 'react';

import Timer from '../components/Timer';
import createClass from '../utils/createClass';
import TimerModel from '../model/timer';
import hourglass from '../assets/hourglass.svg';
import { TimerSetting } from '../types/common';

type Props = {
  model?: TimerModel | null;
  options:  Partial<TimerSetting>;
  saveToStore(model: TimerModel): void;
};

const TimerView: FC<Props> = ({ model, options, saveToStore }) => {
  const { isStop } = options;
  const [timer, setTimer] = useState<TimerModel | null>(model ?? null);
  useEffect(() => {
    const instance = new TimerModel({ ...options }); 
    setTimer(instance);
    saveToStore(instance);
  }, []);

  useEffect(() => {
    timer?.updateParam({ isStop });
  }, [isStop])

  return (
    <div className={createClass(['flex', 'justify-center', 'text-red-400', 'font-bold'])}>
      {timer && <Timer
        model={timer}
        view={(minutes: number, seconds: number) => (
          <div className={createClass(['flex', 'place-items-center'])}>
            <h1>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1>
            <img className="w-8 h-8" alt="" src={hourglass} />
          </div>
        )}
      />}
    </div>
  );
};

export default TimerView;
