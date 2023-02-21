import { action, makeObservable, observable } from 'mobx';

import config from '../app.config';

class SapperStore {
  difficulty = localStorage.getItem('difficulty') ?? 'low';
  flagAmmo = config.difficultyRule[this.difficulty].mineCount ?? 0;
  leaderBoard: string[] = [...JSON.parse(localStorage.getItem('leaderBoard') ?? '[]')];

  constructor() {
    makeObservable(this, {
      difficulty: observable,
      flagAmmo: observable,
      leaderBoard: observable,
      changeDifficulty: action.bound,
      changeFlagAmmo: action.bound,
      addLeaderToBoard: action.bound,
    });
  };

  changeDifficulty = (newDifficulty: string) => {
    this.difficulty = newDifficulty;
  }

  changeFlagAmmo = (change: number) => {
    this.flagAmmo += change;
  };

  addLeaderToBoard = (record: string) => {
    if (+record) {
      this.leaderBoard.push(record);
      this.leaderBoard.sort((a, b) => +a - +b);
      localStorage.setItem('leaderBoard', JSON.stringify(this.leaderBoard));
    } 
  }
};

const SapperStoreInstance = new SapperStore();

export default SapperStoreInstance;
