import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "../firebase/setup";
import SignUp from "../components/Auth/Signup";
import SignIn from "../components/Auth/SignIn";
import Home from "../components/Home/Home";
import AddForm from "../pages/AddForm";
import Listpage from "../pages/ListPage";
import PersonRecords from "../pages/PersonRecords";
import AddPayment from "../pages/AddPayment";
import ForgotPassword from "../components/Auth/ForgotPassword";

const AppRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle user state changes (onAuthStateChanged)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/home" : "/signin"} />} />
      <Route
        path="/signup"
        element={user ? <Navigate to="/home" /> : <SignUp />}
      />
      <Route
        path="/signin"
        element={user ? <Navigate to="/home" /> : <SignIn />}
      />
      <Route path="/forgetpassword" element={<ForgotPassword />} />
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/signin" />}
      />
      <Route path="/add" element={<AddForm />} />
      <Route path="/list" element={<Listpage />} />
      <Route path="/personrecords" element={<PersonRecords />} />
      <Route path="/payment" element={<AddPayment />} />
    </Routes>
  );
};

export default AppRoutes;
