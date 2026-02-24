import { useEffect, useState } from "react";
import API from "../services/api";

const useStreamStatus = (path) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!path) return;

    const checkStatus = async () => {
      try {
        const { data } = await API.get(`/streams/status/${path}`);
        setActive(data.active);
      } catch (err) {
        setActive(false);
      }
    };

    checkStatus();

    const interval = setInterval(checkStatus, 5000);

    return () => clearInterval(interval);
  }, [path]);

  return active;
};

export default useStreamStatus;