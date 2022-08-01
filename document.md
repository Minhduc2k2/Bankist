# Authentication

## Config

```js
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBaA--y2JQPn1Wz9M5Jv4vqMZgl_YA8dkI",
  authDomain: "bankist-b899e.firebaseapp.com",
  projectId: "bankist-b899e",
  storageBucket: "bankist-b899e.appspot.com",
  messagingSenderId: "716905417692",
  appId: "1:716905417692:web:141ac602999dfd318a9d19",
};

//TODO: Initialize Firebase
firebase.initializeApp(firebaseConfig);

//TODO: Initialize Services
const projectFireStore = firebase.firestore();
const projectAuth = firebase.auth();
export { projectFireStore, projectAuth };
```

## Sign Up with email and password

```js
export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
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

      setError(null);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };
  return { isPending, error, signup };
};
```

## Logout

```js
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
```

## Login

```js
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = projectAuth.signInWithEmailAndPassword(email, password);

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

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, login };
};
```

## Get user đang đăng nhập

```js
useEffect(() => {
  //TODO: Lấy ra thông tin của user đang đăng nhập
  //! Chỉ sử dụng 1 lần khi load lại trang => sử dụng clean up function để gỡ bỏ nó
  const unsub = projectAuth.onAuthStateChanged((user) => {
    dispatch({ type: "AUTH_IS_READY", payload: user });
    unsub();
  });
}, []);
```

# FireBase Rule

```cmd
npm install -g firebase-tools
firebase login
firebase init -> Choose Firestore, Hosting: Configure... -> Choose Use an existing project -> Choose Firebase project
What do you want to use as your public directory? -> build
Set up automatic builds and deploys with GitHub? -> No
!After Config -> firebase deploy --only firestore
```

## firestore.rules

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /transactions/{document=**} {
      // allow read, write: if
      //     request.time < timestamp.date(2022, 8, 27);

      //? allow read, write
      //! bằng
      //? allow read,create,delete,update
      //TODO: Chỉ cho phép tạo khi đã login
      allow create: if
          request.auth != null;
      //TODO: Chỉ cho phép đọc và xoá khi uid của user đăng nhập bằng uid user trong firebase <=> User chỉ được đọc và xoá data của chính user đó
      allow read, delete: if
          request.auth.uid == resourse.data.uid;
    }
  }
}
```

# Deploy & ReDeploy

```cmd
npm run build
firebase deploy
```
