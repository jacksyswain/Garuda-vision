import { useRef } from "react";
import useStream from "../../hooks/useStream";

const WebRTCPlayer = ({ path }) => {
  const videoRef = useRef(null);

  useStream(videoRef, path);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      controls
      className="w-full bg-black rounded"
    />
  );
};

export default WebRTCPlayer;