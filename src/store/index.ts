import { action, computed, makeObservable, observable } from 'mobx';

import config from '../app.config';
import Timer from '../model/timer';
import { LeadRecord } from '../types/leadBoard';

class SapperStore {
  timer: Timer | null = null
  difficulty = localStorage.getItem('difficulty') ?? 'low';
  flagAmmo = config.difficultyRule[this.difficulty].mineCount ?? 0;
  top = config.leadBoard.top;
  leaderBoard: LeadRecord[] = [
    ...JSON.parse(localStorage.getItem('leaderBoard') ?? '[]')
  ].filter((_, index) => index < this.top);
  nickname = localStorage.getItem('nickname') ?? 'incognito';

  constructor() {
    makeObservable(this, {
      difficulty: observable,
      flagAmmo: observable,
      top: observable,
      leaderBoard: observable,
      nickname: observable,
      timer: observable,
      addLeaderToBoard: action.bound,
      changeDifficulty: action.bound,
      changeFlagAmmo: action.bound,
      changeNickname: action.bound,
      refreshFlagAmmo: action.bound,
      saveTimer: action.bound,
      getTimer: action.bound,
    });
  };
  
  addLeaderToBoard = (record: LeadRecord) => {
    if (+record.scope + 1) {
      this.leaderBoard.push(record);
      this.leaderBoard.sort((a, b) => config.leadBoard.sort(a, b));
      localStorage.setItem('leaderBoard', JSON.stringify(this.leaderBoard));
    } 
  }

  changeDifficulty = (newDifficulty: string) => {
    this.difficulty = newDifficulty;
  }

  changeFlagAmmo = (change: number) => {
    this.flagAmmo += change;
    this.flagAmmo = Math.round(this.flagAmmo);
  };

  changeNickname = (change: string) => {
    this.nickname = change;
    localStorage.setItem('nickname', change);
  };

  refreshFlagAmmo = () => {
    this.flagAmmo = config.difficultyRule[this.difficulty].mineCount;
  };

  saveTimer = (model: Timer) => {
    this.timer = model;
  };
  
  getTimer() {
    return this.timer;
  }
};

const SapperStoreInstance = new SapperStore();

export default SapperStoreInstance;
