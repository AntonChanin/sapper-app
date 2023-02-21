import { FC } from 'react';

import FieldRow from './FieldRow';
import { FieldSlotProps, FillCallback, FillContext } from '../../types/field';
import { HandleClick, HandleMouseDown } from '../../types/handlers';

type Props = {
  dimension: number[];
  difficulty: string;
  slotProps: FieldSlotProps<HandleClick, HandleMouseDown, FillCallback>;
  ctx: FillContext;
};

const Field: FC<Props> = (props) => {
  const { dimension } = props;

  return (
      <div className='max-w-xs max-h-[320px] m-auto block overflow-auto'>
      {dimension.map((_, y) => (
        <FieldRow key={y} y={y} {...props} />
      ))}
    </div>
  );
};

export default Field;
