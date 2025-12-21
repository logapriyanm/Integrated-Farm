import './App.css'
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Footer from './Components/Footer.jsx';
import About from './Pages/About.jsx';
import OurFarm from './Pages/OurFarm.jsx';
import Login from "./Pages/Login";
import Signup from "./Pages/SignupPage";
import Agriculture from './Pages/Agriculture.jsx';
import Visit from './Pages/Visit.jsx';
import Contact from './Pages/Contact.jsx';
import ProductsPage from './Pages/Products.jsx';
import CartPage from "./Pages/CartPage";
import PlaceOrder from './Pages/PlaceOrder.jsx';
import ProductItem from './Components/ProductItem.jsx';
import NotFound from './Pages/NotFound.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './Pages/Verify.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Orders from './Pages/Orders.jsx';

// Admin Components
import AdminLayout from './Components/Admin/AdminLayout';
import AdminDashboard from './Pages/Admin/Dashboard.jsx';
import AddProduct from './Pages/Admin/Add.jsx';
import AdminProducts from './Pages/Admin/List.jsx';
import AdminOrders from './Pages/Admin/Orders.jsx';
import AdminAnalytics from './Pages/Admin/Analytics.jsx';
import AdminSettings from './Pages/Admin/Settings.jsx';

export const backendUrl = "http://localhost:4000";
export const currency = "₹";

function App() {
  const location = useLocation();

  // ✅ Check if current route is admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ToastContainer />

      {/* ✅ Show Navbar ONLY for non-admin pages */}
      {!isAdminRoute && <Navbar />}

      <div className={isAdminRoute ? "" : "pt-12"}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/about' element={<About />} />
          <Route path='/farm' element={<OurFarm />} />
          <Route path='/agriculture' element={<Agriculture />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:productId' element={<ProductItem />} />
          <Route path='/visit' element={<Visit />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/verify' element={<Verify />} />

          {/* Protected User Routes */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />

          <Route path='/place-order' element={
            <ProtectedRoute>
              <PlaceOrder />
            </ProtectedRoute>
          } />

          <Route path='/orders' element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="admin-orders" element={<AdminOrders />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* ✅ Show Footer ONLY for non-admin pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
