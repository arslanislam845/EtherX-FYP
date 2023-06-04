import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/GigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import swal from 'sweetalert';

function Gigs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const myURL = useLocation();
  const urlGig = myURL.search;

  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  const handleURL = (props) => {
    if (props == "?cat=design") {
      return <span>Graphic Designer</span>;
    } else if (props == "?cat=ai") {
      return <span>AI Artist</span>;
    }else if (props == "?cat=animation") {
      return <span>Animator</span>;
    }else if (props == "?cat=web") {
      return <span>Web Developer</span>;
    }
     else {
      return <span>Search</span>;
    }
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
          EtherX {" > "} {handleURL(urlGig)} {" > "}
        </span>
        {/* Cheking Names */}
        {/* {urlGig == "?cat=design" && <h1>Graphic Design</h1>}
        {urlGig == "?cat=ai" && <h1>AI Artist</h1>}
        {urlGig == "?cat=animation" && <h1>Animation</h1>}
        {(urlName = urlGig == "?cat=vo" && <h1>Voice Overs</h1>)} */}
        <h1>{handleURL(urlGig)}</h1>
        <p>
          Explore the boundaries of art and technology with {"EtherX "}<span>{handleURL(urlGig)}</span>
          
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src="./images/down.png"
              alt=""
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ?  <div className="animate-pulse flex flex-wrap justify-between">
            <div className="gigCard ">
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
              <div className="gigCard">
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
              <div className="gigCard">
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
              <div className="gigCard">
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
              <div className="gigCard">
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

              <div className="gigCard">
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
  
            
  
            </div>
            : error
            ? 
            "Something want Wrong"+
           swal("Invalid request!", "Please check your Internet!", "error", {
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
            
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
