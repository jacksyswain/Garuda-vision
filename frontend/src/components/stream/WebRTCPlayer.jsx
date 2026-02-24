import { useRef } from "react";
import useStream from "../../hooks/useStream";
import useStreamStatus from "../../hooks/useStreamStatus";

const WebRTCPlayer = ({ path }) => {
  const videoRef = useRef(null);

  const isActive = useStreamStatus(path);
  const status = useStream(videoRef, path, isActive);

  return (
    <div className="relative bg-black rounded-xl overflow-hidden">

      {/* Status Overlay */}
      {status !== "live" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm z-10">
          {status === "connecting" && "Connecting..."}
          {status === "error" && "Reconnecting..."}
          {status === "idle" && "Stream Offline"}
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls
        className="w-full h-full"
      />
    </div>
  );
};

export default WebRTCPlayer;