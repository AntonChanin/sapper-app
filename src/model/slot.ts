import uuid from '../utils/uuid';
import { Mask } from '../types/field';


class SlotModel {
    private __id = uuid();
    order = 0;
    static value = 0;
    static mask = Mask.TRANSPARENT;

    constructor(order: number) {
        this.order = order;
    }

    getKey = () => {
        return `${this.__id}_key`;
    };
    
    getLoc = () => {
    }

    get id() {
        return this.__id;
    };

}

export default SlotModel;