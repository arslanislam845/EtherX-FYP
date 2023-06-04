import React from "react";
import "./Home.scss";
import { useEffect } from "react";
import Featured from "../../components/Hero/Featured";
import TrustedBy from "../../components/TrustedBy/TrustedBy";
import Slider from "../../components/Slider/Slider";
import Slider1 from "../../components/Slider1/Slider1";
// import myvideo from "../../assets/VIdeoAssets/Intro.mp4";
// import FeatureCard from "../../components/featureCard/FeatureCard";
// import CardData from "../../helpers/SliderData";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slider />
      {/* Feature Section  */}

      <div className="features">     
            <h1 className="text-3xl font-semibold">A whole world of freelance talent at your fingertips</h1>
        <div className="container mt-10">
          <div className="item">
            <div className="title">
              <img src="./images/check.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./images/check.png" alt="" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./images/check.png" alt="" />
              Protected payments, every time
            </div>
            <p>
              Always know what you will pay upfront. Your payment is not released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./images/check.png" alt="" />
              24/7 support
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
          <div className="item">
            <video src="./images/Intro.mp4" controls />
          </div>
        </div>
      </div>

      <Slider1/>    

      {/* Another Feature Section  */}
      <div className="features dark">
        <div className="container">
          <div className="left">
            <div>
              <h1>GET STARTED TODAY</h1>
              <h1>GET STARTED TODAY</h1>
              <h1>GET STARTED TODAY</h1>
              <h1>GET STARTED TODAY</h1>
              <h1>GET STARTED TODAY</h1>
            </div>

            <button>Explore</button>
          </div>
          <div className="right">
            <img
              className="image"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
          </div>
        </div>
      </div>


    </div>
  );
};

export default Home;
