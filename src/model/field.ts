import MineModel from './mine';
import { Coord } from '../types/common';
import SlotModel from './slot';
import FillModel from './fill';

class Field {
    size: Coord = { x: 3, y: 3 };
    cellCount = 0;
    mineCount = 0;
    field: number[] = [];
    model: SlotModel[] = [];
    constructor(size: Coord, mineCount: number) {
      this.createField(size, mineCount);
    }

    createField = (size: Coord, mineCount: number) => {
        this.cellCount = size.x * size.y;
        this.field = new Array(this.cellCount).fill(0);
        const mines = this.createMines(this.cellCount, mineCount);
        mines.forEach((mine) => {
            this.field[mine] = MineModel.value;
        });
        this.field.forEach(
            (field, index) => {
                this.model.push(new FillModel(index))
            }
        );
    };

    createMines = (cellCount: number, mineCount: number): number[] => (
        [...Array(cellCount).keys()]
          .sort(() => Math.random() - 0.5)
          .slice(0, mineCount)
      )
}

export default Field;
