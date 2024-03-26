import React from "react";
import HeroSwiper from "../components/Home/HeroSwiper";
import TopCategories from "../components/Home/TopCategories";
import LatestProduct from "../components/Home/LatestProduct";

const Home = () => {
  return (
    <>
        <div className="mt-2 bg-gray-50">
            <HeroSwiper />
            <div className="sm:px-16 lg:px-28 px-8 py-8">
              <TopCategories/>
              <LatestProduct/>
            </div>
        </div>
    </>
  );
};

export default Home;

