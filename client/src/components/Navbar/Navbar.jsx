import React, { useEffect, useState , useContext} from "react";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { TransactionContext } from "../../context/TransactionContext";



const Navbar = () => {
  const { currentAccount, connectWallet } = useContext(TransactionContext);

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [input, setInput] = useState("");

  

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  const handleKeyDown=(e)=>{
    if(e.key === 'Enter'){
      navigate(`/gigs?search=${input}`)      
    }
  }

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      document.cookie = `accessToken=${null};expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname != "/" ? "navbar active" : "navbar"}>
      <div className="container ">
        <div className="logo flex flex-row items-center">
          <img
            className="h-8 w-auto sm:h-10"
            src="https://bit.ly/3iRQ261"
            alt=""
          />
          <Link to="/" className="link">
            <h1 className="text font-semibold text-4xl ml-3 mt-1">Ether</h1>
          </Link>
          <h1 className="dot font-bold text-4xl mt-1">X</h1>
        </div>

        <div className="search">
          <div className="searchInput">
            <img src="./images/search.png" className="searchImage" alt="" />
           
            <input size={40} type="text" placeholder="Search services here" onKeyDown={handleKeyDown} onChange={(e) => setInput(e.target.value)}/>
            
          </div>
        </div>
        

        <div className="links ">
          <Link to="/explore">
            <span className="cursor-pointer">Explore</span>
          </Link>
          <Link to="/community">
            <span className=" cursor-pointer">Community</span>
          </Link>
          <Link to="/blog">
            {" "}
            <span className=" cursor-pointer">Blog</span>
          </Link>

          {/* {!currentUser?.isSeller && <span>Support</span>} */}
          {!currentUser && (
            <Link to="/login" className="link">
              Login
            </Link>
          )}
          {!currentUser && (
            <Link to="/register">
              <button>Join</button>
            </Link>
          )}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/images/noavatar.jpg"} alt="" />
              <span className="uppercase mt-1">{currentUser.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}

          {/*  */}
          {!currentAccount && (
          <span className="  inline-flex shadow-sm">
            <div
              onClick={connectWallet}
              className="cursor-pointer connect_button w-[10rem] inline-flex rounded-full border-2 hover:bg-[#0D99FF] hover:text-white border-transparent text-white border-white px-4 font-medium py-1  text-lg "
            >
              Connect Wallet
            </div>
          </span>
          )}
        </div>
      </div>

      {(active || pathname != "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="/">
              Graphics & Design
            </Link>
            <Link className="link" to="/">
              Video & Animation
            </Link>
            <Link className="link" to="/">
              Writing & Translation
            </Link>
            <Link className="link" to="/">
              AI Services
            </Link>
            <Link className="link" to="/">
              Digital Marketing
            </Link>
            <Link className="link" to="/">
              Music & Audio
            </Link>
            <Link className="link" to="/">
              Programming & Tech
            </Link>
            <Link className="link" to="/">
              Business
            </Link>
            <Link className="link" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
