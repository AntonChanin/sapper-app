import { FC, MouseEventHandler, ReactNode } from 'react';

import config from '../../app.config';
import { FieldSlotProps, Status } from '../../types/field';

type Props = FieldSlotProps<MouseEventHandler, MouseEventHandler, ReactNode> & { difficulty: string; };

const FieldSlot: FC<Props> = (props) => {
  const {
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    difficulty,
    fillField,
    status,
  } = props;
  return (
    <button
      className={
        `flex justify-center items-center ${config.fontPaletRule[Number(fillField)] ?? 'text-white'} ${config.difficultyRule[difficulty].slotScale} h-2
        ${(
          status === Status.LOSE
            ? config.statePaletRule['lose']
            : status === Status.WIN
              ? config.statePaletRule['win']
              : Number(fillField) ? config.fillPaletRule[Number(fillField)] : config.statePaletRule['default']
        ) + ' '}
        p-0`
      }
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >{fillField}</button>
  );
}

export default FieldSlot;
