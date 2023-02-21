import Timer from '../components/Timer';

const  renderTimer = (
  { initialMinute = 0, initialSeconds = 0, seed = '', isStop = false },
  callback?: (props?: Record<string, string | number>) => void,
) => (
  <div className="flex justify-center text-red-400 font-bold">
    <Timer
      initialMinute={initialMinute}
      initialSeconds={initialSeconds}
      isStop={isStop}
      callback={callback}
      seed={seed}
    />
  </div>
);

export default renderTimer;