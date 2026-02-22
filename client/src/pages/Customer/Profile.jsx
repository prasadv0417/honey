import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetProfileQuery, useUpdateProfileMutation, useAddAddressMutation, useDeleteAddressMutation } from '../../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { MapPin, User, Package, Plus, Trash2, X } from 'lucide-react';
import Loader from '../../components/Loader';

const Profile = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ fullName: '', phone: '', addressLine: '', city: '', state: '', pincode: '' });

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: profile, isLoading: profileLoading, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [addAddress, { isLoading: isAddingAddress }] = useAddAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const { data: orders = [], isLoading: ordersLoading } = useGetMyOrdersQuery(undefined, { skip: activeTab !== 'orders' });

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setPhone(profile.phone || '');
    }
  }, [profile]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await updateProfile({ name, phone, password: password || undefined }).unwrap();
      dispatch(setCredentials({ ...userInfo, name: res.name, email: res.email, role: res.role, token: res.token }));
      toast.success('Profile updated!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addAddressHandler = async (e) => {
    e.preventDefault();
    if (!newAddress.fullName || !newAddress.phone || !newAddress.addressLine || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      toast.error('Please fill all address fields');
      return;
    }
    try {
      await addAddress(newAddress).unwrap();
      toast.success('Address added!');
      setNewAddress({ fullName: '', phone: '', addressLine: '', city: '', state: '', pincode: '' });
      setShowAddressForm(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteAddressHandler = async (addressId) => {
    if (window.confirm('Delete this address?')) {
      try {
        await deleteAddress(addressId).unwrap();
        toast.success('Address deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const statusColors = {
    'Processing': 'bg-blue-100 text-blue-700',
    'Shipped': 'bg-yellow-100 text-yellow-700',
    'Delivered': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
  };

  if (profileLoading) return <Loader fullScreen />;

  return (
    <div className="bg-honeycomb min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-brown-950 font-['Playfair_Display'] mb-8">My Account</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-honey-100 flex flex-col gap-2">
              {[
                { key: 'details', icon: <User className="w-5 h-5" />, label: 'Account Details' },
                { key: 'addresses', icon: <MapPin className="w-5 h-5" />, label: 'Saved Addresses' },
                { key: 'orders', icon: <Package className="w-5 h-5" />, label: 'Order History' },
              ].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === tab.key ? 'bg-honey-100 text-honey-800' : 'text-brown-600 hover:bg-honey-50'}`}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-honey-100">
                <h2 className="text-xl font-bold text-brown-900 mb-6 border-b border-honey-100 pb-4">Personal Information</h2>
                <form onSubmit={submitHandler} className="space-y-5 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-brown-700">Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                      className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700">Email (Read Only)</label>
                    <input type="email" value={profile?.email || ''} disabled
                      className="mt-1 w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700">Phone</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                      className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
                  </div>
                  <div className="pt-4 border-t border-honey-100">
                    <p className="text-sm font-semibold text-brown-800 mb-3">Change Password (leave blank to keep current)</p>
                    <div className="space-y-3">
                      <input type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
                      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
                    </div>
                  </div>
                  <button type="submit" disabled={isUpdating} className="btn-primary px-8 py-2.5">
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-honey-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-brown-900">Saved Addresses</h2>
                  <button onClick={() => setShowAddressForm(!showAddressForm)}
                    className="flex items-center gap-2 text-sm font-medium text-honey-600 bg-honey-50 px-3 py-1.5 rounded-lg hover:bg-honey-100 transition">
                    {showAddressForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> Add New</>}
                  </button>
                </div>

                {showAddressForm && (
                  <form onSubmit={addAddressHandler} className="bg-honey-50/50 border border-honey-200 rounded-xl p-5 mb-6 grid grid-cols-2 gap-4 animate-fade-in">
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-brown-700">Full Name</label>
                      <input value={newAddress.fullName} onChange={e => setNewAddress({ ...newAddress, fullName: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-brown-700">Phone</label>
                      <input value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-brown-700">Pincode</label>
                      <input value={newAddress.pincode} onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-brown-700">Address Line</label>
                      <input value={newAddress.addressLine} onChange={e => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-brown-700">City</label>
                      <input value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-brown-700">State</label>
                      <input value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
                    </div>
                    <div className="col-span-2">
                      <button type="submit" disabled={isAddingAddress} className="btn-primary px-6 py-2">
                        {isAddingAddress ? 'Saving...' : 'Save Address'}
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile?.addresses?.length > 0 ? profile.addresses.map((addr, idx) => (
                    <div key={idx} className="border border-honey-200 rounded-xl p-5 relative hover:border-honey-400 transition-colors">
                      {addr.isDefault && (
                        <span className="absolute top-3 right-3 text-xs font-bold text-honey-700 bg-honey-100 px-2 py-0.5 rounded">Default</span>
                      )}
                      <p className="font-bold text-brown-900">{addr.fullName}</p>
                      <p className="text-sm text-brown-600 mt-1">{addr.addressLine}</p>
                      <p className="text-sm text-brown-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-sm text-brown-600 mt-1">📞 {addr.phone}</p>
                      <button onClick={() => deleteAddressHandler(addr._id)}
                        className="mt-3 flex items-center gap-1 text-xs text-red-500 hover:text-red-700">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  )) : (
                    <p className="col-span-2 text-center text-brown-500 py-8 italic">No saved addresses. Add one above.</p>
                  )}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-honey-100">
                <h2 className="text-xl font-bold text-brown-900 mb-6">Order History</h2>
                {ordersLoading ? <Loader /> : orders.length === 0 ? (
                  <p className="text-center text-brown-500 py-10 italic">No orders yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-honey-100 text-left">
                          <th className="p-3 font-semibold text-brown-700">Order ID</th>
                          <th className="p-3 font-semibold text-brown-700">Date</th>
                          <th className="p-3 font-semibold text-brown-700">Total</th>
                          <th className="p-3 font-semibold text-brown-700">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-honey-50">
                        {orders.map(order => (
                          <tr key={order._id} className="hover:bg-honey-50/30">
                            <td className="p-3 font-mono text-xs text-brown-500">{order._id.slice(-8).toUpperCase()}</td>
                            <td className="p-3 text-brown-600">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                            <td className="p-3 font-bold text-brown-900">₹{order.totalPrice}</td>
                            <td className="p-3">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.orderStatus] || 'bg-gray-100 text-gray-700'}`}>
                                {order.orderStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
