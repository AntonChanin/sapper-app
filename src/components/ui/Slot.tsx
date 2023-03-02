import { FC, MouseEventHandler, PropsWithChildren } from 'react';

import config from '../../app.config';
import createClass from '../../utils/createClass';
import { FieldSlotProps, Status } from '../../types/field';

type Props = FieldSlotProps<() => void, undefined>;

const Slot: FC<PropsWithChildren<Props>> = (props) => {
  const {
    clickCallback,
    mouseDownCallback,
    status,
    children,
  } = props;

  const handleClick: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    clickCallback();
  };

  const handleMouseDown: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    if (e.button === 1) {
      e.stopPropagation();
      mouseDownCallback();
    };
  };

  return (
    <button
      className={
        createClass([
          'flex',
          'justify-center',
          'items-center',
          'w-10',
          'h-10',
          'min-w-[2rem]',
          'min-h-[2rem]',
          'p-0',
          `${config.fontPaletRule[Number(children)] ?? 'text-white'}`, 
          `${(
            status === Status.LOSE
              ? config.statePaletRule[Status.LOSE]
              : status === Status.WIN
                ? config.statePaletRule[Status.WIN]
                : Number(children)
                  ? config.fillPaletRule[Number(children)]
                  : config.statePaletRule['default']
          )}`,   
        ])
      }
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >{children}</button>
  );
}

export default Slot;
