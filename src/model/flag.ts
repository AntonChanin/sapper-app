import SlotModel from './slot';
import { Mask } from '../types/field';

class FlagModel extends SlotModel {
    static mask = Mask.FLAG;
    constructor(order: number) {
        super(order);
    };
}

export default FlagModel;
