import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";
import Swal from "sweetalert2";
import { BallTriangle } from "react-loader-spinner";

const Message = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  useEffect(() => {
    if (error) {
      // Swal.fire("Something went wrong!", "User please login or Signup", "question");
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Make sure you have a stable internet connection",
        confirmButtonText: "Okay",
        // confirmButtonText: '<a href="/login">Login Now</a>',
        customClass: {
          confirmButton: "custom-confirm-button",
        },
        // footer: '<a href="/register">How do I create a new account?</a>',
      });
    }
  }, [error]);

  {
    isLoading ? "loading" : error ? error : <></>;
  }

  return (
    <>
      <div className="message1">
        
        <div className="container right">
          {isLoading ? (
            // "loading"
            <div className="loading">
              {/* <p>loading</p> */}
              <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#0d99ff"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
              />
            </div>
          ) : error ? (
            <div className="error"></div>
          ) : (
            <div className="h-[410px] shadow-xl">
              <div className="bg-gray-100 mb-2  py-4 -mt-7 px-6 rounded-t-lg">
                <h1 className="text-2xl  font-bold">Chat</h1>
              </div>
              <div className="messages ">
                {data.map((m) => (
                  <div
                    className={
                      m.userId === currentUser._id ? "owner item" : "item"
                    }
                    key={m._id}
                  >
                    <img src={m.img ? m.img : "/images/noavatar.jpg"} alt="" />
                    <p>{m.desc}</p>
                  </div>

                ))}
              </div>
            </div>
          )}
          {/* <hr /> */}
          <div className="bg-gray-200 py-2 shadow-lg px-4 rounded-b-lg">
            <form className="write" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full rounded-lg my-2 py-2 px-4 focus:outline-none focus:shadow-outline"
              />
              {/* <button>Send</button> */}
              <button  type="submit">
                  <img className="absolute right-[28.5rem] top-[35rem] " width="40" height="40" src="https://img.icons8.com/ios/50/telegram-app.pnghttps://icons8.com/icon/lUktdBVdL4Kb/telegram" alt="send m"/>
              </button>
            </form>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Message;
