"use client";

import { useUserProfileQuery } from "@/lib/services/auth";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  const { data, isSuccess } = useUserProfileQuery();

  useEffect(() => {
    if (data && isSuccess) {
      console.log(data.data);
      setUser(data.data);
    }
  }, [data, isSuccess]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Name: <span className="text-green-600 ml-1">{user.name}</span>{" "}
          </label>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Email: <span className="text-green-600  ml-1">{user.email}</span>{" "}
          </label>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Verified:{" "}
            <span className="text-green-600 ml-1">
              {user.is_varified ? "Yes" : "No"}
            </span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">
            Access Id:
            <span className="text-green-600 ml-1">{user._id}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Profile;
