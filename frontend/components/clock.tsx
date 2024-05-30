"use client";

import { useState, useEffect } from "react";
import { dateFormatter } from "@/utils/date-formatter";

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return <time suppressHydrationWarning>{dateFormatter.format(time)}</time>;
}
