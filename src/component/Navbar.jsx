import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userNotExist } from "../redux/userReducer";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log(user);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8082/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(response);

        console.log("Logout successful!");
        dispatch(userNotExist());

        navigate("/login");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-300 to-purple-300 shadow-lg fixed w-full z-10 top-0 left-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src="/go_photo.png" alt="Logo" className="h-10 w-10" />
          <div className="text-white text-2xl font-bold">
            <Link to="/">Golang UI</Link>
          </div>
        </div>

        <div className="flex space-x-8">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                Home
              </Link>
              <button
                className="text-white hover:text-blue-200 transition duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
