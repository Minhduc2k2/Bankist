import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const cx = classNames.bind(styles);
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className={cx("login-form")} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {!isPending && <button className={cx("btn")}>Login</button>}
      {isPending && (
        <button className={cx("btn")} disabled>
          Loading...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
