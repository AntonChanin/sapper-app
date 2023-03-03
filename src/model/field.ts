import MineModel from './mine';
import SlotModel from './slot';
import config from '../app.config';
import getBigger from '../utils/getBigger';
import getRandomInRange from '../utils/getRandomInRange';
import { Coord } from '../types/common';
import { Mask, Status } from '../types/field';
import FlagModel from './flag';
import FillModel from './fill';
import QuestionModel from './question';

class Field {
  private __higher = 0;
  private __clearing: Coord[] = [];
  private __playSound = (name: string) => {};
  private __setStatus = (status: Status) => {};
  private __setMask = (mask: Mask[]) => {};
  private __setFlagCount = (count: number) => {};

  size: Coord = { x: 3, y: 3 };
  cellCount = 0;
  mineCount = 0;
  field: number[] = [];
  mask: Mask[] = [];
  model: SlotModel[] = [];
  constructor(
    size: Coord,
    mineCount: number,
    soundDispatcher: (name: string) => void,
    statusDispatcher: (status: Status) => void,
    maskDispatcher: (mask: Mask[]) => void,
    flagDispatcher: (count: number) => void,
  ) {
    this.size = size;
    this.mineCount = mineCount;
    this.__higher = getBigger(this.size.x, this.size.y);
    this.__playSound = soundDispatcher;
    this.__setStatus = statusDispatcher;
    this.__setMask = maskDispatcher;
    this.__setFlagCount = flagDispatcher;
    this.createField();
    this.createMask();
  };

  actionStart = (size: Coord, status: Status) => {
    const { x, y } = size;
    if (status !== Status.NONE || this.mask[y * this.__higher + x] === FlagModel.mask) return;
    if (this.mask[y * this.__higher + x] === SlotModel.mask) return;
    this.__clearing = [];

    this.clear(x, y);
    while(this.__clearing.length) {
      const { x, y } = this.__clearing.pop()!!;
      this.mask[y * this.__higher + x] = SlotModel.mask;

      if (this.field[y * this.__higher + x] !== 0) continue;
      config.clearRule.map(({ x: xConfig, y: yConfig }) => this.clear(x + xConfig, y + yConfig));
    };
    if (this.field[y * this.__higher + x] === MineModel.value) {
      this.mask.forEach((_,i) => this.mask[i] = SlotModel.mask);
      this.__setStatus(Status.LOSE);
      this.__playSound(Status.LOSE);
    }
    this.__setMask(this.mask);
  };

  actionEnd = (size: Coord, status: Status, flagAmmo: number) => {
    const { x, y, } = size;
    if (status !== Status.NONE) return;
    if (this.mask[y * this.__higher + x] === SlotModel.mask) return;
    if (this.mask[y * this.__higher + x] === FillModel.mask && flagAmmo > 0) {
      this.mask[y * this.__higher + x] = FlagModel.mask;
      this.__setFlagCount(-1);
    } else if (this.mask[y * this.__higher + x] === FlagModel.mask) {
      this.mask[y * this.__higher + x] = QuestionModel.mask;
      this.__setFlagCount(1);
    } else if (this.mask[y * this.__higher + x] === QuestionModel.mask) {
      this.mask[y * this.__higher + x] = FillModel.mask;
      this.__setFlagCount(0.000001);
    };
    this.__setMask(this.mask);
  };

  clear = (x: number, y: number) => {
    if (x >=0 && x < this.__higher && y >= 0 && y < this.__higher) {
      if (this.mask[y * this.__higher + x] === SlotModel.mask) return;
      this.__clearing.push({ x, y });
    };
  };

  createField = (size?: Coord) => {
    const { x , y } = size ?? this.size;
    this.field = new Array(x * y).fill(0);
    this.createMines();
    return this.field;
  };

  createMines = (mineCount?: number) => {
    for (let i = 0; i < (mineCount ?? this.mineCount);) {
      const x = getRandomInRange(this.size.x);
      const y = getRandomInRange(this.size.y);
  
      if (this.field[y * this.__higher + x] === MineModel.value) continue;
      this.field[y * this.__higher + x] = MineModel.value;
      i += 1;
      config.incrementRule
        .forEach(
          ({x: xConfig, y: yConfig }) => this.incrementBorder(x + xConfig, y + yConfig)
        );
    }
  };

  createMask = (): Mask[] => {
    const { x , y } = this.size;
    this.mask = new Array(x * y).fill(FillModel.mask);
    return this.mask;
  };

  getDimension = () => {
    const { x, y, } = this.size;
    return (new Array(y).fill(new Array(x).fill(null)));
  };

  getCtx = () => {
    return {
      mask: this.mask,
      field: this.field,
      size: this.__higher,
      target: MineModel.value,
    };
  }

  incrementBorder = (x: number, y: number) => {
    if (x >=0 && x < this.__higher && y >= 0 && y < this.__higher) {
      if (this.field[y * this.__higher + x] === MineModel.value) return;
      this.field[y * this.__higher  + x] += 1;
    };
  };
}

export default Field;
