import React from "react";
import { FaRegCirclePause } from "react-icons/fa6";
import { IoPlayCircleOutline } from "react-icons/io5";
import { RxTrackNext } from "react-icons/rx";
import { IoPlaySkipBackOutline } from "react-icons/io5";

const ProgressBar = ({
  SetIsplaying,
  isplaying,
  progessBar,
  setProgressBar,
  playerRef,
}) => {
  // console.log(progessBar);

  const handleTime = (sec) => {
    if (playerRef.current) {
      const newTime = playerRef.current.currentTime + sec;

      playerRef.current.currentTime = newTime;
    }

    // console.log(playerRef.current, "current time in sec not working clicked");
  };
  const handleSeek = (event) => {
    if (playerRef.current) {
      const progressBar = event.currentTarget; // Progress bar element
      const rect = progressBar.getBoundingClientRect(); // Get the dimensions of the progress bar
      const clickX = event.clientX - rect.left; // Calculate click position (X coordinate)
      const newProgress = clickX / rect.width; // Convert click position to percentage (0 to 1)

      const duration = playerRef.current.duration; // Get the total duration of the media
      const seekTime = newProgress * duration; // Convert percentage to time

      playerRef.current.currentTime = seekTime; // Seek to the calculated time
      SetIsplaying(true); // Ensure audio is playing after seeking
    }
  };

  return (
    <div className="w-full bg-black mt-[100px]">
      <div
        className="w-full h-2 bg-gray-300 rounded-full cursor-pointer relative "
        onClick={handleSeek}
      >
        <div
          className="h-full bg-amber-300 rounded-full "
          style={{ width: `${progessBar}%` }}
        >
          <div
            className=" absolute  top-1/2 -translate-y-1/2 bg-amber-300 h-4 w-4 rounded-full"
            style={{
              left: `calc(${progessBar}% - 8px)`,
            }}
          ></div>
        </div>
      </div>
      <div className="w-full h-[70px] flex flex-row items-center justify-between px-8 mb-0">
        <img
          src="https://cdn.pixabay.com/animation/2024/06/04/16/39/16-39-28-355_512.gif"
          className="w-10"
        />

        <p className="text-white">problem-Jasper Dolphy</p>
        <div className="mr-10">
          <button
            onClick={() => {
              handleTime(-10);
            }}
          >
            <IoPlaySkipBackOutline className="text-3xl text-white" />
          </button>
          <button
            className=" px-4 py-2 rounded-md "
            onClick={() => {
              SetIsplaying(!isplaying);
            }}
          >
            <span className="">
              {isplaying ? (
                <FaRegCirclePause className="text-3xl text-white" />
              ) : (
                <IoPlayCircleOutline className="text-3xl text-white" />
              )}
            </span>
          </button>
          <button
            className="text-2xl"
            onClick={() => {
              handleTime(10);
            }}
          >
            <RxTrackNext className="text-3xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
