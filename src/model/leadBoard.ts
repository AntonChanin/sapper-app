import config from '../app.config';
import { LeadRecord } from '../types/leadBoard';

class LeadBoard {
  top = config.leadBoard.top;
  self: LeadRecord[] = [];
  constructor() {
    this.self = this.initLeadBoard();
  };

  initLeadBoard = (): LeadRecord[] => {
    return (
      [
        ...JSON.parse(localStorage.getItem('leaderBoard') ?? '[]')
      ]
      .filter((_, index) => index < this.top)
    );
  };
  
  addLeaderToBoard = (record: LeadRecord) => {
    if (+record.scope + 1) {
      this.self.push(record);
      this.self.sort((a, b) => config.leadBoard.sort(a, b));
      localStorage.setItem('leaderBoard', JSON.stringify(this.self));
    }; 
  };
}

export default LeadBoard;
