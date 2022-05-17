import "./Home.css";

import { useCallback, useEffect, useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";

function Home({
  address,
  connect,
  balance,
  history,
  openForm,
  setOpenForm,
  confirmTransaction,
  setConfirmTransaction,
}) {
  const [dollarBallance, setDollarBalance] = useState(0);

  const handleDollarBalChange = useCallback(() => {
    setDollarBalance(balance * 2016.14);
  }, [balance]);

  useEffect(() => {
    handleDollarBalChange();
  }, [balance, handleDollarBalChange]);

  useEffect(() => {
    if (confirmTransaction) {
      setConfirmTransaction(null);
    }
  });

  return (
    <div className="home">
      <div className="header">
        {!address ? (
          <button className="connect_btn" onClick={connect}>
            Connect wallet
          </button>
        ) : (
          <div className="logo">
            <div className="logo_inner"></div>
          </div>
        )}

        {address && (
          <div className="account_details">
            <h2>Account 1</h2>
            <p>{`${address.slice(0, 6)}...${address.slice(
              address.length - 4
            )}`}</p>
          </div>
        )}
      </div>

      {!address ? (
        <h3>Please connect to Metamask.</h3>
      ) : (
        <>
          <div className="assets">
            <h3>{balance} ETH</h3>
            <p>{`$${dollarBallance.toFixed(2)}`} USD</p>
            <div className="up_arrow">
              <BiUpArrowAlt />
            </div>
            <button
              className="open_form"
              onClick={() => setOpenForm(!openForm)}
            >
              Send
            </button>
          </div>

          <div className="history">
            {history.map((item, index) => (
              <div className="transaction" key={index}>
                <div className="eth_logo">
                  <FaEthereum />
                </div>
                <div className="txType_and_time">
                  <h4>Sent Ether</h4>
                  <p>
                    {item.date} {item.time}
                  </p>
                </div>
                <div className="amount">
                  <h4>-{item.amount} ETH</h4>
                  <p>${item.dollarAmount} USD</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
