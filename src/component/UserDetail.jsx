import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  console.log(id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8082/api/students/${id}`
        );
        const data = await response.json();
        setUser(data);
        console.log(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 mt-8">
        User Details
      </h2>
      <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
          Name: {user.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Age:</span> {user.age || "N/A"}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Address:</span>{" "}
          {user.address || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default UserDetail;
