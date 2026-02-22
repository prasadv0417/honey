import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Customer/Home';
import ProductList from './pages/Customer/ProductList';
import ProductDetail from './pages/Customer/ProductDetail';
import Cart from './pages/Customer/Cart';
import Checkout from './pages/Customer/Checkout';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Profile from './pages/Customer/Profile';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/resetpassword/:resettoken" element={<ResetPassword />} />

            {/* Private Routes */}
            <Route path="" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment/:status" element={<div className="p-20 text-center text-2xl font-bold">Payment Result Simulated</div>} />
            </Route>

            {/* Admin Routes */}
            <Route path="" element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </main>

        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
