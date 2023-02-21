import { FC, MouseEventHandler, useState } from 'react';
import useSound from '../../hooks/useSound';

import createClass from '../../utils/createClass';

type Props = {
  title: string;
  className?: string;
  sound?: string;
  callback?(): void;
}

const Button: FC<Props> = (props) => {
  const { callback, title, sound, className = '' } = props;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    sound && useSound(sound).applaySound();
    callback?.();
  }

  return (
    <button
      className={createClass([
        className,
        'p-2',
        'm-2',
        'border-4 rounded-lg border-indigo-600',
        'hover:border-indigo-300',
      ])}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
