import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VideoPlayer from "./components/VideoPlayer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videoplayer" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;
