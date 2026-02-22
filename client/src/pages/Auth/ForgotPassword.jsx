import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/users/forgotpassword', { email });
      toast.success(data.data || 'Password reset email sent');
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
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-brown-600">
            Enter your email to receive a reset link
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

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
