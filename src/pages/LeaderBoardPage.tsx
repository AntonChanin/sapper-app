import React, { FC } from 'react';
import LeaderBoard from '../components/LeaderBoard';

const LeaderBoardPage: FC = () => (
  <div className="flex justify-center mx-auto h-[calc(100vh-100px)]">
    <div className="flex flex-col max-w-[1024px] w-full">
      <div className="container mt-4">
        <LeaderBoard />
      </div>
    </div>
  </div>
);

export default LeaderBoardPage;
