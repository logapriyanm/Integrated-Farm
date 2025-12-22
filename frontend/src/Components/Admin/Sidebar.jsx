import { NavLink, useNavigate } from 'react-router-dom';
import { IoBagAdd, IoSettings, IoLogOut } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { FaShoppingBag, FaCalendarCheck } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { FaList } from "react-icons/fa";
import { useState } from 'react';
import { toast } from 'react-toastify';

const SidebarLink = ({ to, icon: Icon, children }) => {
    return (
        <NavLink
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${isActive
                    ? 'bg-green-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`
            }
            to={to}
            end
        >
            {({ isActive }) => (
                <>
                    <Icon
                        size={22}
                        className={isActive ? 'text-white' : 'text-gray-600'}
                    />
                    <span className='hidden md:block'>{children}</span>
                </>
            )}
        </NavLink>
    );
};

const AdminSidebar = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.info("Logged out successfully");
        navigate("/login");

        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden fixed top-20 left-4 z-50 bg-green-600 text-white p-2 rounded-lg"
            >
                ☰
            </button>

            {/* Sidebar */}
            <div className={`
                fixed left-0 top-0 h-full pt-10 border-r-2 border-gray-200  bg-white z-40
                transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:w-[18%] w-[70%]
            `}>
                <div className='flex flex-col   gap-4 px-4 h-full'>
                    {/* Admin Navigation Links */}
                    <div className="flex flex-col gap-5">
                        <SidebarLink to="/admin/dashboard" icon={MdDashboardCustomize}>
                            Dashboard
                        </SidebarLink>

                        <SidebarLink to="/admin/add-product" icon={IoBagAdd}>
                            Add Product
                        </SidebarLink>

                        <SidebarLink to="/admin/products" icon={FaList}>
                            Products
                        </SidebarLink>

                        <SidebarLink to="/admin/admin-orders" icon={FaShoppingBag}>
                            Orders
                        </SidebarLink>

                        <SidebarLink to="/admin/tickets" icon={FaCalendarCheck}>
                            Tickets
                        </SidebarLink>

                        <SidebarLink to="/admin/analytics" icon={SiGoogleanalytics}>
                            Analytics
                        </SidebarLink>

                        <SidebarLink to="/admin/settings" icon={IoSettings}>
                            Settings
                        </SidebarLink>
                    </div>

                    {/* Logout Button at Bottom */}
                    <div className="mt-auto mb-4 border-t pt-4">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                        >
                            <IoLogOut size={22} />
                            <span className='hidden md:block'>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
};

export default AdminSidebar;