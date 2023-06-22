import { useEffect, useState } from "react";

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (navigator.onLine) {
      const interval = setInterval(() => {
        fetch("//google.com", {
          mode: "no-cors",
        })
          .then(() => !isOnline && setIsOnline(true))
          .catch(() => isOnline && setIsOnline(false));
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    } else {
      return setIsOnline(false);
    }
  }, [isOnline]);

  return { isOnline };
};

export default useNetworkStatus;
