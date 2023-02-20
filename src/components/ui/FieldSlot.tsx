import { FC, MouseEventHandler, ReactNode } from 'react';
import config from '../../app.config';

import { FieldSlotProps, Status } from '../../types/field';

type Props = FieldSlotProps<MouseEventHandler, MouseEventHandler, ReactNode>;

const FieldSlot: FC<Props> = (props) => {
  const {
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    fillField,
    status,
  } = props;
  return (
    <button
      className={
        `flex justify-center items-center ${config.fontPaletRule[Number(fillField)] ?? 'text-white'} w-8 h-8
        ${(
          status === Status.LOSE
            ? config.statePaletRule['lose']
            : status === Status.WIN
              ? config.statePaletRule['win']
              : Number(fillField) ? config.fillPaletRule[Number(fillField)] : config.statePaletRule['default']
        ) + ' '}
        p-0 m-0.5`
      }
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >{fillField}</button>
  );
}

export default FieldSlot;
