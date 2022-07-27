import { useState, useEffect } from 'react';
import convertTime from '../../../helper-functions/convert-time';
import clsx from 'clsx';
import '../timer.scss';
import useTimer from '../../../hooks/useTimer';

function CountdownTimer({
  inLobby,
  time = 60,
  small,
  timeClassName,
  paused,
  onFinish,
  setTime,
}) {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    if (paused) {
      setTime && setTime(seconds);

      return;
    }
  }, [paused, setTime, seconds]);

  useEffect(() => {
    setSeconds(time);
  }, [time]);

  useTimer(() => {
    if (seconds === 0) {
      return;
    }

    setSeconds((seconds) => seconds - 1);
  });

  useEffect(() => {
    if (seconds === 0) {
      if (onFinish) {
        onFinish();
      }
      // setSeconds(time);
    }
  }, [onFinish, seconds, time, setTime]);

  return (
    <div className="timer">
      {seconds > 0 ? (
        <>
          <p className={clsx('timer__start', [inLobby, small])}>GAME START</p>
          <div
            className={clsx(
              'timer__time',
              { 'time-small': small },
              timeClassName
            )}
          >
            {convertTime(seconds)}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default CountdownTimer;
