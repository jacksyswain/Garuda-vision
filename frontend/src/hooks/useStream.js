import { useEffect, useRef, useState } from "react";

const useStream = (videoRef, path, isActive) => {
  const pcRef = useRef(null);
  const retryRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | connecting | live | error

  const cleanup = () => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (retryRef.current) {
      clearTimeout(retryRef.current);
      retryRef.current = null;
    }
  };

  const startStream = async () => {
    if (!isActive || !path) return;

    try {
      setStatus("connecting");

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      pc.ontrack = (event) => {
        videoRef.current.srcObject = event.streams[0];
        setStatus("live");
      };

      pc.oniceconnectionstatechange = () => {
        if (
          pc.iceConnectionState === "failed" ||
          pc.iceConnectionState === "disconnected"
        ) {
          setStatus("error");
          reconnect();
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const res = await fetch(
        `http://localhost:8889/${path}/whep`,
        {
          method: "POST",
          headers: { "Content-Type": "application/sdp" },
          body: offer.sdp,
        }
      );

      const answer = await res.text();

      await pc.setRemoteDescription(
        new RTCSessionDescription({
          type: "answer",
          sdp: answer,
        })
      );
    } catch (err) {
      console.error("WebRTC error:", err);
      setStatus("error");
      reconnect();
    }
  };

  const reconnect = () => {
    cleanup();
    retryRef.current = setTimeout(() => {
      startStream();
    }, 3000);
  };

  useEffect(() => {
    if (isActive) {
      startStream();
    } else {
      cleanup();
      setStatus("idle");
    }

    return () => cleanup();
  }, [path, isActive]);

  return status;
};

export default useStream;