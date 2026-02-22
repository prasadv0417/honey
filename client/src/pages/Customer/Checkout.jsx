import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import { useGetProfileQuery } from '../../slices/usersApiSlice';
import { clearCartItems } from '../../slices/cartSlice';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [addingNew, setAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState({ fullName: '', phone: '', addressLine: '', city: '', state: '', pincode: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: profile } = useGetProfileQuery();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (cart.cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const placeOrderHandler = async () => {
    let finalAddress = {};

    if (addingNew) {
      if (!newAddress.fullName || !newAddress.phone || !newAddress.addressLine || !newAddress.city || !newAddress.state || !newAddress.pincode) {
        toast.error('Please fill all address fields');
        return;
      }
      finalAddress = newAddress;
    } else {
      const addresses = profile?.addresses || [];
      if (addresses.length === 0) {
        toast.error('Please add a shipping address first');
        return;
      }
      finalAddress = addresses[selectedAddressIndex];
    }

    try {
      const order = await createOrder({
        orderItems: cart.cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          size: item.size,
          product: item._id,
        })),
        shippingAddress: finalAddress,
        paymentMethod: 'Paytm',
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      toast.success('Order placed successfully!');
      navigate(`/order/${order._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Failed to place order');
    }
  };

  if (isLoading) return <Loader fullScreen />;

  return (
    <div className="bg-honeycomb min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-brown-950 font-['Playfair_Display'] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            {/* Shipping */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-honey-100">
              <h2 className="text-xl font-bold text-brown-900 mb-6 flex justify-between items-center">
                Shipping Address
                <button onClick={() => setAddingNew(!addingNew)}
                  className="text-sm text-honey-600 font-medium bg-honey-50 px-3 py-1.5 rounded-lg hover:bg-honey-100">
                  {addingNew ? 'Use Saved' : '+ Add New'}
                </button>
              </h2>

              {addingNew ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-brown-700">Full Name</label>
                    <input value={newAddress.fullName} onChange={e => setNewAddress({ ...newAddress, fullName: e.target.value })}
                      className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-brown-700">Phone</label>
                    <input value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" placeholder="9876543210" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-brown-700">Pincode</label>
                    <input value={newAddress.pincode} onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" placeholder="110001" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-brown-700">Address</label>
                    <input value={newAddress.addressLine} onChange={e => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                      className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" placeholder="123 Honeycomb Lane" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-brown-700">City</label>
                    <input value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" placeholder="Delhi" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-brown-700">State</label>
                    <input value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" placeholder="Delhi" />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile?.addresses?.length > 0 ? profile.addresses.map((addr, index) => (
                    <div key={index} onClick={() => setSelectedAddressIndex(index)}
                      className={`border p-4 rounded-xl cursor-pointer transition-all ${selectedAddressIndex === index ? 'border-honey-500 bg-honey-50/50 shadow-sm' : 'border-gray-200 hover:border-honey-300'}`}>
                      <p className="font-bold text-brown-900">{addr.fullName}</p>
                      <p className="text-sm text-brown-600 mt-1">{addr.addressLine}</p>
                      <p className="text-sm text-brown-600">{addr.city}, {addr.state} {addr.pincode}</p>
                      <p className="text-sm text-brown-600 mt-1">📞 {addr.phone}</p>
                    </div>
                  )) : (
                    <p className="col-span-2 text-brown-500 text-sm italic py-4 text-center">
                      No saved addresses. <button onClick={() => setAddingNew(true)} className="text-honey-600 underline">Add one above.</button>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-honey-100">
              <h2 className="text-xl font-bold text-brown-900 mb-4">Payment Method</h2>
              <div className="flex items-center gap-3 p-4 border border-honey-500 bg-honey-50/30 rounded-xl">
                <input type="radio" checked readOnly className="text-honey-600 w-4 h-4" />
                <span className="font-medium text-brown-900">Paytm Secure Gateway (UPI/Cards/NetBanking)</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-honey-100 sticky top-24">
              <h2 className="text-xl font-bold text-brown-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-[280px] overflow-y-auto pr-1">
                {cart.cartItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-honey-100 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-brown-900 truncate">{item.name}</p>
                      <p className="text-xs text-brown-500">{item.size} × {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-brown-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-honey-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-brown-600">
                  <span>Subtotal</span><span>₹{cart.itemsPrice}</span>
                </div>
                <div className="flex justify-between text-brown-600">
                  <span>Shipping</span>
                  <span>{Number(cart.shippingPrice) === 0 ? <span className="text-green-600 font-medium">Free</span> : `₹${cart.shippingPrice}`}</span>
                </div>
                <div className="border-t border-honey-100 pt-3 flex justify-between items-center font-bold text-brown-900">
                  <span>Total</span>
                  <span className="text-2xl text-honey-600">₹{cart.totalPrice}</span>
                </div>
              </div>

              <button onClick={placeOrderHandler} disabled={isLoading}
                className="w-full btn-primary py-4 mt-6 flex items-center justify-center gap-2">
                {isLoading ? 'Placing Order...' : 'Place Order & Pay'}
              </button>
              <p className="mt-3 text-center text-xs text-brown-400">🔒 Secure Encrypted Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
