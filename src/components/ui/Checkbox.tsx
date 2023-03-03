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
      <input
        className={createClass([ 'p-2', 'm-2'])}
        onChange={handleClick}
        placeholder={placeholder}
        checked={checked}
        type="checkbox"
      />
      <label>{title}</label>
    </div>
  );
};

export default Checkbox;
