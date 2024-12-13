import { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";

const App = () => {
  const [url, setUrl] = useState("");
  const [sendUrlToVideo, setSendUrlToVideo] = useState();
  const [file, setFile] = useState(null);

  const fetchURl = (e) => {
    e.preventDefault();

    setSendUrlToVideo(url);
    // setUrl("");
  };
  const uploadfile = (e) => {
    e.preventDefault();
    if (file) {
      const fileURL = URL.createObjectURL(file);
      console.log(file.type, +"file types is ");
      // Create a blob URL for the file
      setSendUrlToVideo(fileURL); // Pass the blob URL to the video player
      console.log(fileURL, "file uploded");
    } else {
      alert("Please select a file before clicking upload.");
    }
  };

  return (
    <>
      <>
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-gradient-to-b from-white to-gray-100 shadow-lg rounded-2xl p-6  flex flex-col w-[90%] sm:w-[500px] border border-x-blue-500   ">
            <div className="mb-4  border-x-blue-500  ">
              {sendUrlToVideo && (
                <VideoPlayer
                  className="rounded-md "
                  videoUrl={sendUrlToVideo}
                />
              )}
            </div>
            <div className="flex flex-col gap-4">
              <form
                onSubmit={fetchURl}
                className="flex flex-col sm:flex-row justify-center items-center gap-4"
              >
                <input
                  className="w-full sm:w-[70%] px-4 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter URL"
                  type="url"
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                />
                <button className="w-full sm:w-[30%] bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition">
                  Play M3U8
                </button>
              </form>
              <form
                onSubmit={uploadfile}
                className="flex flex-col sm:flex-row justify-center items-center gap-4"
              >
                <input
                  className="w-full sm:w-[70%] px-4 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                ></input>
                <button className="w-full sm:w-[30%] bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition">
                  Play M3U8
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default App;
