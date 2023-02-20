import React, { FC } from 'react';
import Game from '../components/Game';


const GamePage: FC = () => (
  <div className="flex justify-center mx-auto h-[calc(100vh-100px)]">
    <div className="flex flex-col max-w-[1024px]">
      <div className="container">
        <Game />
      </div>
    </div>
  </div>
);

export default GamePage;
