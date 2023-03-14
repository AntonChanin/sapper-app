import { FC, ReactNode, useState } from 'react';

import useSound from '../../hooks/useSound';
import createClass from '../../utils/createClass';

type Props = {
  title: ReactNode;
  value: boolean;
  className?: string;
  sound?: string;
  placeholder?: string;
  reverse?: boolean;
  callback?(): void;
};

const Checkbox: FC<Props> = (props) => {
  const {
    callback,
    value,
    title,
    sound,
    reverse = false,
    placeholder = '',
    className = '',
  } = props;
  const [checked, setChecked] = useState(value);  

  const handleClick = () => {
    sound && useSound(sound)();
    callback?.();
    setChecked(value);
  };

  return (
    <div className={createClass(['flex', className, reverse ? 'flex-row-reverse' : ''])}>
        <button
          onClick={handleClick}
          placeholder={placeholder}
          className={createClass([
            className,
            checked ? 'bg-indigo-300' : 'bg-indigo-600',
            'flex',
            'w-10',
            'h-5',
            'rounded-full',
            'transition-all',
            'duration-500',
          ])}
        >
          <span className={
            createClass([
              'h-5',
              'w-5',
              'bg-white',
              'rounded-full',
              'transition-all',
              'duration-500',
              'shadow-lg',
              checked ? 'ml-5' : '',
            ])
          } />
        </button>
      <label>{title}</label>
    </div>
  );
};

export default Checkbox;
