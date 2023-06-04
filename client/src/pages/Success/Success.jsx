import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import Swal from "sweetalert2";

// import "./Success.scss";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => { 
          navigate("/orders");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setShowSuccessMessage(true);
    Swal.fire("Payment successful", "You are being redirected to the orders page!", "success");
  }, []);

  return (
    <div className="h-[100vh]">
      {/* <button onClick={handleButtonClick}>Click Me</button> */}
      {showSuccessMessage && (
        <div>
          {/* <p>
            Payment successful. You are being redirected to the orders page.
            Please do not close the page
          </p> */}
        </div>
      )}
      {/* Payment successful. You are being redirected to the orders page. Please do
      not close the page */}
    </div>
  );
};

export default Success;