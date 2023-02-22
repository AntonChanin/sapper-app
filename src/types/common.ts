import { MaskRecord } from './field';

type Coord = {
  x: number;
  y: number;
};

type DifficultySetting = {
  size: Coord;
  mineCount: number;
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
  timerRender: (
    props: {
    initialMinute: number;
    initialSeconds: number;
    seed: string;
    isStop: boolean;
    }, 
    callback?: (props?: Record<string, string | number>) => void
  ) => JSX.Element,
  sound: Record<string, string>,
  soundPathRoot: Record<string, string>,
};

export type { Coord, Config };
