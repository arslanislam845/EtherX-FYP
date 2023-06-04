import React from "react";
import "./Gig.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/Reviews/Reviews";
import swal from 'sweetalert';

function Gig() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  console.log(id);


  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  // const createdAt = new Date(data.createdAt);
  // const options = { year: "numeric", month: "short" };
  // const formattedTime = `${createdAt.toLocaleString(
  //   "en-US",
  //   options
  // )}`;

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  return (
    <div className="gig">
      {isLoading ? (
        <>
          <div className="h-[20rem] mt-40 bg-white ">
            <button
              disabled
              type="button"
              className="py-2.5 px-5 mr-2 text-md font-medium text-gray-900 bg-white rounded-lg border border-gray-400 hover:bg-blue-400 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading...
            </button>
          </div>
        </>
      ) : // "loading....."
      error ? (
      "Something want Wrong"+
      swal("Invalid request!", "Your Seesion Is Expired You need to login Again", "error", {
        buttons: {
          retry: {
            text: "Retry!",
            value: "reload",
          },
          cancel: "Cancel",
        },
      })
      .then((value) => {
        if (value === "reload") {
          location.reload(); // Reload the page
        }
      }) 
      ) : (
        <div className="container">
          <div className="lefty">
            <div className="left">
              <div className="mySlider">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={0}
                  loop={true}
                  pagination={{
                    clickable: true,
                    enabled: true,
                  }}
                  navigation={false}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {data.images.map((img) => (
                    <SwiperSlide key={img}>
                      <img key={img} src={img} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="price text-xl font-semibold">
                <h3>{data.shortTitle}</h3>
                <h2>$ {data.price}</h2>
              </div>
              <p>{data.shortDesc}</p>
              <div className="details">
                <div className="item">
                  <img src="/images/clock.png" alt="" />
                  <span>{data.deliveryTime} Days Delivery</span>
                </div>
                <div className="item">
                  <img src="/images/recycle.png" alt="" />
                  <span>{data.revisionNumber} Revisions</span>
                </div>
              </div>
              <div className="features">
                {data.features.map((feature) => (
                  <div className="item" key={feature}>
                    <img src="/images/greencheck.png" alt="" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="payButton justify-center">
                <Link to={`/pay/${id}`}>
                  <button className="usd">$Pay USD</button>
                </Link>
                <Link to={`/crypto-pay/${id}`}>
                  <button className="usd">$Pay Ether</button>
                </Link>
               
              </div>
            </div>
            <Reviews gigId={id} />
          </div>

          <div className="right">
            <h1 className="text-4xl font-semibold">{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/images/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/images/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            {/* <Swiper
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              pagination={{
                clickable: true,
                enabled: true,
              }}
              navigation={false}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {data.images.map((img) => (
                <SwiperSlide key={img}>
                  <img key={img} src={img} alt="" />
                </SwiperSlide>
              ))}
            </Swiper> */}
            <h2 className="text-xl font-extrabold">About This Gig</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2 className="text-xl font-bold">About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/images/noavatar.jpg"} alt="" />
                  <div className="info">
                    <h3>{dataUser.username}</h3>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/images/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">
                        {dataUser.country.toUpperCase()}
                      </span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">
                        {new Date(dataUser.createdAt).toLocaleString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />

                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}

            {/* <Reviews gigId={id} /> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
