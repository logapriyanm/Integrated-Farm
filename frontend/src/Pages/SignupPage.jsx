import { FaUserPlus, FaRegUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post(`${backendUrl}/api/user/signup`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Account created successfully!");
        navigate("/");
      
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:py-20">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center ">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100">
            <FaRegUser size={20} className="text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-600">
          Join us to start shopping for fresh farm products
        </p>

        <form onSubmit={submitHandler} className="space-y-5 mt-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 6 characters long
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition shadow-md font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaUserPlus />
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="flex justify-center text-gray-700">
            Do you have an account?{" "}
            <NavLink
              to="/login"
              className="text-green-600 font-medium hover:underline ml-1"
            >
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}