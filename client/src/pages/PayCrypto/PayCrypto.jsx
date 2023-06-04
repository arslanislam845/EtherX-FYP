import React, { useEffect, useState ,useContext} from "react";
import "./PayCrypto.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/Checkout Form/CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TransactionContext } from "../../context/TransactionContext";

const stripePromise = loadStripe(
  "pk_test_51MX7zSATBUQ2uQjFC0VvAEnNlfULw2jp0uR5HUhBtWtwvbKkCyb8HucDuO5eer0vzlqn6EUHD7aieP7bsK8ZqbdG00oLikyEKq"
);

const PayCrypto = () => {
  const { sendTransaction, isLoadings } = useContext(TransactionContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const ethValue = (data.price / ethereumValue).toFixed(4).toString();
    sendTransaction(ethValue);
    console.log((data.price / ethereumValue).toFixed(4))
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [ethereumValue, setEthereumValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        setEthereumValue(response.data.ethereum.usd);
      } catch (error) {
        console.log('Error fetching Ethereum value:', error);
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
  let isRequestSent = false;

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const storedData = localStorage.getItem('currentUser');
        const userData = JSON.parse(storedData);
        const userId = userData._id;

        // console.log(userId);
        // console.log("Hello World");
        const res = await newRequest.post(
          `/orders/${id}`,{userId:userId} 
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    if(!isRequestSent){
      makeRequest();
      isRequestSent = true;
    }
    
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
                <p>ETH ⟠{(data.price/ethereumValue).toFixed(4)}</p>
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

      <div className="">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>


      <div  className="Cyptroright pl-10 ">
        <h1 className="text-3xl font-semibold mt-5 mb-3 text-center"> Payment Method</h1> <br/>
        <form onSubmit={handleSubmit}>
          <lable className="text-xl font-medium mt-5 text-center pl-32">Admin payment Address:</lable>
          <br/>  <input type="text" disabled className=" bg-gray-300  ml-32 border-2  rounded-lg  border-gray-400 px-2 py-2 w-[25rem]" value="0xb7f296311bBD5347F92366F343d926E9Fe9f0891"></input>
          <br/>  <br/> <lable className="text-xl font-medium text-center mt-[2rem] pl-32">Amount:</lable>
          <br/><input type="text" disabled  className=" bg-gray-300 ml-32 border-2 rounded-lg  border-gray-400 px-2 py-1 w-[25rem]" value={(data.price/ethereumValue).toFixed(4)}></input>
          <br/><br/>
          
          <input type="submit" className="text-blue-700 mt-2 font-semibold border-[2px] p-2 border-[#4d76e0] hover:bg-[#1b52d2] hover:text-white ml-60 w-36 hover:font-semibold  rounded-md cursor-pointer" value="Pay"></input>
          
          <div>
         
       
        </div>
        </form>   
        {/* const { sendTransaction, isLoadings } = useContext(TransactionContext); */}
        {isLoadings && (
      <>
            
            <button
                disabled
                type="button"
                className="py-2.5 absolute px-5 mr-2 z-[25] right-[40rem]  top-[20rem] text-md font-medium text-gray-900 bg-white rounded-lg border border-gray-400 hover:bg-blue-400 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
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
           
          </>
         )} 

</div>


    </div>
  );
};

export default PayCrypto;