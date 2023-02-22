import { FC } from 'react';

import FieldSlot from './FieldSlot';
import createClass from '../../utils/createClass';
import { FieldSlotProps, FillCallback, FillContext } from '../../types/field';
import { HandleClick, HandleMouseDown } from '../../types/handlers';

type Props = {
  dimension: number[];
  y: number;
  slotProps: FieldSlotProps<HandleClick, HandleMouseDown, FillCallback>;
  ctx: FillContext;
};

const FieldRow: FC<Props> = (props) => {
  const { dimension, y, slotProps, ctx } = props;
  return (
    <div className={createClass(['flex', 'm-auto', 'w-fit'])}>{
      dimension.map((_, x) => (
        <FieldSlot
          key={x}
          {...{
            ...slotProps,
            onClick: slotProps.onClick({ x, y }),
            onMouseDown: slotProps.onMouseDown({ x, y }),
            fillField: slotProps.fillField({ x, y }, ctx),
          }}
        />
      ))
    }</div>
  );
};

export default FieldRow;
