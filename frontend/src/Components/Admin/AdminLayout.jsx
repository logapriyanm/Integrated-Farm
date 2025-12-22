import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import { useEffect, useState } from "react";
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex ">
        <AdminSidebar />
        <div className="ml-0 md:ml-[18%] w-full md:w-[82%] p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
