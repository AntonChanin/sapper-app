import React, { useState, useEffect, FC } from 'react'

import hourglass from '../assets/hourglass.svg';


type Props = {
  initialMinute?: number;
  initialSeconds? : number;
  isStop?: boolean;
  change?: number;
  callback?: (props?: Record<string, string | number>) => void;
}

const Timer: FC<Props> = (props) => {
  const { initialMinute = 0, initialSeconds = 0, isStop = false, change = 1, callback } = props;
  const [ minutes, setMinutes ] = useState(initialMinute);
  const [ seconds, setSeconds ] =  useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(
    () => {
      if (change < 0) {
        if (seconds > 0) {
          setSeconds(seconds + change);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(minutes + change);
            setSeconds(59);
          }
        } 
      }
      if (change > 0) {
        if (seconds < 60) {
          setSeconds(seconds + change);
        }
        if (seconds === 59) {
          setMinutes(minutes + change);
          setSeconds(0);
        }
      }
    }, 1000);
    if (isStop) {
      callback?.({ time: `${minutes * 60 + seconds}` });
      clearInterval(myInterval);
    }
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      {(
        (change === -1) && ((minutes === 0)
        && (seconds === 0))
      )
        ? null
        : (
          <div className="flex place-items-center">
            <h1>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1>
            <img className="w-8 h-8" alt="" src={hourglass} />
          </div>
        )
      }
    </>
  )
};

Timer.defaultProps = {
  initialMinute: 0,
  initialSeconds: 0,
}

export default Timer;
