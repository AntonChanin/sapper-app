import { Config } from './types/common';
import { FillCallback, Mask } from './types/field';
import { default as timerRender } from './utils/render';

const custom = JSON.parse(
  localStorage.getItem('customDifficulty')
    ?? '{ "size": { "x": 8, "x": 8 }, "mineCount": 4, "slotScale": "w-10 h-10 min-w-[2.5rem] min-h-[2.5rem]" }'
);

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
  difficultyRule: {
    low: {
      size: { x: 8, y: 8 },
      mineCount: 10,
      slotScale: 'w-10 h-10 min-w-[2.5rem] min-h-[2.5rem]',
    },
    medium: {
      size: { x: 16, y: 16 },
      mineCount: 40,
      slotScale: 'w-[1.25rem] h-[1.25rem] min-w-[1.25rem] min-h-[1.25rem] text-sm',
    },
    hard: {
      size: { x: 32, y: 16 },
      mineCount: 100,
      slotScale: 'w-[0.62rem] h-[0.62rem] min-w-[0.62rem] min-h-[0.62rem] text-xs',
    },
    custom,
  },
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
  fontPaletRule: [
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-black',
  ],
  fillPaletRule: [
    'bg-teal-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-blue-900',
    'bg-orange-800',
    'bg-sky-500',
    'bg-black',
    'bg-white',
  ],
  sound: {
    lose: 'src/assets/sounds/Small-explosion-in-the-distance-sound-effect.mp3',
    win: 'src/assets/sounds/win-sound-effect.mp3',
    button: 'src/assets/sounds/machine-button-being-pressed-sound-effect.mp3',
    input: 'src/assets/sounds/vintage-button-sound-effect.mp3',
  },
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
  },
  timerRender,
};

export default config;
