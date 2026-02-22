import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { resettoken } = useParams();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await axios.put(`/api/users/resetpassword/${resettoken}`, { password });
      toast.success('Password updated correctly');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-honeycomb">
      <div className="max-w-md w-full glass-card p-8 rounded-2xl shadow-xl border border-honey-200 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-brown-950 font-['Playfair_Display']">
            Create New Password
          </h2>
          <p className="mt-2 text-sm text-brown-600">
            Secure your account with a new password
          </p>
        </div>

        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label className="block text-sm font-medium text-brown-700">New Password</label>
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
            disabled={loading}
            className="w-full btn-primary py-3"
          >
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
