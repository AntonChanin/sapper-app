import { FC } from 'react';

import Slot from '../components/ui/Slot';
import Row from '../components/ui/Row';
import createClass from '../utils/createClass';
import { Coord } from '../types/common';
import { FieldSlotProps, FillCallback, FillContext } from '../types/field';

type Props = {
  dimension: number[][];
  slotProps: FieldSlotProps<(param: Coord) => () => void, FillCallback>;
  ctx: FillContext;
  fullField?: boolean;
};

const Field: FC<Props> = (props) => {
  const { dimension, slotProps, ctx, fullField = false } = props;
  const { mask } = ctx;

  return (
    <div
      className={
        createClass([
          'm-auto',
          'block',
          !fullField ? 'w-[300px]' : `w-[${40 * dimension[0].length}px]`,
          !fullField ? 'overflow-auto' : `h-[${40 * dimension.length}px]`,
          !fullField ? 'max-w-xs max-h-[320px]' : '',
        ])
      }
    >
      {dimension.map((row, y) => (
        <Row key={y}>
          {row.map((_, x) => (
            <Slot
              key={x}
              {...{
                ...slotProps,
                clickCallback: slotProps.clickCallback({ x, y }),
                mouseDownCallback: slotProps.mouseDownCallback({ x, y }),
                fillField: undefined,
              }}
            >{
              slotProps.fillField?.({ x, y }, {...ctx, mask }) 
            }</Slot>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default Field;
