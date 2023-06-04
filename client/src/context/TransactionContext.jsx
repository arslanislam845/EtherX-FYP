import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
// import {  useNavigate } from "react-router-dom";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const formData = {
    addressTo: "0xb7f296311bBD5347F92366F343d926E9Fe9f0891"
  };
  // const [formData, setformData] = useState({ addressTo: "0xb7f296311bBD5347F92366F343d926E9Fe9f0891", amount: "0.01", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoadings, setisLoadings] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  // const handleChange = (e, name) => {
  //   setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  // };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          // eslint-disable-next-line no-underscore-dangle
          amount: parseInt(transaction.amount._hex, 10) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line consistent-return
  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  // eslint-disable-next-line consistent-return
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async (ethValue) => {
    
    try {
      if (ethereum) {
        var amount = ethValue;
        const { addressTo } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            // eslint-disable-next-line no-underscore-dangle
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount);
        console.log(transactionHash);
        setisLoadings(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setisLoadings(false);

        const transactionsCount = await transactionsContract.getTransactionCount();
        console.log(transactionsCount);
        setTransactionCount(transactionsCount.toNumber());
        window.location.href = '/success'
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      // throw new Error("No ethereum object.....l");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoadings,
        sendTransaction,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
