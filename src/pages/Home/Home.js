import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import TransactionForm from "./TransactionForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import TransactionList from "./TransactionList";
const cx = classNames.bind(styles);
function Home() {
  const { user } = useAuthContext();

  //TODO: Only get document where uid == user.uid
  const { document, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createAt", "desc"]
  );
  //! Before Config firestore.rules -> This will get all transactions of all user
  // const { document, error } = useCollection("transactions", null, [
  //   "createAt",
  //   "desc",
  // ]);
  //! After Config firestore.rules -> This will not allow to do it
  // const { document, error } = useCollection("transactions", null, [
  //   "createAt",
  //   "desc",
  // ]);
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        {error && <p>{error}</p>}
        {document && <TransactionList transactions={document} />}
      </div>
      <div className={cx("sidebar")}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}

export default Home;
