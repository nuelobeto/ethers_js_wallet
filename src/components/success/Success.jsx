import "./Success.css";
import { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { BsArrowRightShort } from "react-icons/bs";

function Success({
  success,
  setSuccess,
  confirmTransaction,
  setConfirmTransaction,
  openForm,
  setOpenForm,
}) {
  useEffect(() => {
    if (confirmTransaction) {
      setConfirmTransaction(null);
    }
  });

  const done = () => {
    setSuccess(!success);
    setOpenForm(!success);
  };

  return (
    <div className="success">
      <div>
        <FiCheckCircle />
      </div>
      <h2>Success</h2>
      <p>You've successfully sent your funds.</p>
      <a href="ethersan" className="eth_scan">
        View on Etherscan <BsArrowRightShort />
      </a>

      <div className="success_footer">
        <button className="cancel" onClick={done}>
          Done
        </button>
      </div>
    </div>
  );
}

export default Success;
