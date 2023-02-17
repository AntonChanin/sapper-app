import { useEffect } from 'react';

import { Mask } from '../types/field';

type Props = {
  field: number[];
  target: number;
  mask: Mask[];
  callback(): void;
};

const useCanWin = (props: Props) => {
  const { field, target, mask, callback } = props;
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
      };
    },
    [field, mask],
  );
};

export default useCanWin;
