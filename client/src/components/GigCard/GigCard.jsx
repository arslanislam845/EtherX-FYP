import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/gig/${item._id}`} className="link">
      
        {isLoading ? (
          <>
          <div className="load_gigCard">
            <div className="load_img"></div>
            <div className="info">
              <div className="user">
                <img src="/images/noavatar.jpg" alt="" />
                <div className="bg-black load_userdetail ">
                  
                </div>
              </div>

              <p className="load_dec"></p>
              <p className="load_dec"></p>
              <p className="load_dec1"></p>
            </div>
            <hr />
            <div className="load_detail">
              <div className="load_star">
                
              </div>
              <div className="load_price">
                
              </div>
            </div>
            </div>

          

          </>
          
        ) : error ? (
          "Something went wrong!"
        ) : (
          <>
          <div className="newCard">

            <img src={item.cover} alt="" />
            <div className="info">
              <div className="user">
                <img src={data.img || "/images/noavatar.jpg"} alt="" />
                <div className="user_detail">
                  <span className="username">{data.username}</span> 
                </div>
              </div>

              <p >{item.title}</p>
            </div>
            <hr />
            <div className="detail">
              <div className="star">
                <img src="./images/star.png" alt="" />
                <span>
                  {!isNaN(item.totalStars / item.starNumber) &&
                    Math.round(item.totalStars / item.starNumber)}
                </span>
              </div>
              <div className="price">
                <span>STARTING AT</span>
                <h2>$ {item.price}</h2>
              </div>
            </div>
          
</div>
          </>
         
        )}
      
    </Link>
  );
};

export default GigCard;
