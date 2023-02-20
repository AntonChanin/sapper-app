import { action, makeObservable, observable } from 'mobx';

class SapperStore {
  difficulty = localStorage.getItem('difficulty') ?? 'low';
  constructor() {
    makeObservable(this, {
      difficulty: observable,
      changeDifficulty: action.bound,
    });
  };

  changeDifficulty = (newDifficulty: string) => {
    this.difficulty = newDifficulty;
  }
};

const SapperStoreInstance = new SapperStore();

export default SapperStoreInstance;
