import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 'admin' && redirect === '/') {
        navigate('/admin/dashboard');
      } else {
        navigate(redirect);
      }
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Login successful!');
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Failed to login');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-honeycomb">
      <div className="max-w-md w-full glass-card p-8 rounded-2xl shadow-xl border border-honey-200 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-brown-950 font-['Playfair_Display']">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-brown-600">
            Sign in to your account
          </p>
        </div>

        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label className="block text-sm font-medium text-brown-700">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-honey-200 focus:ring-2 focus:ring-honey-500 focus:border-transparent outline-none transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-honey-200 focus:ring-2 focus:ring-honey-500 focus:border-transparent outline-none transition-shadow"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-honey-600 hover:text-honey-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-brown-600">
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="font-medium text-honey-600 hover:text-honey-500">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
