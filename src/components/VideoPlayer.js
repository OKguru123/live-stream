import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(videoUrl);
  // it is imp if we using hls , because some browser not
  //   const videoRef
  useEffect(() => {
    if (Hls.isSupported() && videoUrl) {
      const hls = new Hls();

      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log(
          "Manifest loaded, found " + hls.levels.length + " quality level"
        );
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("A network error occurred");
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("A media error occurred");
              break;
            case Hls.ErrorTypes.OTHER_ERROR:
              console.error("An unknown error occurred");
              break;
            default:
              break;
          }
        }
      });

      return () => {
        hls.destroy();
      };
    }
  }, [videoUrl]);
  return (
    <div className="">
      VideoPlayer
      <video
        ref={videoRef}
        className="w-full h-full border-blue-300 rounded-md"
        controls
        autoPlay
        muted
      ></video>
    </div>
  );
};

export default VideoPlayer;
