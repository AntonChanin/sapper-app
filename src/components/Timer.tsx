import React, { useState, useEffect, FC, useMemo } from 'react'

import TimerModel from '../model/timer';
import { TimerSetting } from '../types/common';


type Props = {
  model?: TimerModel;
  options: Partial<TimerSetting>;
  view(minutes: number, seconds: number): JSX.Element;
}

const presset = {
  model: new TimerModel({}),
};

const Timer: FC<Props> = (props) => {
  const { model = presset.model, options, view } = props;
  const { initialMinute, initialSeconds, seed, change, clearTimer, startTimer, updateParam } = model;
  const [ minutes, setMinutes ] = useState(initialMinute);
  const [ seconds, setSeconds ] =  useState(initialSeconds);
  useMemo(() => updateParam(options), [...Object.values(options)]);

  useEffect(() => {
    updateParam({
      updateMuinutes: (minutes) => setMinutes(minutes),
      updateSeconds:(seconds) => setSeconds(seconds),
    });
  }, []);

  useEffect(() => {
    setSeconds(initialSeconds);
    setMinutes(initialMinute);
  }, [seed]);

  useEffect(() => {
    startTimer();
    return () => {
      clearTimer();
    };
  });

  return (
    <>
      {(
        (change === -1) && ((minutes === 0)
        && (seconds === 0))
      )
        ? null
        : view(minutes, seconds)
      }
    </>
  )
};

Timer.defaultProps = { ...presset };

export default Timer;
