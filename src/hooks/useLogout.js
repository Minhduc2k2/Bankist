import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //TODO: Sign Out User
      await projectAuth.signOut();

      //TODO: Dispatch Logout Action
      dispatch({ type: "LOGOUT" });

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
  //TODO: Clean up function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { error, isPending, logout };
};
