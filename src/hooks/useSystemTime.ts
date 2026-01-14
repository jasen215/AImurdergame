import { useEffect, useState } from "react";

export function useSystemTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  return { now, time, date };
}

// ✅ 同时提供 default（这样你怎么 import 都不容易再出错）
export default useSystemTime;
