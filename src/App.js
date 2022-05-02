import { Routes, Route } from "react-router-dom";
import Fire from "./Fire";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Form from "./Form";
import Home from "./Home";

function App() {
  const [loggedInEmail, setLoggedInEmail] = useState();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInEmail(user.email);
      } else {
        setLoggedInEmail(null);
      }
    });
  }, []);

  const logout = () => {
    signOut(auth);
  };

  return (
    <div>
      {loggedInEmail ? (
        <Home logout={logout} userEmail={loggedInEmail} />
      ) : (
        <Routes>
          <Route path="/" element={<Form pageTitle="Login" />} />
          <Route path="/Register" element={<Form pageTitle="Register" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
