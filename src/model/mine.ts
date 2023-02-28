import SlotModel from './slot';
import { Mask } from '../types/field';

class MineModel extends SlotModel {
    static value = -1;
    mask = Mask.MINE;
    constructor(order: number) {
        super(order);
    };
}

export default MineModel;
