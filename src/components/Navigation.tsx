import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Navigation: FC = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
      <h3 className="font-bold">Сапер</h3>
      <span className="flex justify-between w-[150px] px-0">
        <Link to="/">Главная</Link>
        <Link to="/settings">Настройки</Link>
      </span>
    </nav>
  );
};

export default Navigation;
