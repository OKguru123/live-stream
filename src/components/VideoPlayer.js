import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import ReactPlayer from "react-player";
// import bkimg from "./bkimg";
const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [qualityLevels, setQualityLevels] = useState([]);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [audiotype, setAudio] = useState("");

  // useEffect(() => {
  //   console.log(audiotype);
  // }, [audiotype]);
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
    <div className="video-player-container">
      {audiotype > 1 ? (
        <>
          <video
            ref={videoRef}
            className="w-full h-full border-blue-300 rounded-md"
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
        <div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-[250px] border rounded-full w-[250px] ml-[70px] mb-14 ">
            <img
              src="https://images.unsplash.com/photo-1612205643212-22b0715c29b8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-[200px] w-[200px] border rounded-full ml-6  "
            ></img>
            <ReactPlayer
              url={videoUrl} // Use your audio URL here
              className=" mt-14"
              playing={true}
              controls={true}
              width="100%"
              height="50px"
              // Height of the player, adjust as needed

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
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
