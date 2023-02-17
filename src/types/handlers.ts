import { MouseEventHandler } from 'react';

type HandleClick = (coord: { x: number, y: number }) => MouseEventHandler<HTMLButtonElement>;

type HandleMouseDown = (coord: { x: number, y: number }) => MouseEventHandler<HTMLButtonElement>;

export type { HandleClick, HandleMouseDown };
