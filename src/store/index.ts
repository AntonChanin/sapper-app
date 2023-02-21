import { action, makeObservable, observable } from 'mobx';

import config from '../app.config';
import { LeadRecord } from '../types/leadBoard';

class SapperStore {
  difficulty = localStorage.getItem('difficulty') ?? 'low';
  flagAmmo = config.difficultyRule[this.difficulty].mineCount ?? 0;
  leaderBoard: LeadRecord[] = [...JSON.parse(localStorage.getItem('leaderBoard') ?? '[]')].filter((_, index) => index < 10);
  nickname = localStorage.getItem('nickname') ?? 'incognito';

  constructor() {
    makeObservable(this, {
      difficulty: observable,
      flagAmmo: observable,
      leaderBoard: observable,
      nickname: observable,
      changeDifficulty: action.bound,
      changeFlagAmmo: action.bound,
      changeNickname: action.bound,
      addLeaderToBoard: action.bound,
    });
  };

  changeDifficulty = (newDifficulty: string) => {
    this.difficulty = newDifficulty;
  }

  changeFlagAmmo = (change: number) => {
    this.flagAmmo += change;
  };

  changeNickname = (change: string) => {
    this.nickname = change;
    localStorage.setItem('nickname', change);
  };

  addLeaderToBoard = (record: LeadRecord) => {
    if (+record.scope) {
      this.leaderBoard.push(record);
      this.leaderBoard.sort((a, b) => +a.scope - +b.scope);
      localStorage.setItem('leaderBoard', JSON.stringify(this.leaderBoard));
    } 
  }
};

const SapperStoreInstance = new SapperStore();

export default SapperStoreInstance;
