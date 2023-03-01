import React, { useState, useEffect, FC } from 'react'

import TimerModel from '../model/timer';

type Props = {
  model: TimerModel;
  view(minutes: number, seconds: number): JSX.Element;
};

const Timer: FC<Props> = (props) => {
  const { model, view } = props;
  const {
    initialMinute,
    initialSeconds,
    seed,
    change,
    time: { instance },
    clearTimer,
    startTimer,
    updateParam,
  } = model;
  const [ minutes, setMinutes ] = useState(model.time.minutes);
  const [ seconds, setSeconds ] =  useState(model.time.seconds);

  useEffect(() => {
    setMinutes(initialMinute);
    setSeconds(initialSeconds);
    updateParam({
      updateMuinutes: (minutes) => setMinutes(minutes),
      updateSeconds:(seconds) => setSeconds(seconds),
    });
  }, []);

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

export default Timer;
