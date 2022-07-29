import { Link } from "react-router-dom";

import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import shopee from "../../img/shopee.svg";
const cx = classNames.bind(styles);

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className={cx("navbar")}>
      <ul>
        <li className={cx("title")}>
          <img src={shopee} alt="shopee" />
          <p>Shopee Paid</p>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>Hello {user.displayName}!</li>
            <li>
              <button className={cx("btn")} onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
