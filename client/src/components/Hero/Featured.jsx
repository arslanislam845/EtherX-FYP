import "./Featured.scss";
import "./style.css"
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useTypewriter} from "react-simple-typewriter";


const Featured = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [text] = useTypewriter({
    words: [
      "Powered by BlockChain",
      "Pakistan's first freelance Marketplace",
      "Supervised by Dr. Farhan",
      "Co-Supervised by Ma'am Tahreem Saeed",
      "Final Year Project",
    ],
    loop: {},
  });

  return (
    <div className="">
      
      <div className="h-[40rem] relative featured overflow-hidden ">
        <div className="relative pt-3 pb-16 sm:pb-24 ">
          <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 opacity-100">
            <div className="text-center">
              <h1 className="text-6xl font-black tracking-tight h1 text-white sm:text-5xl md:text-7xl">
                <span className=" xl:inline span  text-5xl">
                  Discover,
                </span>{" "}
               
                <div className="message inline">
                  <div className="word1">Buy & Sell</div>
                  <div className="word2 ">Coding</div>
                  <div className="word3 ">Creating</div>
                </div>
                <br />
              </h1>
              <span
                className="block  xl:inline md:text-5xl font-semibold 
            animate-charcter
            "
              >
                extraordinary services
              </span>
              <p className="mx-auto mt-3 max-w-md text-base text-white sm:text-lg md:mt-5 md:max-w-3xl md:text-xl ">
                Pakistan first Blockchain support <b>Freelance</b> marketplace.
                <br />
                Hire the best freelancers for any job, online from around the
                world.
              </p>
              <div className="typewriter"># {text}</div>
              <div className="mx-auto max-w-md sm:flex sm:justify-center md:mt-8">
                <Link to="/explore">
                  <div className="rounded-md shadow-md ">
                    <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#2563EB] px-8 py-2 text-base font-semibold text-white tracking-wider md:py-2 md:px-10 md:text-lg hover:bg-[#4e80ea]">
                      Explore
                    </div>
                  </div>
                </Link>
                <div className="mt-3 rounded-md shadow-md sm:mt-0 sm:ml-3">
                <Link to="/login">
                  <div
                   
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-2  font-black text-black tracking-wider hover:bg-slate-100 border-gray-300 md:py-2 md:px-10 md:text-lg"
                  >
                    Create
                  </div>
                  </Link>
                </div>
              </div>

              <div className=" flex flex-row pt-10 sm:mt-0 sm:ml-3 justify-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                </div>

                <a
                  href="/"
                  className=" font-black hover:border-b-2 text-white cursor-pointer ml-2 tracking-wider md:text-md"
                >
                  Learn More
                </a>
              </div>
            </div>
          </main>
        </div>
        <div className="right w-[20rem]">
          {/* <img src="./images/girl.png" alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Featured;
