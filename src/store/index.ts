import { action, makeObservable, observable } from 'mobx';

import config from '../app.config';
import LeaderBoardModel from '../model/leadBoard';
import Timer from '../model/timer';
import { LeadRecord } from '../types/leadBoard';

class SapperStore {
  fullFildMod = localStorage.getItem('fullFildMod') ?? false;
  isMuteSoundMod = localStorage.getItem('muteSound') ?? false;
  difficulty = localStorage.getItem('difficulty') ?? 'low';
  nickname = localStorage.getItem('nickname') ?? 'incognito';
  timer: Timer | null = null;
  leaderBoard = new LeaderBoardModel();
  flagAmmo = config.difficultyRule[this.difficulty].mineCount ?? 0;

  constructor() {
    makeObservable(this, {
      difficulty: observable,
      fullFildMod: observable,
      isMuteSoundMod: observable,
      flagAmmo: observable,
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
      setFullFildMod: action.bound,
      setIsMuteSoundMod: action.bound,
    });
  };
  
  addLeaderToBoard = (record: LeadRecord) => {
    this.leaderBoard.addLeaderToBoard(record);
  };

  changeDifficulty = (newDifficulty: string) => {
    this.difficulty = newDifficulty;
  };

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
  };

  setFullFildMod(newMod: boolean) {
    this.fullFildMod = newMod;
  };

  setIsMuteSoundMod(newMod: boolean) {
    this.isMuteSoundMod = newMod;
  };
};

const SapperStoreInstance = new SapperStore();

export default SapperStoreInstance;
