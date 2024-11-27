import React from "react";
import { useNavigate } from "react-router-dom";

const AddUserButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={() => navigate("/add-user")}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Add User
      </button>
    </div>
  );
};

export default AddUserButton;
