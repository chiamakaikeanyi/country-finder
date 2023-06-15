import { useState, useEffect } from "react";

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (navigator.onLine) {
      const interval = setInterval(() => {
        fetch("//google.com", {
          mode: "no-cors",
        })
          .then(() => !isOnline && setIsOnline(true))
          .catch(() => isOnline && setIsOnline(false));
      }, 30000);

      return () => clearInterval(interval);
    } else {
      return setIsOnline(false);
    }
  }, [isOnline]);

  return { isOnline };
};

export default useNetworkStatus;
