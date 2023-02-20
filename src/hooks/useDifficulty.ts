import { useEffect, useState } from 'react';

import config from '../app.config';

const useDifficulty = () => {
    const [difficulty, setDifficulty] = useState<string[]>([]);
    useEffect(() => {
        setDifficulty(Object.keys(config.difficultyRule))
    }, []);
    return difficulty;
};

export default useDifficulty;
