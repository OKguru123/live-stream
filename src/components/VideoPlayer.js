import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useLocation } from "react-router-dom";
import UI from "./UI";
import ProgressBar from "./ProgressBar";

const VideoPlayer = () => {
  const location = useLocation();
  const { videoUrl } = location.state || {};

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [qualityLevels, setQualityLevels] = useState([]);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [audiotype, setAudio] = useState("");
  const [isplaying, SetIsplaying] = useState(false);
  const [progessBar, setProgressBar] = useState(0);

  useEffect(() => {
    if (Hls.isSupported() && videoUrl) {
      const hls = new Hls();

      const attachHLS = () => {
        if (audioRef.current) {
          hls.attachMedia(audioRef.current);
        } else if (videoRef.current) {
          hls.attachMedia(videoRef.current);
        }
      };

      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      attachHLS();

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setAudio(hls.levels.length);
        setQualityLevels(
          hls.levels.map((level, index) => ({
            index,
            resolution: level.height,
          }))
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

      setHlsInstance(hls);

      return () => {
        hls.destroy();
      };
    }
  }, [videoUrl, audiotype]);

  const handleQualityChange = (event) => {
    const selectedLevel = event.target.value;
    if (hlsInstance) {
      hlsInstance.currentLevel =
        selectedLevel === "auto" ? -1 : parseInt(selectedLevel, 10);
      console.log(`Quality level set to: ${selectedLevel}`);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isplaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isplaying]);

  const handleProgress = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgressBar(progress);
    }
  };

  const PlayerRef = React.createRef();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {audiotype > 1 ? (
        <>
          <video
            ref={videoRef}
            className="w-[600px] border-blue-300 rounded-md"
            controls
            autoPlay
            muted
          ></video>
          {qualityLevels.length > 0 && (
            <div className="quality-selector mt-2">
              <label htmlFor="quality" className="mr-2">
                Select Quality:
              </label>
              <select
                id="quality"
                onChange={handleQualityChange}
                className="border rounded-md px-2 py-1"
              >
                <option value="auto">Auto</option>
                {qualityLevels.map((level) => (
                  <option key={level.index} value={level.index}>
                    {level.resolution
                      ? `${level.resolution}p`
                      : `Level ${level.index}`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      ) : (
        <div className="h-screen w-screen bg-slate-200">
          <UI SetIsplaying={SetIsplaying} isplaying={isplaying} />
          {/* Replacing ReactPlayer with Audio */}
          <audio
            autoPlay
            ref={audioRef}
            controls
            className="hidden" // Hide default audio player UI
            onTimeUpdate={handleProgress} // Mimic onProgress
          ></audio>

          <ProgressBar
            SetIsplaying={SetIsplaying}
            isplaying={isplaying}
            progessBar={progessBar}
            setProgressBar={setProgressBar}
            playerRef={audioRef}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
