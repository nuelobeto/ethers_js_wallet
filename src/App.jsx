import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Home from "./components/home/Home";
import SendTX from "./components/sendTX/SendTX";
import Success from "./components/success/Success";

function App() {
  const [address, setAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [history, setHistory] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [confirmTransaction, setConfirmTransaction] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
  });

  const today = new Date();

  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const time = today.getHours() + ":" + today.getMinutes();

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const connectWallet = async () => {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      let currentAddress = await signer.getAddress();

      setAddress(currentAddress);
    } catch (error) {
      console.log("error");
    }
  };

  const getAddress = async () => {
    if (provider) {
      const signer = provider.getSigner();
      let currentAddress = await signer.getAddress();

      setAddress(currentAddress);
    }
  };

  window.ethereum.on("accountsChanged", (accounts) => {
    getAddress();
  });

  const getBalance = async () => {
    try {
      let balance = await provider.getBalance(address);
      balance = parseFloat(ethers.utils.formatEther(balance));

      setAccountBalance(balance.toFixed(2));
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async () => {
    try {
      const { addressTo, amount } = formData;

      const parsedAmount = ethers.utils.parseEther(amount);

      const tx = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: address,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const confirmedTX = await provider.getTransaction(tx);
      setConfirmTransaction(confirmedTX);
      setFormData({ ...formData, addressTo: "", amount: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const getHistory = () => {
    const newTransaction = {
      txType: "Sent Ether",
      amount: formData.amount,
      date,
      time,
      dollarAmount: (formData.amount * 2016.14).toFixed(2),
    };

    if (formData.addressTo === "" || formData.amount === "") {
      return;
    }

    setHistory([newTransaction, ...history]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendTransaction();
    getHistory();
  };

  useEffect(() => {
    getAddress();
    getBalance();
  });

  return (
    <>
      {!openForm ? (
        <Home
          address={address}
          connect={connectWallet}
          balance={accountBalance}
          history={history}
          openForm={openForm}
          setOpenForm={setOpenForm}
          confirmTransaction={confirmTransaction}
          setConfirmTransaction={setConfirmTransaction}
        />
      ) : (
        <>
          {success ? (
            <Success
              success={success}
              setSuccess={setSuccess}
              confirmTransaction={confirmTransaction}
              setConfirmTransaction={setConfirmTransaction}
              openForm={openForm}
              setOpenForm={setOpenForm}
            />
          ) : (
            <SendTX
              openForm={openForm}
              setOpenForm={setOpenForm}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              confirmTransaction={confirmTransaction}
              success={success}
              setSuccess={setSuccess}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
