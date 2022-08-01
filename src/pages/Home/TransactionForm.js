import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";
function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { response, addDocument } = useFirestore("transactions");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ uid, name, amount });
  };
  //TODO: Reset input when success submit
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);
  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Transaction</h3>
      <label>
        <span>Name:</span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        <span>Amount:</span>
        <input
          type="number"
          required
          value={amount}
          min="1"
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button className="btn">Add</button>
    </form>
  );
}

export default TransactionForm;
