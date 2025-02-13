// this is just to check branch feature


import Profile from "./Profile/Profile";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Headbar from "./Headbar";
import Product from "./Product";
import ProductPage from "./ProductPage";
import Login from "./Login/Login";
import Investor from "./Investor";
import InvestorPage from "./InvestorPage";
import SignUp from "./SignUP/SignUp";
import Footer from './Footer';
import CompanyProfile from './CompanyProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); 

  return (
    <Router>
      <Headbar
        isLoggedIn={isLoggedIn}
        userName={userData?.name || "Guest"}
        setUserName={(name) => setUserData((prev) => ({ ...prev, name }))}
        setIsLoggedIn={setIsLoggedIn}
        userData={userData}
      />
      <Routes>
        <Route path="/InvestorPage/:email" element={<InvestorPage />} />
        
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />}
        />
        <Route
          path="/investor"
          element={isLoggedIn ? <Investor /> : <Navigate to="/login" />}
        />
        <Route
          path="/InvestorPage"
          element={isLoggedIn ? <InvestorPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/product"
          element={isLoggedIn ? <Product /> : <Navigate to="/login" />}
        />
        <Route
          path="/ProductPage"
          element={isLoggedIn ? <ProductPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:email"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer/>
    </Router>//this is to check the branch feature

  );
}

export default App;
