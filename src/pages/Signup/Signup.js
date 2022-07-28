import styles from "./Signup.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const cx = classNames.bind(styles);

function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };
  return (
    <form className={cx("signup-form")} onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
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
      <label>
        <span>Name:</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      {!isPending && <button className={cx("btn")}>Sign Up</button>}
      {isPending && (
        <button className={cx("btn")} disabled>
          Loading...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}

export default Signup;
