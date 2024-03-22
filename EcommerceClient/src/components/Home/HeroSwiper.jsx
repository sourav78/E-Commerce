import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import poster1 from "../../assets/poster1.jpg";
import poster2 from "../../assets/poster2.jpg";
import poster3 from "../../assets/poster3.jpg";

const HeroSwiper = () => {
  return (
    <>
      <div className="-z-10">
        <Swiper
          pagination={true}
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
          }}
        >
          <SwiperSlide>
            <img className="sm:h-auto min-h-56" src={poster2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="sm:h-auto min-h-56" src={poster1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="sm:h-auto min-h-56" src={poster3} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default HeroSwiper;
