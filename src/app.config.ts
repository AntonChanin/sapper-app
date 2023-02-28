import { Config } from './types/common';
import { FillCallback, Mask } from './types/field';

const custom = JSON.parse(
  localStorage.getItem('customDifficulty')
    ?? '{ "size": { "x": 8, "x": 8 }, "mineCount": 4 }'
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
    },
    medium: {
      size: { x: 16, y: 16 },
      mineCount: 40,
    },
    hard: {
      size: { x: 32, y: 16 },
      mineCount: 100,
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
          ? config.view[Mask.MINE]
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
    lose: 'sounds/Small-explosion-in-the-distance-sound-effect.mp3',
    win: 'sounds/win-sound-effect.mp3',
    button: 'sounds/machine-button-being-pressed-sound-effect.mp3',
    input: 'sounds/vintage-button-sound-effect.mp3',
  },
  soundPathRoot: {
    local: 'public/',
    server: '',
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
    [Mask.MINE]: '💣',
    [Mask.QUESTION]: '❓',
  },
};

export default config;
