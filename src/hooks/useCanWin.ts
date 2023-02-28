import { useEffect } from 'react';

import { Mask } from '../types/field';
import useSound from './useSound';
import config from '../app.config';
import FlagModel from '../model/flag';
import SlotModel from '../model/slot';
import FillModel from '../model/fill';

type Props = {
  field: number[];
  target: number;
  mask: Mask[];
  callback(): void;
};

const useCanWin = (props: Props) => {
  const { field, target, mask, callback } = props;
  const applaySound = useSound(config.sound['win']);
  useEffect(
    () => {
      if (
        !field.map(
          (f, i) => {
            if (f === target) {
              if (mask[i] === SlotModel.mask) return false;
              return (mask[i] === FlagModel.mask || FillModel.mask);
            } else {
              return mask[i] === SlotModel.mask;
            }
          }
        ).includes(false)
      ) {
        callback();
        applaySound();
      };
    },
    [field, mask],
  );
};

export default useCanWin;
