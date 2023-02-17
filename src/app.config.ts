import { Config } from './types/common';
import { FillCallback, Mask } from './types/field';

const config: Config<FillCallback> = {
  incrementRule: [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
  ],
  clearRule: [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ], 
  fillFunc: (coord, ctx) => {
    const { x, y } = coord;
    const { mask, field, size, target } = ctx;
    return (
      mask[y * size + x] !== Mask.TRANSPARENT
        ? config.view[mask[y * size + x]]
        : field[y * size + x] === target
          ? '💣'
          : field[y * size + x]
    );
  },
  paletRule: [
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-blue-900',
    'bg-teal-500',
    'bg-sky-500',
    'bg-black',
    'bg-white',
  ],
  statePaletRule: {
    default: 'bg-teal-500',
    win: 'bg-amber-500',
    lose: 'bg-rose-500',
  },
  view: {
    [Mask.TRANSPARENT]: null,
    [Mask.FILL]: '🌿',
    [Mask.FLAG]: '🚩',
    [Mask.QUESTION]: '❓',
  }
};

export default config;
