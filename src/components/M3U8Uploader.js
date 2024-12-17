import React, { useRef, useState } from "react";
import Hls from "hls.js";

function M3U8Uploader() {
  const [file, setFile] = useState(null); // To store the selected file
  const [fileURL, setFileURL] = useState(""); // For previewing the file
  const videoRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".m3u8")) {
      setFile(selectedFile);

      // Generate a temporary URL for preview
      const tempURL = URL.createObjectURL(selectedFile);
      setFileURL(tempURL);

      // Play the m3u8 file
      playM3U8(tempURL);
    } else {
      alert("Please select a valid .m3u8 file.");
    }
  };

  // Play m3u8 file using HLS.js
  const playM3U8 = (url) => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      // Native support for Safari
      videoRef.current.src = url;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play();
      });
    } else {
      alert("Your browser does not support m3u8 playback.");
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/upload",
    //     formData,
    //     {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     }
    //   );

    //   alert("File uploaded successfully!");
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Upload failed:", error);
    //   alert("File upload failed.");
    // }
  };

  return (
    <div>
      <h2>Upload and Preview M3U8 File</h2>

      {/* File input */}
      <input type="file" accept=".m3u8" onChange={handleFileChange} />

      {/* Video preview */}
      {fileURL && (
        <div>
          <h4>File Preview:</h4>
          <video ref={videoRef} controls width="600" />
        </div>
      )}

      {/* Upload button */}
      <button onClick={handleUpload} disabled={!file}>
        Upload File
      </button>
    </div>
  );
}

export default M3U8Uploader;
