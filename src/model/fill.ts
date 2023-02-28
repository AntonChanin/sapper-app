import SlotModel from './slot';
import { Mask } from '../types/field';

class FillModel extends SlotModel {
    static mask = Mask.FILL;
    constructor(order: number) {
        super(order);
    };
}

export default FillModel;
