import SlotModel from './slot';
import { Mask } from '../types/field';

class QuestionModel extends SlotModel {
    static mask = Mask.QUESTION;
    constructor(order: number) {
        super(order);
    };
}

export default QuestionModel;
