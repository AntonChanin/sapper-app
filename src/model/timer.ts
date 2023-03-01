import { TimerSetting } from '../types/common';
import uuid from '../utils/uuid';

class Timer {
  private __time_instance = 0;
  private __minutes = 0;
  private __seconds = 0;
  
  initialMinute = 0;
  initialSeconds = 0;
  isStop = false;
  change = 1;
  seed = uuid();
  callback?: (props?: Record<string, string | number>) => void;
  updateMuinutes?: (minutes: number) => void;
  updateSeconds?: (seconds: number) => void;
  
  constructor(options: Partial<TimerSetting>) {
    this.updateParam(options);
  };

  get time() {
    return {
      seconds: this.__seconds,
      minutes: this.__minutes,
      total: this.__minutes * 60 + this.__seconds,
      instance: this.__time_instance,
    };
  };

  resetTime = () => {
    this.__minutes = this.initialMinute;
    this.__seconds = this.initialSeconds;
  };

  refreshTimer = () => {
    this.clearTimer();
    this.startTimer();
  };
  
  clearTimer = () => {
    clearInterval(this.__time_instance);
    this.__time_instance = -1;
  };

  stopTimer = () => {
    this.isStop = true;
  }

  changeSeconds() {
    this.__seconds += this.change;
  };

  changeMinutes() {
    this.__minutes += this.change;
  };

  startTimer = () => {
    this.__time_instance = setInterval(
      () => {
        if (this.change < 0) {
          if (this.__seconds > 0) {
            this.changeSeconds();
            this.updateSeconds?.(this.__seconds);
          }
          if (this.__seconds === 0) {
            if (this.__minutes === 0) {
              this.clearTimer();
            } else {
              this.changeMinutes();
              this.updateMuinutes?.(this.__minutes);
              this.updateSeconds?.(59);
            };
          } 
        }
        if (this.change > 0) {
          if (this.__seconds < 60) {
            this.changeSeconds();
            this.updateSeconds?.(this.__seconds);
          };
          if (this.__seconds === 59) {
            this.changeMinutes();
            this.updateMuinutes?.(this.__minutes);
            this.updateSeconds?.(0);
          };
        };
      },
    1000);
    if (this.isStop) {
      this.callback?.({ time: `${this.__minutes * 60 + this.__seconds}` });
      this.clearTimer();
    };
  };

  updateSeed(seed? : string) {
    this.seed = seed ?? uuid();
    return this.seed;
  };

  updateParam = (param: Partial<TimerSetting>) => {
    const {
      initialMinute,
      initialSeconds,
      isStop,
      change,
      seed,
      updateMuinutes,
      updateSeconds,
      callback,
    } = param;

    if (initialMinute) this.initialMinute = initialMinute;
    if (initialSeconds) this.initialSeconds = initialSeconds;
    if (isStop) this.isStop = isStop;
    if (change) this.change = change;
    if (updateMuinutes) this.updateMuinutes = updateMuinutes;
    if (updateSeconds) this.updateSeconds = updateSeconds;
    if (callback) this.callback = callback;
    if (seed) {
      this.updateSeed(seed);
      this.resetTime();
    }
  };

};

export default Timer;