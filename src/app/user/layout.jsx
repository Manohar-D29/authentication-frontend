import UserSidebar from "@/components/userSidebar";
import React from "react";

const UserLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <UserSidebar />
      </div>
      <div className="col-span-10">{children}</div>
    </div>
  );
};

export default UserLayout;
