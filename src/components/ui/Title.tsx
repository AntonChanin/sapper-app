import { FC } from 'react';

type Props = {
    value: string;
};

const Title: FC<Props> = ({ value }) => <h3 className="text-xl uppercase">{value}</h3>;

export default Title;
