import { FC, MouseEventHandler, useState } from 'react';

import createClass from '../../utils/createClass';

type Props = {
  title: string;
  className?: string;
  callback?(): void;
}

const Button: FC<Props> = (props) => {
  const { callback, title, className = '' } = props;
  const [isSelect, setIsSelect] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    callback?.();
    setIsSelect(true);
  }

  return (
    <button
      className={createClass([
        className,
        'p-2',
        'm-2',
        'border-2 rounded-lg border-indigo-600',
        'hover:border-indigo-300',
        isSelect ? 'border-double ' : 'border-solid',
      ])}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
