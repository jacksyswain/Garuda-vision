import { useEffect, useRef } from "react";

const useStream = (videoRef, path) => {
  useEffect(() => {
    if (!path) return;

    const pc = new RTCPeerConnection();

    pc.ontrack = (event) => {
      videoRef.current.srcObject = event.streams[0];
    };

    const start = async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const res = await fetch(
        `http://localhost:8889/${path}/whep`,
        {
          method: "POST",
          headers: { "Content-Type": "application/sdp" },
          body: offer.sdp
        }
      );

      const answer = await res.text();
      await pc.setRemoteDescription(
        new RTCSessionDescription({
          type: "answer",
          sdp: answer
        })
      );
    };

    start();

    return () => pc.close();
  }, [path]);
};

export default useStream;