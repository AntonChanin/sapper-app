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
};

const Field: FC<Props> = (props) => {
  const { dimension, slotProps, ctx } = props;
  const { mask } = ctx;
  const maskRefresh = [...mask];

  return (
    <div
      className={
        createClass([
          'max-w-xs',
          'w-[300px]',
          'max-h-[320px]',
          'm-auto',
          'block',
          'overflow-auto',
        ])
      }
    >
      {dimension.map((_, y) => (
        <Row key={y}>
          {dimension.map((_, x) => (
            <Slot
              key={x}
              {...{
                ...slotProps,
                clickCallback: slotProps.clickCallback({ x, y }),
                mouseDownCallback: slotProps.mouseDownCallback({ x, y }),
                fillField: undefined,
              }}
            >{
              slotProps.fillField?.({ x, y }, {...ctx, mask: maskRefresh})
            }</Slot>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default Field;
