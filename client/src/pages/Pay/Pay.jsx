import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/Checkout Form/CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51MX7zSATBUQ2uQjFC0VvAEnNlfULw2jp0uR5HUhBtWtwvbKkCyb8HucDuO5eer0vzlqn6EUHD7aieP7bsK8ZqbdG00oLikyEKq"
);

const Pay = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [ethereumValue, setEthereumValue] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        setEthereumValue(response.data.ethereum.usd);
      } catch (error) {
        console.log("Error fetching Ethereum value:", error);
      }
    };

    fetchData();
  }, []);

  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      <div className="left">
        {isLoading ? (
          "loading"
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="container">
            <h1 className="title">Proceed to Checkout</h1>

            <div className="details">
              <div className="subTotal">
                <p>Delivery Time</p>
                <p>{data.deliveryTime} Days</p>
              </div>
              <div className="subTotal">
                <p>Revisions</p>
                <p>{data.revisionNumber} rev</p>
              </div>
              <div className="subTotal">
                <p>Subtotal</p>
                <p>USD ${data.price}</p>
              </div>
              <div className="subTotal">
                <p>Ethereum</p>
                {/* <p>ETH ⟠{(data.price * 0.000555384).toFixed(4)}</p> */}
                <p>ETH ⟠{(data.price / ethereumValue).toFixed(4)}</p>
              </div>
              <div className="subTotal">
                <p>Tax</p>
                <p>$0</p>
              </div>
            </div>

            <div className="features">
              <h3>Features :</h3>
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/images/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* <div className="info">
              <h3>Total Price :</h3>
              <p>US ${data.price}.00</p>
              <p>ETH ⟠{(data.price * 0.000555384).toFixed(4)}</p>
            </div> */}
          </div>
        )}
      </div>

      <div className="right ">
        
        

        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}


      </div>

      
    </div>
  );
};

export default Pay;
