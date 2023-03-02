import { useEffect } from 'react';

import FlagModel from '../model/flag';
import SlotModel from '../model/slot';
import FillModel from '../model/fill';
import useSound from './useSound';
import config from '../app.config';
import { Mask, Status } from '../types/field';
import MineModel from '../model/mine';
import QuestionModel from '../model/question';

type Props = {
  field: number[];
  target: number;
  mask: Mask[];
  callback(): void;
};

const useCanWin = (props: Props) => {
  const { field, target, mask, callback } = props;
  const applaySound = useSound(config.sound[Status.WIN]);
  useEffect(
    () => {
      const checking = field.filter((f, i) => {
        if (f === MineModel.value) {
          return (
            (
              mask[i] === FillModel.mask
              || FlagModel.mask
              || QuestionModel.mask
            ) && mask[i] !== MineModel.mask
          );
        } else {
          return !(mask[i] === SlotModel.mask)
        };
      }).length;
      if (checking === target) {
        callback();
        applaySound();
      };
    },
    [field, mask],
  );
};

export default useCanWin;
