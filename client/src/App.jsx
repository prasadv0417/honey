import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Customer/Home';
import ProductList from './pages/Customer/ProductList';
import ProductDetail from './pages/Customer/ProductDetail';
import Cart from './pages/Customer/Cart';
import Checkout from './pages/Customer/Checkout';
import Dashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/AdminLogin';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Profile from './pages/Customer/Profile';
import About from './pages/Customer/About';
import Contact from './pages/Customer/Contact';
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
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Private Routes */}
            <Route path="" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/:id" element={<div className="min-h-screen bg-honeycomb flex items-center justify-center"><div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md"><div className="text-6xl mb-4">🎉</div><h2 className="text-2xl font-bold text-brown-900 font-['Playfair_Display'] mb-2">Order Placed!</h2><p className="text-brown-600 mb-6">Your order has been received. We'll notify you when it ships.</p><a href="/profile" className="btn-primary px-6 py-2">View My Orders</a></div></div>} />
              <Route path="/payment/:status" element={<div className="p-20 text-center text-2xl font-bold">Payment Result Simulated</div>} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
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
