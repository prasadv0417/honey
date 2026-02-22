import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Registration successful!');
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Failed to register');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-honeycomb">
      <div className="max-w-md w-full glass-card p-8 rounded-2xl shadow-xl border border-honey-200 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-brown-950 font-['Playfair_Display']">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-brown-600">
            Join the Nature's Gold family
          </p>
        </div>

        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label className="block text-sm font-medium text-brown-700">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-honey-200 focus:ring-2 focus:ring-honey-500 focus:border-transparent outline-none transition-shadow"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-brown-700">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-honey-200 focus:ring-2 focus:ring-honey-500 focus:border-transparent outline-none transition-shadow"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 mt-4"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-brown-600">
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="font-medium text-honey-600 hover:text-honey-500">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
