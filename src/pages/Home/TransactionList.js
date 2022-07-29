import classNames from "classnames/bind";
import { useFirebase } from "../../hooks/useFirebase";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

function TransactionList({ transactions }) {
  const { deleteDocument } = useFirebase("transactions");
  const total = transactions.reduce((accumulate, currentvalue) => {
    return accumulate + Number(currentvalue.amount);
  }, 0);
  return (
    <>
      <p className={cx("total")}>Total: {total}$</p>
      <ul className={cx("transactions")}>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p className={cx("name")}>{transaction.name}</p>
            <p className={cx("amount")}>{transaction.amount}$</p>
            <button onClick={() => deleteDocument(transaction.id)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TransactionList;
