import { useEffect, useState } from 'react';

import config from '../app.config';
import useSound from './useSound';

const useSoundConfig = (namespace: string[]) => {
  const [sounds, setSounds] =  useState<Record<string, () => void>>({});
  useEffect(() => {
    namespace.forEach((soundName) => {
      sounds[soundName] = useSound(config.sound[soundName]);
      setSounds((prev) => prev);
    });
  }, []);
  
  return sounds;
};

export default useSoundConfig;
