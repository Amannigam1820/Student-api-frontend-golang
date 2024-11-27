import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userExists, userNotExist } from "../redux/userReducer.js";

const Card = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc");  
  const [sortBy, setSortBy] = useState("");           
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/user/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User Data:", data);
          dispatch(userExists(data));
        } else {
          console.error("Error: Unauthorized or no user data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/students");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8082/api/students/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
        toast.success("User Deleted Successfully");
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  
  const handleSort = (criteria) => {
    setSortBy(criteria); // Set the sorting criteria (name or age)
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      setUsers((prevUsers) => {
        return [...prevUsers].sort((a, b) => {
          if (criteria === "name") {
            return newOrder === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          }
          if (criteria === "age") {
            return newOrder === "asc" ? a.age - b.age : b.age - a.age;
          }
          return 0;
        });
      });
      return newOrder;
    });
  };

  
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center mt-12">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Sorting Options with Indicators */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => handleSort("name")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center"
        >
          Sort by Name
          {sortBy === "name" && sortOrder === "asc" && (
            <span className="ml-2">↑ asc</span> 
          )}
          {sortBy === "name" && sortOrder === "desc" && (
            <span className="ml-2">↓ desc</span> 
          )}
        </button>
        <button
          onClick={() => handleSort("age")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center"
        >
          Sort by Age
          {sortBy === "age" && sortOrder === "asc" && (
            <span className="ml-2">↑ asc</span> 
          )}
          {sortBy === "age" && sortOrder === "desc" && (
            <span className="ml-2">↓ desc</span> 
          )}
        </button>
      </div>

      
      <div className="flex flex-wrap gap-5 justify-center mt-5">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="max-w-md w-full bg-white shadow-lg rounded-lg p-5 flex items-center relative"
          >
            <div
              className="flex flex-col mr-4"
              onClick={() => navigate(`/user/${user.id}`)}
            >
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">Age: {user.age || "N/A"}</p>
              <p className="text-sm text-gray-500">Email: {user.email}</p>
            </div>

            <div className="flex-shrink-0 ml-3">
              <img
                src="/pp.jpg"
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>

           

            <div className="ml-16">
              <button
                className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 px-4 py-2 bg-transparent border border-red-500 rounded-full text-sm"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
