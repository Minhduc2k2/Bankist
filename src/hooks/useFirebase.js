import { useEffect, useReducer, useState } from "react";
import { projectFireStore, timestamp } from "../firebase/config";

const initialState = {
  document: null,
  error: null,
  isPending: false,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, error: null, isPending: true, success: null };
    case "ADDED_DOCUMENT":
      return {
        document: action.payload,
        error: null,
        isPending: false,
        success: true,
      };
    case "DELETED_DOCUMENT":
      return {
        document: null,
        error: null,
        isPending: false,
        success: true,
      };
    case "ERROR":
      return {
        document: null,
        error: action.payload,
        isPending: false,
        success: false,
      };
    default:
      return state;
  }
};
function useFirebase(collection) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //TODO: Collection Ref
  const ref = projectFireStore.collection(collection);

  //TODO: Only dispatch when isCancelled == false
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };
  //TODO: Add Document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      //TODO: Tạo mốc thời gian tại thời điểm thêm doc
      const createAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  //TODO: Delete Document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, deleteDocument };
}

export { useFirebase };
