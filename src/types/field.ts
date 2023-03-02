import { ReactNode } from 'react';
import { Coord } from './common';

enum Mask {
    MINE,
    TRANSPARENT,
    FILL,
    FLAG,
    QUESTION,
};

enum Status {
    LOSE = 'lose',
    WIN = 'win',
    NONE = '',
};

type MaskRecord = Record<Mask, ReactNode>

type FillContext = {
    mask: Mask[];
    field: number[];
    size: number;
    target: number;
};

type FillCallback = (
    coord: Coord,
    ctx: FillContext,
) => ReactNode;

type FieldSlotProps<Callback, FillFunc> = {
    clickCallback: Callback;
    mouseDownCallback: Callback;
    fillField?: FillFunc;
    status: Status;
};

export { Mask, Status };
export type { MaskRecord, FieldSlotProps, FillCallback, FillContext };  
