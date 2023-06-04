import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Slider1Card from "../Slider1Card/Slider1Card";
import { projects } from "../../data";
import "./Slider1.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";

const Slider1 = () => {
  return (
    <div className="slider">
      <div className="container">
        <Swiper
          slidesPerView={3}
          spaceBetween={70}
          loop={true}
          pagination={{
            clickable: false,
            enabled:false
          }}
          navigation={false}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {projects.map((card) => {
            return (
              <>
                <SwiperSlide key={card.id}>
                  <Slider1Card
                    pp={card.pp}
                    cat={card.cat}
                    image={card.img}
                    username={card.username}
                  />
                </SwiperSlide>
                ;
              </>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider1;
