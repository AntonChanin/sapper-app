import { ReactNode } from "react";

enum Mask {
    TRANSPARENT,
    FILL,
    FLAG,
    QUESTION,
};

type MaskRecord = Record<Mask, ReactNode>

enum Status {
    LOSE = 'lose',
    WIN = 'win',
    NONE = '',
};

export { Mask, Status };
export type { MaskRecord };  
