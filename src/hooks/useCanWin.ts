import { useEffect } from 'react';

import { Mask } from '../types/field';
import useSound from './useSound';
import config from '../app.config';

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
              return mask[i] === Mask.FLAG;
            } else {
              return mask[i] === Mask.TRANSPARENT;
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
