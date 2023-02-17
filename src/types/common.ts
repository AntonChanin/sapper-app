import { MaskRecord } from './field';

type Coord = {
  x: number;
  y: number;
};

type Config = {
  incrementRule: Coord[];
  clearRule: Coord[];
  view: MaskRecord;
};

export type { Coord, Config };
