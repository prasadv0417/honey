import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { MapPin, User, Package } from 'lucide-react';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [activeTab, setActiveTab] = useState('details'); // details, addresses, orders

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPhone(userInfo.phone || '');
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        phone,
        password,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-honeycomb min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-brown-950 font-['Playfair_Display'] mb-8">
          My Account
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="glass-card bg-white p-4 rounded-2xl shadow-sm border border-honey-100 flex flex-col gap-2">
              <button
                onClick={() => setActiveTab('details')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'details' ? 'bg-honey-100 text-honey-800' : 'text-brown-600 hover:bg-honey-50'}`}
              >
                <User className="w-5 h-5" /> Account Details
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'addresses' ? 'bg-honey-100 text-honey-800' : 'text-brown-600 hover:bg-honey-50'}`}
              >
                <MapPin className="w-5 h-5" /> Saved Addresses
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'orders' ? 'bg-honey-100 text-honey-800' : 'text-brown-600 hover:bg-honey-50'}`}
              >
                <Package className="w-5 h-5" /> Order History
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {activeTab === 'details' && (
              <div className="glass-card bg-white p-8 rounded-2xl shadow-sm border border-honey-100 animate-fade-in">
                <h2 className="text-xl font-bold text-brown-900 mb-6 border-b border-honey-100 pb-4">Personal Information</h2>
                <form onSubmit={submitHandler} className="space-y-6 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-brown-700">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700">Email Address (Read Only)</label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="mt-1 w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg outline-none cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="pt-4 border-t border-honey-100">
                    <h3 className="text-md font-semibold text-brown-800 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-brown-700">New Password</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brown-700">Confirm Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500"
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={isLoading} className="btn-primary w-full md:w-auto px-8 py-3 mt-4">
                    {isLoading ? 'Updating...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="glass-card bg-white p-8 rounded-2xl shadow-sm border border-honey-100 animate-fade-in">
                <h2 className="text-xl font-bold text-brown-900 mb-6 flex justify-between items-center">
                  Saved Addresses
                  <button className="text-sm font-medium text-honey-600 hover:text-honey-700 bg-honey-50 px-3 py-1.5 rounded-lg transition-colors">
                    + Add New
                  </button>
                </h2>
                {/* This will iterate over Redux RTK fetching. Currently mocked display for UI setup */}
                <div className="border border-honey-200 rounded-xl p-5 relative hover:border-honey-500 transition-colors">
                  <span className="absolute top-4 right-4 text-xs font-bold text-honey-700 bg-honey-100 px-2 py-1 rounded-md">Default</span>
                  <p className="font-bold text-brown-900">{userInfo.name}</p>
                  <p className="text-sm text-brown-600 mt-1">123 Forest Lane, Honey Apiary</p>
                  <p className="text-sm text-brown-600">Shimla, Himachal Pradesh 171001</p>
                  <p className="text-sm text-brown-600 mt-2 font-medium">9876543210</p>

                  <div className="mt-4 flex gap-4 text-sm font-medium">
                    <button className="text-blue-600 hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="glass-card bg-white p-8 rounded-2xl shadow-sm border border-honey-100 animate-fade-in">
                <h2 className="text-xl font-bold text-brown-900 mb-6">Order History</h2>
                <p className="text-brown-500 text-sm italic">Connect RTK Query `useGetMyOrdersQuery` here to list rows.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
