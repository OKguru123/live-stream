import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import UI from "./UI";

const VideoPlayer = () => {
  const location = useLocation();
  const { videoUrl } = location.state || {};
  console.log("url received", videoUrl);
  const videoRef = useRef(null);
  const [qualityLevels, setQualityLevels] = useState([]);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [audiotype, setAudio] = useState("");

  useEffect(() => {
    if (Hls.isSupported() && videoUrl) {
      const hls = new Hls();

      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log(
          "Manifest loaded, found " + hls.levels.length + " quality levels"
        );
        setAudio(hls.levels.length);
        console.log(audiotype + "audio type" + hls.levels.length);

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

  return (
    <div className=" h-screen w-screen flex flex-col justify-center items-center">
      {audiotype > 1 ? (
        <>
          {" "}
          <video
            ref={videoRef}
            className="w-[600px] border-blue-300 rounded-md "
            controls
            autoPlay
            muted
          ></video>
          {qualityLevels.length > 0 && (
            <div className="quality-selector mt-2 ">
              <label htmlFor="quality" className="mr-2 ">
                Select Quality:
              </label>
              <select
                id="quality"
                onChange={handleQualityChange}
                className="border rounded-md px-2 py-1"
              >
                <option value="auto ">Auto</option>
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
        <div className="h-screen w-screen  bg-slate-200 ">
          <UI className=""></UI>
          <ReactPlayer
            url={videoUrl}
            className=" ml-[20%] mt-[60px] rounded-full"
            playing={true}
            controls={true}
            height="50px"
            width="60%"
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  preload: "auto",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
