import { MaskRecord } from './field';

type Coord = {
  x: number;
  y: number;
};

type DifficultySetting = {
  size: Coord;
  mineCount: number;
};

type TimerSetting = {
  initialMinute: number;
  initialSeconds : number;
  isStop: boolean;
  change: number;
  seed: string;
  updateSeconds(seconds: number): void;
  updateMuinutes(minutes: number): void;
  callback(props?: Record<string, string | number>): void;
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
  sound: Record<string, string>,
  soundPathRoot: Record<string, string>,
};

export type { Coord, TimerSetting, Config };
