import { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";

const App = () => {
  const [url, setUrl] = useState("");
  const [sendUrlToVideo, setSendUrlToVideo] = useState();

  const fetchURl = (e) => {
    e.preventDefault();

    setSendUrlToVideo(url);
    // setUrl("");
  };

  return (
    <>
      <div className="flex flex-wrap items-center  bg-slate-400  justify-center h-screen">
        <div>
          <div>
            <VideoPlayer videoUrl={sendUrlToVideo} />
          </div>
          <div className="gap-3">
            <form
              onSubmit={fetchURl}
              className="bg-black flex flex-wrap justify-center items-center "
            >
              <input
                className="w-[600px] md:w-1/2 m-2 px-4 py-2 border border-blue-500 rounded-mdb"
                placeholder="Enter url"
                type="url"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
              <button className="border border-black-200 bg-blue-400 rounded-md p-2 m-2 ">
                Play M3U8
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
