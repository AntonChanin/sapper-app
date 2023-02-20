import { MaskRecord } from './field';

type Coord = {
  x: number;
  y: number;
};

type DifficultySetting = {
  size: Coord;
  mineCount: number;
  slotScale: string;
};

type Config<FF> = {
  incrementRule: Coord[];
  clearRule: Coord[];
  fillFunc: FF;
  view: MaskRecord;
  difficultyRule: Record<string, DifficultySetting>;
  fontPaletRule: string[];
  fillPaletRule: string[];
  statePaletRule: Record<string, string>;
  timerRender: (props: {
    initialMinute: number;
    initialSeconds: number;
    isStop: boolean;
  }, callback?: () => void) => JSX.Element,
};

export type { Coord, Config };
