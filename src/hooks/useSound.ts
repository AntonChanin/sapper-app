import config from '../app.config';

const useSound = (src: string) => {
  const applaySound = () => {
    const audio = new Audio(config.soundPathRoot['server'] + src);
    audio.play();
  };
  return applaySound;
};

export default useSound;
