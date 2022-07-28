import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      //TODO: Sign Up User
      //! Auto Login After Sign Up
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!res) throw new Error("Could not complete signup");

      //TODO: Add Display Name to user
      await res.user.updateProfile({ displayName: displayName });
      console.log(res.user);

      //TODO: Dispatch Login Action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  //TODO: Clean Up Function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { isPending, error, signup };
};
