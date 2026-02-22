import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, LogOut, ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-honey-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🍯</span>
          <h1 className="text-2xl font-bold text-brown-950 font-['Playfair_Display']">Nature's Gold</h1>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-brown-700 hover:text-honey-600 font-medium transition-colors">Home</Link>
          <Link to="/products" className="text-brown-700 hover:text-honey-600 font-medium transition-colors">Shop</Link>
          <Link to="/about" className="text-brown-700 hover:text-honey-600 font-medium transition-colors">Our Story</Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative text-brown-800 hover:text-honey-600 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-honey-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-brown-800 hover:text-honey-600 font-medium"
              >
                {userInfo.name.split(' ')[0]} <ChevronDown className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-honey-100 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                  <Link to={userInfo.role === 'admin' ? '/admin/dashboard' : '/profile'}
                    className="block px-4 py-2 text-sm text-brown-700 hover:bg-honey-50 hover:text-honey-700"
                    onClick={() => setDropdownOpen(false)}>
                    {userInfo.role === 'admin' ? 'Dashboard' : 'My Profile'}
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-brown-800 hover:text-honey-600 transition-colors hidden md:block">
              <User className="w-6 h-6" />
            </Link>
          )}

          <button className="md:hidden text-brown-800 hover:text-honey-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
