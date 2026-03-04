import React, { useState, useEffect } from "react";

type CountdownProps = {
  seconds: number;
  className?: string;
  countdownComplete: () => void;
};

const Countdown: React.FC<CountdownProps> = ({
  seconds,
  className,
  countdownComplete,
}) => {
  const [countDown, setCountDown] = useState<number>(seconds);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (countDown > 0) {
      interval = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
    } else if (countDown === 0) {
      countdownComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [countDown, countdownComplete]);

  return <span className={className}>{countDown}</span>;
};

export default Countdown;
