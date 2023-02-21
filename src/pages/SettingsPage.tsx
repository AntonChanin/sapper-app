import React, { FC } from 'react';

import Setting from '../components/Setting';

const SettingsPage: FC = () => {

  return (
    <div className="flex justify-center mx-auto h-[calc(100vh-100px)]">
      <div className="flex flex-col max-w-[1024px]">
        <div className="container mt-4 mx-auto">
          <Setting />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
   