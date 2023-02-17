import { MaskRecord } from './field';

type Coord = {
  x: number;
  y: number;
};

type Config<FF> = {
  incrementRule: Coord[];
  clearRule: Coord[];
  fillFunc: FF;
  view: MaskRecord;
  paletRule: string[];
  statePaletRule: Record<string, string>;
};

export type { Coord, Config };
