import { Config } from './types/common';
import { Mask } from './types/field';

const config: Config = {
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
  view: {
    [Mask.TRANSPARENT]: null,
    [Mask.FILL]: '🌿',
    [Mask.FLAG]: '🚩',
    [Mask.QUESTION]: '❓',
  }
};

export default config;
