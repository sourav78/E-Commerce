import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import poster1 from "./assets/poster1.jpg";
import poster2 from "./assets/poster2.jpg";
import poster3 from "./assets/poster3.jpg";

const App = () => {
  return (
    <>
      <div className=" min-h-screen border border-black">
        <NavBar />
        
      </div>
    </>
  );
};

export default App;
