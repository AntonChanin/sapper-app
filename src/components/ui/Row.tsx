import { FC, PropsWithChildren } from 'react';

import createClass from '../../utils/createClass';

const Row: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <div className={createClass(['flex', 'm-auto', 'w-fit'])}>{children}</div>
  );
};

export default Row;
