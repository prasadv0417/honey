import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, LogOut, ChevronDown, LayoutDashboard, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const isAdmin = userInfo?.role === 'admin';

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
    } catch (_) { }
    dispatch(logout());
    toast.success('Logged out successfully');
    setDropdownOpen(false);
    navigate(isAdmin ? '/admin/login' : '/login');
  };

  const cartCount = cartItems.reduce((a, c) => a + c.quantity, 0);

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-honey-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to={isAdmin ? '/admin/dashboard' : '/'} className="flex items-center gap-2 cursor-pointer group">
          <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🍯</span>
          <h1 className="text-2xl font-bold text-brown-950 font-['Playfair_Display']">
            Nature's Gold
            {isAdmin && <span className="ml-2 text-xs font-semibold text-honey-600 bg-honey-100 px-2 py-0.5 rounded-full border border-honey-200">Admin</span>}
          </h1>
        </Link>

        {/* Desktop Nav */}
        {!isAdmin && (
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-brown-700 hover:text-honey-600 font-medium transition-colors">Home</Link>
            <Link to="/products" className="text-brown-700 hover:text-honey-600 font-medium transition-colors">Shop</Link>
            <Link to="/about" className="text-brown-700 hover:text-honey-600 font-medium transition-colors">Our Story</Link>
          </nav>
        )}

        {isAdmin && (
          <nav className="hidden md:flex space-x-8">
            <Link to="/admin/dashboard" className="text-brown-700 hover:text-honey-600 font-medium transition-colors flex items-center gap-1">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
          </nav>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Cart — ONLY for customers, never for admin */}
          {!isAdmin && (
            <Link to="/cart" className="relative text-brown-800 hover:text-honey-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-honey-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* User / Auth */}
          {userInfo ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-brown-800 hover:text-honey-600 font-medium"
              >
                {userInfo.name.split(' ')[0]}
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white border border-honey-100 rounded-xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-honey-100 mb-1">
                    <p className="text-xs font-bold text-brown-500 uppercase tracking-wider">{isAdmin ? '⚙️ Admin' : '👤 Customer'}</p>
                    <p className="text-sm font-semibold text-brown-900 truncate">{userInfo.email}</p>
                  </div>
                  {!isAdmin && (
                    <Link to="/profile"
                      className="block px-4 py-2 text-sm text-brown-700 hover:bg-honey-50 hover:text-honey-700"
                      onClick={() => setDropdownOpen(false)}>
                      My Profile
                    </Link>
                  )}
                  {isAdmin && (
                    <Link to="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-brown-700 hover:bg-honey-50 hover:text-honey-700"
                      onClick={() => setDropdownOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 mt-1 border-t border-honey-100"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-brown-800 hover:text-honey-600 transition-colors hidden md:flex items-center gap-1 font-medium">
              <User className="w-5 h-5" /> Login
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button className="md:hidden text-brown-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-honey-100 px-4 py-4 space-y-3 animate-fade-in">
          {!isAdmin && (
            <>
              <Link to="/" className="block text-brown-700 py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/products" className="block text-brown-700 py-2" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <Link to="/about" className="block text-brown-700 py-2" onClick={() => setMobileMenuOpen(false)}>Our Story</Link>
              <Link to="/contact" className="block text-brown-700 py-2" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
              <Link to="/cart" className="block text-brown-700 py-2" onClick={() => setMobileMenuOpen(false)}>Cart ({cartCount})</Link>
              {userInfo && <Link to="/profile" className="block text-brown-700 py-2" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>}
            </>
          )}
          {isAdmin && (
            <Link to="/admin/dashboard" className="block text-brown-700 py-2" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          )}
          {!userInfo && <Link to="/login" className="block text-brown-700 py-2" onClick={() => setMobileMenuOpen(false)}>Login</Link>}
          {userInfo && (
            <button onClick={logoutHandler} className="block text-red-600 py-2 w-full text-left">Logout</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
