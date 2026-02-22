import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import { ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // redirect if already logged in as admin
  React.useEffect(() => {
    if (userInfo?.role === 'admin') navigate('/admin/dashboard');
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      if (res.role !== 'admin') {
        toast.error('Access denied. Admin credentials required.');
        return;
      }
      dispatch(setCredentials({ ...res }));
      toast.success('Welcome, Admin!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brown-950 via-brown-800 to-honey-900 px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-honey-400/20 border-2 border-honey-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-honey-300" />
          </div>
          <h2 className="text-3xl font-extrabold text-white font-['Playfair_Display']">Admin Portal</h2>
          <p className="mt-2 text-sm text-honey-200">Nature's Gold Control Panel</p>
        </div>

        <form className="space-y-5" onSubmit={submitHandler}>
          <div>
            <label className="block text-sm font-medium text-honey-200 mb-1">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@honeyshop.com"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-honey-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-honey-200 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-honey-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-honey-500 hover:bg-honey-400 text-brown-950 font-bold rounded-xl transition-colors shadow-lg"
          >
            {isLoading ? 'Authenticating...' : 'Enter Admin Panel'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-honey-300 hover:text-honey-100 transition">
            ← Back to Customer Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
