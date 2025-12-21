import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
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
