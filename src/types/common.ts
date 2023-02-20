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
  timerRender: (props: {
    initialMinute: number;
    initialSeconds: number;
    isStop: boolean;
  }, callback?: () => void) => JSX.Element,
};

export type { Coord, Config };
