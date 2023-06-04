import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CatCard from "../SliderCard/CatCard";
import { cards } from "../../data";
import "./Slider.scss";
// Import Swiper styles
import "swiper/css"; 
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";

const Slider = () => {
  return (
    <div className="slider">
      <div className="container">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {cards.map((card) => {
            return (
              <>
                <SwiperSlide key={card.id}>
                  <CatCard
                    title={card.title}
                    desc={card.desc}
                    image={card.img}
                    link={card.link}
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

export default Slider;
