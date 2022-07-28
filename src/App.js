import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                (user && <Home />) ||
                (!user && <Navigate to="/login" replace />)
              }
            />
            <Route
              path="/login"
              element={
                (user && <Navigate to="/" replace />) || (!user && <Login />)
              }
            />
            <Route
              path="/signup"
              element={
                (user && <Navigate to="/" replace />) || (!user && <Signup />)
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
