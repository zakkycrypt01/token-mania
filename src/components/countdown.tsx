"use client";

import { useState, useEffect, useMemo } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2025-08-11T05:00:00Z"); // September 1st, 2025

export function useCountdownActive() {
  const [isActive, setIsActive] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkCountdown = () => {
      const now = new Date().getTime();
      const target = TARGET_DATE.getTime();
      const difference = target - now;
      setIsActive(difference > 0);
    };

    const timer = setInterval(checkCountdown, 1000);
    checkCountdown(); 

    return () => clearInterval(timer);
  }, [mounted]);

  return isActive;
}

export default function Countdown() {
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const target = TARGET_DATE.getTime();
      const difference = target - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted) {
    return <span className="font-mono text-sm">Loading...</span>;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return <span className="font-mono text-sm text-green-400">Live Now!</span>;
  }

  return (
    <span className="font-mono text-sm">
      {days > 0 && `${days}d `}
      {String(hours).padStart(2, "0")}:
      {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </span>
  );
}
