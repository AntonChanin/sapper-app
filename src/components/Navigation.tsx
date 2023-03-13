import React, { FC, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import SapperStoreInstance from '../store';
import config from '../app.config';
import createClass from '../utils/createClass';
import useSound from '../hooks/useSound';

const Navigation: FC = () => {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    !SapperStoreInstance.isMuteSoundMod && useSound(config.sound['button'])();
  };

  return (
    <nav
      className={
        createClass([
          'flex',
          'justify-between',
          'items-center',
          'h-[50px]',
          'px-5',
          'shadow-md',
          'bg-gradient-to-r',
          'from-sky-500',
          'to-indigo-500',
          'text-white'
        ])
      }
    >
      <h3 className={createClass(['font-bold'])}>Сапер</h3>
      <span className={createClass(['flex', 'justify-between', 'px-0','m-2'])}>
        <Link to="/" onClick={handleClick}>Главная</Link>
        <Link className="mx-2" to="/settings" onClick={handleClick}>Настройки</Link>
        <Link to="/leader-board" onClick={handleClick}>Таблица лидеров</Link>
      </span>
    </nav>
  );
};

export default Navigation;
