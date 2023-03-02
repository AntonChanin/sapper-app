import { FC } from 'react';

import FieldRow from './FieldRow';
import { FieldSlotProps, FillCallback, FillContext } from '../../types/field';
import { HandleClick, HandleMouseDown } from '../../types/handlers';

type Props = {
  dimension: number[][];
  slotProps: FieldSlotProps<HandleClick, HandleMouseDown, FillCallback>;
  ctx: FillContext;
};

const Field: FC<Props> = (props) => {
  const { dimension } = props;

  console.log(props.ctx.mask);

  return (
      <div className='max-w-xs w-[300px] max-h-[320px] m-auto block overflow-auto'>
      {dimension.map((dimensionX, y) => (
        <FieldRow key={y} y={y} {...props} dimension={dimensionX} />
      ))}
    </div>
  );
};

export default Field;
