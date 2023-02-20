import Timer from '../components/Timer';

const  renderTimer = (
  { initialMinute = 0, initialSeconds = 0, isStop = false },
  callback?: () => void,
) => (
  <div className="flex justify-center text-red-400 font-bold">
    <Timer initialMinute={initialMinute} initialSeconds={initialSeconds} isStop={isStop} callback={callback} />
  </div>
);

export default renderTimer;