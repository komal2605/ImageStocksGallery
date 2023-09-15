import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import Errorpage from "../Pages/Errorpage";
import Stockspage from "../Pages/Stockspage";
import Image from "../components/Image";
import Profile from "../components/Profile";

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/my-stocks" element={<Stockspage />} />
      <Route path="/image/:id" element={<Image />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Errorpage />} />
    </Routes>
  );
}

export default Root;
