import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddUserButton from "./component/AddUserButton";
import Card from "./component/Card";
import Navbar from "./component/Navbar";
import AddUserPage from "./component/AddUserPage"; // New page for adding users
import { Toaster } from "react-hot-toast";
import UserDetail from "./component/UserDetail";
import LoginPage from "./component/LoginPage";
import RegisterPage from "./component/RegisterPage";

function App() {
  
  

  return (
    <Router>
      <>
        <Navbar/>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Card />
                <AddUserButton />
              </>
            }
          />

          {/* Route for the Add User page */}
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </>
      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
