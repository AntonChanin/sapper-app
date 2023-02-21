import { ChangeEventHandler, FC, ReactNode } from 'react';

import useSound from '../../hooks/useSound';
import createClass from '../../utils/createClass';

type Props = {
  className?: string;
  placeholder?: string;
  label?: ReactNode;
  value?: string;
  sound?: string;
  callback?(value: string): void;
};

const Input: FC<Props> = (props) => {
  const { className = '', placeholder = '', label, value = '', sound, callback } = props;
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    sound && useSound(sound).applaySound();
    callback?.(e.target.value);
  };

  return (
    <div className={createClass(['flex', 'justify-between'])}>
      {label && <label>{label}</label>}
      <input
        className={
          createClass([className, 'border-b-2', 'border-blue-400', 'outline-0'])
        }
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
