import "./SendTX.css";
import { MdOutlineClose } from "react-icons/md";
import { useEffect } from "react";

function SendTX({
  openForm,
  setOpenForm,
  formData,
  setFormData,
  handleSubmit,
  confirmTransaction,
  success,
  setSuccess,
}) {
  const next = (e) => {
    handleSubmit(e);
  };

  useEffect(() => {
    if (confirmTransaction) {
      setSuccess(!success);
    }
  }, [confirmTransaction, success, setSuccess]);

  return (
    <div className="sendTX">
      <div className="form_header">
        <h2>Send Ether</h2>
        <MdOutlineClose onClick={() => setOpenForm(!openForm)} />
      </div>

      <div className="form_body">
        <h3>Add Recipient</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Public Address"
            value={formData.addressTo}
            onChange={(e) =>
              setFormData({ ...formData, addressTo: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </form>
      </div>

      <div className="form_footer">
        <button className="cancel" onClick={() => setOpenForm(!openForm)}>
          Cancel
        </button>
        <button className="next" onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
}

export default SendTX;
