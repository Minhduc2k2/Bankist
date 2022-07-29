import { useState, useEffect, useRef } from "react";
import { projectFireStore } from "../firebase/config";

function useCollection(collection, _query, _orderBy) {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  //! If we don't use useRef --> infinite loop in useEffect
  //! _query is an array and is "different" on every fuction call
  const query = useRef(_query).current;

  //! If we don't use useRef --> infinite loop in useEffect
  //! _orderBy is an array and is "different" on every fuction call
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFireStore.collection(collection);

    //TODO: Only get document where uid == user.uid
    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }
    const unsub = ref.onSnapshot(
      (snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });

        setDocument(result);
        setError(null);
      },
      (error) => {
        console.log(error.message);
        setError(error);
      }
    );
    return () => unsub();
  }, [collection, query, orderBy]);
  return { document, error };
}

export { useCollection };
