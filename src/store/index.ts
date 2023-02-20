import { action, makeObservable, observable } from 'mobx';

import config from '../app.config';

class SapperStore {
  difficulty = localStorage.getItem('difficulty') ?? 'low';
  flagAmmo = config.difficultyRule[this.difficulty].mineCount ?? 0;

  constructor() {
    makeObservable(this, {
      difficulty: observable,
      flagAmmo: observable,
      changeDifficulty: action.bound,
      changeFlagAmmo: action.bound,
    });
  };

  changeDifficulty = (newDifficulty: string) => {
    this.difficulty = newDifficulty;
  }

  changeFlagAmmo = (change: number) => {
    this.flagAmmo += change;
  };

};

const SapperStoreInstance = new SapperStore();

export default SapperStoreInstance;
